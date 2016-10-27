import dom from 'dom';
import article from 'article';



article.ready.then(() => {

  var edition_names = {
    "lgbtq-crisis" : "LGBTQ Crisis",
    "disinformation-age" : "Disinformation Age",
    "migrants" : "Migrants"
  };

  var current_names = {
    "kremlin-influence" : "Kremlin Influence",
    "orthodox-church" : "Orthodox Church",
    "east-west-divide" : "East-West Divide",
    "information-war" : "Information War",
    "rights-abuses" : "Rights Abuses"
  };


  console.log("dev testing successful, article ready");
  console.log("testing 2");
  console.log(article.attrs);


  //first: identify edition and current. convert them to regular text and insert them into byline-box
  console.log(location.pathname + " " + article.attrs.url);
  var path_array = article.attrs.url.split('/');
  console.log(path_array);
  var edition_url;
  var edition_name;
  var current_url;
  var current_name;
  if (path_array.length == 5){
    edition_url = path_array[2];
    edition_name = edition_names[edition_url];
    current_url = path_array[3];
    current_name = current_names[current_url];

    console.log("edition is "+ edition_name);
    console.log("current is "+ current_name);
  }

//  console.log(edition_names);

  //now: select (or first?) byline-box (how to select a class?)
  //var byline_box = dom('article').select('.byline-box');
  var byline_box = document.getElementsByClassName("byline-box")[0];
  console.log(byline_box);
  //append two paragraphs:
  // 1. p.byline-current (with link to current)
  // 2. p.byline-edition (with link to edition)

  var byline_current = document.createElement("A");
  byline_current.className = "byline-current";
  byline_current.setAttribute("href", "/coda/" + edition_url + "/" + current_url);
  console.log("testing 2 3 4");
  var current_name_node = document.createTextNode(current_name);
  byline_current.appendChild(current_name_node);
  byline_box.appendChild(byline_current);

  var byline_edition = document.createElement("A");
  byline_edition.className = "byline-edition";
  console.log("testing 2 3 4");
  var edition_name_node = document.createTextNode(edition_name);
  byline_edition.appendChild(edition_name_node);
  byline_box.appendChild(byline_edition);


});
