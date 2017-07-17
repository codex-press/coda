import dom from 'dom';
import article from 'article';

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
//  document.getElementsByTagName("ARTICLE")[0].appendChild(subscribeBox); //does not work on iOS Safari
  //document.getElementsByTagName("BODY")[0].appendChild(subscribeBox);
  document.documentElement.appendChild(subscribeBox);

//  dom(window).bind({'click #dismiss' : dismiss}); //does not work on iOS Safari
  document.getElementById('dismiss').addEventListener('click', dismiss);
  //article.on('click #dismiss', dismiss); //does not work at all!
}


article.ready.then(() => {
  //console.log("testing successful, article ready");

  //console.log(document.documentElement.innerHTML);

  //calls the function to show the Subscribe Popup Prompt
  //commented out until we are go for live deployment
  /*
  if (!localStorage['subscriptionPrompted']) {
    localStorage['subscriptionPrompted'] = 'yes';
    subscribePrompt();
  }
  */

/*
  Checks to see if the page is mobile-sized or not, in case a different popup needs to be loaded
  var mq = window.matchMedia('(max-width: 529px)');
  console.log(mq);
  if(mq.matches) {
      // mobile
    //  console.log("mobile");
  } else {
      // not mobile
  //    console.log("not mobile");
  //    subscribePrompt();
  }
*/


  var prompted = false;
  var checkPrompt = function() {
    console.log("checking scroll");
    var body = document.getElementsByTagName("BODY")[0];
    console.log(body);
    console.log(body.getBoundingClientRect());
    var bodyHeight = body.getBoundingClientRect().height;
    console.log("body height is: " + bodyHeight);
    var windowHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    console.log("window height is: " + windowHeight)
    var trigger = (bodyHeight - windowHeight) * 4 / 12;
    console.log("trigger point is: " + trigger);
    console.log("window Y offset is: " + window.pageYOffset);
    if ( (window.pageYOffset >= trigger) && !prompted ) {
      subscribePrompt();
      prompted = true;
    }
  }

  console.log(document.referrer);

  if ()!(document.referrer.startsWith("https://codastory.com"))) {
    article.on('scroll', checkPrompt);
  }

//  subscribePrompt(); //comment this out to only display box on first ever visit to site



});
