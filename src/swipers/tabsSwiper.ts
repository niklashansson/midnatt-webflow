import Swiper from 'swiper';
import { Controller, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types/swiper-options';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export function createTabsSwiper() {
  const instances = queryElements('[data-element="tabs-instance"]');
  if (!instances.length) return;

  instances.forEach((instance) => {
    const menuList = queryElement('[data-element="tabs-menu-list"]', instance);
    const tabsSwiperEl = queryElement('.swiper.is-tabs', instance);
    const tabBullets = queryElements('[data-element="tab"]', instance);
    if (!menuList || !tabsSwiperEl || !tabBullets.length) return;

    const tabsBulletsMarkup = tabBullets.map((tabBullet) => tabBullet.innerHTML);
    const bulletClass = tabBullets[0].classList[0];

    const options = getSwiperOptions(menuList, tabsBulletsMarkup, bulletClass);

    new Swiper(tabsSwiperEl, options);
  });
}

function getSwiperOptions(
  paginationEl: HTMLElement,
  bulletMarkupArr: string[],
  bulletClass: string
) {
  return {
    modules: [Pagination, Controller],
    speed: 0,

    allowTouchMove: false,
    spaceBetween: 0,
    preventClicks: true,
    slidesPerView: 1,
    pagination: {
      el: paginationEl,
      clickable: true,
      bulletClass: bulletClass,
      bulletActiveClass: `${bulletClass}-active`,
      renderBullet: function (index: number, className: string) {
        return `<div class="${className}">${bulletMarkupArr[index]}</div>`;
      },
    },
  } as SwiperOptions;
}
