// Shared inline icons — stroke-based, 24px viewBox, recolorable.
const Icons = {
  hoje: '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>',
  inbox: '<path d="M4 4h16v9l-3 7H7l-3-7V4z"/><path d="M4 13h5l1 2h4l1-2h5"/>',
  semana: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>',
  projetos: '<rect x="3" y="7" width="7" height="7"/><rect x="14" y="7" width="7" height="7"/><rect x="8.5" y="14" width="7" height="7"/>',
  areas: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>',
  vida: '<path d="M12 2l2.6 6.6L21 10l-5 4.4L17.5 21 12 17.3 6.5 21 8 14.4 3 10l6.4-1.4z"/>',
  mais: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  chevron: '<polyline points="9 6 15 12 9 18"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/>',
};

function svgIcon(name, color, size) {
  const s = size || 18;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${Icons[name] || ''}</svg>`;
}
