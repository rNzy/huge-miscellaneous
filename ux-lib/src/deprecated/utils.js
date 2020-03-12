// Insert css into the dom
let cssEl;
export const loadCss = () => {
  // Check if css is already injected
  if (
    cssEl ||
    document.getElementById('uxlibcss') ||
    document.body.classList.contains('uxlibcss-css-injected')
  )
    return;
  document.body.classList.add('uxlibcss-css-injected');
  const url = document.currentScript.src.replace('bundle.js', '') + 'style.css';
  cssEl = document.createElement('link');
  cssEl.id = 'uxlibcss';
  cssEl.type = 'text/css';
  cssEl.rel = 'stylesheet';
  cssEl.href = url;
  //cssEl.media = 'print';
  cssEl.onload = () => {
    //cssEl.media = 'all';
    document.body.classList.remove('bodyhidden');
    document.body.classList.add('bodynohidden');
  };
  document.getElementsByTagName('head')[0].appendChild(cssEl);
};
