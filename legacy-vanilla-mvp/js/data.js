// Data layer: in-memory model backed by localStorage. No backend yet —
// this is the shape the app will keep once sync (Google Calendar, multi-device) is added.
const STORAGE_KEY = 'vida-extraordinaria:v1';

const AREAS = ['casa', 'trabalho', 'pessoal'];
const AREA_LABEL = { casa: 'Casa', trabalho: 'Trabalho', pessoal: 'Pessoal' };

const PEOPLE = [
  { id: 'eu', name: 'Eu' },
  { id: 'victor', name: 'Victor' },
  { id: 'assistente', name: 'Assistente' },
  { id: 'designer', name: 'Designer' },
  { id: 'copy', name: 'Copy' },
  { id: 'terceiro', name: 'Terceiro' },
];

function personInitial(id) {
  const p = PEOPLE.find(p => p.id === id);
  return p ? p.name[0].toUpperCase() : '?';
}

function seedData() {
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

const Store = {
  data: null,

  load() {
    let raw = null;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    this.data = raw ? JSON.parse(raw) : seedData();
    return this.data;
  },

  save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data)); } catch (e) {}
  },

  getTasksToday() {
    return this.data.tasks.filter(t => t.when === 'today' && t.responsavel === 'eu');
  },

  getAcompanhando() {
    return this.data.tasks.filter(t => t.when === 'today' && t.responsavel !== 'eu');
  },

  toggleTask(id) {
    const t = this.data.tasks.find(t => t.id === id);
    if (t) { t.done = !t.done; this.save(); }
  },

  getRotina() {
    return this.data.rotina;
  },

  toggleRotina(id) {
    const r = this.data.rotina.find(r => r.id === id);
    if (r) { r.done = !r.done; this.save(); }
  },

  rotinaProgress() {
    const total = this.data.rotina.length;
    const done = this.data.rotina.filter(r => r.done).length;
    return { done, total };
  },

  addInboxItem(text) {
    const id = 'inbox-' + Date.now();
    this.data.tasks.push({ id, title: text, area: null, responsavel: 'eu', when: null, done: false });
    this.save();
    return id;
  },
};
