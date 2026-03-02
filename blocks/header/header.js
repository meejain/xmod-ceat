import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/* ── SVG Icons ── */
const ICONS = {
  tyreshop: '<svg viewBox="0 0 20 20" width="18" height="18"><path d="M10 1a5 5 0 0 0-5 5v2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-2V6a5 5 0 0 0-5-5zm-3 5a3 3 0 1 1 6 0v2H7V6zm3 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#333"/></svg>',
  cart: '<svg viewBox="0 0 20 20" width="18" height="18"><path d="M6 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1 1h3l.4 2H19l-3 9H6L3.5 3H1zm4.4 4l1.5 5h8.2l2-5H5.4z" fill="#333"/></svg>',
  callback: '<svg viewBox="0 0 20 20" width="18" height="18"><path d="M5.52 8.66a11.3 11.3 0 0 0 4.95 4.95l1.65-1.65a.75.75 0 0 1 .76-.18 8.6 8.6 0 0 0 2.69.43.75.75 0 0 1 .75.75V16a.75.75 0 0 1-.75.75A12.75 12.75 0 0 1 2.82 4.07a.75.75 0 0 1 .75-.75h3.04a.75.75 0 0 1 .75.75c0 .94.15 1.84.43 2.69a.75.75 0 0 1-.19.76L5.52 8.66z" fill="#333"/></svg>',
  hamburger: '<svg viewBox="0 0 24 18" width="22" height="16"><path d="M0 0h24v2H0zM0 8h24v2H0zM0 16h24v2H0z" fill="#333"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#333"/></svg>',
  chevron: '<svg viewBox="0 0 12 8" width="11" height="8"><path d="M1.41.59L6 5.17 10.59.59 12 2 6 8 0 2z" fill="#666"/></svg>',
  chevronRight: '<svg viewBox="0 0 8 12" width="8" height="12"><path d="M.59 10.59L5.17 6 .59 1.41 2 0l6 6-6 6z" fill="#f5822d"/></svg>',
  chevronRightGrey: '<svg viewBox="0 0 8 12" width="7" height="10"><path d="M.59 10.59L5.17 6 .59 1.41 2 0l6 6-6 6z" fill="#ccc"/></svg>',
  askAi: '<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="11" fill="none" stroke="#f5822d" stroke-width="1.5"/><path d="M12 7v0a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" fill="none" stroke="#f5822d" stroke-width="1.5"/><path d="M8 11a4 4 0 0 0 8 0M12 15v2" fill="none" stroke="#f5822d" stroke-width="1.5" stroke-linecap="round"/></svg>',
};

/* ── Category icons for megamenu headings ── */
const CATEGORY_ICONS = {
  car: '<svg viewBox="0 0 51 22" width="36" height="18"><path d="M44.5 8.5h-4l-5-6h-18l-5 6h-6a4 4 0 0 0-4 4v4h2a4 4 0 0 0 8 0h18a4 4 0 0 0 8 0h2v-4a4 4 0 0 0-4-4zM8.5 18.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm30 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="none" stroke="#f5822d" stroke-width="1.5"/></svg>',
  bike: '<svg viewBox="0 0 51 22" width="36" height="18"><circle cx="10" cy="16" r="5" fill="none" stroke="#f5822d" stroke-width="1.5"/><circle cx="40" cy="16" r="5" fill="none" stroke="#f5822d" stroke-width="1.5"/><path d="M10 16l8-10h8l4 6h10M22 6l4 10" fill="none" stroke="#f5822d" stroke-width="1.5"/></svg>',
  scooter: '<svg viewBox="0 0 51 22" width="36" height="18"><circle cx="10" cy="16" r="5" fill="none" stroke="#f5822d" stroke-width="1.5"/><circle cx="40" cy="16" r="5" fill="none" stroke="#f5822d" stroke-width="1.5"/><path d="M10 16h-2l4-12h10v4h12l6 8" fill="none" stroke="#f5822d" stroke-width="1.5"/></svg>',
  commercial: '<svg viewBox="0 0 51 22" width="36" height="18"><rect x="2" y="4" width="30" height="14" rx="2" fill="none" stroke="#f5822d" stroke-width="1.5"/><path d="M32 8h10a4 4 0 0 1 4 4v6H32V8z" fill="none" stroke="#f5822d" stroke-width="1.5"/><circle cx="12" cy="18" r="3" fill="none" stroke="#f5822d" stroke-width="1.5"/><circle cx="40" cy="18" r="3" fill="none" stroke="#f5822d" stroke-width="1.5"/></svg>',
};

