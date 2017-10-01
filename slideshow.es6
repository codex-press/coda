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


//functions for controlling the slideshow
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


//stuff to pause the slideshow
  var playing = true;
  var pauseButton = document.getElementById('pause');

  function pauseSlideshow() {
      pauseButton.innerHTML = 'Play';
      playing = false;
      clearInterval(slideInterval);
  }

  function playSlideshow() {
      pauseButton.innerHTML = 'Pause';
      playing = true;
      slideInterval = setInterval(nextSlide,3000);
  }

  pauseButton.onclick = function() {
    if(playing) {
      pauseSlideshow();
    } else {
      playSlideshow();
    }
  };
  
  var next = document.getElementById('next');
  var previous = document.getElementById('previous');

  next.onclick = function() {
      pauseSlideshow();
      nextSlide();
  };
  previous.onclick = function() {
      pauseSlideshow();
      previousSlide();
  };




});
