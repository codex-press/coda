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
  var byline_box = dom('article').select('.byline-box');
  console.log(byline_box);
  //append two paragraphs:
  // 1. p.byline-current (with link to current)
  // 2. p.byline-edition (with link to edition)

  var byline_current = document.createElement("P");
  var t = document.createTextNode(current_name);
  byline_current.appendChild(t);

  append(byline_box, byline_current);



});
