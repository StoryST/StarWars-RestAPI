import { cn } from './utility.js'

export function renderPage(data) {

  function loadResource(src) {
    return fetch(src).then(res => res.json());
  };

  Promise.all(
        [Promise.all([...data.planets].map(src => loadResource(src))),
        Promise.all([...data.species].map(src => loadResource(src)))]
  ).then(([planets, species]) => {
    render(data, planets, species);
  });

  const container = cn('div', ['container', 'pt-4'], {});

  function render(data, planets, species) {
    console.log(data, planets, species);
    const title = cn('h1', ['d-flex', 'flex-column', 'text-info', 'display-1', 'pt-4', 'mb-5'], { content: data.title });
    const spanTitle = cn('span', ['display-6'], {content: `episode ${ data.episode_id }`});
    const goBack = cn('a', ['btn', 'btn-info', 'text-light', 'mb-3'], { content: `GO BACK` });
    const overview = cn('p', ['text-info', 'text-light'], { content: data.opening_crawl });
    const extraWrap = cn('div', ['col-12', 'd-flex', 'flex-row'], {});
    const planetsWrap = cn('div', ['d-flex', 'flex-column', 'col-6'], {});
    const speciesWrap = cn('div', ['d-flex', 'flex-column', 'col-6'], {});
    const planetsTitle = cn('h2', ['text-info', 'display-3', 'pt-4', 'mb-5'], { content: `Planets:` });
    const speciesTitle = cn('h2', ['text-info', 'display-3', 'pt-4', 'mb-5'], { content: `Planets:` });
    const planetsList = cn('ul', ['list-reset', 'col-4'], {});
    const speciesList = cn('ul', ['list-reset', 'col-4'], {});

    for (const planet of planets) {
      const planetItem = cn('li', ['list-group-item', 'mb-2', 'display-5'], { content: `${planet.name}` });
      planetItem.style.textShadow = '1px 1px 2px red, 0 0 1em #0000FF, 0 0 0.2em red';
      planetsList.append(planetItem);
    };

    for (const specie of species) {
      const specieItem = cn('li', ['list-group-item', 'mb-2', 'display-5'], { content: `${specie.name}` });
      specieItem.style.textShadow = '1px 1px 2px red, 0 0 1em #0000FF, 0 0 0.2em red';
      speciesList.append(specieItem);
    }

    title.style.textShadow = '1px 1px 2px red, 0 0 1em #0000FF, 0 0 0.2em red';
    spanTitle.style.textShadow = '1px 1px 2px red, 0 0 1em #0000FF, 0 0 0.2em red';
    overview.style.textShadow = '1px 1px 2px red, 0 0 1em #0000FF, 0 0 0.2em red';
    goBack.style.textShadow = '1px 1px 2px red, 0 0 1em #0000FF, 0 0 0.2em red';
    goBack.style.boxShadow = '1px 1px 2px red, 0 0 1em #0000FF, 0 0 0.2em red';
    goBack.href = '/';
    planetsTitle.style.textShadow = '1px 1px 2px red, 0 0 1em #0000FF, 0 0 0.2em red';
    speciesTitle.style.textShadow = '1px 1px 2px red, 0 0 1em #0000FF, 0 0 0.2em red';

    title.append(spanTitle);
    planetsWrap.append(planetsTitle, planetsList);
    speciesWrap.append(speciesTitle, speciesList);
    extraWrap.append(planetsWrap, speciesWrap);
    container.append(title, goBack, overview, extraWrap);
  }

  return container;
};

