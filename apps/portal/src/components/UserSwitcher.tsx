import React from 'react';
import { TEST_PERSONAS } from '../services/keycloak';
import { KeycloakUser } from '../types/auth';
import { Users, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface UserSwitcherProps {
  currentUser: KeycloakUser | null;
  onSelectPersona: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export const UserSwitcher: React.FC<UserSwitcherProps> = ({ currentUser, onSelectPersona, isLoading }) => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Persona Switcher (Mô phỏng Đăng nhập Nhanh)
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" /> 1-Click SSO
              </span>
            </h2>
            <p className="text-xs text-slate-400">Chọn một tài khoản mẫu để chuyển đổi phiên SSO và kiểm tra phân quyền tức thì</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {TEST_PERSONAS.map((persona) => {
          const isActive = currentUser?.preferred_username === persona.username;
          return (
            <button
              key={persona.id}
              onClick={() => onSelectPersona(persona.username, persona.password)}
              disabled={isLoading}
              className={`relative text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800/90 border-brand-500 ring-2 ring-brand-500/30 shadow-lg shadow-brand-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850/80'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isActive && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-xs font-semibold text-brand-400">
                  <CheckCircle2 className="w-4 h-4 fill-brand-500/20" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${persona.roleBadgeColor}`} />
                  <span className="text-xs font-bold text-slate-200 truncate">{persona.username}</span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {persona.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-1">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  🏢 {persona.tenantId}
                </span>
                {persona.licenses.length > 0 ? (
                  persona.licenses.map((lic) => (
                    <span key={lic} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-800/60">
                      📦 {lic}
                    </span>
                  ))
                ) : (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40 flex items-center gap-0.5">
                    <ShieldAlert className="w-2.5 h-2.5" /> No licenses
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
