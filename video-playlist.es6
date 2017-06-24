'use strict';
(function() {

  var dom = require('dom').default;

  dom(window).bind({'click .playlist' : nowPlaying});
  dom(window).bind({'touchstart .playlist' : nowPlaying});

  function nowPlaying(e) {
    if (e.button==0){

    //remove all other .now-playing classes
    dom('.now-playing').map(function(nowplaying) {
      dom(nowplaying).removeClass('now-playing').addClass('playlist');
    });

    var videos = document.getElementsByTagName("VIDEO");
    for (var i = 0; i < videos.length; i++){
      videos[i].pause();
    }


    //add .now-playing class to the selected video
    var targ = e.target;
    while (targ.className != "playlist") {
      targ = targ.parentElement;
    }
    dom(targ).removeClass('playlist');
    dom(targ).addClass('now-playing');

    var targVid = targ.getElementsByTagName("VIDEO")[0];




    //create and dispatch a resize event to force reflow
    var resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);

    //start the video playing
    targVid.play();




  }
  };

})();
