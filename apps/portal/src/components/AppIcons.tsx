import React from 'react';
import { 
  KeyRound, 
  Sparkles, 
  Cloud, 
  Video, 
  FileText, 
  CreditCard,
  ClipboardList,
  Layers
} from 'lucide-react';
import coursedemyFavicon from '../assets/logos/coursedemy.png';
import coursedemyFullLogo from '../assets/logos/coursedemy-logo.png';
import vihotaskLogo from '../assets/logos/vihotask.png';
import vahiztechLogo from '../assets/logos/vahiztech-logo.png';
import vahiztechVectorLogo from '../assets/logos/vahiztech-icon-vector.jpg';

// Vahiztech Official Brand Icon
export const VahiztechIcon: React.FC<{ 
  className?: string; 
  variant?: 'app' | 'vector' | 'raw' 
}> = ({ 
  className = 'w-10 h-10', 
  variant = 'app' 
}) => {
  const src = variant === 'vector' ? vahiztechVectorLogo : vahiztechLogo;
  if (variant === 'raw') {
    return <img src={src} alt="Vahiztech" className={`object-contain ${className}`} />;
  }
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-md shadow-blue-500/25 border border-white/10 shrink-0 ${className}`}>
      <img src={src} alt="Vahiztech" className="w-full h-full object-cover" />
    </div>
  );
};

export const CreativeCloudLogo: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-2.5 shadow-lg shadow-blue-500/25 ${className}`}>
    <Layers className="w-full h-full text-white" />
  </div>
);

// CourseDemy (Real App)
export const CourseDemyIcon: React.FC<{ className?: string; variant?: 'icon' | 'full' | 'raw' }> = ({ 
  className = 'w-11 h-11',
  variant = 'icon'
}) => {
  if (variant === 'full') {
    return (
      <img
        src={coursedemyFullLogo}
        alt="VCourseDemy"
        className={`object-contain ${className}`}
      />
    );
  }

  if (variant === 'raw') {
    return (
      <img
        src={coursedemyFavicon}
        alt="VCourseDemy"
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <div className={`rounded-2xl bg-white dark:bg-slate-800 border border-indigo-100/80 dark:border-slate-700/80 flex items-center justify-center p-1.5 shadow-md shadow-indigo-500/15 overflow-hidden select-none transition-transform group-hover:scale-105 ${className}`}>
      <img
        src={coursedemyFavicon}
        alt="VCourseDemy"
        className="w-full h-full object-contain drop-shadow-xs"
      />
    </div>
  );
};

// CourseDemy Full Brand Logo (Horizontal)
export const CourseDemyFullLogo: React.FC<{ className?: string }> = ({ className = 'h-8 w-auto' }) => (
  <img
    src={coursedemyFullLogo}
    alt="VCourseDemy"
    className={`object-contain ${className}`}
  />
);

// VihoTask (Real App)
export const VihoTaskIcon: React.FC<{ className?: string; variant?: 'icon' | 'raw' }> = ({ 
  className = 'w-11 h-11',
  variant = 'icon'
}) => {
  if (variant === 'raw') {
    return (
      <img
        src={vihotaskLogo}
        alt="VihoTask"
        className={`object-contain ${className}`}
      />
    );
  }

  return (
    <div className={`rounded-2xl bg-white dark:bg-slate-800 border border-teal-100/80 dark:border-slate-700/80 flex items-center justify-center p-1.5 shadow-md shadow-teal-500/15 overflow-hidden select-none transition-transform group-hover:scale-105 ${className}`}>
      <img
        src={vihotaskLogo}
        alt="VihoTask"
        className="w-full h-full object-contain drop-shadow-xs"
      />
    </div>
  );
};

// VihoTask Logo with Brand Text
export const VihoTaskFullLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img
      src={vihotaskLogo}
      alt="VihoTask"
      className="h-full w-auto object-contain"
    />
    <span className="font-bold text-slate-800 dark:text-slate-100 text-sm tracking-tight">VihoTask</span>
  </div>
);

// Keycloak IAM (Real Admin)
export const KeycloakIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-orange-500/20 p-2.5 ${className}`}>
    <KeyRound className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz AI Copilot & Tutor (Sắp ra mắt)
export const VahizAIIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 p-2.5 ${className}`}>
    <Sparkles className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz Cloud Storage & Drive (Sắp ra mắt)
export const VahizCloudIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 p-2.5 ${className}`}>
    <Cloud className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz Live Classroom & Meet (Sắp ra mắt)
export const VahizMeetIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-purple-500/20 p-2.5 ${className}`}>
    <Video className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz Billing & Pay Gateway (Sắp ra mắt)
export const VahizBillingIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 p-2.5 ${className}`}>
    <CreditCard className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz Forms & Quizzes (Sắp ra mắt)
export const VahizFormsIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 p-2.5 ${className}`}>
    <ClipboardList className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz Docs & Knowledge Wiki (Sắp ra mắt)
export const VahizDocsIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 p-2.5 ${className}`}>
    <FileText className="w-full h-full text-white stroke-[2.2]" />
  </div>
);
