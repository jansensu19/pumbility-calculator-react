import { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 p-6 shadow-2xl shadow-cyan-950/50 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
