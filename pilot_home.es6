import dom from 'dom';
import article from 'article';

article.ready().then(() => {
  dom('#dismiss').on('click', e => {
    e.preventDefault();
    dom('#pilot_notification').addClass('dismissed');
  });
})

