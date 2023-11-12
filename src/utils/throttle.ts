/**
 * @description - Throttles a function to only execute once every x milliseconds
 * @param {any} fn - The function to throttle
 * @param {number} wait - The time to wait between executions
 * @returns {fn} - The throttled function
 */

export const throttle = (fn: any, wait: number) => {
  let lastExecuted = Date.now();
  let timeout: any = null;

  return function () {
    const now = Date.now();
    const elapsed = now - lastExecuted;

    const later = () => {
      lastExecuted = Date.now();
      timeout = null;
      fn();
    };

    if (elapsed >= wait) {
      later();
    } else if (!timeout) {
      timeout = setTimeout(later, wait - elapsed);
    }
  };
};
