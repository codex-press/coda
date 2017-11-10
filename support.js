import { article } from '/app/index.js';

article.ready.then(() => {

  //document.getElementById("one-time-amount").addEventListener("input", setButtonAmount);

  function setButtonAmount(){

    document.getElementById("one-time-button").value = "Donate $" + document.getElementById("one-time-amount").value;
  }
});
