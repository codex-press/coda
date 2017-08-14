import article from 'article'
import dom from 'dom'

article.ready.then(() => {

  const posters = [
    // jailed for a like Ep. 1
    ["4823427a-6640-4544-b2f4-ed7ef412dabd",
      "76e7dcd1-a088-4ddf-b848-ea580fb0d2bf" ],
    // jailed for a like Ep. 2
    [ "db3f1900-5dee-44f1-9974-abbf2106c52b",
        "4f8bed93-800e-4e8a-ad48-8d2e6639b959" ],
    // jailed for a like Ep. 3
    [ "8bf82006-0097-4a1e-abee-215937d5fa6c",
        "e63d27d0-97f4-4e5c-a12f-750a432dafd2" ],
    // jailed for a like Ep. 4
    [ "aad9af70-1525-423e-ecea-f631547695c5",
        "8b863508-87c0-44a7-932b-1c114dbf7dfd" ],
      // jailed for a like ep 5. 
      // doesnt exist yet
      // "d689a425-222f-45bd-9056-adf520d5888c"
  ]

  const replacePoster = (videoID, imageID) => {
    let el = dom.first(`[x-cp-id="${ videoID }"] .poster`)
    if (!el) return
    el.srcset = ''
    el.src = `https://usercontent.codex.press/images/${ imageID }/i1000.jpg`;
  }

  posters.map(([videoID, imageID]) => replacePoster(videoID, imageID));

})



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
