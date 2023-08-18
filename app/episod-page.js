import { cn } from './utility.js'

export function renderPage(data) {

  const container = cn('div', ['container', 'pt-4'], {});
  const title = cn('h1', ['text-info', 'display-1', 'py-4', 'mb-5'], { content: 'Movie guide' });
  const list = cn('ul', ['list-group', 'd-flex', 'flex-column', 'col-4', 'justify-content-start'], {});

  title.style.textShadow = '1px 1px 2px red, 0 0 1em #0000FF, 0 0 0.2em red';

  for (const result of data.results) {
    const listItem = cn('li', ['list-group-item', 'mb-2', 'bg-black'], {});
    const itemLink = cn('a', ['list-group-item-action', 'link-light', 'link-offset-2',
                        'link-underline-opacity-0', 'bg-black', 'fs-5'], { content: result.title });

    const hrefParam = result.url.split('/');
    itemLink.href = `?episodeId=${hrefParam.at(-2)}`;

// itemLink.addEventListener('click', (ev) => {
//   ev.preventDefault();
//   history.pushState(null, '', itemLink.href);
// тоже не понимаю как это реализовать, сюда я должен импортировать или передать функцию рендера страницы с подробным описанием?
// })

    listItem.append(itemLink);
    list.append(listItem);
  }
  container.append(title, list);

  return container
}
