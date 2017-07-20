import dom from 'dom';
import article from 'article';

article.ready.then(() => {

  console.log("canvas-test working");
  var c = document.getElementById("test-canvas");
  var ctx=c.getContext("2d");
  ctx.lineWidth=3;
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(200,200);
  ctx.stroke();
});
