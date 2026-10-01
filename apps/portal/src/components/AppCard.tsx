import React, { useState, useRef, useEffect } from 'react';
import { 
  Info, 
  MoreHorizontal, 
  ExternalLink, 
  Sparkles,
  ArrowUpRight,
  Share2,
  CheckCircle2,
  Rocket
} from 'lucide-react';
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

interface AppCardProps {
  app: AppItem;
  onOpenDetails: (app: AppItem) => void;
  onOpenPlans: () => void;
  isLicensed?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onOpenDetails,
  onOpenPlans,
  isLicensed = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderIcon = () => {
    switch (app.iconKey) {
      case 'coursedemy':
        return <CourseDemyIcon className="w-12 h-12" />;
      case 'vihotask':
        return <VihoTaskIcon className="w-12 h-12" />;
      case 'keycloak':
        return <KeycloakIcon className="w-12 h-12" />;
      case 'vahiz_ai':
        return <VahizAIIcon className="w-12 h-12" />;
      case 'vahiz_cloud':
        return <VahizCloudIcon className="w-12 h-12" />;
      case 'vahiz_meet':
        return <VahizMeetIcon className="w-12 h-12" />;
      case 'vahiz_docs':
        return <VahizDocsIcon className="w-12 h-12" />;
      case 'vahiz_analytics':
        return <VahizAnalyticsIcon className="w-12 h-12" />;
      case 'vahiz_devhub':
        return <VahizDevHubIcon className="w-12 h-12" />;
      case 'vahiz_mail':
        return <VahizMailIcon className="w-12 h-12" />;
      case 'cc_pro':
        return <CreativeCloudLogo className="w-12 h-12" />;
      case 'ps':
        return <PhotoshopIcon className="w-12 h-12" />;
      case 'ai':
        return <IllustratorIcon className="w-12 h-12" />;
      case 'acrobat':
        return <AcrobatIcon className="w-12 h-12" />;
      case 'fi':
        return <FireflyIcon className="w-12 h-12" />;
      case 'pr':
        return <PremiereIcon className="w-12 h-12" />;
      case 'express':
        return <AdobeExpressIcon className="w-12 h-12" />;
      case 'id':
        return <InDesignIcon className="w-12 h-12" />;
      case 'ae':
        return <AfterEffectsIcon className="w-12 h-12" />;
      case 'lr':
        return <LightroomIcon className="w-12 h-12" />;
      case 'lrc':
        return <LightroomClassicIcon className="w-12 h-12" />;
      case 'pt':
        return <SubstancePainterIcon className="w-12 h-12" />;
      default:
        return <CourseDemyIcon className="w-12 h-12" />;
    }
  };

  const handleLaunchApp = () => {
    if (app.targetUrl) {
      window.open(app.targetUrl, '_blank');
    } else {
      onOpenDetails(app);
    }
  };

  // Badge pill styling
  const renderBadge = () => {
    if (!app.infoStatus) return null;

    if (app.badgeType === 'live') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {app.infoStatus}
        </span>
      );
    }

    if (app.badgeType === 'concept') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-2xs">
          <Rocket className="w-3 h-3 text-purple-500 dark:text-purple-400" />
          {app.infoStatus}
        </span>
      );
    }

    if (app.badgeType === 'iam') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          {app.infoStatus}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
        <Info className="w-3 h-3 text-blue-500 shrink-0" />
        {app.infoStatus}
      </span>
    );
  };

  return (
    <div className="relative group bg-white dark:bg-[#121723] hover:bg-[#fafcff] dark:hover:bg-[#161d2c] border border-blue-100/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 select-none shadow-[0_2px_10px_rgba(37,99,235,0.04)] dark:shadow-none hover:shadow-[0_10px_25px_rgba(37,99,235,0.09)] hover:-translate-y-0.5">
      <div>
        {/* Top Header: App Icon, Name, and 3-dots Menu */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="transition-transform group-hover:scale-105 duration-200">
              {renderIcon()}
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {app.name}
              </h3>
              {app.version && (
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-medium">
                  {app.version}
                </span>
              )}
            </div>
          </div>

          {/* 3-dots Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
              title="Tùy chọn khác"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white dark:bg-[#161d2c] border border-blue-100 dark:border-slate-750 rounded-2xl shadow-xl py-1.5 z-30 text-xs text-left animate-in fade-in duration-150">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenDetails(app);
                  }}
                  className="w-full px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-400 flex items-center gap-2 font-medium transition"
                >
                  <Info className="w-3.5 h-3.5 text-blue-500" />
                  <span>Thông tin sản phẩm</span>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigator.clipboard?.writeText(window.location.href);
                  }}
                  className="w-full px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-400 flex items-center gap-2 font-medium transition"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sao chép liên kết</span>
                </button>
                {app.targetUrl && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.open(app.targetUrl, '_blank');
                    }}
                    className="w-full px-3.5 py-2 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 font-medium transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Mở ứng dụng ngay</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-2.5">
          {renderBadge()}
        </div>

        {/* App Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-2.5">
          {app.description}
        </p>

        {/* Product Info Link */}
        <button
          onClick={() => onOpenDetails(app)}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition inline-block text-left"
        >
          Xem chi tiết tính năng
        </button>
      </div>

      {/* Action Buttons at Bottom */}
      <div className="pt-3.5 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
        {/* Free-only button */}
        {app.actionType === 'free' && (
          <button
            onClick={() => onOpenDetails(app)}
            className="h-8 px-4 rounded-full border border-blue-200 dark:border-blue-800 hover:border-blue-300 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-950/40 hover:bg-blue-100/60 transition active:scale-95 shadow-2xs"
          >
            Sử dụng miễn phí
          </button>
        )}

        {/* Concept / Future App button */}
        {app.actionType === 'concept_app' && (
          <>
            <button
              onClick={() => onOpenDetails(app)}
              className="h-8 px-3.5 rounded-full border border-purple-200 dark:border-purple-800 hover:border-purple-300 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50/60 dark:bg-purple-950/40 hover:bg-purple-100/60 transition active:scale-95 shadow-2xs"
            >
              Xem lộ trình
            </button>
            <button
              onClick={() => onOpenDetails(app)}
              className="h-8 px-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs font-semibold text-white transition shadow-sm shadow-purple-500/20 active:scale-95 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Đăng ký thử nghiệm</span>
            </button>
          </>
        )}

        {/* Trial & Buy buttons */}
        {app.actionType === 'trial_and_buy' && (
          <>
            <button
              onClick={() => onOpenDetails(app)}
              className="h-8 px-3.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition active:scale-95 whitespace-nowrap"
            >
              Dùng thử
            </button>
            <button
              onClick={onOpenPlans}
              className="h-8 px-4 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-xs font-semibold text-white transition shadow-sm shadow-blue-500/20 active:scale-95"
            >
              Mua
            </button>
          </>
        )}

        {/* Real Live SaaS Ecosystem Apps (CourseDemy, VihoTask, Keycloak) */}
        {app.actionType === 'saas_app' && (
          <>
            <button
              onClick={() => onOpenDetails(app)}
              className="h-8 px-3.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition active:scale-95"
            >
              Chi tiết
            </button>
            <button
              onClick={handleLaunchApp}
              className={`h-8 px-4 rounded-full text-xs font-semibold flex items-center gap-1.5 transition shadow-sm active:scale-95 ${
                app.id === 'coursedemy'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/25'
                  : app.id === 'vihotask'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-amber-500/25'
              }`}
            >
              <span>{isLicensed ? 'Mở App' : 'Truy cập'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
