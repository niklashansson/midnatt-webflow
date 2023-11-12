/**
 *
 * @param {HTMLMenuElement} menu - The navbar menu element that will fill the height of the window
 * @param {HTMLDivElement} banner - The navbar banner element that will be subtracted from the window height to set the menu height
 * @returns - nothing
 */
export const setNavMenuToWindowHeight = (
  menu: HTMLElement | undefined,
  banner: HTMLElement | undefined
) => {
  if (!menu || !banner) throw new Error('Undefined menu and banner elements');
  menu.style.height = `${window.innerHeight - banner.clientHeight}px`;
};
