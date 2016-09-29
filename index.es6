import dom from 'dom';
import article from 'article';

article.ready.then(() => {
  let header = dom('header.sitewide');

  // Desktop: change underline on :target link
  if (location.pathname === '/coda')
    header.select('.navigation-links a[href="/coda"]').addClass('target');
  else if (location.pathname === '/coda/currents')
    header.select('a[href="/coda/currents"]').addClass('target');
  else if (location.pathname === '/coda/about')
    header.select('a[href="/coda/about"]').addClass('target');

  // Mobile: toggle a dropdown menu
  let menu = dom('header .header-menu');
  menu.on('click', () => menu.toggleClass('active'));

});

