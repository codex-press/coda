
const header = document.querySelector('body > header')
window.addEventListener('message', e => {
  if (e.data.event === 'addState' && e.data.args[0] === 'video-playing')
    header.classList.add('video-playing')
  else if (e.data.event === 'removeState' && e.data.args[0] === 'video-playing')
    header.classList.remove('video-playing')
})

