import { queryElement } from '@finsweet/ts-utils';

import { setNavMenuToWindowHeight } from './setMenuHeight';

// elements
const banner = queryElement('.w-nav', HTMLElement);
const menu = queryElement('.w-nav-menu', HTMLElement);
const btn = queryElement('.w-nav-button', HTMLElement);

setNavMenuToWindowHeight(menu, banner);

btn?.addEventListener('click', () => {
  setNavMenuToWindowHeight(menu, banner);
});

new ResizeObserver(() => {
  setNavMenuToWindowHeight(menu, banner);
}).observe(document.body);
