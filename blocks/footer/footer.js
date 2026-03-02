import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const SOCIAL_ICONS = {
  facebook: '<svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.38 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.32 3.91A12.16 12.16 0 0 1 3 4.79a4.28 4.28 0 0 0 1.32 5.72 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.27 4.27 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.59 8.59 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0 0 22.46 6z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>',
};

function detectSocialPlatform(href) {
  if (href.includes('facebook')) return 'facebook';
  if (href.includes('twitter')) return 'twitter';
  if (href.includes('linkedin')) return 'linkedin';
  if (href.includes('instagram')) return 'instagram';
  if (href.includes('youtube')) return 'youtube';
  return null;
}

function decorateFooterSocial(section) {
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-social';

  const title = document.createElement('p');
  title.textContent = 'Follow Us';
  wrapper.append(title);

  const linksRow = document.createElement('div');
  linksRow.className = 'footer-social-links';

  section.querySelectorAll('a').forEach((a) => {
    const platform = detectSocialPlatform(a.href);
    if (platform && SOCIAL_ICONS[platform]) {
      const link = document.createElement('a');
      link.href = a.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', platform);
      link.innerHTML = SOCIAL_ICONS[platform];
      linksRow.append(link);
    }
  });

  wrapper.append(linksRow);
  return wrapper;
}

function decorateFooterNav(section) {
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-nav';

  const topList = section.querySelector('ul');
  if (!topList) return wrapper;

  topList.querySelectorAll(':scope > li').forEach((li) => {
    const col = document.createElement('div');

    // Column header is the first text node of the LI
    const firstText = [...li.childNodes]
      .find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    const headerText = firstText ? firstText.textContent.trim() : '';

    if (headerText) {
      const h3 = document.createElement('h3');
      h3.textContent = headerText;
      col.append(h3);
    }

    const subList = li.querySelector('ul');
    if (subList) {
      col.append(subList.cloneNode(true));
    }

    wrapper.append(col);
  });

  return wrapper;
}

function decorateFooterTyreLinks(section) {
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-tyre-links';

  section.querySelectorAll('h3, p').forEach((el) => {
    wrapper.append(el.cloneNode(true));
  });

  return wrapper;
}

function decorateFooterAccordion(section) {
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-accordion';

  const headings = section.querySelectorAll('h4');
  headings.forEach((h4) => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = h4.textContent.trim();
    details.append(summary);

    const content = document.createElement('div');
    content.className = 'accordion-content';

    // Get the paragraph following the h4
    const nextP = h4.nextElementSibling;
    if (nextP && nextP.tagName === 'P') {
      const sizes = nextP.textContent.trim().split('|').map((s) => s.trim()).filter(Boolean);
      content.textContent = sizes.join('  |  ');
    }

    details.append(content);
    wrapper.append(details);
  });

  return wrapper;
}

function decorateFooterLegal(section) {
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-legal';

  section.querySelectorAll('p').forEach((p) => {
    if (p.textContent.trim()) {
      wrapper.append(p.cloneNode(true));
    }
  });

  return wrapper;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');

  if (!fragment) {
    block.append(footer);
    return;
  }

  const sections = fragment.querySelectorAll(':scope .section');

  sections.forEach((section, idx) => {
    const sectionDiv = document.createElement('div');

    if (idx === 0) {
      // Row 1: Follow Us + Social Icons
      sectionDiv.append(decorateFooterSocial(section));
      const hr = document.createElement('hr');
      hr.className = 'footer-separator';
      sectionDiv.append(hr);
    } else if (idx === 1) {
      // Row 2: 4-Column Navigation
      sectionDiv.append(decorateFooterNav(section));
    } else if (idx === 2) {
      // Row 3: Tyre Links (pipe-separated)
      sectionDiv.append(decorateFooterTyreLinks(section));
    } else if (idx === 3) {
      // Row 4: Accordion (tyre sizes)
      const accWrapper = decorateFooterAccordion(section);
      if (accWrapper.children.length > 0) {
        sectionDiv.className = 'footer-accordion';
        while (accWrapper.firstChild) {
          sectionDiv.append(accWrapper.firstChild);
        }
      }
    } else if (idx === 4) {
      // Row 5: Legal / BIS notice
      sectionDiv.append(decorateFooterLegal(section));
    }

    footer.append(sectionDiv);
  });

  block.append(footer);
}
