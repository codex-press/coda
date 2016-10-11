import dom from 'dom';
import article from 'article';

article.ready.then(() => {
  let header = dom('header.sitewide');

  if (!header.length)
    return;

  let sub = header.first('.header-subtitle');

  // Desktop: change underline on :target link
  if (location.pathname === '/coda') {
    header.select('.navigation-links a[href="/coda"]').addClass('target');
    sub.innerHTML = "stay on the story";
    sub.href = "/about";
  }
  else if (location.pathname === '/coda/currents') {
    header.select('a[href="/coda/currents"]').addClass('target');
  }
  else if (location.pathname === '/coda/about') {
    header.select('a[href="/coda/about"]').addClass('target');
    sub.innerHTML = "About";
    sub.removeAttribute("href");
  }
  else if (location.pathname === '/coda/migrants'){
    sub.innerHTML = "Migrants";
    sub.removeAttribute("href");
  }
  else if (location.pathname === '/coda/disinformation-age'){
    sub.innerHTML = "Disinformation Age";
    sub.removeAttribute("href");
  }

  // Mobile: toggle a dropdown menu
  let menu = dom('header .header-menu');
  menu.on('click', () => menu.toggleClass('active'));

});

