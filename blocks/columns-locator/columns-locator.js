export default function decorate(block) {
  /* ── 1. Extract content from authored table rows ── */
  const helperTexts = [];
  let citiesTitle = '';
  const cityLinks = [];
  let shoppeImage = null;
  const stats = [];

  const row = block.children[0];
  if (!row) return;
  const leftCell = row.children[0];
  const rightCell = row.children[1];

  /* Left cell: iterate over paragraphs */
  if (leftCell) {
    [...leftCell.children].forEach((el) => {
      const links = el.querySelectorAll('a');
      const strong = el.querySelector('strong');
      if (links.length > 1) {
        links.forEach((a) => cityLinks.push({ text: a.textContent.trim(), href: a.href }));
      } else if (strong && links.length === 0) {
        citiesTitle = strong.textContent.trim();
      } else if (links.length === 1) {
        cityLinks.push({ text: links[0].textContent.trim(), href: links[0].href });
      } else {
        const txt = el.textContent.trim();
        if (txt) helperTexts.push(txt);
      }
    });
  }

  /* Right cell: image + stat pairs */
  if (rightCell) {
    const pic = rightCell.querySelector('picture');
    if (pic) shoppeImage = pic;

    rightCell.querySelectorAll('h3').forEach((h3) => {
      const next = h3.nextElementSibling;
      stats.push({
        number: h3.textContent.trim(),
        desc: next ? next.textContent.trim() : '',
      });
    });
  }

  /* ── 2. Build new DOM ── */
  block.textContent = '';

  /* Left column */
  const leftCol = document.createElement('div');
  leftCol.className = 'cl-left';

  // Search bar
  const searchBar = document.createElement('div');
  searchBar.className = 'cl-search';

  const locIcon = document.createElement('span');
  locIcon.className = 'cl-icon-location';
  locIcon.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f5822d" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Pincode';
  input.className = 'cl-pincode-input';

  const searchBtn = document.createElement('button');
  searchBtn.className = 'cl-search-btn';
  searchBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#999" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>';

  searchBar.append(locIcon, input, searchBtn);
  leftCol.append(searchBar);

  // Helper text in darker grey area
  if (helperTexts.length) {
    const helperArea = document.createElement('div');
    helperArea.className = 'cl-helper-area';
    helperTexts.forEach((txt) => {
      const p = document.createElement('p');
      p.className = 'cl-helper';
      p.textContent = txt;
      helperArea.append(p);
    });
    leftCol.append(helperArea);
  }

  // Separator
  const sep = document.createElement('hr');
  sep.className = 'cl-separator';
  leftCol.append(sep);

  // Cities title
  if (citiesTitle) {
    const ct = document.createElement('p');
    ct.className = 'cl-cities-title';
    ct.textContent = citiesTitle;
    leftCol.append(ct);
  }

  // City pill links
  if (cityLinks.length) {
    const pills = document.createElement('div');
    pills.className = 'cl-cities';
    cityLinks.forEach(({ text, href }) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      a.className = 'cl-city-pill';
      pills.append(a);
    });
    leftCol.append(pills);
  }

  /* Right column */
  const rightCol = document.createElement('div');
  rightCol.className = 'cl-right';

  if (shoppeImage) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'cl-image';
    imgWrap.append(shoppeImage);
    rightCol.append(imgWrap);
  }

  if (stats.length) {
    const statsWrap = document.createElement('div');
    statsWrap.className = 'cl-stats';
    stats.forEach(({ number, desc }) => {
      const stat = document.createElement('div');
      stat.className = 'cl-stat';
      const h3 = document.createElement('h3');
      h3.textContent = number;
      stat.append(h3);
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc;
        stat.append(p);
      }
      statsWrap.append(stat);
    });
    rightCol.append(statsWrap);
  }

  block.append(leftCol, rightCol);

  /* ── 3. Accent-underline first word of section heading ── */
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
