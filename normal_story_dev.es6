import dom from 'dom';
import article from 'article';




article.ready.then(() => {

  var edition_names = {
    "lgbtq-crisis" : "LGBTQ Crisis",
    "disinformation-age" : "Disinformation Age",
    "migrants" : "Migrants"
  };
/*
  var current_names = {
    kremlin-influence : "Kremlin Influence",
    orthodox-church : "Orthodox Church",
    east-west-divide : "East-West Divide",
    information-war : "Information War",
    rights-abuses : "Rights Abuses"
  };
*/

  console.log("dev testing successful, article ready");
  console.log("testing 2");
  console.log(article.attrs);


  //first: identify edition and current. convert them to regular text and insert them into byline-box
  console.log(location.pathname + " " + article.attrs.url);
  var path_array = article.attrs.url.split('/');
  console.log(path_array);
  if (path_array.length == 5){
    console.log("edition is "+ edition_names[path_array[2]]);
    console.log("current is "+ path_array[3]);
  }

  console.log(edition_names);

});
