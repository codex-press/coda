(function() {
  "use strict";

  var article = require('article').default;

  article.once('ready', function() {
    var el = document.getElementById("dismiss");
    
    el.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById("pilot_notification").classList.add("dismissed");
    });

  });

})();
