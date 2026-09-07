import type { AppData } from './types';

export const STORAGE_KEY = 'vida-extraordinaria:v1';

export function seedData(): AppData {
  return {
    compromissos: [
      { id: 'c1', time: '06:15', title: 'CrossFit' },
      { id: 'c2', time: '09:30', title: 'Reunião Cliente X' },
      { id: 'c3', time: '12:30', title: 'Almoço' },
    ],
    tasks: [
      { id: 't1', title: 'Finalizar conteúdos da 2ª semana de setembro', area: 'trabalho', responsavel: 'eu', when: 'today', done: false, priority: 'principal' },
      { id: 't2', title: 'Revisar copies', area: 'trabalho', responsavel: 'eu', when: 'today', done: false, priority: 'normal' },
      { id: 't3', title: 'Fazer check-up dos conteúdos de agosto', area: 'trabalho', responsavel: 'eu', when: 'today', done: false, priority: 'normal' },
      { id: 't4', title: 'Agendar conteúdos de agosto', area: 'trabalho', responsavel: 'assistente', when: 'today', done: false },
      { id: 't5', title: 'Criar designs da semana 2', area: 'trabalho', responsavel: 'designer', when: 'today', done: false },
    ],
    rotina: [
      { id: 'r1', categoria: 'Corpo', title: 'Exercício', done: false },
      { id: 'r2', categoria: 'Corpo', title: 'Alimentação adequada', done: true },
      { id: 'r3', categoria: 'Corpo', title: 'Água', done: false },
      { id: 'r4', categoria: 'Espírito', title: 'Bíblia', done: true },
      { id: 'r5', categoria: 'Espírito', title: 'Oração', done: false },
      { id: 'r6', categoria: 'Espírito', title: 'Afirmações', done: false },
      { id: 'r7', categoria: 'Casa', title: 'Passear com Wanda', done: true },
      { id: 'r8', categoria: 'Casa', title: 'Alimentar gatos', done: false },
      { id: 'r9', categoria: 'Casa', title: 'Pequena organização', done: false },
      { id: 'r10', categoria: 'Eu', title: 'Momento sem tela', done: false },
      { id: 'r11', categoria: 'Eu', title: 'Lazer', done: false },
      { id: 'r12', categoria: 'Eu', title: 'Preparar para dormir', done: false },
    ],
  };
}

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AppData;
  } catch {
    /* localStorage indisponível — segue com os dados de exemplo */
  }
  return seedData();
}

export function saveData(data: AppData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* localStorage indisponível — mudança fica só na memória desta sessão */
  }
}
