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
  var slideInterval = setInterval(nextSlide,2000);

  function nextSlide() {
      slides[currentSlide].className = 'slide';
      currentSlide = (currentSlide+1)%slides.length;
      slides[currentSlide].className = 'slide showing';
  }


});
