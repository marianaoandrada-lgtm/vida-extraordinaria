import { useCallback, useMemo, useState } from 'react';
import { loadData, saveData } from './data';
import type { AppData } from './types';

export function useAppData() {
  const [data, setData] = useState<AppData>(() => loadData());

  const update = useCallback((updater: (prev: AppData) => AppData) => {
    setData((prev) => {
      const next = updater(prev);
      saveData(next);
      return next;
    });
  }, []);

  const toggleTask = useCallback(
    (id: string) => {
      update((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
      }));
    },
    [update],
  );

  const toggleRotina = useCallback(
    (id: string) => {
      update((prev) => ({
        ...prev,
        rotina: prev.rotina.map((r) => (r.id === id ? { ...r, done: !r.done } : r)),
      }));
    },
    [update],
  );

  const addInboxItem = useCallback(
    (text: string) => {
      const id = 'inbox-' + Date.now();
      update((prev) => ({
        ...prev,
        tasks: [...prev.tasks, { id, title: text, area: null, responsavel: 'eu', when: null, done: false }],
      }));
      return id;
    },
    [update],
  );

  const todayTasks = useMemo(() => data.tasks.filter((t) => t.when === 'today' && t.responsavel === 'eu'), [data.tasks]);
  const acompanhando = useMemo(() => data.tasks.filter((t) => t.when === 'today' && t.responsavel !== 'eu'), [data.tasks]);
  const rotinaProgress = useMemo(() => {
    const total = data.rotina.length;
    const done = data.rotina.filter((r) => r.done).length;
    return { done, total };
  }, [data.rotina]);

  return { data, toggleTask, toggleRotina, addInboxItem, todayTasks, acompanhando, rotinaProgress };
}