/* ── Build Row 1: Logo + Utility Icons ── */
function buildRow1(navBrand, navTools) {
  const row = document.createElement('div');
  row.className = 'header-row-1';

  const logoWrap = document.createElement('div');
  logoWrap.className = 'header-logo';
  const brandLink = navBrand.querySelector('a');
  const brandImg = navBrand.querySelector('img');
  if (brandLink && brandImg) {
    const a = document.createElement('a');
    a.href = brandLink.href;
    a.setAttribute('aria-label', 'CEAT Home');
    const img = document.createElement('img');
    img.src = brandImg.src;
    img.alt = brandImg.alt || 'CEAT Tyre Logo';
    img.width = 100;
    img.height = 30;
    a.append(img);
    logoWrap.append(a);
  }
  row.append(logoWrap);

  const utilWrap = document.createElement('div');
  utilWrap.className = 'header-utils';

  const toolLinks = navTools ? navTools.querySelectorAll('a') : [];
  toolLinks.forEach((link) => {
    const text = link.textContent.trim().toLowerCase();
    const btn = document.createElement('a');
    btn.className = 'header-util-btn';
    btn.href = link.href;

    if (text.includes('tyre shop') || text.includes('tyre-shop')) {
      btn.innerHTML = ICONS.tyreshop;
      btn.setAttribute('aria-label', 'Tyre Shop');
    } else if (text.includes('cart')) {
      btn.innerHTML = `<span class="header-cart-wrap">${ICONS.cart}<span class="header-cart-badge">0</span></span>`;
      btn.setAttribute('aria-label', 'Cart');
    } else if (text.includes('callback')) {
      btn.innerHTML = ICONS.callback;
      btn.setAttribute('aria-label', 'Request Callback');
      btn.href = '#';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const rcTab = document.querySelector('.request-callback-tab');
        if (rcTab) rcTab.click();
      });
    }
    utilWrap.append(btn);
  });

  row.append(utilWrap);
  return row;
}

/* ── Build Row 2: Hamburger + Nav Items ── */
function buildRow2(navSections) {
  const row = document.createElement('div');
  row.className = 'header-row-2';

  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.className = 'header-hamburger';
  hamburgerBtn.setAttribute('aria-label', 'Open navigation');
  hamburgerBtn.innerHTML = ICONS.hamburger;
  row.append(hamburgerBtn);

  const navList = document.createElement('ul');
  navList.className = 'header-nav-list';

  const items = navSections
    ? navSections.querySelectorAll(':scope .default-content-wrapper > ul > li')
    : [];

  items.forEach((li) => {
    const text = li.childNodes[0]?.textContent?.trim() || '';
    if (!text) return;

    const isAskAi = text.toLowerCase() === 'ask ai';
    const navItem = document.createElement('li');
    navItem.className = 'header-nav-item';
    navItem.dataset.category = text.toLowerCase().replace(/\s+/g, '-');
    if (isAskAi) navItem.classList.add('header-nav-item-askai');

    const subList = li.querySelector('ul');
    const hasDropdown = !!subList;

    const btn = document.createElement('button');
    btn.className = 'header-nav-btn';
    if (isAskAi) {
      btn.innerHTML = `<span class="header-askai-badge">${ICONS.askAi} <span>Ask AI</span></span>`;
    } else {
      btn.textContent = text;
      if (hasDropdown) {
        const arrow = document.createElement('span');
        arrow.className = 'header-nav-arrow';
        arrow.innerHTML = ICONS.chevron;
        btn.append(arrow);
      }
    }
    navItem.append(btn);
    navList.append(navItem);
  });

  row.append(navList);
  return { row, hamburgerBtn, navList };
}

/**
 * Detect whether a category has tabbed sub-navigation (3-level)
 * or flat links (2-level). Tabbed = L2 items have child <ul>.
 * Flat = L2 items have <a> directly.
 */
function isTabbedCategory(subList) {
  const firstChild = subList.querySelector(':scope > li');
  return firstChild && firstChild.querySelector(':scope > ul');
}

