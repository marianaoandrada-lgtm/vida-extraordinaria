import { useNavigate } from 'react-router-dom';
import { Icon } from '../icons';

export function MaisSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  if (!open) return null;

  const go = (route: string) => {
    navigate('/' + route);
    onClose();
  };

  return (
    <div
      className="md:hidden fixed inset-0 bg-black/35 flex items-end justify-center z-30"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-surface rounded-t-2xl p-5 w-full max-w-[480px] flex flex-col gap-1">
        <button onClick={() => go('areas')} className="flex items-center gap-2.5 px-2 py-3 text-[15px] bg-transparent border-none text-left cursor-pointer text-text">
          <Icon name="areas" size={18} color="#374151" /> Áreas
        </button>
        <button onClick={() => go('vida')} className="flex items-center gap-2.5 px-2 py-3 text-[15px] bg-transparent border-none text-left cursor-pointer text-text">
          <Icon name="vida" size={18} color="#374151" /> Minha Vida Extraordinária
        </button>
        <button onClick={onClose} className="mt-2 text-sm font-semibold px-3.5 py-2 rounded-lg border-none bg-transparent text-text-mute cursor-pointer">
          Fechar
        </button>
      </div>
    </div>
  );
}
