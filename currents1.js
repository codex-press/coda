'use strict';
(function() {

  var dom = require('dom').default;
  var article = require('article').default;

  dom(window).bind({'mouseover .titles div' : currentsExpander});


//current expansion selector
  function currentsExpander(e) {
    //remove all other .top-expansion classes
    dom('.expansion').map(function(expansion) {
      dom(expansion).removeClass('top-expansion');
    });

    dom('.titles div').map(function(title) {
      dom(title).removeClass('selected-title');
    });

    var currentName = "";
    //get the className of the target div
    //since currentTarget doesn't seem to work, we need to check whether the
    //target div is this element or its parent or grandparent
    if (e.target.tagName == "DIV") {
      currentName = e.target.className;
    }
    else if ((e.target.tagName == "P") || (e.target.tagName == "H1")) {
      console.log(e.target.tagName);
      currentName = e.target.parentElement.className;
    }
    else if (e.target.tagName == "A") {
      currentName = e.target.parentElement.parentElement.className;
    }

    //add .top-expansion class to the current expansion
    dom('.expansion.' + currentName).addClass('top-expansion');
    //add .selected-title class to the current current title
    dom('.titles .' + currentName).addClass('selected-title');

  };

})();
