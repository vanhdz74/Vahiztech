import React from 'react';
import { CreativeCloudLogo } from './AppIcons';
import { AppItem } from '../data/appsData';

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
    <div className="relative group p-[1.5px] rounded-2xl bg-gradient-to-br from-[#ff6b00] via-[#ff0077] via-[#9d4edd] to-[#00a8ff] shadow-xl hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300">
      <div className="h-full bg-[#16171b] rounded-[15px] p-5 flex flex-col justify-between select-none">
        <div>
          {/* App Logo */}
          <div className="mb-4">
            <CreativeCloudLogo className="w-11 h-11" />
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-white tracking-tight">
            {app.name}
          </h3>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mt-2 mb-2">
            <span className="text-sm font-bold text-white tracking-tight">
              {app.price || 'US$37.38/tháng'}
            </span>
            {app.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {app.originalPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-slate-300 leading-relaxed mt-2 mb-3 line-clamp-3">
            {app.description}
          </p>

          {/* Terms Link */}
          <button
            onClick={() => onOpenDetails(app)}
            className="text-xs text-[#31a8ff] hover:underline hover:text-[#52b6ff] transition inline-block text-left"
          >
            Xem điều khoản
          </button>
        </div>

        {/* Bottom Action: "Mua ngay" Pill */}
        <div className="pt-4 mt-2 flex justify-end">
          <button
            onClick={onOpenPlans}
            className="h-8 px-5 rounded-full bg-[#1473e6] hover:bg-[#0d66d0] active:bg-[#0952a8] text-white text-xs font-semibold transition shadow-md shadow-blue-500/20 active:scale-95"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};
