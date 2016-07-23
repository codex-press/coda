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
      codex.dom(current).addClass('overflow-right');
    else
      codex.dom(current).removeClass('overflow-right');

    if (index.scrollLeft > 0)
      codex.dom(current).addClass('overflow-left');
    else
      codex.dom(current).removeClass('overflow-left');

  });
};


function currentsScroller(e) {
  codex.dom(e.target).closest('.index').scrollX(e.deltaX);
  updateArrows();
  if (!e.deltaY || (e.deltaX / e.deltaY) > .8)
    e.preventDefault();
};


function currentsPager(e) {
  e.preventDefault();

  var index = codex.dom(e.target).closest('.current').select('.index').first();

  var direction = codex.dom(e.target).is('.left') ? -1 : 1;
  var jump = window.innerWidth * .8 * direction;
  var start = index.scrollLeft;
  var max = index.scrollWidth - index.clientWidth;
  var change = constrain(jump, start * -1, max - start);
  var duration = Math.max(100, 500 * (change/jump));

  var ease = codex.animate.cubicOut(start, change, duration);

  codex.animate(
    duration: duration,
    tick: function(time) { index.scrollLeft = Math.round(ease(time)); },
    done: updateArrows
  );

};


