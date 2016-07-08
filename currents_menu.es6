// import {compile, unscopeLinks}  from './template_helpers.es6';
// import {log, constrain, alphanum} from './utility.es6';
// import player     from './player.es6';
// import dom        from './dom.es6';
// import animate    from './easing.es6';

// Currents page needs special codes....

var currentsEvents = {
  'click .icon-angle' : currentsPager,
  'wheel .index'      : currentsScroller,
};

article.hook(currentsEvents, article.el);
article.hook({resize: updateArrows});
updateArrows();


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


