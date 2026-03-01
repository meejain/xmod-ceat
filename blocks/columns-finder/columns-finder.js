const ICON_BASE = '/blocks/columns-finder/icons';

const VEHICLES = [
  {
    id: 'car',
    label: 'Car/SUV',
    icon: `${ICON_BASE}/normal-car.svg`,
    iconActive: `${ICON_BASE}/orange-car.svg`,
    tyreSizeImg: `${ICON_BASE}/tyre-size-car.png`,
  },
  {
    id: 'bike',
    label: 'Bike',
    icon: `${ICON_BASE}/normal-bike.svg`,
    iconActive: `${ICON_BASE}/orange-bike.svg`,
    tyreSizeImg: `${ICON_BASE}/tyre-size-bike.png`,
  },
  {
    id: 'scooter',
    label: 'Scooter',
    icon: `${ICON_BASE}/normal-scooter.svg`,
    iconActive: `${ICON_BASE}/orange-scooter.svg`,
    tyreSizeImg: `${ICON_BASE}/tyre-size-scooter.png`,
  },
];

function buildVehicleIcons() {
  const container = document.createElement('div');
  container.className = 'cf-vehicle-icons';
  VEHICLES.forEach((v, i) => {
    const item = document.createElement('div');
    item.className = 'cf-vehicle-icon';
    if (i === 0) item.classList.add('active');
    item.setAttribute('data-vehicle', v.id);

    const iconNormal = document.createElement('img');
    iconNormal.src = v.icon;
    iconNormal.alt = v.label;
    iconNormal.className = 'cf-icon-normal';

    const iconActive = document.createElement('img');
    iconActive.src = v.iconActive;
    iconActive.alt = v.label;
    iconActive.className = 'cf-icon-active';

    const label = document.createElement('p');
    label.className = 'cf-vehicle-label';
    label.textContent = v.label;

    item.append(iconNormal, iconActive, label);
    container.append(item);
  });
  return container;
}

function buildFormField(labelText, type, placeholder, name) {
  const wrapper = document.createElement('div');
  wrapper.className = 'cf-field';

  const label = document.createElement('label');
  label.textContent = labelText;
  label.className = 'cf-label';
  wrapper.append(label);

  if (type === 'select') {
    const select = document.createElement('select');
    select.className = 'cf-select';
    select.name = name;
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = placeholder;
    select.append(opt);
    wrapper.append(select);
  } else {
    const input = document.createElement('input');
    input.type = type;
    input.className = 'cf-input';
    input.placeholder = placeholder;
    input.name = name;
    wrapper.append(input);

    if (name === 'makeModel') {
      const searchIcon = document.createElement('span');
      searchIcon.className = 'cf-search-icon';
      searchIcon.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#999"/></svg>';
      wrapper.style.position = 'relative';
      wrapper.append(searchIcon);
    }
  }
  return wrapper;
}

function buildEvToggle() {
  const row = document.createElement('div');
  row.className = 'cf-ev-row';

  const label = document.createElement('span');
  label.className = 'cf-ev-label';
  label.innerHTML = 'Show only <strong>EV Tyres</strong>';

  const toggle = document.createElement('label');
  toggle.className = 'cf-toggle';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const slider = document.createElement('span');
  slider.className = 'cf-slider';
  toggle.append(checkbox, slider);

  row.append(label, toggle);
  return row;
}

function buildVehicleForm() {
  const form = document.createElement('div');
  form.className = 'cf-vehicle-form';

  const heading = document.createElement('p');
  heading.className = 'cf-form-heading';
  heading.textContent = 'Tell us your vehicle details';
  form.append(heading);

  form.append(buildFormField('Make or Model Name', 'text', 'Search make or model', 'makeModel'));
  form.append(buildEvToggle());
  form.append(buildFormField('Variant', 'select', 'Select variant', 'variant'));
  form.append(buildFormField('Manufacturing Year', 'select', 'Select year', 'mfgYear'));

  const btnWrap = document.createElement('div');
  btnWrap.className = 'cf-submit-wrap';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'cf-view-btn';
  btn.textContent = 'View Tyres';
  btnWrap.append(btn);
  form.append(btnWrap);

  return form;
}

