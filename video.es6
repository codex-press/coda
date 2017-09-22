import dom from 'dom';
import * as env from 'env';
import article from 'article';



article.ready.then(() => {
//***Insert Tim's video cover code here

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
    [ "14bc4ab4-e7c8-4c2d-9213-e67a54532b60",
      "d689a425-222f-45bd-9056-adf520d5888c" ],
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
      url: `/images/${ imageID }/i1000.jpg`,
      type: "image",
      width: 1000,
    })
    const poster = dom.first(`[x-cp-id="${ videoID }"] .poster`)
    if (!poster) return
    poster.srcset = ''
    poster.src = `https://usercontent.codex.press/images/${ imageID }/i1000.jpg`;
  }

  posters.map(([videoID, imageID]) => replacePoster(videoID, imageID));

// ***End of Tim's video cover code


  if (env.topOrigin !== 'https://codastory.com')
    return;

  var edition_names = {
    "lgbtq-crisis" : "LGBTQ Crisis",
    "disinformation-crisis" : "Disinformation Crisis",
    "migration-crisis" : "Migration Crisis"
  };

  var current_names = {
    "kremlin-influence" : "Kremlin Influence",
    "orthodox-church" : "Orthodox Church",
    "east-west-divide" : "East-West Divide",
    "information-war" : "Information War",
    "rights-abuses" : "Rights Abuses",
    "traditional-values" : "Traditional Values",
    "foreign-proxies" : "Foreign Proxies",
    "armed-conflict" : "Armed Conflict",
    "fear-and-loathing" : "Fear and Loathing",
    "geopolitical-ruptures" : "Geopolitical Ruptures",
    "integration-issues" : "Integration Issues",
    "news" : "News"
  };


  //testing
  //console.log("test 1");
  //console.log(article.attrs.metadata.current);

  //first: identify edition and current. convert them to regular text and insert them into byline-box
  //console.log(location.pathname + " " + article.attrs.url);
  var path_array = article.attrs.url.split('/');
  var edition_url;
  var edition_name;
  var current_url;
  var current_name;
  if (path_array.length == 5){
    edition_url = path_array[2];
    edition_name = edition_names[edition_url];
    current_url = path_array[3];
    current_name = current_names[current_url];

  }
  else if (path_array.length == 4){
    edition_url = path_array[2];
    if (edition_url == "lgbt-crisis") edition_url = "lgbtq-crisis";
    edition_name = edition_names[edition_url];
    current_name = article.attrs.metadata.current;
    for (var url in current_names){
      if (current_names[url] == current_name) {
        current_url = url;
      }
    }
  }

  //select the byline box
  var byline_boxes = document.getElementsByClassName("byline-box");
  if (byline_boxes.length != 0) {
    var byline_box = byline_boxes[0];

    var byline_current = document.createElement("P");
    byline_current.className = "byline-current";
    var current_link = document.createElement("A");
    current_link.setAttribute("href", edition_url + "/" + current_url);
    var current_name_node = document.createTextNode(current_name);
    byline_current.appendChild(current_link);
    current_link.appendChild(current_name_node);

    var byline_edition = document.createElement("P");
    byline_edition.className = "byline-edition";
    var edition_link = document.createElement("A");
    edition_link.setAttribute("href", edition_url);
    var edition_name_node = document.createTextNode(edition_name);
    byline_edition.appendChild(edition_link)
    edition_link.appendChild(edition_name_node);

    if (byline_box.lastElementChild.className == "byline-share") {
      byline_box.insertBefore(byline_current, byline_box.lastElementChild);
      byline_box.insertBefore(byline_edition, byline_box.lastElementChild);
    }
    else {
      byline_box.appendChild(byline_current);
      byline_box.appendChild(byline_edition);
    }
  }




  //select the footer logo

  var footer_logos = document.getElementsByClassName("footer-logo");

  if (footer_logos.length != 0) {
    var footer_logo = footer_logos[0];

    //append two paragraphs:
    // 1. p.byline-current (with link to current)
    // 2. p.byline-edition (with link to edition)

    var footer_current = document.createElement("P");
    footer_current.className = "footer-current " + current_url;
    if ((current_url == "information-war") && (edition_url == "disinformation-crisis")) {
      footer_current.className = "footer-current " + current_url + "-1";
    }
    var current_link = document.createElement("A");
    current_link.setAttribute("href", edition_url + "/" + current_url);
    var current_name_node = document.createTextNode(current_name);
    if (current_url == "news"){
      current_name_node.textContent = edition_name + " News";
    }

    footer_current.appendChild(current_link);
    current_link.appendChild(current_name_node);

    var footer_edition = document.createElement("P");
    footer_edition.className = "footer-edition " + edition_url;
    var edition_link = document.createElement("A");
    edition_link.setAttribute("href", edition_url);
    var edition_name_node = document.createTextNode(edition_name);
    footer_edition.appendChild(edition_link)
    edition_link.appendChild(edition_name_node);

    footer_logo.appendChild(footer_current);
    footer_logo.appendChild(footer_edition);
  }




  //nav footer
  //get previous and next article data
  var article_index = article.attrs.index;
  var prev;
  var next;
  for (var i=0; i<article_index.length; i++){
    if (article.attrs.url == article_index[i].url){
      //console.log("found article " + article_index[i].title);
      prev = i-1;
      next = i+1;
    }
  }

  var prev_html;
  var next_html;

  //need to check for edge cases.
  //if prev < 0 we need to replace div.previous with "back to current"
  //if next > length we need to replace div.next with "back to current"
  //
  if (prev <= 0) {
    prev_html = `
      <div class="previous-article">
        <p>
          <a href="/${edition_url}/${current_url}">
            <span class="nav-arrow">&larr;</span>
            <span class="nav-text">Previous<span class="nav-sep">:</span></span>
            <span class="nav-title">${current_name}</span>
          </a>
        </p>
      </div>
    `;
  }
  else {
    prev_html = `
      <div class="previous-article">
        <p>
          <a href="${article_index[prev].url.slice(5)}">
            <span class="nav-arrow">&larr;</span>
            <span class="nav-text">Previous<span class="nav-sep">:</span></span>
            <span class="nav-title">${article_index[prev].title}</span>
          </a>
        </p>
      </div>
    `;
  }
  //console.log(prev_html);

  if (next >= article_index.length) {
    next_html = `
      <div class="next-article">
        <p>
          <a href="/${edition_url}/${current_url}">
            <span class="nav-arrow">&rarr;</span>
            <span class="nav-text">Next</span><span class="nav-sep">:</span>
            <span class="nav-title">${current_name}</span>
          </a>
        </p>
      </div>
    `;
  }
  else {
    next_html = `
      <div class="next-article">
        <p>
          <a href="${article_index[next].url.slice(5)}">
            <span class="nav-arrow">&rarr;</span>
            <span class="nav-text">Next</span><span class="nav-sep">:</span>
            <span class="nav-title">${article_index[next].title}</span>
          </a>
        </p>
      </div>
    `;
  }
  //console.log(next_html);

  var curr_html = `
    <div class="current-article">
      <p><span class="now">Now Reading:</span> ${article.attrs.title}</p>
    </div>
  `
  //in <a href="/${edition_url}/${current_url}">${current_name}</a>


  //create nav
  var nav_footer = document.createElement("NAV");
  nav_footer.innerHTML = `
    <h1 class="current-current"><span class="in">Current:</span> <a href="/${edition_url}/${current_url}">${current_name}</a></h1>
    ${prev_html}
    ${curr_html}
    ${next_html}

  `

  //nav_footer.className = "moving";
  //append nav to end of article
  document.getElementsByTagName("ARTICLE")[0].appendChild(nav_footer);






});
