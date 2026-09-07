import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from '../icons';
import { NAV_ITEMS, TABBAR_MAIN } from '../nav';

export function TabBar({ onMaisClick }: { onMaisClick: () => void }) {
  const location = useLocation();
  const active = location.pathname.replace('/', '') || 'hoje';
  const isMais = active === 'areas' || active === 'vida';
  const maisColor = isMais ? (active === 'vida' ? '#b3591f' : '#2f5fd9') : '#9ca3af';

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex items-center justify-around z-20">
      {TABBAR_MAIN.map((id) => {
        const item = NAV_ITEMS.find((i) => i.id === id)!;
        return (
          <NavLink
            key={id}
            to={'/' + id}
            className="flex flex-col items-center gap-0.5 text-[10px] text-text-faint no-underline"
          >
            {({ isActive }) => (
              <>
                <Icon name={item.icon} size={18} color={isActive ? '#2f5fd9' : '#9ca3af'} />
                <span className={isActive ? 'text-accent font-bold' : ''}>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
      <button onClick={onMaisClick} className="flex flex-col items-center gap-0.5 text-[10px] bg-none border-none">
        <Icon name="mais" size={18} color={maisColor} />
        <span className={isMais ? (active === 'vida' ? 'text-warm font-bold' : 'text-accent font-bold') : 'text-text-faint'}>Mais</span>
      </button>
    </nav>
  );
}
