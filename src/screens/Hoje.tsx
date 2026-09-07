import { useState } from 'react';
import { useAppDataContext } from '../AppDataContext';
import { TaskRow } from '../components/TaskRow';
import { Collapsible } from '../components/Collapsible';
import { personInitial } from '../types';

const CATEGORIAS = ['Corpo', 'Espírito', 'Casa', 'Eu'] as const;

export function Hoje() {
  const { data, toggleTask, toggleRotina, todayTasks, acompanhando, rotinaProgress } = useAppDataContext();
  const [rotinaOpen, setRotinaOpen] = useState(false);
  const [watchOpen, setWatchOpen] = useState(false);

  const principal = todayTasks.find((t) => t.priority === 'principal');
  const outras = todayTasks.filter((t) => t.priority !== 'principal');
  const dataFmt = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="flex flex-col gap-5 max-w-[640px]">
      <div>
        <h1 className="text-2xl font-bold m-0">Hoje</h1>
        <div className="text-[13px] text-text-faint mt-0.5">{cap(dataFmt)}</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[11px] font-bold text-text-faint uppercase tracking-wide">Compromissos</div>
        <div className="flex flex-col gap-2">
          {data.compromissos.map((c) => (
            <div key={c.id} className="flex items-center gap-3 text-sm">
              <span className="text-xs font-semibold text-text-mute bg-accent-soft rounded-md px-2 py-1 min-w-[52px] text-center">{c.time}</span>
              <span>{c.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[11px] font-bold text-text-faint uppercase tracking-wide">Prioridade principal</div>
        {principal ? (
          <TaskRow task={principal} big onToggle={toggleTask} />
        ) : (
          <div className="text-[13px] text-text-faint italic">Nenhuma prioridade definida ainda.</div>
        )}
      </div>

      {outras.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-bold text-text-faint uppercase tracking-wide">Outras prioridades</div>
          <div className="flex flex-col gap-2">
            {outras.map((t) => (
              <TaskRow key={t.id} task={t} onToggle={toggleTask} />
            ))}
          </div>
          {outras.length > 3 && (
            <div className="text-[13px] text-warm bg-warm-soft rounded-lg px-3 py-2.5">
              Seu dia já está cheio. Quer mover alguma coisa para outro dia?
            </div>
          )}
        </div>
      )}

      <Collapsible
        label={<>🌟 Minha rotina · {rotinaProgress.done}/{rotinaProgress.total} feitas hoje</>}
        open={rotinaOpen}
        onToggle={() => setRotinaOpen((v) => !v)}
      >
        {CATEGORIAS.map((cat) => (
          <div key={cat} className="flex flex-col gap-1.5">
            <div className="text-[10px] font-bold text-text-faint">{cat}</div>
            {data.rotina.filter((r) => r.categoria === cat).map((r) => (
              <label key={r.id} className="flex items-center gap-2 text-[13px] cursor-pointer">
                <input type="checkbox" checked={r.done} onChange={() => toggleRotina(r.id)} className="w-3.5 h-3.5 accent-accent cursor-pointer" />
                <span className={r.done ? 'text-text-faint line-through' : ''}>{r.title}</span>
              </label>
            ))}
          </div>
        ))}
      </Collapsible>

      {acompanhando.length > 0 && (
        <Collapsible
          label={<>👀 Acompanhando · {acompanhando.length} tarefa{acompanhando.length > 1 ? 's' : ''} delegada{acompanhando.length > 1 ? 's' : ''}</>}
          open={watchOpen}
          onToggle={() => setWatchOpen((v) => !v)}
        >
          {acompanhando.map((t) => (
            <div key={t.id} className="flex items-center gap-2.5 text-[13px] text-text-mute">
              <span className="w-[18px] h-[18px] rounded-full bg-border text-text-mute text-[9px] font-bold flex items-center justify-center shrink-0">
                {personInitial(t.responsavel)}
              </span>
              <span>{t.title}</span>
            </div>
          ))}
        </Collapsible>
      )}
    </div>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
