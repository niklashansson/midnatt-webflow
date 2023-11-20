import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';
import { setElementToWindowHeight } from '$utils/setElementToWindowHeight';

window.Webflow?.push(() => {
  const fullHeightElements = queryElements('[full-height-element]');
  if (!fullHeightElements) return;

  fullHeightElements.forEach((el) => {
    setElementToWindowHeight(el);
    window.addEventListener('resize', () => {
      setElementToWindowHeight(el);
    });
  });
});
