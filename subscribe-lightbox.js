import { article } from '/app/index.js';

function subscribePrompt() {
  function dismiss(){
    subscribeBox.classList.add("dismissed");
  }
  var subscribeBox = document.createElement("div");
  subscribeBox.className="subscribe-lightbox";
  subscribeBox.id="subscribe-lightbox";
  subscribeBox.innerHTML = `
    <form action="//codastory.us12.list-manage.com/subscribe/post?u=2917466ad5ae7d0be32196119&amp;id=610841f0e2" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
      <span id="dismiss">&times;</span>
      <h2>Subscribe <span class="font-weight-normal">to Coda Email Briefings</span></h2>
      <div class="field container" style="margin-top:.5em;">
      	<label for="mce-EMAIL" style="display:none">Email Address</label>
      	<input type="email" value="" placeholder="Email Address" name="EMAIL" class="required email" id="mce-EMAIL" size="20">

      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_2917466ad5ae7d0be32196119_610841f0e2" tabindex="-1" value=""></div>

      <input id="sub_button" type="submit" value="Subscribe" name="subscribe" class="subscribe-button" style="border:none">
      </div>

      <p>Sign up for a monthly update from Coda for news about our deployments and our latest stories.</p>
    </form>
  `
  document.documentElement.appendChild(subscribeBox);
  document.getElementById('dismiss').addEventListener('click', dismiss);
}


article.ready.then(() => {

  var prompted = false;
  var checkPrompt = function() {
    var body = document.getElementsByTagName("BODY")[0];
    var bodyHeight = body.getBoundingClientRect().height;
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    var trigger = (bodyHeight - windowHeight) * 3 / 12;
    if ( (window.pageYOffset >= trigger) && !prompted ) {
      subscribePrompt();
      prompted = true;
    }
  }



  if (!sessionStorage.getItem('firstVisit') == '1'){
    var counter = '0';
    if (localStorage.getItem('counter') != null){
      counter = localStorage.getItem('counter');
      console.log(counter + 'retrieved from local storage');
    }
    if (counter.length == 1){
      article.on('scroll', checkPrompt);
    }
    if (counter.length > 5){
      counter = '';
      console.log("counter reset");
    }
    localStorage.setItem('counter', counter + '0')
    sessionStorage.setItem('firstVisit', '1');
  }

});
