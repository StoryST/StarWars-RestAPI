const cssPromises = {};

function loadResource(src) {
// JavaScript module
if (src.endsWith('.js')) {
  return import(src);
}
// СSS файл
if (src.endsWith('.css')) {
  if (!cssPromises[src]) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src;
    cssPromises[src] = new Promise(resolve => {
      link.addEventListener('load', () => resolve());
    });
    document.head.append(link);
  }
  return cssPromises[src];
}
// Данные с сервера
return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);

const episode = searchParams.get('episodeId');

function renderPage(moduleName, apiUrl, css, style) {
Promise.all([moduleName, apiUrl, css, style]
       .map(src => loadResource(src)))
       .then(([pageModule, data]) => {
  appContainer.innerHTML = '';
  appContainer.append(pageModule.renderPage(data));
});
}

// window.addEventListener('popstate', )
// тут вообще не понял что нужно сделать

if (episode) {
renderPage(
    './current-episode-page.js',
    `https://swapi.dev/api/films/${episode}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    '../css/current-episode.css',
  );
} else {
  renderPage(
    './episod-page.js',
    'https://swapi.dev/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    '../css/episode-page.css',
  );
}
