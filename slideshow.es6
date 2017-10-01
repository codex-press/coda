/*
slideshow courtesy of https://www.sitepoint.com/make-a-simple-javascript-slideshow-without-jquery/
*/

import dom from 'dom';
import article from 'article';

article.ready.then(() => {

//The following code works with a hard-coded canvas:
  console.log("slideshow test working");

  var slides = document.querySelectorAll('.slideshow .slide');
  var currentSlide = 0;
  var slideInterval = setInterval(nextSlide,3000);

//absolutely position the slides
  function positionSlides(){
    for (var i=0; i<slides.length; i++){
        slides[i].style.position="absolute";
    }
  }
  positionSlides();
  window.addEventListener("resize", positionSlides);

  function nextSlide() {
      goToSlide(currentSlide+1);
  }

  function previousSlide() {
      goToSlide(currentSlide-1);
  }

  function goToSlide(n) {
      slides[currentSlide].className = 'slide';
      currentSlide = (n+slides.length)%slides.length;
      slides[currentSlide].className = 'slide showing';
  }


});