/* ── Build full-width megamenu panels with tabbed sidebar ── */
function buildMegaPanels(navSections) {
  const container = document.createElement('div');
  container.className = 'header-mega-container';

  const overlay = document.createElement('div');
  overlay.className = 'header-mega-overlay';

  const items = navSections
    ? navSections.querySelectorAll(':scope .default-content-wrapper > ul > li')
    : [];

  items.forEach((li) => {
    const text = li.childNodes[0]?.textContent?.trim() || '';
    if (!text) return;

    const isAskAi = text.toLowerCase() === 'ask ai';
    const subList = li.querySelector(':scope > ul');
    if (!subList && !isAskAi) return;

    const catKey = text.toLowerCase().replace(/\s+/g, '-');
    const panel = document.createElement('div');
    panel.className = 'header-mega-panel';
    panel.dataset.category = catKey;

    if (isAskAi) {
      panel.classList.add('header-mega-panel-ai');
      panel.innerHTML = `
        <div class="header-ai-panel-header">
          <span>CEAT AI Assistant</span>
          <button class="header-ai-close" aria-label="Close">&times;</button>
        </div>
        <div class="header-ai-panel-body">
          <p class="header-ai-welcome">Welcome to CEAT! Happy to answer your queries.</p>
          <div class="header-ai-suggestions">
            <button class="header-ai-suggest">Find the right tyre for my car</button>
            <button class="header-ai-suggest">Compare tyre models</button>
            <button class="header-ai-suggest">Check tyre prices</button>
            <button class="header-ai-suggest">Locate nearest tyre shop</button>
          </div>
          <div class="header-ai-input-wrap">
            <input type="text" class="header-ai-input" placeholder="Type your question...">
            <button class="header-ai-send" aria-label="Send">&#10148;</button>
          </div>
        </div>
      `;
    } else if (isTabbedCategory(subList)) {
      /* ── Tabbed sidebar layout ── */
      panel.classList.add('header-mega-panel-tabbed');

      const heading = document.createElement('div');
      heading.className = 'header-mega-heading';
      const icon = CATEGORY_ICONS[catKey] || '';
      if (['cricket', 'about-us'].includes(catKey)) {
        heading.innerHTML = `<span>${text}</span>`;
      } else {
        heading.innerHTML = `${icon} <span>${text} Tyres</span>`;
      }
      panel.append(heading);

      const body = document.createElement('div');
      body.className = 'header-mega-body';

      const sidebar = document.createElement('div');
      sidebar.className = 'header-mega-sidebar';

      const content = document.createElement('div');
      content.className = 'header-mega-content';

      const subItems = subList.querySelectorAll(':scope > li');

      subItems.forEach((subLi, idx) => {
        const tabText = subLi.childNodes[0]?.textContent?.trim() || '';
        const tabLinks = subLi.querySelector(':scope > ul');

        // Tab button
        const tabBtn = document.createElement('button');
        tabBtn.className = 'header-mega-tab';
        if (idx === 0) tabBtn.classList.add('active');
        tabBtn.dataset.tabIndex = idx;
        tabBtn.innerHTML = `<span>${tabText}</span>${ICONS.chevronRight}`;
        sidebar.append(tabBtn);

        // Tab content panel
        const tabPanel = document.createElement('div');
        tabPanel.className = 'header-mega-tab-panel';
        if (idx === 0) tabPanel.classList.add('active');
        tabPanel.dataset.tabIndex = idx;

        if (tabLinks) {
          const grid = document.createElement('div');
          grid.className = 'header-mega-grid';

          tabLinks.querySelectorAll(':scope > li > a').forEach((a) => {
            const link = document.createElement('a');
            link.href = a.href;
            link.className = 'header-mega-link';
            link.innerHTML = `<span>${a.textContent.trim()}</span>${ICONS.chevronRightGrey}`;
            grid.append(link);
          });

          tabPanel.append(grid);
        }

        content.append(tabPanel);

        // Tab hover + click switches content
        const activateTab = () => {
          sidebar.querySelectorAll('.header-mega-tab.active').forEach((t) => t.classList.remove('active'));
          content.querySelectorAll('.header-mega-tab-panel.active').forEach((p) => p.classList.remove('active'));
          tabBtn.classList.add('active');
          tabPanel.classList.add('active');
        };

        tabBtn.addEventListener('mouseenter', activateTab);
        tabBtn.addEventListener('click', activateTab);
      });

      body.append(sidebar);
      body.append(content);
      panel.append(body);
    } else {
      /* ── Flat link grid (Warranty, Claims) ── */
      panel.classList.add('header-mega-panel-flat');

      const heading = document.createElement('div');
      heading.className = 'header-mega-heading';
      heading.innerHTML = `<span>${text}</span>`;
      panel.append(heading);

      const grid = document.createElement('div');
      grid.className = 'header-mega-grid header-mega-grid-flat';

      subList.querySelectorAll('a').forEach((a) => {
        const link = document.createElement('a');
        link.href = a.href;
        link.className = 'header-mega-link';
        link.innerHTML = `<span>${a.textContent.trim()}</span>${ICONS.chevronRightGrey}`;
        grid.append(link);
      });

      panel.append(grid);
    }

    container.append(panel);
  });

  return { container, overlay };
}

