import type { ReactNode } from 'react';
import { Icon } from '../icons';

export function Collapsible({
  label,
  open,
  onToggle,
  children,
}: {
  label: ReactNode;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <button
        onClick={onToggle}
        className="flex items-center justify-between gap-2 bg-none border-none py-1.5 cursor-pointer text-text-mute text-[13px] text-left w-full"
      >
        <span className="flex items-center gap-1.5">{label}</span>
        <Icon name="chevron" size={16} color="#9ca3af" className={open ? 'rotate-90 transition-transform' : 'transition-transform'} />
      </button>
      {open && <div className="flex flex-col gap-3 pl-[22px] pt-1.5">{children}</div>}
    </div>
  );
}
