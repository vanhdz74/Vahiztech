import React from 'react';
import { X, ShieldCheck, User, Users, Key, LogOut, ExternalLink } from 'lucide-react';
import { KeycloakUser } from '../types/auth';
import { UserSwitcher } from './UserSwitcher';
import { IdentityCard } from './IdentityCard';
import { TokenInspector } from './TokenInspector';
import { ServiceStatus } from './ServiceStatus';
import { 
  getKeycloakRealmAdminConsoleUrl, 
  getKeycloakMasterAdminConsoleUrl, 
  getKeycloakAccountConsoleUrl 
} from '../services/keycloak';

interface SSODrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: KeycloakUser | null;
  rawToken: string | null;
  onSelectPersona: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
  onLogout: () => void;
  onOpenLoginModal: () => void;
}

export const SSODrawerModal: React.FC<SSODrawerModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  rawToken,
  onSelectPersona,
  isLoading,
  onLogout,
  onOpenLoginModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#14161a] border-l border-[#262a33] h-full overflow-y-auto flex flex-col shadow-2xl p-6 sm:p-8 text-left select-none">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#242831]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white shadow-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Bảng Quản Trị Định Danh & Keycloak IAM SSO
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Online
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Phân quyền giấy phép (Licenses), Multi-Tenant Orgs & Đồng bộ JWT Token trong toàn bộ Ecosystem
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#20232a] hover:bg-[#2a2e38] text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Quick Links */}
        <div className="py-4 flex flex-wrap items-center gap-2 border-b border-[#242831]">
          <a
            href={getKeycloakRealmAdminConsoleUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c1f26] hover:bg-[#252933] text-amber-300 text-xs font-medium border border-amber-500/30 transition"
          >
            <span>Realm Admin Console</span>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </a>

          <a
            href={getKeycloakMasterAdminConsoleUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c1f26] hover:bg-[#252933] text-slate-300 text-xs font-medium border border-[#2e333e] transition"
          >
            <span>Master Console</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={getKeycloakAccountConsoleUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c1f26] hover:bg-[#252933] text-teal-300 text-xs font-medium border border-teal-500/30 transition"
          >
            <span>Account Console</span>
            <ExternalLink className="w-3 h-3 text-teal-400" />
          </a>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-6 flex-1">
          {/* 1. Infrastructure Status */}
          <ServiceStatus />

          {/* 2. User Personas Switcher */}
          <UserSwitcher
            currentUser={currentUser}
            onSelectPersona={onSelectPersona}
            isLoading={isLoading}
          />

          {/* 3. Identity Profile Card */}
          <IdentityCard user={currentUser} />

          {/* 4. Live JWT Token Claims Inspector */}
          <TokenInspector rawToken={rawToken} />
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#242831] flex items-center justify-between">
          {currentUser ? (
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-2 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất SSO</span>
            </button>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="px-4 py-2 rounded-xl bg-[#1473e6] hover:bg-[#0d66d0] text-white text-xs font-semibold flex items-center gap-2 transition shadow"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Đăng nhập Keycloak</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-slate-600 hover:border-white text-xs font-medium text-slate-200 transition"
          >
            Đóng bảng
          </button>
        </div>
      </div>
    </div>
  );
};
