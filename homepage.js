(function() {
  "use strict";

  var article = require('article').default;

  article.once('ready', function() {
    let el = document.getElementById("dismiss");
    
    el.addEventListener('click', function() {
      document.getElementById("pilot_notification").classList.add("dismissed");
    });

  });

})();
