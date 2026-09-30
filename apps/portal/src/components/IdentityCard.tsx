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
      <div className="glass-card rounded-2xl p-6 border border-slate-800 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-slate-400 mb-3 border border-slate-700">
          <Shield className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-200">Chưa có phiên đăng nhập SSO</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
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
    <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background Glow accent */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: User Avatar & Basic Profile */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 via-teal-600 to-indigo-600 flex items-center justify-center text-xl font-black text-white shadow-xl ring-2 ring-white/20 uppercase">
              {initialChar}
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-slate-900 border border-slate-700">
              <UserCheck className="w-3.5 h-3.5 text-brand-400" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">{user.name || username}</h3>
              <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
                @{username}
              </span>
              {user.email_verified && (
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span>{user.email || 'No email provided'}</span>
              <span>•</span>
              <span className="text-slate-500 font-mono text-[11px]">ID: {userIdDisplay}</span>
            </p>
          </div>
        </div>

        {/* Right: Tenant, Roles & License Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 flex-1 lg:max-w-2xl">
          {/* Tenant ID */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 font-medium">
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Tenant ID</span>
            </div>
            <div className="text-xs font-bold text-sky-300 font-mono truncate">
              {user.tenant_id || 'Global / None'}
            </div>
          </div>

          {/* Primary Role */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 font-medium">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Vai Trò Realm</span>
            </div>
            <div className="text-xs font-bold text-amber-300 truncate">
              {isSuperAdmin ? 'Super Admin' : isOrgAdmin ? 'Org Admin' : isOrgMember ? 'Org Member' : 'Individual'}
            </div>
          </div>

          {/* Licenses Count */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 font-medium">
              <Package className="w-3.5 h-3.5 text-brand-400" />
              <span>Bản Quyền</span>
            </div>
            <div className="text-xs font-bold text-brand-300">
              {user.licenses?.length || 0} Apps Active
            </div>
          </div>

          {/* Token Expiry */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Phiên Hết Hạn</span>
            </div>
            <div className="text-xs font-bold text-purple-300 font-mono">
              {timeLeft || '3600s'}
            </div>
          </div>
        </div>
      </div>

      {/* Licenses Tag List */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 mr-1">
            <Key className="w-3.5 h-3.5 text-slate-500" /> Danh sách Licenses:
          </span>
          {user.licenses && user.licenses.length > 0 ? (
            user.licenses.map((lic) => (
              <span
                key={lic}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold font-mono bg-brand-500/10 text-brand-300 border border-brand-500/30 flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle className="w-3 h-3 text-brand-400" />
                {lic}
              </span>
            ))
          ) : (
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold font-mono bg-rose-500/10 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-rose-400" /> Chưa có bản quyền nào (Cần mua trên Hub)
            </span>
          )}
        </div>

        {/* Roles Tag List */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500 mr-1">Roles:</span>
          {user.roles?.map((role) => (
            <span key={role} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
