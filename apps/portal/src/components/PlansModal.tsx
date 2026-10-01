import React from 'react';
import { X, Check, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { CreativeCloudLogo } from './AppIcons';

interface PlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSSODrawer: () => void;
}

export const PlansModal: React.FC<PlansModalProps> = ({
  isOpen,
  onClose,
  onOpenSSODrawer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-black/70 backdrop-blur-md p-4 overflow-y-auto select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-8 text-left transition-colors">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Ưu đãi tốt nhất dành cho bạn</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Chọn gói ứng dụng phù hợp
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Mở khóa đầy đủ hệ sinh thái Vahiztech SaaS, các công cụ sáng tạo AI và phân quyền tập trung qua Keycloak SSO.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Plan 1: Single App */}
          <div className="bg-slate-50/60 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-750 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-800 transition shadow-sm">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gói Ứng Dụng Đơn</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">Single App</h3>
              <div className="mt-3 mb-4">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100">US$9.99</span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> / tháng</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Lựa chọn 1 ứng dụng bất kỳ như CourseDemy, VihoTask hoặc Photoshop kèm lưu trữ đám mây.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>1 ứng dụng trong hệ sinh thái</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>100GB Cloud Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>500 AI Assistant credits</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full h-9 rounded-full border border-slate-300 dark:border-slate-700 hover:border-blue-400 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
            >
              Chọn ứng dụng
            </button>
          </div>

          {/* Plan 2: Vahiztech Suite Pro (Featured) */}
          <div className="relative bg-gradient-to-b from-blue-50/80 to-white dark:from-blue-950/40 dark:to-[#121723] border-2 border-blue-600 dark:border-blue-500 rounded-2xl p-5 flex flex-col justify-between shadow-xl shadow-blue-500/10 scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
              Phổ biến nhất - Tiết kiệm 45%
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Tất Cả Ứng Dụng</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">Vahiztech All-in-One Pro</h3>
              <div className="mt-3 mb-1">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100">US$37.38</span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> / tháng</span>
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 line-through mb-4">US$67.99/tháng</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Trọn bộ CourseDemy, VihoTask, Vahiz AI Copilot, 1TB Cloud Vault và các công cụ sáng tạo mở rộng.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>CourseDemy E-learning & VihoTask Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Không giới hạn Vahiz AI Assistant</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>1TB Cloud Vault & Backup an toàn</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition shadow-md shadow-blue-500/25 active:scale-95"
            >
              Mua gói Pro ngay
            </button>
          </div>

          {/* Plan 3: Enterprise SSO Hub */}
          <div className="bg-slate-50/60 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-750 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:bg-white dark:hover:bg-slate-800 transition shadow-sm">
            <div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Doanh Nghiệp Multi-Tenant</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">Enterprise SSO</h3>
              <div className="mt-3 mb-4">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100">Hub SSO</span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> / Custom</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Bảo mật định danh Keycloak OIDC PKCE, phân quyền Tenant và quản lý giấy phép cho toàn bộ tổ chức.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Single Sign-On (SSO) PKCE S256</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>CourseDemy & VihoTask không giới hạn user</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Phân quyền Tenant & Role động Keycloak</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenSSODrawer();
              }}
              className="mt-6 w-full h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition shadow-sm shadow-emerald-500/20 active:scale-95"
            >
              Mở Hub Quản Trị
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
