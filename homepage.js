(function() {
  "use strict";

  var article = require('article').default;

  function dismiss() {
    document.getElementById("pilot_notification").classList.add("dismissed");
  }

  article.once('ready', function() {
    document.getElementById("pilot_notification").classList.add("dismissed");
  });

})();
