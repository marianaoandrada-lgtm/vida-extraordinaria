import type { Task } from '../types';
import { AREA_LABEL } from '../types';

const AREA_CLASSES: Record<string, string> = {
  casa: 'bg-casa text-casa-ink',
  trabalho: 'bg-trabalho text-trabalho-ink',
  pessoal: 'bg-pessoal text-pessoal-ink',
};

export function TaskRow({ task, big, onToggle }: { task: Task; big?: boolean; onToggle: (id: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <span
        role="checkbox"
        aria-checked={task.done}
        onClick={() => onToggle(task.id)}
        className={[
          'w-[18px] h-[18px] rounded-full border-[1.8px] shrink-0 cursor-pointer',
          task.done ? 'bg-accent border-accent' : 'border-text-faint',
        ].join(' ')}
      />
      <span className={['flex-1', big ? 'text-base font-semibold' : 'text-sm', task.done ? 'text-text-faint line-through' : ''].join(' ')}>
        {task.title}
      </span>
      {task.area && (
        <span className={['text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0', AREA_CLASSES[task.area]].join(' ')}>
          {AREA_LABEL[task.area as keyof typeof AREA_LABEL]}
        </span>
      )}
    </div>
  );
}
