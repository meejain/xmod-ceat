import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-stories-card-image';
      else div.className = 'cards-stories-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);

  // Accent-underline the first word of the section heading (e.g. "Beyond")
  const section = block.closest('.section');
  if (section) {
    const h2 = section.querySelector('h2');
    if (h2 && !h2.querySelector('.heading-accent')) {
      const text = h2.textContent;
      const spaceIdx = text.indexOf(' ');
      if (spaceIdx > 0) {
        const first = text.slice(0, spaceIdx);
        const rest = text.slice(spaceIdx);
        h2.innerHTML = `<span class="heading-accent">${first}</span>${rest}`;
      }
    }
  }
}
