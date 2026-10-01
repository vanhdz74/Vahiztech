import React from 'react';
import { 
  GraduationCap, 
  Kanban, 
  KeyRound, 
  Sparkles, 
  Cloud, 
  Video, 
  FileText, 
  BarChart3, 
  Terminal, 
  Mail, 
  ShieldCheck,
  Layers,
  Zap
} from 'lucide-react';

export const CreativeCloudLogo: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center p-2.5 shadow-lg shadow-blue-500/25 ${className}`}>
    <Layers className="w-full h-full text-white" />
  </div>
);

// CourseDemy (Real App)
export const CourseDemyIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 p-2.5 ${className}`}>
    <GraduationCap className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// VihoTask (Real App)
export const VihoTaskIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-teal-500 via-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 p-2.5 ${className}`}>
    <Kanban className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Keycloak IAM (Real Admin)
export const KeycloakIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-orange-500/20 p-2.5 ${className}`}>
    <KeyRound className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz AI Assistant (Future Concept)
export const VahizAIIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 p-2.5 ${className}`}>
    <Sparkles className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz Cloud Vault & Storage (Future Concept)
export const VahizCloudIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 p-2.5 ${className}`}>
    <Cloud className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz Meet (Future Concept)
export const VahizMeetIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-purple-500/20 p-2.5 ${className}`}>
    <Video className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz Docs (Future Concept)
export const VahizDocsIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 p-2.5 ${className}`}>
    <FileText className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz Analytics (Future Concept)
export const VahizAnalyticsIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 p-2.5 ${className}`}>
    <BarChart3 className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz DevHub & API Gateway (Future Concept)
export const VahizDevHubIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-slate-700 via-blue-700 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-blue-700/20 p-2.5 ${className}`}>
    <Terminal className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Vahiz Mail (Future Concept)
export const VahizMailIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 p-2.5 ${className}`}>
    <Mail className="w-full h-full text-white stroke-[2.2]" />
  </div>
);

// Creative Suite Icons
export const PhotoshopIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-[#001e36] border-2 border-[#31a8ff] flex items-center justify-center font-black text-[#31a8ff] select-none shadow-md shadow-blue-500/10 ${className}`}>
    <span className="text-base tracking-tight font-extrabold">Ps</span>
  </div>
);

export const IllustratorIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-[#330000] border-2 border-[#ff9a00] flex items-center justify-center font-black text-[#ff9a00] select-none shadow-md shadow-amber-500/10 ${className}`}>
    <span className="text-base tracking-tight font-extrabold">Ai</span>
  </div>
);

export const AcrobatIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-[#eb1000] to-[#b30000] flex items-center justify-center p-2 select-none shadow-md shadow-red-500/20 ${className}`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
      <path d="M12 3v18" />
      <path d="M4 16c2-4 5-9 8-13 3 4 6 9 8 13" />
      <path d="M6 14h12" />
    </svg>
  </div>
);

export const FireflyIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-[#ff5e00] to-[#e43e2b] flex items-center justify-center font-black text-white select-none shadow-md shadow-orange-500/20 ${className}`}>
    <span className="text-base tracking-tight font-extrabold">Fi</span>
  </div>
);

export const PremiereIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-[#00005b] border-2 border-[#9999ff] flex items-center justify-center font-black text-[#9999ff] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-extrabold">Pr</span>
  </div>
);

export const AdobeExpressIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-gradient-to-br from-[#8a2be2] via-[#ff007f] to-[#ff7a00] flex items-center justify-center select-none shadow-md shadow-pink-500/20 p-2 ${className}`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
      <path d="m12 3-8 18h4l2-5h4l2 5h4z" />
      <path d="m10 12 2-5 2 5z" />
    </svg>
  </div>
);

export const InDesignIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-[#2e001f] border-2 border-[#ff3366] flex items-center justify-center font-black text-[#ff3366] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-extrabold">Id</span>
  </div>
);

export const AfterEffectsIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-[#00005b] border-2 border-[#9999ff] flex items-center justify-center font-black text-[#9999ff] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-extrabold">Ae</span>
  </div>
);

export const LightroomIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-[#001e2b] border-2 border-[#31a8ff] flex items-center justify-center font-black text-[#31a8ff] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-extrabold">Lr</span>
  </div>
);

export const LightroomClassicIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-[#001e2b] border-2 border-[#00c8ff] flex items-center justify-center font-black text-[#00c8ff] select-none shadow-md ${className}`}>
    <span className="text-sm tracking-tight font-extrabold">Lrc</span>
  </div>
);

export const SubstancePainterIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div className={`rounded-2xl bg-[#002b11] border-2 border-[#14f068] flex items-center justify-center font-black text-[#14f068] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-extrabold">Pt</span>
  </div>
);
