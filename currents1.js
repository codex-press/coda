'use strict';
(function() {

  var dom = require('dom').default;
  var article = require('article').default;
  var animate = require('animate').default;

  var currentsEvents = {
    'click .icon-angle' : currentsPager,
    'wheel .index'      : currentsScroller,
    'mouseover .titles h1' : currentsExpander,
  };

  var events = {
    resize : updateArrows,
    ready  : ready,
  };

  article.bind(events);


  function ready() {
    article.bind(currentsEvents, article.el);
    updateArrows();
  };


  function updateArrows() {
    article.select('.current').each(function(current) {
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
    dom.closest(e.target, '.index').scrollLeft += e.deltaX;
    updateArrows();
    if (!e.deltaY || (e.deltaX / e.deltaY) > .8)
      e.preventDefault();
  };

//testing access to className of titles
  function currentsExpander(e) {
    var currentName = e.target.closest('h1').className;
    console.log(currentName);
    //remove all other .top-expansion classes
    article.select('.expansion').each(removeClass('top-expansion'));
    //add .top-expansion class to the current expansion
    article.select('.expansion .' + currentName).addClass('top-expansion');
  };

  var tween = {};
  function currentsPager(e) {
    e.preventDefault();

    var index = dom(e.target).closest('.current').select('.index').first();

    // cancel the previous
    if (tween.active)
      tween.cancel();

    var direction = dom(e.target).is('.left') ? -1 : 1;
    var jump = window.innerWidth * .8 * direction;
    var start = index.scrollLeft;
    var max = index.scrollWidth - index.clientWidth;
    var end = Math.min(Math.max(start + jump, 0), max);

    var ease = animate.cubicOut(start, end);

    tween = animate({
      duration: Math.max(100, 500 * Math.abs(start-end)/jump),
      tick: function(time) { index.scrollLeft = Math.round(ease(time)); },
      done: updateArrows,
    });

  };

})();
