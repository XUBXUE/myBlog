function setRem() {
  var rootEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    reRootFontSize = function() {
      var clientWidth = rootEl.clientWidth;
      if(!clientWidth) return;
      rootEl.style.fontSize = (clientWidth/3.75) + 'px';
    };
    if(!document.addEventListener) return;
    window.addEventListener(resizeEvt, reRootFontSize, false);
    document.addEventListener('DOMContentLoaded', reRootFontSize, false);
}

export default setRem