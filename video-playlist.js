import { dom, article } from '/app/index.js'

article.ready.then(() => {
//posters: "video id", "poster id"

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
    [ "9492aa30-0f13-4613-e9e8-78111c8d580a",
        "8b863508-87c0-44a7-932b-1c114dbf7dfd" ],
      // jailed for a like ep 5.
    [ "4348f100-d798-47e9-c676-04533c9c7c44",
        "d689a425-222f-45bd-9056-adf520d5888c" ],
      // jailed for a like ep 6. 
    [ "ecf1c2d4-a7e1-4e4d-a05e-4ac122715f88", 
        "0a58c5ce-7cd2-409c-83db-bba06cb6be79" ], 
      // russia/dagestan
    [ "161e5ee8-625f-46c0-ecff-6dd658a68fc2",
        "55eec69a-6fde-4936-9a75-364db69314f0" ],
      // bianca
    [ "49bc75a7-09d9-4eb9-9963-269a8bb3f870",
        "aa02501c-0e4e-40bb-8396-fce6d1cbb577" ],
      // bart
    [ "30ebf290-3778-47e5-da71-49baf88e7aa5",
        "f52e391a-6756-40e5-8318-52c7c96aa973" ],
      // terror in central asia
    [ "d12baa96-4ab0-4c30-c9de-690b6ba24c0e",
        "5d5ef281-3fb9-45e3-b63d-668ce5361c34" ],
      // russia north korea fashion
    [ "eade569f-0030-4112-a044-8c4ae28b6d28",
        "b5d65f62-c467-4e40-bb82-ea939209a0cd"],
      //Ivan Terrible Terrific
    [ "080116a9-2129-42c9-faa7-f2b0188b7a5b",
        "eed2d151-d70b-4abf-be77-e4b1d9995371"],
      //In St. Petersburg
    [ "06815230-2488-4c37-f251-36a0beb63de3",
        "a79de17b-a2b0-449c-840c-520d6d9a3a3f"],
      //War of Words
    [ "66752b0d-f194-4460-e91d-7fa4e346fd65",
        "eb69930c-2d1b-4ea3-a3d5-2ad4ca63bcde"],
      //Murder in St. Petersburg
    [ "a1a68b0f-e3ab-4650-ff0e-91de46a80688",
        "b8e5439f-93bb-4a2f-a1df-f3b10127a3c1"],
      //How Russia Weaponized Primetime
    [ "3d5eed7f-0564-4f9a-a3fa-fe9c2adbc108",
        "ebb85b99-f20e-44c8-b9aa-ca994433235b"],
        // russia north korea fashion for main video page
    [ "0656582a-d717-4cb4-a653-b7b712f67b9b",
        "b5d65f62-c467-4e40-bb82-ea939209a0cd"]


  ]

  const replacePoster = (videoID, imageID) => {
    let plugin = article.plugins.find(([el, p]) => p.props.id == videoID)
    if (!plugin) return
    plugin = plugin[1]
    plugin.props.media.srcset = plugin.props.media.srcset.filter(s =>
      s.type !== 'image'
    )
    plugin.props.media.srcset.push({
      url: `/images/${ imageID }/i500.jpg`,
      type: "image",
      width: 500,
    })
    const poster = dom.first(`[x-cp-id="${ videoID }"] .poster`)
    if (!poster) return
    poster.srcset = ''
    poster.src = `https://usercontent.codex.press/images/${ imageID }/i500.jpg`;
  }

  posters.map(([videoID, imageID]) => replacePoster(videoID, imageID));

})




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
