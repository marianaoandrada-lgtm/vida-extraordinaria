export type Area = 'casa' | 'trabalho' | 'pessoal';

export const AREA_LABEL: Record<Area, string> = {
  casa: 'Casa',
  trabalho: 'Trabalho',
  pessoal: 'Pessoal',
};

export type PersonId = 'eu' | 'victor' | 'assistente' | 'designer' | 'copy' | 'terceiro';

export interface Person {
  id: PersonId;
  name: string;
}

export const PEOPLE: Person[] = [
  { id: 'eu', name: 'Eu' },
  { id: 'victor', name: 'Victor' },
  { id: 'assistente', name: 'Assistente' },
  { id: 'designer', name: 'Designer' },
  { id: 'copy', name: 'Copy' },
  { id: 'terceiro', name: 'Terceiro' },
];

export function personInitial(id: PersonId): string {
  const p = PEOPLE.find((p) => p.id === id);
  return p ? p.name[0].toUpperCase() : '?';
}

export interface Compromisso {
  id: string;
  time: string;
  title: string;
}

export interface Task {
  id: string;
  title: string;
  area: Area | null;
  responsavel: PersonId;
  when: 'today' | 'week' | null;
  done: boolean;
  priority?: 'principal' | 'normal';
}

export type RotinaCategoria = 'Corpo' | 'Espírito' | 'Casa' | 'Eu';

export interface RotinaItem {
  id: string;
  categoria: RotinaCategoria;
  title: string;
  done: boolean;
}

export interface AppData {
  compromissos: Compromisso[];
  tasks: Task[];
  rotina: RotinaItem[];
}
