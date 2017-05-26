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
//    targVid.play();

    //create and dispatch a resize event to force reflow
    var resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);

//scroll window to coordinates of targVid
    var rect = targVid.getBoundingClientRect();
    console.log(rect.left, rect.top);
    setTimeout(function(){ window.scrollTo(rect.left, rect.top); }, 800);
    //window.scrollTo(rect.top, rect.right);
    targVid.play();


    //window.scrollTo(0,0);
//    setTimeout(function(){ window.scrollTo(0,0); }, 500);
  //  setTimeout(window.scrollBy(0, -10000), 300);
    //window.scrollTo(0,0);
  //  console.log("scrolling?");
    //setTimeout(function(){ targVid.play(); }, 5000);

  }
  };

})();