/* ── Build Mobile Megamenu (left sliding panel, 3-level accordion) ── */
function buildMobileMega(navSections) {
  const overlay = document.createElement('div');
  overlay.className = 'header-mobile-overlay';

  const panel = document.createElement('div');
  panel.className = 'header-mobile-panel';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'header-mobile-close';
  closeBtn.setAttribute('aria-label', 'Close menu');
  closeBtn.innerHTML = ICONS.close;
  panel.append(closeBtn);

  const menuList = document.createElement('div');
  menuList.className = 'header-mobile-list';

  const items = navSections
    ? navSections.querySelectorAll(':scope .default-content-wrapper > ul > li')
    : [];

  items.forEach((li) => {
    const text = li.childNodes[0]?.textContent?.trim() || '';
    if (!text) return;

    const subList = li.querySelector(':scope > ul');
    const isAskAi = text.toLowerCase() === 'ask ai';

    const menuItem = document.createElement('div');
    menuItem.className = 'header-mobile-item';
    if (isAskAi) menuItem.classList.add('header-mobile-item-askai');

    const header = document.createElement('button');
    header.className = 'header-mobile-item-header';

    if (isAskAi) {
      header.innerHTML = `${ICONS.askAi} <span>Ask AI</span>`;
    } else {
      header.textContent = text;
      if (subList) {
        const arrow = document.createElement('span');
        arrow.className = 'header-mobile-arrow';
        arrow.innerHTML = ICONS.chevron;
        header.append(arrow);
      }
    }
    menuItem.append(header);

    if (subList) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'header-mobile-item-content';

      const isTabbed = isTabbedCategory(subList);

      if (isTabbed) {
        /* 3-level accordion: each tab is a sub-accordion */
        const subItems = subList.querySelectorAll(':scope > li');

        subItems.forEach((subLi) => {
          const tabText = subLi.childNodes[0]?.textContent?.trim() || '';
          const tabLinks = subLi.querySelector(':scope > ul');

          const subItem = document.createElement('div');
          subItem.className = 'header-mobile-sub-item';

          const subHeader = document.createElement('button');
          subHeader.className = 'header-mobile-sub-header';
          subHeader.innerHTML = `<span>${tabText}</span>`;
          const subArrow = document.createElement('span');
          subArrow.className = 'header-mobile-arrow';
          subArrow.innerHTML = ICONS.chevron;
          subHeader.append(subArrow);
          subItem.append(subHeader);

          if (tabLinks) {
            const subContent = document.createElement('div');
            subContent.className = 'header-mobile-sub-content';

            tabLinks.querySelectorAll(':scope > li > a').forEach((a) => {
              const link = document.createElement('a');
              link.href = a.href;
              link.textContent = a.textContent.trim();
              subContent.append(link);
            });

            subItem.append(subContent);

            subHeader.addEventListener('click', (e) => {
              e.stopPropagation();
              const isOpen = subItem.classList.contains('open');
              contentDiv.querySelectorAll('.header-mobile-sub-item.open').forEach((si) => si.classList.remove('open'));
              if (!isOpen) subItem.classList.add('open');
            });
          }

          contentDiv.append(subItem);
        });
      } else {
        /* Flat links (Warranty, Claims) */
        subList.querySelectorAll('a').forEach((a) => {
          const link = document.createElement('a');
          link.href = a.href;
          link.textContent = a.textContent.trim();
          contentDiv.append(link);
        });
      }

      menuItem.append(contentDiv);

      header.addEventListener('click', () => {
        const isOpen = menuItem.classList.contains('open');
        menuList.querySelectorAll('.header-mobile-item.open').forEach((mi) => mi.classList.remove('open'));
        if (!isOpen) menuItem.classList.add('open');
      });
    }

    menuList.append(menuItem);
  });

  panel.append(menuList);
  overlay.append(panel);

  return { overlay, panel, closeBtn };
}

