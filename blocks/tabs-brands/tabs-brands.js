import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  const tablist = document.createElement('div');
  tablist.className = 'tabs-brands-list';
  tablist.setAttribute('role', 'tablist');

  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-brands-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    /* Build brand list from links inside the panel */
    const links = [...tabpanel.querySelectorAll('a')];
    if (links.length) {
      const brandList = document.createElement('div');
      brandList.className = 'tabs-brands-brand-list';
      links.forEach((a) => {
        const item = document.createElement('div');
        item.className = 'tabs-brands-brand-item';
        const link = document.createElement('a');
        link.href = a.href;
        link.textContent = a.textContent.trim();
        item.append(link);
        brandList.append(item);
      });
      tabpanel.append(brandList);
    }

    const button = document.createElement('button');
    button.className = 'tabs-brands-tab';
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
  });

  block.prepend(tablist);

  /* Accent-underline first word of section heading */
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
