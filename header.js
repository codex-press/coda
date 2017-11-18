

// hide the menu when there's a 'video-playing' message
const header = document.querySelector('body > header')
window.addEventListener('message', e => {
  if (e.data.event === 'addState' && e.data.args[0] === 'video-playing')
    header.classList.add('video-playing')
  else if (e.data.event === 'removeState' && e.data.args[0] === 'video-playing')
    header.classList.remove('video-playing')
})



// Mobile: toggle a dropdown menu
let menu = document.querySelector('header .header-menu');
menu.addEventListener('click', () => menu.classList.toggle('active'));



// updates header subtitle with a tagline for different editions

const sub = document.querySelector('body > header .header-subtitle')

export default class Header {

  constructor({ store }) {
    store.subscribe(() => this.update())
  }

  update() {
    if (location.pathname === this.pathname) return

    this.pathname = location.pathname

    const links = Array.from(header.querySelectorAll('.navigation-links a'))
    links.map(el => el.classList.remove('target'))

    // Desktop: change underline on :target link
    if (location.pathname === '/') {
      header.querySelector('.navigation-links a[href="/"]').classList.add('target');
      sub.innerHTML = "stay on the story";
      sub.href = "/about";
    }
    else if (location.pathname === '//currents') {
      header.querySelector('.navigation-links a[href="/currents"]').classList.add('target');
    }
    else if (location.pathname === '/about') {
      header.querySelector('.navigation-links a[href="/about"]').classList.add('target');
      sub.innerHTML = "About";
      sub.removeAttribute("href");
    }
    else if (location.pathname.startsWith('/lgbt-crisis') || location.pathname.startsWith('/lgbtq-crisis') || location.pathname.startsWith('/news')){
      sub.innerHTML = "LGBTQ Crisis";
      //sub.removeAttribute("href");
      sub.href="/lgbtq-crisis";
    }
    else if (location.pathname.startsWith('/migration-crisis')){
      sub.innerHTML = "Migration Crisis";
      //sub.removeAttribute("href");
      sub.href="/migration-crisis";
    }
    else if (location.pathname.startsWith('/disinformation-crisis')){
      sub.innerHTML = "Disinformation Crisis";
      //sub.removeAttribute("href");
      sub.href="/disinformation-crisis";
    }
    else if (location.pathname === '/subscribe') {
      sub.innerHTML = "Subscribe"
      sub.removeAttribute("href");
    }

  }

}
