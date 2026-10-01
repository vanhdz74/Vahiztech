import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { APPS_DATA } from '../data/appsData';

interface UpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdatesModal: React.FC<UpdatesModalProps> = ({ isOpen, onClose }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);

  if (!isOpen) return null;

  const handleCheckUpdates = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
    }, 1200);
  };

  const installedApps = APPS_DATA.filter((app) => app.version);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-black/70 backdrop-blur-md p-4 overflow-y-auto select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-8 text-left transition-colors">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
            <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Quản lý Cập nhật Ứng dụng
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kiểm tra và cấu hình cập nhật tự động cho toàn bộ hệ sinh thái Vahiztech Hub & SaaS Apps.
            </p>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoUpdateEnabled}
                onChange={(e) => setAutoUpdateEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">Tự động cập nhật khi có phiên bản mới</span>
          </div>

          <button
            onClick={handleCheckUpdates}
            disabled={isChecking}
            className="px-4 py-2 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-750 text-xs font-bold text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-slate-700 transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'Đang kiểm tra...' : 'Kiểm tra cập nhật'}</span>
          </button>
        </div>

        {/* App Versions List */}
        <div className="py-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {installedApps.map((app) => (
            <div
              key={app.id}
              className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-750 flex items-center justify-between hover:bg-white dark:hover:bg-slate-800 transition"
            >
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{app.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">Phiên bản: {app.version}</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Mới nhất
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Tất cả ứng dụng đã được xác thực mã hóa an toàn qua SSO.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-700 dark:text-slate-300 font-semibold bg-white dark:bg-slate-800 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
