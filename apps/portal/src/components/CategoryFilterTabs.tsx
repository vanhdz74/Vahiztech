import React from 'react';
import { 
  LayoutGrid, 
  Bookmark, 
  Layers, 
  Rocket, 
  Sparkles, 
  Briefcase, 
  Palette, 
  FileText, 
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
    const iconClass = `w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`;
    switch (iconName) {
      case 'Grid':
        return <LayoutGrid className={iconClass} />;
      case 'Bookmark':
        return <Bookmark className={iconClass} />;
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'Rocket':
        return <Rocket className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'Briefcase':
        return <Briefcase className={iconClass} />;
      case 'Palette':
        return <Palette className={iconClass} />;
      case 'FileText':
        return <FileText className={iconClass} />;
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
              className={`h-8 px-3.5 rounded-full text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-[#121723] hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-blue-100/90 dark:border-slate-800 hover:border-blue-200 dark:hover:border-slate-700 shadow-2xs'
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
          className="h-8 px-3.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-[#121723] hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center gap-2 border border-blue-100 dark:border-slate-800 shadow-2xs transition whitespace-nowrap"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
          <span>Quản lý cập nhật</span>
        </button>
      </div>
    </div>
  );
};
