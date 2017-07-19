import dom from 'dom';
import * as env from 'env';
import article from 'article';
import Plugin from 'plugin';

article.ready.then(() => {

  if (env.topOrigin !== 'https://codastory.com')
    return;


    //***********************************
    //Animated Pullquotes
    //
    //***********************************

    //Separate pullquote into spans

    //input: an array of words
    //output: a string with each of those words in its own span
      var addSpans = function(words){
        var line = "";
        var spanBegin = "<span>";
        var spanEnd = " </span>"
        for (var i = 0; i < words.length; i++) {
          line = line + spanBegin + words[i] + spanEnd;
        }
        return line;
      }

    //takes an element and puts all of its words into spans.  Leaves other elements alone.
      var spanify = function(texts){
        var result = "";
        for (var i = 0; i<texts.length; i++) {
          //here, instead of splitting the innerHTML, I should split + spanify all text nodes
          //var split = texts[i].innerHTML.split(" ");
          //var spanned = addSpans(split);
          var nodes = texts[i].childNodes;
          for (var j = 0; j < nodes.length; j++) {
            if (nodes[j].nodeType == 3) {
              var split = nodes[j].nodeValue.trim().split(" ");
              var spanned = addSpans(split);
              result += spanned;
            }
            else {
              result += nodes[j].outerHTML;
            }
          }
          texts[i].innerHTML = result;
          result = "";
        }
      }


      var addClass = function(element, className) {
        element.classList.add(className);
      }

      //function addClassAtInterval
      //input: takes an element, a class name, and an interval
      //output: addes a class to each child element at the interval
      var addClassAtInterval = function(element, className, interval) {
        var children = element.children;
        for (var i = 0; i<children.length; i++) {
          setTimeout(addClass, interval * i, children[i], className);
          }
      }

      var isInViewport = function(element){
        var rect = element.getBoundingClientRect();
    //this section copied from https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
        return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
        //return true;
      }



      var texts = document.getElementsByClassName("pullquote");
      spanify(texts);
      var runAnimations = function(){
        for (var i = 0; i<texts.length; i++){
          if (isInViewport(texts[i]))
          {
            addClassAtInterval(texts[i], "word", 100);
          }
        }
      }

    //  dom(window).bind({'scroll' : runAnimations}); //does not work on iOS Safari
      article.on('scroll', runAnimations); //works on Firefox for Win7, Chrome for Android, Safari for iOS


    //***********************************
    //End of Animated Pullquotes
    //
    //***********************************




  var edition_names = {
    "lgbtq-crisis" : "LGBTQ Crisis",
    "disinformation-crisis" : "Disinformation Crisis",
    "migration-crisis" : "Migration Crisis"
  };

  var current_names = {
    "kremlin-influence" : "Kremlin Influence",
    "orthodox-church" : "Orthodox Church",
    "east-west-divide" : "East-West Divide",
    "information-war" : "Information War",
    "rights-abuses" : "Rights Abuses",
    "traditional-values" : "Traditional Values",
    "foreign-proxies" : "Foreign Proxies",
    "armed-conflict" : "Armed Conflict",
    "fear-and-loathing" : "Fear and Loathing",
    "geopolitical-ruptures" : "Geopolitical Ruptures",
    "integration-issues" : "Integration Issues",
    "news" : "News"
  };


  //testing
  //console.log("test 1");
  //console.log(article.attrs.metadata.current);

  //first: identify edition and current. convert them to regular text and insert them into byline-box
  //console.log(location.pathname + " " + article.attrs.url);
  var path_array = article.attrs.url.split('/');
  var edition_url;
  var edition_name;
  var current_url;
  var current_name;
  if (path_array.length == 5){
    edition_url = path_array[2];
    edition_name = edition_names[edition_url];
    current_url = path_array[3];
    current_name = current_names[current_url];

  }
  else if (path_array.length == 4){
    edition_url = path_array[2];
    if (edition_url == "lgbt-crisis") edition_url = "lgbtq-crisis";
    edition_name = edition_names[edition_url];
    current_name = article.attrs.metadata.current;
    for (var url in current_names){
      if (current_names[url] == current_name) {
        current_url = url;
      }
    }
  }

  //select the byline box
  var byline_boxes = document.getElementsByClassName("byline-box");
  if (byline_boxes.length != 0) {
    var byline_box = byline_boxes[0];

    var byline_current = document.createElement("P");
    byline_current.className = "byline-current";
    var current_link = document.createElement("A");
    current_link.setAttribute("href", edition_url + "/" + current_url);
    var current_name_node = document.createTextNode(current_name);
    byline_current.appendChild(current_link);
    current_link.appendChild(current_name_node);

    var byline_edition = document.createElement("P");
    byline_edition.className = "byline-edition";
    var edition_link = document.createElement("A");
    edition_link.setAttribute("href", edition_url);
    var edition_name_node = document.createTextNode(edition_name);
    byline_edition.appendChild(edition_link)
    edition_link.appendChild(edition_name_node);

    if (byline_box.lastElementChild.className == "byline-share") {
      byline_box.insertBefore(byline_current, byline_box.lastElementChild);
      byline_box.insertBefore(byline_edition, byline_box.lastElementChild);
    }
    else {
      byline_box.appendChild(byline_current);
      byline_box.appendChild(byline_edition);
    }
  }




  //select the footer logo

  var footer_logos = document.getElementsByClassName("footer-logo");

  if (footer_logos.length != 0) {
    var footer_logo = footer_logos[0];

    //append two paragraphs:
    // 1. p.byline-current (with link to current)
    // 2. p.byline-edition (with link to edition)

    var footer_current = document.createElement("P");
    footer_current.className = "footer-current " + current_url;
    if ((current_url == "information-war") && (edition_url == "disinformation-crisis")) {
      footer_current.className = "footer-current " + current_url + "-1";
    }
    var current_link = document.createElement("A");
    current_link.setAttribute("href", edition_url + "/" + current_url);
    var current_name_node = document.createTextNode(current_name);
    if (current_url == "news"){
      current_name_node.textContent = edition_name + " News";
    }

    footer_current.appendChild(current_link);
    current_link.appendChild(current_name_node);

    var footer_edition = document.createElement("P");
    footer_edition.className = "footer-edition " + edition_url;
    var edition_link = document.createElement("A");
    edition_link.setAttribute("href", edition_url);
    var edition_name_node = document.createTextNode(edition_name);
    footer_edition.appendChild(edition_link)
    edition_link.appendChild(edition_name_node);

    footer_logo.appendChild(footer_current);
    footer_logo.appendChild(footer_edition);
  }




  //nav footer
  //get previous and next article data
  var article_index = article.attrs.index;
  var prev;
  var next;
  for (var i=0; i<article_index.length; i++){
    if (article.attrs.url == article_index[i].url){
      //console.log("found article " + article_index[i].title);
      prev = i-1;
      next = i+1;
    }
  }

  var prev_html;
  var next_html;

  //need to check for edge cases.
  //if prev < 0 we need to replace div.previous with "back to current"
  //if next > length we need to replace div.next with "back to current"
  //
  if (prev <= 0) {
    prev_html = `
      <div class="previous-article">
        <p>
          <a href="/${edition_url}/${current_url}">
            <span class="nav-arrow">&larr;</span>
            <span class="nav-text">Previous<span class="nav-sep">:</span></span>
            <span class="nav-title">${current_name}</span>
          </a>
        </p>
      </div>
    `;
  }
  else {
    prev_html = `
      <div class="previous-article">
        <p>
          <a href="${article_index[prev].url.slice(5)}">
            <span class="nav-arrow">&larr;</span>
            <span class="nav-text">Previous<span class="nav-sep">:</span></span>
            <span class="nav-title">${article_index[prev].title}</span>
          </a>
        </p>
      </div>
    `;
  }
  //console.log(prev_html);

  if (next >= article_index.length) {
    next_html = `
      <div class="next-article">
        <p>
          <a href="/${edition_url}/${current_url}">
            <span class="nav-arrow">&rarr;</span>
            <span class="nav-text">Next</span><span class="nav-sep">:</span>
            <span class="nav-title">${current_name}</span>
          </a>
        </p>
      </div>
    `;
  }
  else {
    next_html = `
      <div class="next-article">
        <p>
          <a href="${article_index[next].url.slice(5)}">
            <span class="nav-arrow">&rarr;</span>
            <span class="nav-text">Next</span><span class="nav-sep">:</span>
            <span class="nav-title">${article_index[next].title}</span>
          </a>
        </p>
      </div>
    `;
  }
  //console.log(next_html);

  var curr_html = `
    <div class="current-article">
      <p><span class="now">Now Reading:</span> ${article.attrs.title}</p>
    </div>
  `
  //in <a href="/${edition_url}/${current_url}">${current_name}</a>


  //create nav
  var nav_footer = document.createElement("NAV");
  nav_footer.innerHTML = `
    <h1 class="current-current"><span class="in">Current:</span> <a href="/${edition_url}/${current_url}">${current_name}</a></h1>
    ${prev_html}
    ${curr_html}
    ${next_html}

  `

  //nav_footer.className = "moving";
  //append nav to end of article
  document.getElementsByTagName("ARTICLE")[0].appendChild(nav_footer);






});
