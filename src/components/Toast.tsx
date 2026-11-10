import React from 'react';
import { useApp } from '../context/AppContext.tsx';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl shadow-xl border backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200 ${
            toast.type === 'warning'
              ? 'bg-amber-500/95 text-white border-amber-600'
              : toast.type === 'info'
              ? 'bg-[#0E1A3A]/95 text-white border-slate-700'
              : 'bg-[#0FB57F]/95 text-white border-emerald-600'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'warning' ? (
              <AlertCircle className="w-4 h-4" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
          </div>
          <p className="text-xs sm:text-sm font-medium leading-snug flex-1">
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/80 hover:text-white shrink-0 p-0.5"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
