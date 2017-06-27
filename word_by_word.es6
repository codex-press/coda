import dom from 'dom';
import article from 'article';

article.ready.then(() => {

  console.log("opening word-by-word");


  var addSpans = function(words){
    var line = "";
    var spanBegin = "<span>";
    var spanEnd = " </span>"
    for (var i = 0; i < words.length; i++) {
      line = line + spanBegin + words[i] + spanEnd;
    }
    return line;
  }

  var spanify = function(texts){
    for (var i = 0; i<texts.length; i++) {
      var split = texts[i].innerHTML.split(" ");
      var spanned = addSpans(split);
      texts[i].innerHTML = spanned;
    }
  }


  var texts = document.getElementsByClassName("word-by-word");
  spanify(texts);


  //function animateChildren (what is it actually doing?)
  //precondition: given an element with some number of children
  //to do: animate children of the element by adding a CSS animation class to each one in sequence
  //function addClassInSequence
  //input: takes an element with some children, a class name, and an interval
  //output: addes a class to each child element at the interval

  var addClass = function(element, className) {
    element.classList.add(className);
  }

  var addClassAtInterval = function(element, className, interval) {
    var children = element.children;
    for (var i = 0; i<children.length; i++) {
      setTimeout(addClass, interval * i, children[i], className);
      }
  }

  for (var i = 0; i<texts.length; i++){
    addClassAtInterval(texts[i], "word", 300);
  }





});
