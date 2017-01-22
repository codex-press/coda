import dom from 'dom';
import article from 'article';

article.ready.then(() => {
  //console.log("testing successful, article ready");

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
  else if (location.pathname.startsWith('/coda/lgbt-crisis')){
    sub.innerHTML = "LGBTQ Crisis";
    //sub.removeAttribute("href");
    sub.href="/lgbtq-crisis";
  }
  else if (location.pathname.startsWith('/coda/migration-crisis')){
    sub.innerHTML = "Migration Crisis";
    //sub.removeAttribute("href");
    sub.href="/migration-crisis";
  }
  else if (location.pathname.startsWith('/coda/disinformation-crisis')){
    sub.innerHTML = "Disinformation Crisis";
    //sub.removeAttribute("href");
    sub.href="/disinformation-crisis";
  }
  else if (location.pathname === '/coda/subscribe') {
    sub.innerHTML = "Subscribe"
    sub.removeAttribute("href");
  }

  // Mobile: toggle a dropdown menu
  let menu = dom('header .header-menu');
  menu.on('click', () => menu.toggleClass('active'));

});
