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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#f8faff] dark:bg-[#0c1017] border-l border-blue-100 dark:border-slate-800 h-full overflow-y-auto flex flex-col shadow-2xl p-4 sm:p-8 text-left select-none transition-colors">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-blue-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Bảng Quản Trị Định Danh & Keycloak IAM SSO
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
                  Online
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Phân quyền giấy phép (Licenses), Multi-Tenant Orgs & Đồng bộ JWT Token trong toàn bộ Ecosystem
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center border border-slate-200 dark:border-slate-700 transition shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Quick Links */}
        <div className="py-4 flex flex-wrap items-center gap-2 border-b border-blue-100 dark:border-slate-800">
          <a
            href={getKeycloakRealmAdminConsoleUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800 transition shadow-2xs"
          >
            <span>Realm Admin Console</span>
            <ExternalLink className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          </a>

          <a
            href={getKeycloakMasterAdminConsoleUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition shadow-2xs"
          >
            <span>Master Console</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={getKeycloakAccountConsoleUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-800 transition shadow-2xs"
          >
            <span>Account Console</span>
            <ExternalLink className="w-3 h-3 text-teal-600 dark:text-teal-400" />
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
        <div className="pt-4 border-t border-blue-100 dark:border-slate-800 flex items-center justify-between">
          {currentUser ? (
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold flex items-center gap-2 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất SSO</span>
            </button>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 transition shadow shadow-blue-500/20"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Đăng nhập Keycloak</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-2xs"
          >
            Đóng bảng
          </button>
        </div>
      </div>
    </div>
  );
};
