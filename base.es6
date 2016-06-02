import {compile, unscopeLinks}  from './template_helpers.es6';
import {log, constrain, alphanum} from './utility.es6';
import player     from './player.es6';
import dom        from './dom.es6';
import animate    from './easing.es6';


var footerTemplate = compile(`
  <footer>
    <div class=current-container>
      {{#each currents}}
        <div class=current>
          <div class=label>
            <div class=word-current>Current</div>
            <div class=name>
              <a href="/coda/lgbt-crisis/{{value}}">
                {{label}}
              </a>
            </div>
          </div>
          <div class=timeline-wrap>
            <div class=timeline>
              {{#each articles}}
                <div data-href="{{url}}" class=article>
                  <div class=dot></div>
                </div>
              {{/each}}
            </div>
          </div>
        </div>
      {{/each}}
    </div>
  </footer>
`);


// footer changes based on Current of current article
var footer;
var current;
var siteChrome;


var init = function init() {

  // hooks to the codastory.com article
  siteChrome = dom(document).find('article[data-title="codastory.com"]');

  if (!siteChrome.length)
    return;

  siteChrome.addClass('onscreen');

  log('coda init');

  // sigh... must sort these here b/c server doesn't know how
  // TODO move this to interface
  player.articles.sort((a,b) => {
    let aMeta = a.attrs.metadata;
    let bMeta = b.attrs.metadata;

    if (!aMeta.current || !bMeta.current)
      return -1;

    current = alphanum(aMeta.current, bMeta.current);
    if (current != 0)
      return current;
    else if (aMeta.publication_date < bMeta.publication_date)
      return -1;
    else if (aMeta.publication_date > bMeta.publication_date)
      return 1;
    else
      return 0;
  });


  // transform article collection data to be in the right structure for
  // templating the footer
  let currents = player.articles.reduce((currents, article) => {

    current = article.attrs.metadata.current;

    if (!current || current === 'none')
      return currents;

    if (!currents[current]) {
      currents[current] = {
        value: current,
        label: article.attrs.metadata.current_label,
        articles: []
      };
    }
    currents[current].articles.push(article.attrs);
    return currents;
  }, {});

  siteChrome.append(unscopeLinks(footerTemplate({currents})));
  footer = siteChrome.find('footer');

  player.on('resize',   updateFooter);

  player.on('navigate', updateFooter);
  player.on('navigate', updateHeader);
  player.on('navigate', checkForCurrentsArticle);

  player.on('video:play', v => {
    hideFooter();
    siteChrome.find('header').transform({y: '-100%'});
  });

  player.on('video:pause', v => {
    showFooter();
    siteChrome.find('header').transform({y: ''});
  });

};

export default init;

var updateHeader = function updateHeader(article) {
  siteChrome.select('header a.target').removeClass('target');

  if (article.attrs.url === '/coda')
    siteChrome.find('.navigation-links a[href="/coda"]').addClass('target');
  else if (article.attrs.url === '/coda/currents')
    siteChrome.find('a[href="/coda/currents"]').addClass('target');
  else if (article.attrs.url === '/coda/about')
    siteChrome.find('a[href="/coda/about"]').addClass('target');
};


var hideFooter = function hideFooter() {
  footer.transform({y: '100%'});
}

var showFooter = function showFooter() {
  footer.transform({y: 2});
}

var updateFooter = function updateFooter(article) {
  article = article || player.article();
  current = article.attrs.metadata.current;

  log('changing Current:', current);

  if (!current || current === 'none')
    hideFooter();
  else {
    showFooter();

    // other dots not .bigger
    footer.select('.dot').removeClass('bigger');

    // dot gets .bigger
    let url = article.attrs.url;
    let el = footer.select('[data-href="' + url + '"]')
    el.select('.dot').addClass('bigger');

    // center the current
    let y = -1 * (
      el.closest('.current').rect().top -
      el.closest('.current-container').rect().top
    ) - 0.6*el.em();
    el.closest('.current-container').transform({y});

    // if timeline is overflowing, center the dot
    let timeline = el.closest('.timeline');
    if (timeline[0].children[0].offsetLeft < 20) {
      let x = timeline.rect().width/2 - el[0].offsetLeft;
      timeline.transform({x});
    }
    else
      timeline.transform(undefined);

  }

};



// Currents page needs special codes....

var currentsEvents = {
  'click .icon-angle' : currentsPager,
  'wheel .index'      : currentsScroller,
};


var currentsArticle;
function checkForCurrentsArticle(article) {

  if (!currentsArticle && article.attrs.url === '/coda/currents') {
    currentsArticle = article;
    article.hook(currentsEvents, article.el);
    article.hook({resize: updateArrows});
    updateArrows();
  }

};


function updateArrows() {
  currentsArticle.select('.current').each(function(current) {
    var index = current.select('.index').first();

    if (index.scrollWidth - index.clientWidth - index.scrollLeft > 120)
      dom(current).addClass('overflow-right');
    else
      dom(current).removeClass('overflow-right');

    if (index.scrollLeft > 0)
      dom(current).addClass('overflow-left');
    else
      dom(current).removeClass('overflow-left');

  });
};


function currentsScroller(e) {
  dom(e.target).closest('.index').scrollX(e.deltaX);
  updateArrows();
  if (!e.deltaY || (e.deltaX / e.deltaY) > .8)
    e.preventDefault();
};


function currentsPager(e) {
  e.preventDefault();

  var index = dom(e.target).closest('.current').select('.index').first();

  let direction = dom(e.target).is('.left') ? -1 : 1;
  let jump = window.innerWidth * .8 * direction;
  let start = index.scrollLeft;
  let max = index.scrollWidth - index.clientWidth;
  let change = constrain(jump, start * -1, max - start);
  let duration = Math.max(100, 500 * (change/jump));

  animate(
    duration,
    time => {
      index.scrollLeft = start + Math.round(change * animate.cubicOut(time));
    },
    updateArrows
  );

};


