// Tela Hoje — a única pergunta que ela responde: "o que eu preciso fazer agora?"
// Estado dos painéis (aberto/fechado) vive fora do render porque o render reconstrói o DOM inteiro.
const hojeUIState = { 'rotina-panel': false, 'watch-panel': false };

function renderHoje(container) {
  const todayTasks = Store.getTasksToday();
  const principal = todayTasks.find(t => t.priority === 'principal');
  const outras = todayTasks.filter(t => t.priority !== 'principal');
  const acompanhando = Store.getAcompanhando();
  const rotina = Store.getRotina();
  const { done: rotinaDone, total: rotinaTotal } = Store.rotinaProgress();

  const dataFmt = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  const cheioAvisoHtml = outras.length > 3 ? `
    <div class="day-full-notice">
      Seu dia já está cheio. Quer mover alguma coisa para outro dia?
    </div>` : '';

  container.innerHTML = `
    <div class="screen">
      <div class="screen-header">
        <h1>Hoje</h1>
        <div class="screen-sub">${cap(dataFmt)}</div>
      </div>

      <div class="section">
        <div class="section-label">Compromissos</div>
        <div class="compromissos">
          ${Store.data.compromissos.map(c => `
            <div class="compromisso-row">
              <span class="time-chip">${c.time}</span>
              <span>${escapeHtml(c.title)}</span>
            </div>`).join('')}
        </div>
      </div>

      <div class="section">
        <div class="section-label">Prioridade principal</div>
        ${principal ? taskRow(principal, true) : `<div class="empty-hint">Nenhuma prioridade definida ainda.</div>`}
      </div>

      ${outras.length ? `
      <div class="section">
        <div class="section-label">Outras prioridades</div>
        <div class="task-list">${outras.map(t => taskRow(t, false)).join('')}</div>
        ${cheioAvisoHtml}
      </div>` : ''}

      <div class="collapsible">
        <button class="collapsible-head" data-toggle="rotina-panel">
          <span class="collapsible-label">🌟 Minha rotina · ${rotinaDone}/${rotinaTotal} feitas hoje</span>
          <span class="chevron ${hojeUIState['rotina-panel'] ? 'open' : ''}">${svgIcon('chevron', '#9ca3af', 16)}</span>
        </button>
        <div class="collapsible-body" id="rotina-panel" ${hojeUIState['rotina-panel'] ? '' : 'hidden'}>
          ${['Corpo', 'Espírito', 'Casa', 'Eu'].map(cat => `
            <div class="rotina-group">
              <div class="rotina-cat">${cat}</div>
              ${rotina.filter(r => r.categoria === cat).map(r => `
                <label class="rotina-row">
                  <input type="checkbox" data-rotina="${r.id}" ${r.done ? 'checked' : ''}>
                  <span class="${r.done ? 'done-text' : ''}">${escapeHtml(r.title)}</span>
                </label>`).join('')}
            </div>`).join('')}
        </div>
      </div>

      ${acompanhando.length ? `
      <div class="collapsible">
        <button class="collapsible-head watch-head" data-toggle="watch-panel">
          <span class="collapsible-label">👀 Acompanhando · ${acompanhando.length} tarefa${acompanhando.length > 1 ? 's' : ''} delegada${acompanhando.length > 1 ? 's' : ''}</span>
          <span class="chevron ${hojeUIState['watch-panel'] ? 'open' : ''}">${svgIcon('chevron', '#9ca3af', 16)}</span>
        </button>
        <div class="collapsible-body" id="watch-panel" ${hojeUIState['watch-panel'] ? '' : 'hidden'}>
          ${acompanhando.map(t => `
            <div class="watch-row">
              <span class="resp-avatar">${personInitial(t.responsavel)}</span>
              <span>${escapeHtml(t.title)}</span>
            </div>`).join('')}
        </div>
      </div>` : ''}
    </div>
  `;

  container.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.toggle;
      hojeUIState[key] = !hojeUIState[key];
      renderHoje(container);
    });
  });

  container.querySelectorAll('[data-task]').forEach(el => {
    el.addEventListener('click', () => { Store.toggleTask(el.dataset.task); renderHoje(container); });
  });

  container.querySelectorAll('[data-rotina]').forEach(el => {
    el.addEventListener('change', () => { Store.toggleRotina(el.dataset.rotina); renderHoje(container); });
  });
}

function taskRow(t, big) {
  const tag = t.area ? `<span class="tag tag-${t.area}">${AREA_LABEL[t.area]}</span>` : '';
  return `
    <div class="task-row ${big ? 'task-row-big' : ''}">
      <span class="checkbox ${t.done ? 'checked' : ''}" data-task="${t.id}"></span>
      <span class="task-title ${t.done ? 'done-text' : ''}">${escapeHtml(t.title)}</span>
      ${tag}
    </div>`;
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
