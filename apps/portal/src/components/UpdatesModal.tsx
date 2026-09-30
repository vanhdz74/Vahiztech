import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, SlidersHorizontal, ArrowDownCircle, ShieldCheck } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#17191e] border border-[#2b2f3a] rounded-3xl shadow-2xl p-6 sm:p-8 text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#242832] hover:bg-[#2e3442] text-slate-400 hover:text-white flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-[#282c36]">
          <div className="p-2.5 rounded-2xl bg-[#222630] border border-[#303644] text-slate-200">
            <SlidersHorizontal className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Quản lý Cập nhật Ứng dụng
            </h2>
            <p className="text-xs text-slate-400">
              Kiểm tra và cấu hình cập nhật tự động cho toàn bộ hệ sinh thái Creative Cloud & Vahiztech.
            </p>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#282c36]">
          <div className="flex items-center gap-2.5">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoUpdateEnabled}
                onChange={(e) => setAutoUpdateEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1473e6]"></div>
            </label>
            <span className="text-xs text-slate-300 font-medium">Tự động cập nhật khi có phiên bản mới</span>
          </div>

          <button
            onClick={handleCheckUpdates}
            disabled={isChecking}
            className="px-4 py-2 rounded-full bg-[#242832] hover:bg-[#2d3240] text-xs font-semibold text-slate-200 hover:text-white transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'Đang kiểm tra...' : 'Kiểm tra cập nhật'}</span>
          </button>
        </div>

        {/* App Versions List */}
        <div className="py-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {installedApps.map((app) => (
            <div
              key={app.id}
              className="p-3 rounded-2xl bg-[#1e2128] border border-[#2c313d] flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-white">{app.name}</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">Phiên bản hiện tại: {app.version}</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mới nhất
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#282c36] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Tất cả ứng dụng đã được xác thực mã hóa an toàn.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full border border-slate-600 hover:border-white text-slate-200 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
