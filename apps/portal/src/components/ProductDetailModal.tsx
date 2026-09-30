import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowUpRight, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import { AppItem } from '../data/appsData';
import { 
  PhotoshopIcon, 
  IllustratorIcon, 
  AcrobatIcon, 
  FireflyIcon, 
  PremiereIcon, 
  AdobeExpressIcon, 
  InDesignIcon, 
  AfterEffectsIcon, 
  LightroomIcon, 
  LightroomClassicIcon, 
  SubstancePainterIcon, 
  CourseDemyIcon, 
  VihoTaskIcon, 
  KeycloakIcon,
  CreativeCloudLogo
} from './AppIcons';

interface ProductDetailModalProps {
  app: AppItem | null;
  onClose: () => void;
  onOpenPlans: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  app,
  onClose,
  onOpenPlans,
}) => {
  if (!app) return null;

  const renderIcon = () => {
    switch (app.iconKey) {
      case 'cc_pro':
        return <CreativeCloudLogo className="w-14 h-14" />;
      case 'ps':
        return <PhotoshopIcon className="w-14 h-14" />;
      case 'ai':
        return <IllustratorIcon className="w-14 h-14" />;
      case 'acrobat':
        return <AcrobatIcon className="w-14 h-14" />;
      case 'fi':
        return <FireflyIcon className="w-14 h-14" />;
      case 'pr':
        return <PremiereIcon className="w-14 h-14" />;
      case 'express':
        return <AdobeExpressIcon className="w-14 h-14" />;
      case 'id':
        return <InDesignIcon className="w-14 h-14" />;
      case 'ae':
        return <AfterEffectsIcon className="w-14 h-14" />;
      case 'lr':
        return <LightroomIcon className="w-14 h-14" />;
      case 'lrc':
        return <LightroomClassicIcon className="w-14 h-14" />;
      case 'pt':
        return <SubstancePainterIcon className="w-14 h-14" />;
      case 'cd':
        return <CourseDemyIcon className="w-14 h-14" />;
      case 'vt':
        return <VihoTaskIcon className="w-14 h-14" />;
      case 'kc':
        return <KeycloakIcon className="w-14 h-14" />;
      default:
        return <PhotoshopIcon className="w-14 h-14" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#181a1f] border border-[#2e333e] rounded-3xl shadow-2xl p-6 sm:p-8 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#242832] hover:bg-[#2e3442] text-slate-400 hover:text-white flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-[#2a2e38]">
          {renderIcon()}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{app.name}</h2>
              {app.version && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#252a34] text-slate-300 border border-[#323846]">
                  {app.version}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">{app.description}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-5 text-xs text-slate-300">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Giới thiệu sản phẩm</h4>
            <p className="leading-relaxed text-slate-300">
              {app.fullDescription || app.description}
            </p>
          </div>

          {app.price && (
            <div className="p-4 rounded-2xl bg-[#20232a] border border-[#2f3542] flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-xs block">Giá đăng ký</span>
                <span className="text-base font-bold text-white">{app.price}</span>
                {app.discountNote && (
                  <span className="text-[11px] text-emerald-400 block mt-0.5">{app.discountNote}</span>
                )}
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenPlans();
                }}
                className="px-5 py-2 rounded-full bg-[#1473e6] hover:bg-[#0d66d0] text-white text-xs font-semibold transition shadow"
              >
                Đăng ký ngay
              </button>
            </div>
          )}

          {/* Key Features */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-2.5">Tính năng nổi bật</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-[#20232a] border border-[#2e333e] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Tích hợp công nghệ AI thông minh mới nhất</span>
              </div>
              <div className="p-3 rounded-xl bg-[#20232a] border border-[#2e333e] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Đồng bộ dữ liệu đám mây Cloud Storage</span>
              </div>
              <div className="p-3 rounded-xl bg-[#20232a] border border-[#2e333e] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Cập nhật phiên bản tự động liên tục</span>
              </div>
              <div className="p-3 rounded-xl bg-[#20232a] border border-[#2e333e] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Bảo mật Single Sign-On đa thiết bị</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#2a2e38] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {app.productInfoUrl && (
              <a
                href={app.productInfoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#31a8ff] hover:underline flex items-center gap-1"
              >
                <span>Trang web chính thức</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-slate-600 hover:border-white text-xs font-medium text-slate-200 transition"
            >
              Đóng
            </button>
            {app.targetUrl && (
              <a
                href={app.targetUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full bg-[#1473e6] hover:bg-[#0d66d0] text-white text-xs font-semibold flex items-center gap-1.5 transition shadow"
              >
                <span>Mở App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
