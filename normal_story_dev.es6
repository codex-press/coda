import dom from 'dom';
import article from 'article';

article.ready.then(() => {
  console.log("dev testing successful, article ready");
  console.log("testing 2");
  console.log(article.attrs);


  //first: identify edition and current. convert them to regular text and insert them into byline-box
  console.log(location.pathname + " " + article.attrs.url);
  var path_array = article.attrs.url.split('/');
  if (path_array.length == 4){
    console.log("edition is "+ path_array[1]);
    console.log("current is "+ path_array[2]);
  }

});
