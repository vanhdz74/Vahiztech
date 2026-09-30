import React, { useState, useRef, useEffect } from 'react';
import { 
  Info, 
  MoreHorizontal, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  Share2
} from 'lucide-react';
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
  KeycloakIcon 
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
      case 'ps':
        return <PhotoshopIcon className="w-10 h-10" />;
      case 'ai':
        return <IllustratorIcon className="w-10 h-10" />;
      case 'acrobat':
        return <AcrobatIcon className="w-10 h-10" />;
      case 'fi':
        return <FireflyIcon className="w-10 h-10" />;
      case 'pr':
        return <PremiereIcon className="w-10 h-10" />;
      case 'express':
        return <AdobeExpressIcon className="w-10 h-10" />;
      case 'id':
        return <InDesignIcon className="w-10 h-10" />;
      case 'ae':
        return <AfterEffectsIcon className="w-10 h-10" />;
      case 'lr':
        return <LightroomIcon className="w-10 h-10" />;
      case 'lrc':
        return <LightroomClassicIcon className="w-10 h-10" />;
      case 'pt':
        return <SubstancePainterIcon className="w-10 h-10" />;
      case 'cd':
        return <CourseDemyIcon className="w-10 h-10" />;
      case 'vt':
        return <VihoTaskIcon className="w-10 h-10" />;
      case 'kc':
        return <KeycloakIcon className="w-10 h-10" />;
      default:
        return <PhotoshopIcon className="w-10 h-10" />;
    }
  };

  const handleLaunchApp = () => {
    if (app.targetUrl) {
      window.open(app.targetUrl, '_blank');
    } else {
      onOpenDetails(app);
    }
  };

  return (
    <div className="relative group bg-[#16171b] hover:bg-[#191b20] border border-[#24272c] hover:border-[#353942] rounded-2xl p-5 flex flex-col justify-between transition-all select-none shadow-sm hover:shadow-xl">
      <div>
        {/* Top Header: App Icon, Name, and 3-dots Menu */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {renderIcon()}
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                {app.name}
              </h3>
              {app.version && (
                <span className="text-[10px] text-slate-400 font-mono">
                  {app.version}
                </span>
              )}
            </div>
          </div>

          {/* 3-dots Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#252830] transition"
              title="Tùy chọn khác"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-[#1f2229] border border-[#2e333e] rounded-xl shadow-2xl py-1.5 z-30 text-xs text-left">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenDetails(app);
                  }}
                  className="w-full px-3 py-2 text-slate-200 hover:bg-[#282d36] hover:text-white flex items-center gap-2"
                >
                  <Info className="w-3.5 h-3.5 text-sky-400" />
                  <span>Thông tin sản phẩm</span>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigator.clipboard?.writeText(window.location.href);
                  }}
                  className="w-full px-3 py-2 text-slate-200 hover:bg-[#282d36] hover:text-white flex items-center gap-2"
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
                    className="w-full px-3 py-2 text-slate-200 hover:bg-[#282d36] hover:text-white flex items-center gap-2 border-t border-[#2e333e]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mở tab trực tiếp</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info line (e.g. "Đã có bản dùng thử") */}
        {app.infoStatus && (
          <div className="flex items-center gap-1.5 text-xs text-[#31a8ff] mb-2 font-medium">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{app.infoStatus}</span>
          </div>
        )}

        {/* App Description */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-2">
          {app.description}
        </p>

        {/* Blue Product Info Link */}
        <button
          onClick={() => onOpenDetails(app)}
          className="text-xs text-[#31a8ff] hover:underline hover:text-[#52b6ff] transition inline-block text-left"
        >
          Xem thông tin sản phẩm
        </button>
      </div>

      {/* Action Buttons at Bottom */}
      <div className="pt-4 mt-3 border-t border-[#24272c] flex items-center justify-end gap-2">
        {/* Free-only button (e.g. Firefly, Express) */}
        {app.actionType === 'free' && (
          <button
            onClick={() => onOpenDetails(app)}
            className="h-8 px-4 rounded-full border border-slate-500/80 hover:border-white text-xs font-medium text-slate-100 hover:text-white hover:bg-slate-800/60 transition active:scale-95"
          >
            Sử dụng miễn phí
          </button>
        )}

        {/* Trial & Buy buttons (e.g. Photoshop, Illustrator, Acrobat, Premiere, InDesign) */}
        {app.actionType === 'trial_and_buy' && (
          <>
            <button
              onClick={() => onOpenDetails(app)}
              className="h-8 px-3.5 rounded-full border border-slate-500/80 hover:border-white text-xs font-medium text-slate-100 hover:text-white hover:bg-slate-800/60 transition active:scale-95 whitespace-nowrap"
            >
              Dùng thử miễn phí
            </button>
            <button
              onClick={onOpenPlans}
              className="h-8 px-4 rounded-full bg-[#1473e6] hover:bg-[#0d66d0] active:bg-[#0952a8] text-xs font-semibold text-white transition shadow-sm active:scale-95"
            >
              Mua
            </button>
          </>
        )}

        {/* SaaS Ecosystem Apps (CourseDemy, VihoTask, Keycloak) */}
        {app.actionType === 'saas_app' && (
          <>
            <button
              onClick={() => onOpenDetails(app)}
              className="h-8 px-3 rounded-full border border-slate-500/80 hover:border-white text-xs font-medium text-slate-100 hover:text-white hover:bg-slate-800/60 transition active:scale-95"
            >
              Chi tiết
            </button>
            <button
              onClick={handleLaunchApp}
              className={`h-8 px-4 rounded-full text-xs font-semibold flex items-center gap-1 transition shadow-sm active:scale-95 ${
                isLicensed
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-[#1473e6] hover:bg-[#0d66d0] text-white'
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
