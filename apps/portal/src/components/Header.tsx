import React from 'react';
import { KeycloakUser } from '../types/auth';
import { ShieldCheck, LogOut, ExternalLink, Settings, User, Sparkles } from 'lucide-react';
import { getKeycloakAccountConsoleUrl, getKeycloakRealmAdminConsoleUrl, getKeycloakMasterAdminConsoleUrl } from '../services/keycloak';

interface HeaderProps {
  user: KeycloakUser | null;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onOpenLogin }) => {
  const isSuperAdmin = user?.roles?.includes('ecosystem_super_admin');
  const isOrgAdmin = user?.roles?.includes('org_admin');

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 shadow-lg shadow-brand-500/20 ring-1 ring-white/20">
            <ShieldCheck className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                VAHIZTECH <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">HUB & SSO</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Central Multi-Tenant Identity & Access Management</p>
          </div>
        </div>

        {/* Action Controls & User info */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Ecosystem Admin Console Link */}
          {(isSuperAdmin || isOrgAdmin) && (
            <a
              href={getKeycloakRealmAdminConsoleUrl()}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-amber-300 border border-amber-500/30 transition shadow-sm"
              title="Đăng nhập Keycloak bằng tài khoản hiện tại (vahiztech_super_admin)"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span>Ecosystem Admin</span>
              <ExternalLink className="w-3 h-3 text-amber-400/70" />
            </a>
          )}

          {/* Master Admin Console Link */}
          <a
            href={getKeycloakMasterAdminConsoleUrl()}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
            title="Đăng nhập Keycloak bằng Master Admin (admin / admin_master_password_2026)"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Master Console</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          {/* Account Management Link */}
          <a
            href={getKeycloakAccountConsoleUrl()}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition"
            title="Quản lý thông tin tài khoản cá nhân Keycloak"
          >
            <User className="w-3.5 h-3.5 text-teal-400" />
            <span>Account Console</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {user ? (
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white uppercase shadow ring-2 ring-slate-800">
                {user.preferred_username ? user.preferred_username[0] : 'U'}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-semibold text-slate-200 leading-none">{user.name || user.preferred_username}</div>
                <div className="text-[10px] text-brand-400 font-mono mt-0.5">@{user.preferred_username}</div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition text-xs flex items-center gap-1.5 font-medium"
                title="Đăng xuất SSO"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-teal-500 hover:from-brand-600 hover:to-teal-600 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition transform active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>Đăng nhập SSO</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
