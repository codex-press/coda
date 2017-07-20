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
  ctx.lineTo(200,200);
  ctx.moveTo(0,200);
  ctx.lineTo(200,0);
  ctx.stroke();

//end of hard-coded canvas test-canvas

//try programmatically replacing a section with a canvas!



});