/* ── Event Wiring ── */
function wireEvents(hamburgerBtn, megaContainer, megaOverlay, mobileOverlay, mobileClose, navList) {
  let activePanel = null;
  let closeTimer = null;
  const isDesktop = () => window.matchMedia('(min-width: 900px)').matches;

  function closeMega() {
    clearTimeout(closeTimer);
    if (activePanel) {
      activePanel.classList.remove('active');
      activePanel = null;
    }
    megaOverlay.classList.remove('active');
    navList.querySelectorAll('.header-nav-item.active').forEach((item) => item.classList.remove('active'));
  }

  function openMega(category) {
    clearTimeout(closeTimer);
    closeMega();
    const panel = megaContainer.querySelector(`.header-mega-panel[data-category="${category}"]`);
    if (panel) {
      // Reset tabbed panels to first tab
      panel.querySelectorAll('.header-mega-tab.active').forEach((t) => t.classList.remove('active'));
      panel.querySelectorAll('.header-mega-tab-panel.active').forEach((p) => p.classList.remove('active'));
      const firstTab = panel.querySelector('.header-mega-tab');
      const firstTabPanel = panel.querySelector('.header-mega-tab-panel');
      if (firstTab) firstTab.classList.add('active');
      if (firstTabPanel) firstTabPanel.classList.add('active');

      panel.classList.add('active');
      megaOverlay.classList.add('active');
      activePanel = panel;
    }
  }

  function schedulClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(closeMega, 150);
  }

  function cancelClose() {
    clearTimeout(closeTimer);
  }

  function openMobile() {
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openMobile);
  mobileClose.addEventListener('click', closeMobile);
  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) closeMobile();
  });

  navList.querySelectorAll('.header-nav-item').forEach((item) => {
    const btn = item.querySelector('.header-nav-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const { category } = item.dataset;
      const isActive = item.classList.contains('active');

      if (isActive) {
        closeMega();
      } else {
        closeMega();
        openMega(category);
        item.classList.add('active');
      }
    });

    /* ── Desktop hover: open megamenu on mouseenter ── */
    item.addEventListener('mouseenter', () => {
      if (!isDesktop()) return;
      const { category } = item.dataset;
      cancelClose();
      if (!item.classList.contains('active')) {
        closeMega();
        openMega(category);
        item.classList.add('active');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;
      schedulClose();
    });
  });

  /* ── Keep megamenu open while hovering over it ── */
  megaContainer.addEventListener('mouseenter', () => {
    if (!isDesktop()) return;
    cancelClose();
  });

  megaContainer.addEventListener('mouseleave', () => {
    if (!isDesktop()) return;
    schedulClose();
  });

  megaContainer.querySelectorAll('.header-ai-close').forEach((closeAi) => {
    closeAi.addEventListener('click', closeMega);
  });

  megaOverlay.addEventListener('click', closeMega);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMega();
      closeMobile();
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
      closeMega();
    }
  });
}

/* ── Main decorate ── */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/content/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const sections = [...nav.children];
  const navBrand = sections[0] || document.createElement('div');
  const navSections = sections[1] || null;
  const navTools = sections[2] || null;

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';

  const row1 = buildRow1(navBrand, navTools);
  const separator = document.createElement('div');
  separator.className = 'header-separator';
  const { row, hamburgerBtn, navList } = buildRow2(navSections);
  const { container: megaContainer, overlay: megaOverlay } = buildMegaPanels(navSections);
  const { overlay: mobileOverlay, closeBtn: mobileClose } = buildMobileMega(navSections);

  wrapper.append(row1);
  wrapper.append(separator);
  wrapper.append(row);

  block.append(wrapper);
  block.append(megaContainer);
  block.append(megaOverlay);
  block.append(mobileOverlay);

  wireEvents(hamburgerBtn, megaContainer, megaOverlay, mobileOverlay, mobileClose, navList);
}
