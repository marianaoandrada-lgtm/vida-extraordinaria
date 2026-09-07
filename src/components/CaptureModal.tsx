import { useEffect, useRef, useState } from 'react';
import { Icon } from '../icons';

export function CaptureModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
}) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setText('');
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/35 flex items-end justify-center z-30"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-surface rounded-t-2xl p-5 w-full max-w-[480px] flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[15px] font-bold">
          <Icon name="mic" size={16} color="#9ca3af" />
          Capturar
        </div>
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Digite sua ideia... (ex. falar com a dona do apto sobre a janela)'
          rows={3}
          className="w-full border border-border rounded-lg p-2.5 text-sm bg-bg text-text resize-none"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-sm font-semibold px-3.5 py-2 rounded-lg border-none bg-transparent text-text-mute cursor-pointer">
            Cancelar
          </button>
          <button
            onClick={() => { if (text.trim()) onSave(text.trim()); onClose(); }}
            className="text-sm font-semibold px-3.5 py-2 rounded-lg border-none bg-accent text-white cursor-pointer"
          >
            Salvar na Inbox
          </button>
        </div>
      </div>
    </div>
  );
}
