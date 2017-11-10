import { dom, article } from '/app/index.js';

article.ready.then(() => {
  dom('#dismiss').on('click', e => {
    e.preventDefault();
    dom('#pilot_notification').addClass('dismissed');
  });
})

