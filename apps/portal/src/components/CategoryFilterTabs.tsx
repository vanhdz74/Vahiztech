import React from 'react';
import { 
  LayoutGrid, 
  Bookmark, 
  Camera, 
  Video, 
  PenTool, 
  FileText, 
  Box, 
  FlaskConical, 
  Rocket, 
  SlidersHorizontal 
} from 'lucide-react';
import { CATEGORIES } from '../data/appsData';

interface CategoryFilterTabsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onOpenUpdatesModal: () => void;
  appCount?: number;
}

export const CategoryFilterTabs: React.FC<CategoryFilterTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenUpdatesModal,
}) => {
  const getIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-slate-300'}`;
    switch (iconName) {
      case 'Grid':
        return <LayoutGrid className={iconClass} />;
      case 'Bookmark':
        return <Bookmark className={iconClass} />;
      case 'Camera':
        return <Camera className={iconClass} />;
      case 'Film':
        return <Video className={iconClass} />;
      case 'Palette':
        return <PenTool className={iconClass} />;
      case 'FileText':
        return <FileText className={iconClass} />;
      case 'Box':
        return <Box className={iconClass} />;
      case 'Flask':
        return <FlaskConical className={iconClass} />;
      case 'Rocket':
        return <Rocket className={iconClass} />;
      default:
        return <LayoutGrid className={iconClass} />;
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none select-none">
      {/* Scrollable pill buttons */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`h-8 px-3.5 rounded-full text-xs font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-slate-950 font-semibold shadow-sm'
                  : 'bg-[#1c1e23] hover:bg-[#252830] text-slate-300 border border-[#2b2f38]'
              }`}
            >
              {getIcon(cat.icon, isActive)}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right side: "Quản lý cập nhật" button */}
      <div className="shrink-0 pl-2">
        <button
          onClick={onOpenUpdatesModal}
          className="h-8 px-3 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-[#20232a] flex items-center gap-2 border border-[#2b2f38] transition whitespace-nowrap"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span>Quản lý cập nhật</span>
        </button>
      </div>
    </div>
  );
};
