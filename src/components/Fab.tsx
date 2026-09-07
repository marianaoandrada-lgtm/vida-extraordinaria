import { Icon } from '../icons';

export function Fab({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Capturar"
      title="Capturar"
      className="fixed right-5 bottom-[84px] md:bottom-6 w-[52px] h-[52px] rounded-full bg-accent flex items-center justify-center z-20 border-none cursor-pointer"
      style={{ boxShadow: '0 4px 12px rgba(47,95,217,.35)' }}
    >
      <Icon name="plus" size={22} color="#ffffff" />
    </button>
  );
}
