// Casca de navegação: sidebar (desktop) + barra inferior (mobile), roteamento por hash.
const NAV_ITEMS = [
  { id: 'hoje', label: 'Hoje', icon: 'hoje' },
  { id: 'inbox', label: 'Inbox', icon: 'inbox' },
  { id: 'semana', label: 'Semana', icon: 'semana' },
  { id: 'projetos', label: 'Projetos', icon: 'projetos' },
  { id: 'areas', label: 'Áreas', icon: 'areas' },
  { id: 'vida', label: 'Minha Vida Extraordinária', icon: 'vida', warm: true },
];

const TABBAR_MAIN = ['hoje', 'inbox', 'semana', 'projetos'];

function currentRoute() {
  const hash = location.hash.replace('#/', '');
  return NAV_ITEMS.some(i => i.id === hash) ? hash : 'hoje';
}

function renderSidebar() {
  const active = currentRoute();
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = NAV_ITEMS.map(item => `
    <a href="#/${item.id}" class="nav-item ${item.id === active ? 'active' : ''} ${item.warm ? 'warm' : ''}">
      ${svgIcon(item.icon, item.id === active ? (item.warm ? '#b3591f' : '#2f5fd9') : '#6b7280', 18)}
      <span>${item.label}</span>
    </a>`).join('');
}

function renderTabbar() {
  const active = currentRoute();
  const isMais = active === 'areas' || active === 'vida';
  const tabbar = document.getElementById('tabbar');
  const mainButtons = TABBAR_MAIN.map(id => {
    const item = NAV_ITEMS.find(i => i.id === id);
    const isActive = id === active;
    return `<a href="#/${id}" class="tab-item ${isActive ? 'active' : ''}">
      ${svgIcon(item.icon, isActive ? '#2f5fd9' : '#9ca3af', 18)}
      <span>${item.label}</span>
    </a>`;
  }).join('');
  const maisColor = isMais ? (active === 'vida' ? '#b3591f' : '#2f5fd9') : '#9ca3af';
  tabbar.innerHTML = mainButtons + `
    <button id="mais-btn" class="tab-item ${isMais ? 'active' : ''}">
      ${svgIcon('mais', maisColor, 18)}
      <span>Mais</span>
    </button>`;
  document.getElementById('mais-btn').addEventListener('click', () => {
    document.getElementById('mais-overlay').hidden = false;
  });
}

function renderScreen() {
  const route = currentRoute();
  const content = document.getElementById('content');
  if (route === 'hoje') {
    renderHoje(content);
  } else {
    renderPlaceholder(content, route);
  }
  renderSidebar();
  renderTabbar();
}

function initIcons() {
  document.querySelectorAll('.mais-icon').forEach(el => {
    el.innerHTML = svgIcon(el.dataset.icon, '#374151', 18);
  });
}

function initCapture() {
  const overlay = document.getElementById('capture-overlay');
  const input = document.getElementById('capture-input');
  document.getElementById('fab').addEventListener('click', () => {
    overlay.hidden = false;
    input.value = '';
    input.focus();
  });
  document.getElementById('capture-cancel').addEventListener('click', () => { overlay.hidden = true; });
  document.getElementById('capture-save').addEventListener('click', () => {
    const text = input.value.trim();
    if (text) Store.addInboxItem(text);
    overlay.hidden = true;
    if (currentRoute() === 'hoje') renderScreen();
  });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.hidden = true; });
}

function initMais() {
  const overlay = document.getElementById('mais-overlay');
  overlay.querySelectorAll('.mais-item').forEach(btn => {
    btn.addEventListener('click', () => {
      location.hash = '#/' + btn.dataset.route;
      overlay.hidden = true;
    });
  });
  document.getElementById('mais-close').addEventListener('click', () => { overlay.hidden = true; });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.hidden = true; });
}

Store.load();
initIcons();
initCapture();
initMais();
window.addEventListener('hashchange', renderScreen);
renderScreen();
