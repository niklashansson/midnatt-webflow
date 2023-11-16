/**
 * @description Set element height to window height
 * @param {HTMLElement} element
 * @returns {void}
 */

export function setElementToWindowHeight(element: HTMLElement): void {
  element.style.height = `${window.innerHeight}px`;
}
