import React from 'react';
import { KeycloakUser } from '../types/auth';
import { 
  getKeycloakRealmAdminConsoleUrl, 
  getKeycloakMasterAdminConsoleUrl, 
  getKeycloakAccountConsoleUrl 
} from '../services/keycloak';
import { 
  GraduationCap, 
  CheckSquare, 
  ShieldCheck, 
  UserCircle, 
  Lock, 
  CheckCircle2, 
  ArrowUpRight, 
  Zap, 
  FileCode2,
  Key
} from 'lucide-react';

interface AppMarketplaceProps {
  user: KeycloakUser | null;
}

export const AppMarketplace: React.FC<AppMarketplaceProps> = ({ user }) => {
  const hasLicense = (licenseKey: string) => {
    if (!user?.licenses) return false;
    return user.licenses.includes(licenseKey) || user.licenses.includes('vahiztech_hub');
  };

  const apps = [
    {
      id: 'coursedemy',
      name: 'CourseDemy Platform',
      category: 'E-Learning & Video Courses',
      licenseKey: 'coursedemy',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-600',
      description: 'Hệ thống học trực tuyến, video bài giảng, khóa học và theo dõi lộ trình học viên SaaS.',
      port: 3001,
      targetUrl: 'http://localhost:3001',
      credentialsHint: null,
    },
    {
      id: 'vihotask',
      name: 'VihoTask Management',
      category: 'Project & Workflow Management',
      licenseKey: 'vihotask',
      icon: CheckSquare,
      color: 'from-emerald-600 to-teal-600',
      description: 'Quản lý dự án, bảng Kanban, theo dõi sprint, giao việc và báo cáo tiến độ theo thời gian thực.',
      port: 3002,
      targetUrl: 'http://localhost:3002',
      credentialsHint: null,
    },
    {
      id: 'keycloak-realm-admin',
      name: 'Ecosystem Realm Console',
      category: 'IAM & Organization Management',
      licenseKey: 'vahiztech_hub',
      requireAdmin: true,
      icon: ShieldCheck,
      color: 'from-amber-600 to-orange-600',
      description: 'Quản lý Users, Roles, Multi-Tenant Orgs & Claims của Realm ecosystem-realm.',
      port: 8080,
      targetUrl: getKeycloakRealmAdminConsoleUrl(),
      credentialsHint: 'User: vahiztech_super_admin / SuperAdmin@123456',
    },
    {
      id: 'keycloak-master-admin',
      name: 'Master Keycloak Console',
      category: 'Root System Infrastructure',
      licenseKey: 'public',
      isPublic: true,
      icon: Key,
      color: 'from-slate-700 to-slate-900',
      description: 'Quản trị Root Server Keycloak, tạo và export Realms, cấu hình Provider SPIs.',
      port: 8080,
      targetUrl: getKeycloakMasterAdminConsoleUrl(),
      credentialsHint: 'User: admin / admin_master_password_2026',
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-800/80">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Hệ Sinh Thái Ứng Dụng (SaaS Marketplace & App Grid)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cơ chế Single Sign-On (SSO) & Phân quyền truy cập dựa trên trường <code className="text-brand-400 font-mono">licenses</code> trong JWT Access Token
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="http://localhost:8080/realms/ecosystem-realm/.well-known/openid-configuration"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700/80 transition"
          >
            <FileCode2 className="w-3.5 h-3.5 text-brand-400" />
            <span>OIDC Discovery</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {apps.map((app) => {
          const isAllowed = app.isPublic || (app.requireAdmin ? user?.roles?.includes('ecosystem_super_admin') || user?.roles?.includes('org_admin') : hasLicense(app.licenseKey));
          const Icon = app.icon;

          return (
            <div
              key={app.id}
              className={`relative rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isAllowed
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-brand-500/5 group'
                  : 'bg-slate-950/40 border-slate-900/80 opacity-70'
              }`}
            >
              <div>
                {/* Top Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {isAllowed ? (
                    <span className="text-[10px] font-semibold font-mono px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đã cấp quyền
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold font-mono px-2 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Bị khóa (403)
                    </span>
                  )}
                </div>

                {/* App Name & Category */}
                <h3 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                  {app.name}
                </h3>
                <span className="text-[11px] text-slate-400 font-medium block mb-2">{app.category}</span>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {app.description}
                </p>

                {/* Credentials Hint if applicable */}
                {app.credentialsHint && (
                  <div className="mb-3 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] text-amber-300/90 font-mono">
                    💡 {app.credentialsHint}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/80">
                {isAllowed ? (
                  <a
                    href={app.targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700/80 hover:border-brand-500 transition shadow-sm"
                  >
                    <span>Truy cập Ứng dụng</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 text-slate-500 text-xs font-medium flex items-center justify-center gap-1.5 cursor-not-allowed border border-slate-800"
                  >
                    <Lock className="w-3 h-3 text-slate-600" />
                    <span>Cần mua License '{app.licenseKey}'</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
