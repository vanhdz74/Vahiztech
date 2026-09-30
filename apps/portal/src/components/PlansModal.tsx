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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#16181d] border border-[#2e333e] rounded-3xl shadow-2xl p-6 sm:p-8 text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#242832] hover:bg-[#2e3442] text-slate-400 hover:text-white flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1473e6]/10 text-sky-400 border border-[#1473e6]/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ưu đãi tốt nhất dành cho bạn</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Chọn gói ứng dụng phù hợp
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Mở khóa đầy đủ hơn 20+ phần mềm sáng tạo, phân quyền tập trung qua Keycloak Single Sign-On (SSO).
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Plan 1: Single App */}
          <div className="bg-[#1e2127] border border-[#2c303a] rounded-2xl p-5 flex flex-col justify-between hover:border-[#3a404d] transition">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gói Ứng Dụng Đơn</span>
              <h3 className="text-lg font-bold text-white mt-1">Single App</h3>
              <div className="mt-3 mb-4">
                <span className="text-2xl font-black text-white">US$22.99</span>
                <span className="text-xs text-slate-400"> / tháng</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Lựa chọn 1 ứng dụng bất kỳ như Photoshop, Illustrator, Premiere Pro kèm 100GB lưu trữ.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>1 ứng dụng Creative Cloud</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>100GB Cloud Storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Adobe Firefly 500 AI credits</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full h-9 rounded-full border border-slate-500 hover:border-white text-xs font-semibold text-white transition"
            >
              Chọn ứng dụng
            </button>
          </div>

          {/* Plan 2: Creative Cloud Pro (Featured) */}
          <div className="relative bg-[#1d2028] border-2 border-[#1473e6] rounded-2xl p-5 flex flex-col justify-between shadow-xl shadow-blue-500/10 scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#1473e6] text-white text-[10px] font-bold uppercase tracking-wider shadow">
              Phổ biến nhất - Tiết kiệm 45%
            </div>
            <div>
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Tất Cả Ứng Dụng</span>
              <h3 className="text-lg font-bold text-white mt-1">Creative Cloud Pro</h3>
              <div className="mt-3 mb-1">
                <span className="text-2xl font-black text-white">US$37.38</span>
                <span className="text-xs text-slate-400"> / tháng</span>
              </div>
              <div className="text-[11px] text-slate-500 line-through mb-4">US$67.99/tháng</div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Trọn bộ 20+ ứng dụng máy tính và di động, phông chữ Adobe Fonts cao cấp và 100GB lưu trữ.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Photoshop, Illustrator, Premiere, Acrobat...</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>1000 AI Generative credits / tháng</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>20,000+ Adobe Fonts bản quyền</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full h-9 rounded-full bg-[#1473e6] hover:bg-[#0d66d0] text-xs font-semibold text-white transition shadow-md shadow-blue-500/25"
            >
              Mua gói Pro ngay
            </button>
          </div>

          {/* Plan 3: Vahiztech Enterprise SSO Hub */}
          <div className="bg-[#1e2127] border border-[#2c303a] rounded-2xl p-5 flex flex-col justify-between hover:border-[#3a404d] transition">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Doanh Nghiệp Multi-Tenant</span>
              <h3 className="text-lg font-bold text-white mt-1">Vahiztech Enterprise</h3>
              <div className="mt-3 mb-4">
                <span className="text-2xl font-black text-white">Hub SSO</span>
                <span className="text-xs text-slate-400"> / Custom</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Bảo mật định danh Keycloak OIDC, CourseDemy E-learning và VihoTask cho toàn bộ tổ chức.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Single Sign-On (SSO) PKCE S256</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CourseDemy & VihoTask trọn gói</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Phân quyền Tenant & Role động</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenSSODrawer();
              }}
              className="mt-6 w-full h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition"
            >
              Mở Hub Quản Trị
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
