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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 px-4 lg:px-8 py-3.5 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 text-white">
            <ShieldCheck className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                VAHIZTECH <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">HUB & SSO</span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Central Multi-Tenant Identity & Access Management</p>
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
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition shadow-2xs"
            >
              <Settings className="w-3.5 h-3.5 text-amber-600" />
              <span>Ecosystem Admin</span>
              <ExternalLink className="w-3 h-3 text-amber-600" />
            </a>
          )}

          {/* Master Admin Console Link */}
          <a
            href={getKeycloakMasterAdminConsoleUrl()}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Master Console</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {/* Account Management Link */}
          <a
            href={getKeycloakAccountConsoleUrl()}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition shadow-2xs"
          >
            <User className="w-3.5 h-3.5 text-teal-600" />
            <span>Account Console</span>
            <ExternalLink className="w-3 h-3 text-teal-600" />
          </a>

          {user ? (
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white uppercase shadow ring-2 ring-blue-100">
                {user.preferred_username ? user.preferred_username[0] : 'U'}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-semibold text-slate-800 leading-none">{user.name || user.preferred_username}</div>
                <div className="text-[10px] text-blue-600 font-mono mt-0.5">@{user.preferred_username}</div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition text-xs flex items-center gap-1.5 font-semibold"
                title="Đăng xuất SSO"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition active:scale-95"
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
