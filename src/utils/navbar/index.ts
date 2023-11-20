import '../../styles/navbar.css';

import { queryElement } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

window.Webflow?.push(() => {
  //  webflow elements
  const elements = ['', '-menu', '-button', '-brand'].map((elClass) => {
    return queryElement(`.w-nav${elClass}`, HTMLElement);
  });

  const [nav, menu, btn, brand] = elements;
  const body = queryElement('body', HTMLBodyElement);
  if (!nav || !menu || !btn || !brand || !body) return;

  const colorMode = body.getAttribute('section-mode');
  const bg = colorMode === '2' ? '#1c1c1c' : 'white';

  // states
  let isMinimized = false;
  let isOpen = false;

  // set full menu height on page load
  setFullMenuHeight();

  // set full menu height when window resizes
  window.addEventListener('resize', () => {
    setFullMenuHeight();
  });

  // opened / closed menu
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-nav-menu-open') {
        if (menu.hasAttribute('data-nav-menu-open')) {
          openNavbar();

          isOpen = true;
        } else {
          closeNavbar();

          isOpen = false;

          setFullMenuHeight();
        }
      }
    });
  }).observe(menu, { attributes: true });

  const heroSection = queryElement('[nav-intersect="true"]', HTMLElement);
  if (!heroSection) return;

  new IntersectionObserver(
    ([IntersectionObserver]) => {
      const { isIntersecting } = IntersectionObserver;

      !isIntersecting ? (isMinimized = true) : (isMinimized = false);

      isMinimized && minimizeNavbar(false, bg);

      !isMinimized && minimizeNavbar(true, `${bg}00`);
    },
    { threshold: 0.5 }
  ).observe(heroSection);

  function minimizeNavbar(reverse = false, backgroundColor = bg) {
    if (!brand || !nav || !btn) return;
    const tl = gsap.timeline();

    if (reverse) {
      tl.to(brand, { width: '7rem' });
      tl.to(
        nav,
        {
          paddingTop: '3rem',
          paddingBottom: '1.75rem',
          background: backgroundColor,
        },
        '<'
      );
      tl.to(btn, { fontSize: '1.5rem' }, '<');
    }
    if (!reverse) {
      tl.to(brand, { width: '5rem' });
      tl.to(
        nav,
        {
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          background: backgroundColor,
        },
        '<'
      );
      tl.to(btn, { fontSize: '1.125rem' }, '<');
    }
  }

  function openNavbar() {
    if (!nav) return;
    const tl = gsap.timeline();

    if (isMinimized) {
      minimizeNavbar(true);
    }
    setTimeout(() => {
      setFullMenuHeight();
    }, 500);
    tl.to(nav, { backgroundColor: bg, duration: 0 });
  }

  function closeNavbar() {
    if (!nav || !menu || !brand || !btn) return;

    const tl = gsap.timeline();
    if (isMinimized) {
      minimizeNavbar();
    }

    if (!isMinimized) {
      tl.to(nav, { backgroundColor: `${bg}00`, duration: 0 }, '<');
    }

    setFullMenuHeight();
  }

  function setFullMenuHeight() {
    if (!menu || !nav) return;
    menu.style.height = `${window.innerHeight - nav.offsetHeight}px`;
  }
});