function buildTyreSizePanel() {
  const panel = document.createElement('div');
  panel.className = 'cf-tyre-size';

  const heading = document.createElement('p');
  heading.className = 'cf-form-heading';
  heading.textContent = 'Tell us your tyre size';
  panel.append(heading);

  const img = document.createElement('img');
  img.className = 'cf-tyre-img';
  img.src = VEHICLES[0].tyreSizeImg;
  img.alt = 'CEAT tyre size guide';
  panel.append(img);

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'cf-input';
  input.placeholder = 'Enter your tyre size';
  input.name = 'tyreSize';
  panel.append(input);

  panel.append(buildEvToggle());

  const btnWrap = document.createElement('div');
  btnWrap.className = 'cf-submit-wrap';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'cf-view-btn';
  btn.textContent = 'View Tyres';
  btnWrap.append(btn);
  panel.append(btnWrap);

  return panel;
}

export default function decorate(block) {
  // Clear authored content — we build the full UI programmatically
  block.textContent = '';

  // 1. Search-by header bar
  const header = document.createElement('div');
  header.className = 'cf-header';

  const title = document.createElement('p');
  title.className = 'cf-title';
  title.textContent = 'Search by';
  header.append(title);

  const pillTabs = document.createElement('div');
  pillTabs.className = 'cf-pill-tabs';
  ['Vehicle', 'Tyre size'].forEach((label, i) => {
    if (i > 0) {
      const divider = document.createElement('span');
      divider.className = 'cf-pill-divider';
      pillTabs.append(divider);
    }
    const pill = document.createElement('button');
    pill.className = 'cf-pill';
    pill.textContent = label;
    pill.setAttribute('data-pill', i);
    if (i === 0) pill.classList.add('active');
    pillTabs.append(pill);
  });
  header.append(pillTabs);
  block.append(header);

  // 2. Body area
  const body = document.createElement('div');
  body.className = 'cf-body';

  // Left: vehicle icons + vehicle form
  const leftSide = document.createElement('div');
  leftSide.className = 'cf-left';

  const vehicleIcons = buildVehicleIcons();
  const vehicleForm = buildVehicleForm();
  leftSide.append(vehicleIcons, vehicleForm);

  // "or" divider
  const orDivider = document.createElement('div');
  orDivider.className = 'cf-or';
  const orText = document.createElement('span');
  orText.textContent = 'or';
  orDivider.append(orText);

  // Right: tyre size panel
  const tyreSizePanel = buildTyreSizePanel();

  body.append(leftSide, orDivider, tyreSizePanel);
  block.append(body);

  // Default state: Vehicle active → tyre-size greyed out
  tyreSizePanel.classList.add('cf-disabled');

  // Helper to toggle active/disabled panels
  function setActivePanel(idx) {
    if (idx === '0') {
      // Vehicle active
      leftSide.classList.remove('cf-disabled');
      tyreSizePanel.classList.add('cf-disabled');
    } else {
      // Tyre size active
      leftSide.classList.add('cf-disabled');
      tyreSizePanel.classList.remove('cf-disabled');
    }
  }

  // 3. Event listeners

  // Vehicle icon switching
  vehicleIcons.addEventListener('click', (e) => {
    const item = e.target.closest('.cf-vehicle-icon');
    if (!item) return;
    vehicleIcons.querySelectorAll('.cf-vehicle-icon').forEach((el) => el.classList.remove('active'));
    item.classList.add('active');

    // Update tyre size image
    const vid = item.getAttribute('data-vehicle');
    const vData = VEHICLES.find((v) => v.id === vid);
    if (vData) {
      const tyreImg = tyreSizePanel.querySelector('.cf-tyre-img');
      if (tyreImg) tyreImg.src = vData.tyreSizeImg;
    }
  });

  // Pill tab switching
  pillTabs.addEventListener('click', (e) => {
    const pill = e.target.closest('.cf-pill');
    if (!pill) return;
    const idx = pill.getAttribute('data-pill');

    pillTabs.querySelectorAll('.cf-pill').forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');

    setActivePanel(idx);
  });
}
