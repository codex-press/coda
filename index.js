var handlebars = require('handlebars');


handlebars.registerHelper('share_menu', function(options) {

  return '<span class="share-menu toggle button">\
    <span class="icon-share"></span>\
    <span class=options>' +
      handlebars.helpers.twitter(options) +
      handlebars.helpers.facebook(options) +
      handlebars.helpers.email(options) +
    '</span>\
  </span>'
});


// // import {compile, unscopeLinks}  from './template_helpers.es6';
// // import {log, constrain, alphanum} from './utility.es6';
// // import player     from './player.es6';
// // import dom        from './dom.es6';
// // import animate    from './easing.es6';

// var init = function init() {

//   player.on('navigate', updateHeader);

//   player.on('video:play', v => {
//     siteChrome.find('header').transform({y: '-100%'});
//   });

//   player.on('video:pause', v => {
//     siteChrome.find('header').transform({y: ''});
//   });

// };


// var updateHeader = function updateHeader(article) {
//   siteChrome.select('header a.target').removeClass('target');

//   if (article.attrs.url === '/coda')
//     siteChrome.find('.navigation-links a[href="/coda"]').addClass('target');
//   else if (article.attrs.url === '/coda/currents')
//     siteChrome.find('a[href="/coda/currents"]').addClass('target');
//   else if (article.attrs.url === '/coda/about')
//     siteChrome.find('a[href="/coda/about"]').addClass('target');
// };

