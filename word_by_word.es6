import dom from 'dom';
import article from 'article';
import Plugin from 'plugin';


article.ready.then(() => {

//input: an array of words
//output: a string with each of those words in its own span
  var addSpans = function(words){
    var line = "";
    var spanBegin = "<span>";
    var spanEnd = " </span>"
    for (var i = 0; i < words.length; i++) {
      line = line + spanBegin + words[i] + spanEnd;
    }
    return line;
  }

//takes an element and puts all of its words into spans.  Leaves other elements alone.
  var spanify = function(texts){
    var result = "";
    for (var i = 0; i<texts.length; i++) {
      //here, instead of splitting the innerHTML, I should split + spanify all text nodes
      //var split = texts[i].innerHTML.split(" ");
      //var spanned = addSpans(split);
      var nodes = texts[i].childNodes;
      for (var j = 0; j < nodes.length; j++) {
        if (nodes[j].nodeType == 3) {
          var split = nodes[j].nodeValue.trim().split(" ");
          var spanned = addSpans(split);
          result += spanned;
        }
        else {
          result += nodes[j].outerHTML;
        }
      }
      texts[i].innerHTML = result;
      result = "";
    }
  }


  var addClass = function(element, className) {
    element.classList.add(className);
  }

  //function addClassAtInterval
  //input: takes an element, a class name, and an interval
  //output: addes a class to each child element at the interval
  var addClassAtInterval = function(element, className, interval) {
    var children = element.children;
    for (var i = 0; i<children.length; i++) {
      setTimeout(addClass, interval * i, children[i], className);
      }
  }

  var isInViewport = function(element){
    var rect = element.getBoundingClientRect();
//this section copied from https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
    //return true;
  }



  var texts = document.getElementsByClassName("word-by-word");
  spanify(texts);
  var runAnimations = function(){
    for (var i = 0; i<texts.length; i++){
      //right now this just does them all at once
      //need to change it so it only does them when the user views them
      //I think I can just bind it to an "onscreen" even per Codex
      //but how!
      if (isInViewport(texts[i]))
      {
        addClassAtInterval(texts[i], "word", 100);
      }
    }
  }

  dom(window).bind({'scroll' : runAnimations});

  var animate = function(e){
    console.log("animating");
  //  addClassAtInterval(dom(e.target).closest('.word-by-word'), "word", 200);
  }


//  dom(window).bind({'click .word-by-word' : animate}); //works
//  dom(window).bind({'onscreen .word-by-word' : animate}); //does not work!
  //dom(window).bind({'scroll' : animate}); //works! Just have to write a function to check for animated elements

});