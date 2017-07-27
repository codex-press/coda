import dom from 'dom';
import article from 'article';

article.ready.then(() => {
  console.log("beginning of script");
  var displaySmall = function() {
    console.log("hello");
    document.getElementById("large-text").className = "hidden-text";
    document.getElementById("medium-text").className = "hidden-text";
    document.getElementById("small-text").className = "active-text";
    document.getElementById("large-price").setAttribute("class", "inactive-price");
    document.getElementById("medium-price").setAttribute("class", "inactive-price");
    document.getElementById("small-price").setAttribute("class", "active-price");
  };
  var displayMedium = function() {
    console.log("hello");
    document.getElementById("large-text").className = "hidden-text";
    document.getElementById("medium-text").className = "active-text";
    document.getElementById("small-text").className = "hidden-text";
    document.getElementById("large-price").setAttribute("class", "inactive-price");
    document.getElementById("medium-price").setAttribute("class", "active-price");
    document.getElementById("small-price").setAttribute("class", "inactive-price");
  };
  var displayLarge = function() {
    console.log("hello");
    document.getElementById("large-text").className = "active-text";
    document.getElementById("medium-text").className = "hidden-text";
    document.getElementById("small-text").className = "hidden-text";
    document.getElementById("large-price").setAttribute("class", "active-price");
    document.getElementById("medium-price").setAttribute("class", "inactive-price");
    document.getElementById("small-price").setAttribute("class", "inactive-price");
  };
  console.log("function declared");
  document.getElementById("small-sector-path").addEventListener("click", displaySmall);
  document.getElementById("medium-sector-path").addEventListener("click", displayMedium);
  document.getElementById("large-sector-path").addEventListener("click", displayLarge);
})
