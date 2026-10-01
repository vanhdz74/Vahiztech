import React, { useEffect, useState } from 'react';
import { KeycloakUser } from '../types/auth';
import { formatTimeRemaining } from '../utils/jwt';
import { Shield, Building2, Package, Clock, UserCheck, Key, CheckCircle, AlertTriangle } from 'lucide-react';

interface IdentityCardProps {
  user: KeycloakUser | null;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({ user }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!user?.exp) return;
    const updateCountdown = () => {
      setTimeLeft(formatTimeRemaining(user.exp));
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [user?.exp]);

  if (!user) {
    return (
      <div className="bg-white dark:bg-[#121723] rounded-2xl p-6 border border-blue-100 dark:border-slate-800 text-center shadow-sm transition-colors">
        <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-800 mx-auto flex items-center justify-center text-blue-500 dark:text-blue-400 mb-3 border border-blue-100 dark:border-slate-700">
          <Shield className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Chưa có phiên đăng nhập SSO</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Vui lòng bấm chọn một persona bên trên hoặc đăng nhập bằng tài khoản Keycloak để khám phá giao diện quản lý định danh.
        </p>
      </div>
    );
  }

  const isSuperAdmin = user.roles?.includes('ecosystem_super_admin');
  const isOrgAdmin = user.roles?.includes('org_admin');
  const isOrgMember = user.roles?.includes('org_member');
  const username = user.preferred_username || 'User';
  const initialChar = username.length > 0 ? username[0].toUpperCase() : 'U';
  const userIdDisplay = user.sub ? `${user.sub.slice(0, 13)}...` : 'N/A';

  return (
    <div className="bg-white dark:bg-[#121723] rounded-2xl p-6 border border-blue-100 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors">
      {/* Background Glow accent */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: User Avatar & Basic Profile */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-xl font-black text-white shadow-md shadow-blue-500/20 uppercase ring-2 ring-blue-100 dark:ring-slate-700">
              {initialChar}
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-sm">
              <UserCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">{user.name || username}</h3>
              <span className="text-xs font-mono text-blue-700 dark:text-blue-300 font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                @{username}
              </span>
              {user.email_verified && (
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
              <span>{user.email || 'No email provided'}</span>
              <span>•</span>
              <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">ID: {userIdDisplay}</span>
            </p>
          </div>
        </div>

        {/* Right: Tenant, Roles & License Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 flex-1 lg:max-w-2xl">
          {/* Tenant ID */}
          <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-slate-850/60 border border-blue-100 dark:border-slate-750">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
              <Building2 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span>Tenant ID</span>
            </div>
            <div className="text-xs font-bold text-blue-700 dark:text-blue-300 font-mono truncate">
              {user.tenant_id || 'Global / None'}
            </div>
          </div>

          {/* Primary Role */}
          <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-slate-850/60 border border-amber-100 dark:border-slate-750">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
              <Shield className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Vai Trò Realm</span>
            </div>
            <div className="text-xs font-bold text-amber-700 dark:text-amber-300 truncate">
              {isSuperAdmin ? 'Super Admin' : isOrgAdmin ? 'Org Admin' : isOrgMember ? 'Org Member' : 'Individual'}
            </div>
          </div>

          {/* Licenses Count */}
          <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-slate-850/60 border border-emerald-100 dark:border-slate-750">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
              <Package className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>Bản Quyền</span>
            </div>
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              {user.licenses?.length || 0} Apps Active
            </div>
          </div>

          {/* Token Expiry */}
          <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-slate-850/60 border border-purple-100 dark:border-slate-750">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
              <span>Phiên Hết Hạn</span>
            </div>
            <div className="text-xs font-bold text-purple-700 dark:text-purple-300 font-mono">
              {timeLeft || '3600s'}
            </div>
          </div>
        </div>
      </div>

      {/* Licenses Tag List */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-1.5 mr-1">
            <Key className="w-3.5 h-3.5 text-slate-400" /> Danh sách Licenses:
          </span>
          {user.licenses && user.licenses.length > 0 ? (
            user.licenses.map((lic) => (
              <span
                key={lic}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5 shadow-2xs"
              >
                <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                {lic}
              </span>
            ))
          ) : (
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold font-mono bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-rose-500" /> Chưa có bản quyền nào (Cần mua trên Hub)
            </span>
          )}
        </div>

        {/* Roles Tag List */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1">Roles:</span>
          {user.roles?.map((role) => (
            <span key={role} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
