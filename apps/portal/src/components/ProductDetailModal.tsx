import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowUpRight, ShieldCheck, Download, ExternalLink, Rocket } from 'lucide-react';
import { AppItem } from '../data/appsData';
import { 
  CourseDemyIcon, 
  VihoTaskIcon, 
  KeycloakIcon,
  VahizAIIcon,
  VahizCloudIcon,
  VahizMeetIcon,
  VahizDocsIcon,
  VahizAnalyticsIcon,
  VahizDevHubIcon,
  VahizMailIcon,
  CreativeCloudLogo,
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
  SubstancePainterIcon
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
      case 'coursedemy':
        return <CourseDemyIcon className="w-16 h-16" />;
      case 'vihotask':
        return <VihoTaskIcon className="w-16 h-16" />;
      case 'keycloak':
        return <KeycloakIcon className="w-16 h-16" />;
      case 'vahiz_ai':
        return <VahizAIIcon className="w-16 h-16" />;
      case 'vahiz_cloud':
        return <VahizCloudIcon className="w-16 h-16" />;
      case 'vahiz_meet':
        return <VahizMeetIcon className="w-16 h-16" />;
      case 'vahiz_docs':
        return <VahizDocsIcon className="w-16 h-16" />;
      case 'vahiz_analytics':
        return <VahizAnalyticsIcon className="w-16 h-16" />;
      case 'vahiz_devhub':
        return <VahizDevHubIcon className="w-16 h-16" />;
      case 'vahiz_mail':
        return <VahizMailIcon className="w-16 h-16" />;
      case 'cc_pro':
        return <CreativeCloudLogo className="w-16 h-16" />;
      case 'ps':
        return <PhotoshopIcon className="w-16 h-16" />;
      case 'ai':
        return <IllustratorIcon className="w-16 h-16" />;
      case 'acrobat':
        return <AcrobatIcon className="w-16 h-16" />;
      case 'fi':
        return <FireflyIcon className="w-16 h-16" />;
      case 'pr':
        return <PremiereIcon className="w-16 h-16" />;
      case 'express':
        return <AdobeExpressIcon className="w-16 h-16" />;
      case 'id':
        return <InDesignIcon className="w-16 h-16" />;
      case 'ae':
        return <AfterEffectsIcon className="w-16 h-16" />;
      case 'lr':
        return <LightroomIcon className="w-16 h-16" />;
      case 'lrc':
        return <LightroomClassicIcon className="w-16 h-16" />;
      case 'pt':
        return <SubstancePainterIcon className="w-16 h-16" />;
      default:
        return <CourseDemyIcon className="w-16 h-16" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm p-4 overflow-y-auto select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-8 text-left transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="shrink-0">{renderIcon()}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{app.name}</h2>
              {app.version && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                  {app.version}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{app.description}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-5 text-xs text-slate-600 dark:text-slate-300">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">Giới thiệu sản phẩm & Giải pháp</h4>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {app.fullDescription || app.description}
            </p>
          </div>

          {app.price && (
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-850/70 border border-blue-100 dark:border-slate-750 flex items-center justify-between">
              <div>
                <span className="text-slate-500 dark:text-slate-400 text-xs block">Giá đăng ký</span>
                <span className="text-base font-bold text-slate-900 dark:text-slate-100">{app.price}</span>
                {app.discountNote && (
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium block mt-0.5">{app.discountNote}</span>
                )}
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenPlans();
                }}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm shadow-blue-500/20 active:scale-95"
              >
                Đăng ký gói
              </button>
            </div>
          )}

          {/* Key Features */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2.5">Tính năng & Tiêu chuẩn kiến trúc</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-750 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="font-medium">Tích hợp Single Sign-On (SSO) PKCE S256</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-750 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="font-medium">Phân lập dữ liệu tổ chức (Multi-Tenant)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-750 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="font-medium">Cập nhật dữ liệu thời gian thực WebSocket</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-750 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="font-medium">Tự động đồng bộ quyền hạn qua JWT Bearer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {app.productInfoUrl && (
              <a
                href={app.productInfoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <span>Trang web chính thức</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 transition"
            >
              Đóng
            </button>
            {app.targetUrl && (
              <a
                href={app.targetUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm shadow-blue-500/20 active:scale-95"
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
