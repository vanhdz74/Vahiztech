import React from 'react';

export const CreativeCloudLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br from-red-500 via-amber-500 to-pink-500 flex items-center justify-center p-1.5 shadow-md shadow-red-500/20 ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
      <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  </div>
);

export const PhotoshopIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-[#001e36] border-2 border-[#31a8ff] flex items-center justify-center font-black text-[#31a8ff] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Ps</span>
  </div>
);

export const IllustratorIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-[#330000] border-2 border-[#ff9a00] flex items-center justify-center font-black text-[#ff9a00] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Ai</span>
  </div>
);

export const AcrobatIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-[#eb1000] flex items-center justify-center p-1.5 select-none shadow-md ${className}`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
      <path d="M12 3v18" />
      <path d="M4 16c2-4 5-9 8-13 3 4 6 9 8 13" />
      <path d="M6 14h12" />
    </svg>
  </div>
);

export const FireflyIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-gradient-to-br from-[#ff5e00] to-[#e43e2b] flex items-center justify-center font-black text-white select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Fi</span>
  </div>
);

export const PremiereIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-[#00005b] border-2 border-[#9999ff] flex items-center justify-center font-black text-[#9999ff] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Pr</span>
  </div>
);

export const AdobeExpressIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-gradient-to-br from-[#8a2be2] via-[#ff007f] to-[#ff7a00] flex items-center justify-center select-none shadow-md p-1.5 ${className}`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
      <path d="m12 3-8 18h4l2-5h4l2 5h4z" />
      <path d="m10 12 2-5 2 5z" />
    </svg>
  </div>
);

export const InDesignIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-[#2e001f] border-2 border-[#ff3366] flex items-center justify-center font-black text-[#ff3366] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Id</span>
  </div>
);

export const AfterEffectsIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-[#00005b] border-2 border-[#9999ff] flex items-center justify-center font-black text-[#9999ff] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Ae</span>
  </div>
);

export const LightroomIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-[#001e2b] border-2 border-[#31a8ff] flex items-center justify-center font-black text-[#31a8ff] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Lr</span>
  </div>
);

export const LightroomClassicIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-[#001e2b] border-2 border-[#00c8ff] flex items-center justify-center font-black text-[#00c8ff] select-none shadow-md ${className}`}>
    <span className="text-sm tracking-tight font-bold">Lrc</span>
  </div>
);

export const SubstancePainterIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-[#002b11] border-2 border-[#14f068] flex items-center justify-center font-black text-[#14f068] select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Pt</span>
  </div>
);

export const CourseDemyIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-black text-white select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Cd</span>
  </div>
);

export const VihoTaskIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center font-black text-white select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Vt</span>
  </div>
);

export const KeycloakIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`rounded-xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center font-black text-white select-none shadow-md ${className}`}>
    <span className="text-base tracking-tight font-bold">Kc</span>
  </div>
);
