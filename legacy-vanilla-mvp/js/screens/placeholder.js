// Telas ainda não construídas nesta etapa — existem só para provar que a navegação
// chega em todo lugar. Cada uma vira uma etapa própria depois.
const PLACEHOLDER_INFO = {
  inbox: { title: 'Inbox', note: 'Captura sem exigir organização imediata — triagem para Hoje, Semana, Projeto, Área ou Quem.' },
  semana: { title: 'Semana', note: 'Planejamento leve dos 7 dias, com alternador para visão de Mês.' },
  projetos: { title: 'Projetos', note: 'Tarefas grandes organizadas em seções, com progresso e responsáveis.' },
  areas: { title: 'Áreas', note: 'Filtra Projetos e tarefas por Casa, Trabalho e Pessoal.' },
  vida: { title: 'Minha Vida Extraordinária', note: 'Objetivos de longo prazo e a Semana Ideal — sem prazos, sem progresso.' },
};

function renderPlaceholder(container, routeId) {
  const info = PLACEHOLDER_INFO[routeId];
  container.innerHTML = `
    <div class="screen">
      <div class="screen-header">
        <h1>${info.title}</h1>
      </div>
      <div class="placeholder-card">
        <div class="placeholder-note">${info.note}</div>
        <div class="placeholder-status">Em construção — chega na próxima etapa.</div>
      </div>
    </div>
  `;
}
