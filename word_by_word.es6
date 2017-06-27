import dom from 'dom';
import article from 'article';

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




  var texts = document.getElementsByClassName("word-by-word");
  spanify(texts);
  for (var i = 0; i<texts.length; i++){
    //right now this just does them all at once
    //need to change it so it only does them when the user views them
    addClassAtInterval(texts[i], "word", 200);
  }






});
