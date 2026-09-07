export interface NavItem {
  id: string;
  label: string;
  icon: 'hoje' | 'inbox' | 'semana' | 'projetos' | 'areas' | 'vida';
  warm?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hoje', label: 'Hoje', icon: 'hoje' },
  { id: 'inbox', label: 'Inbox', icon: 'inbox' },
  { id: 'semana', label: 'Semana', icon: 'semana' },
  { id: 'projetos', label: 'Projetos', icon: 'projetos' },
  { id: 'areas', label: 'Áreas', icon: 'areas' },
  { id: 'vida', label: 'Minha Vida Extraordinária', icon: 'vida', warm: true },
];

export const TABBAR_MAIN = ['hoje', 'inbox', 'semana', 'projetos'];
