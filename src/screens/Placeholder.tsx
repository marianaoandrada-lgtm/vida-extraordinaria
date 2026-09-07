const INFO: Record<string, { title: string; note: string }> = {
  inbox: { title: 'Inbox', note: 'Captura sem exigir organização imediata — triagem para Hoje, Semana, Projeto, Área ou Quem.' },
  semana: { title: 'Semana', note: 'Planejamento leve dos 7 dias, com alternador para visão de Mês.' },
  projetos: { title: 'Projetos', note: 'Tarefas grandes organizadas em seções, com progresso e responsáveis.' },
  areas: { title: 'Áreas', note: 'Filtra Projetos e tarefas por Casa, Trabalho e Pessoal.' },
  vida: { title: 'Minha Vida Extraordinária', note: 'Objetivos de longo prazo e a Semana Ideal — sem prazos, sem progresso.' },
};

export function Placeholder({ routeId }: { routeId: string }) {
  const info = INFO[routeId];
  return (
    <div className="flex flex-col gap-5 max-w-[640px]">
      <h1 className="text-2xl font-bold m-0">{info.title}</h1>
      <div className="border border-dashed border-border rounded-xl p-6 flex flex-col gap-2">
        <div className="text-sm text-text-mute leading-relaxed">{info.note}</div>
        <div className="text-xs text-text-faint italic">Em construção — chega na próxima etapa.</div>
      </div>
    </div>
  );
}
