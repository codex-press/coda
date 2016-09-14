(function() {
  'use strict';

  // SHARE MENU
  var handlebars = require('handlebars');
  handlebars.registerHelper('share_menu', function(options) {

    return '<span class="share-menu">\
      <span class="icon-share"></span>\
      <span class=options>' +
        handlebars.helpers.twitter(options) +
        handlebars.helpers.facebook(options) +
        handlebars.helpers.email(options) +
      '</span>\
    </span>'
  });



  // HEADER
  var app = require('app').default;
  var dom = require('dom').default;
  var article = require('article').default;

  var header;

  article.ready().then(function() {
    header = dom('header.sitewide');

    // Desktop: change underline on :target link
    if (article.attrs.url === '/coda'){
        //console.log("test succeeded");
        header.select('.navigation-links a[href="/coda"]').addClass('target');
        //on the home page, change the subtitle to "stay on the story"
        //and have it link to the about page
        var sub = header.select('.header-subtitle')[0];
        sub.innerHTML = "stay on the story";
        sub.href = "/about";
      }
    else if (article.attrs.url === '/coda/currents')
      header.select('a[href="/coda/currents"]').addClass('target');
    else if (article.attrs.url === '/coda/about'){
      header.select('a[href="/coda/about"]').addClass('target');
       var sub = header.select('.header-subtitle')[0];
       sub.innerHTML = "About";
       sub.removeAttribute("href");
    }
    else if (article.attrs.url === '/coda/migrants'){
      var sub = header.select('.header-subtitle')[0];
      sub.innerHTML = "Migrants";
      sub.removeAttribute("href");
    }
    else if (article.attrs.url === '/coda/disinformation-age'){
      var sub = header.select('.header-subtitle')[0];
      sub.innerHTML = "Disinformation Age";
      sub.removeAttribute("href");
    }

    // Mobile: toggle a dropdown menu
    var menu = dom('header .header-menu');
    menu.bind('click', function() {
      menu.toggleClass('active');
    });

  });

})();
