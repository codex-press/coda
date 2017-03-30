import article from 'article';

article.ready.then(() => {

  document.getElementById("one-time-amount").addEventListener("input", setButtonAmount);
  console.log("running js")
  function setButtonAmount(){
    console.log("Setting Button Amount");
    document.getElementById("one-time-button").value = "Donate $" + document.getElementById("one-time-amount").value;
  }
});
