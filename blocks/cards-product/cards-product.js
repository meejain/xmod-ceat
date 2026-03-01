import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-product-card-image';
      else div.className = 'cards-product-card-body';
    });

    // Wrap entire card in a link for full-click behaviour
    const bodyLink = li.querySelector('.cards-product-card-body a');
    if (bodyLink) {
      const anchor = document.createElement('a');
      anchor.href = bodyLink.href;
      anchor.setAttribute('aria-label', bodyLink.textContent.trim());
      while (li.firstChild) anchor.append(li.firstChild);
      li.append(anchor);
    }

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);

  // Merge warranty banner (columns-promo) into the card grid
  const section = block.closest('.section');
  if (section) {
    const promoWrapper = section.querySelector('.columns-promo-wrapper');
    if (promoWrapper) {
      const promo = promoWrapper.querySelector('.columns-promo');
      if (promo) {
        const warrantyLi = document.createElement('li');
        warrantyLi.className = 'cards-product-warranty';
        warrantyLi.append(promo);
        ul.append(warrantyLi);
        promoWrapper.remove();
      }
    }

    // Accent-underline the first word of the section heading (e.g. "CEAT")
    const h1 = section.querySelector('h1');
    if (h1 && !h1.querySelector('.heading-accent')) {
      const text = h1.textContent;
      const spaceIdx = text.indexOf(' ');
      if (spaceIdx > 0) {
        const first = text.slice(0, spaceIdx);
        const rest = text.slice(spaceIdx);
        h1.innerHTML = `<span class="heading-accent">${first}</span>${rest}`;
      }
    }
  }
}
