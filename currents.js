import { dom, article, animate } from '/app/index.js';

dom(window).bind({
  'click .arrow' : currentsPager,
  'wheel .index' : currentsScroller,
});

article.bind({
  resize : updateArrows,
});

article.ready.then(() => updateArrows());

function updateArrows() {
  dom('.current').forEach(current => {
    let index = dom.first(current, '.index');

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
  dom(e.target).closest('.index').scrollLeft += e.deltaX;
  updateArrows();
  if (!e.deltaY || (e.deltaX / e.deltaY) > .8)
    e.preventDefault();
};


let tween = {};
function currentsPager(e) {
  console.log(e);
  e.preventDefault();

  let current = dom(e.target).closest('.current');
  let arrow = dom(e.target).closest('.arrow');
  let index = dom(current).first('.index');

  // cancel the previous
  if (tween.active)
    tween.cancel();

  let direction = dom(arrow).is('.left') ? -1 : 1;
  let jump = window.innerWidth * .8 * direction;
  let start = index.scrollLeft;
  let max = index.scrollWidth - index.clientWidth;
  let end = Math.min(Math.max(start + jump, 0), max);

  let ease = animate.cubicOut(start, end);

  tween = animate({
    duration: Math.max(100, 500 * Math.abs((start-end)/jump)),
    tick: time => { index.scrollLeft = Math.round(ease(time)); },
    done: updateArrows,
  });

};

