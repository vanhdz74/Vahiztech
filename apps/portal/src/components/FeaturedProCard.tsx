import React from 'react';
import { CreativeCloudLogo } from './AppIcons';
import { AppItem } from '../data/appsData';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface FeaturedProCardProps {
  app: AppItem;
  onOpenPlans: () => void;
  onOpenDetails: (app: AppItem) => void;
}

export const FeaturedProCard: React.FC<FeaturedProCardProps> = ({
  app,
  onOpenPlans,
  onOpenDetails,
}) => {
  return (
    <div className="relative group rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-5 sm:p-6 shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Decorative background glow & shapes */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header with Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <CreativeCloudLogo className="w-12 h-12 !shadow-none ring-2 ring-white/30" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Đề xuất tốt nhất
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-white tracking-tight leading-snug">
          {app.name}
        </h3>

        {/* Pricing Row */}
        <div className="flex items-baseline gap-2 mt-2 mb-2">
          <span className="text-xl font-black text-white tracking-tight">
            {app.price || 'US$37.38/tháng'}
          </span>
          {app.originalPrice && (
            <span className="text-xs text-blue-200 line-through">
              {app.originalPrice}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-blue-100 leading-relaxed mt-1 mb-3 line-clamp-3">
          {app.description}
        </p>

        {/* Terms Link */}
        <button
          onClick={() => onOpenDetails(app)}
          className="text-xs text-sky-200 hover:text-white font-medium underline underline-offset-2 transition inline-block text-left"
        >
          Xem chi tiết quyền lợi & điều khoản
        </button>
      </div>

      {/* Bottom Action: "Nâng cấp Pro ngay" */}
      <div className="relative z-10 pt-4 mt-2 border-t border-white/20 flex items-center justify-between">
        <span className="text-[11px] text-blue-100 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          Mở khóa toàn bộ Apps
        </span>
        <button
          onClick={onOpenPlans}
          className="h-9 px-5 rounded-full bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs transition shadow-lg shadow-black/10 active:scale-95 flex items-center gap-1.5"
        >
          <span>Khám phá ngay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
