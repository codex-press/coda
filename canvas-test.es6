import dom from 'dom';
import article from 'article';

article.ready.then(() => {

//The following code works with a hard-coded canvas:
  console.log("canvas-test working");
  var c = document.getElementById("test-canvas");
  var ctx=c.getContext("2d");
  ctx.lineWidth=3;
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(1200,1200);
  ctx.moveTo(0,1200);
  ctx.lineTo(1200,0);
  ctx.stroke();
//end of hard-coded canvas test-canvas

  ctx.beginPath();
  ctx.arc(600, 600, 200, 0, 0);
  ctx.stroke();


});
