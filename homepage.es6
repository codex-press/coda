import dom from 'dom';

dom('#dismiss').on('click', e => {
  e.preventDefault();
  dom('#pilot_notification').addClass('dismissed');
});

