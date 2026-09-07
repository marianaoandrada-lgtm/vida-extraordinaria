import { NavLink } from 'react-router-dom';
import { Icon } from '../icons';
import { NAV_ITEMS } from '../nav';

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-60 shrink-0 bg-surface border-r border-border p-6">
      <div className="text-sm font-bold px-3.5 pb-5">Vida Extraordinária</div>
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={'/' + item.id}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3.5 py-2.5 rounded-lg border-l-[3px] text-sm no-underline',
                isActive
                  ? item.warm
                    ? 'bg-warm-soft border-warm text-warm font-semibold'
                    : 'bg-accent-soft border-accent text-accent font-semibold'
                  : 'border-transparent text-text-mute hover:bg-accent-soft',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={item.icon} size={18} color={isActive ? (item.warm ? '#b3591f' : '#2f5fd9') : '#6b7280'} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
