import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowUpRight, Clock, ExternalLink } from 'lucide-react';
import { AppItem } from '../data/appsData';
import { getAppLaunchUrl } from '../services/keycloak';
import { 
  CourseDemyIcon, 
  VihoTaskIcon, 
  KeycloakIcon,
  VahizAIIcon,
  VahizCloudIcon,
  VahizMeetIcon,
  VahizBillingIcon,
  VahizFormsIcon,
  VahizDocsIcon,
  VahiztechIcon
} from './AppIcons';

interface ProductDetailModalProps {
  app: AppItem | null;
  onClose: () => void;
  onOpenPlans: () => void;
  onLaunchApp?: (app: AppItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  app,
  onClose,
  onOpenPlans,
  onLaunchApp,
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
      case 'vahiz_billing':
        return <VahizBillingIcon className="w-16 h-16" />;
      case 'vahiz_forms':
        return <VahizFormsIcon className="w-16 h-16" />;
      case 'vahiz_docs':
        return <VahizDocsIcon className="w-16 h-16" />;
      default:
        return <VahiztechIcon className="w-16 h-16" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/75 backdrop-blur-md p-4 overflow-y-auto select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-left transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 hover:text-slate-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0">{renderIcon()}</div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {app.name}
              </h3>
              {app.badgeType === 'live' && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Đang hoạt động (Live)
                </span>
              )}
              {app.badgeType === 'coming_soon' && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700/80 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-500" />
                  Sắp ra mắt
                </span>
              )}
              {app.badgeType === 'iam' && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                  Quản trị bảo mật IAM
                </span>
              )}
            </div>
            {app.version && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium block">
                {app.version}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 mb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">Mô tả tổng quan</h4>
            <p>{app.fullDescription || app.description}</p>
          </div>

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
                <span className="font-medium">Đồng bộ định danh & Phân quyền Roles</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-750 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="font-medium">Kiến trúc Microservices mở rộng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {app.badgeType === 'coming_soon' && (
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Đang trong giai đoạn nghiên cứu & phát triển</span>
              </span>
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
              <button
                onClick={() => {
                  onClose();
                  if (onLaunchApp) {
                    onLaunchApp(app);
                  } else {
                    window.open(getAppLaunchUrl(app.targetUrl), '_blank');
                  }
                }}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm shadow-blue-500/20 active:scale-95"
              >
                <span>Mở App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
