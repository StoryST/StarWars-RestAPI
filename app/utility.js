export function cn(
    container = 'div',
    cls = [],
    {
      id = '',
      atr = {},
      content = '',
      href,
    }
) {

  const el = document.createElement(container);
  el.classList.add(...cls);
  if (id !== '') {
    el.id = id;
  }
  Object.keys(atr).map((key) => {
    el.setAttribute(key, atr[key]);
  });
  el.textContent = content;

  return el;
};
