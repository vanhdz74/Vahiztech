import React from 'react';
import { KeycloakUser } from '../types/auth';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Kanban, 
  KeyRound, 
  Rocket, 
  HardDrive, 
  Users, 
  CheckCircle2, 
  Layers, 
  Zap, 
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  Shield,
  Activity,
  Server
} from 'lucide-react';
import { 
  CourseDemyIcon, 
  VihoTaskIcon, 
  KeycloakIcon,
  VahizAIIcon,
  VahizCloudIcon,
  VahizMeetIcon 
} from './AppIcons';
import { getKeycloakRealmAdminConsoleUrl } from '../services/keycloak';

interface HomeOverviewProps {
  currentUser: KeycloakUser | null;
  onNavigateToApps: () => void;
  onOpenSSODrawer: () => void;
  onOpenPlans: () => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  currentUser,
  onNavigateToApps,
  onOpenSSODrawer,
  onOpenPlans,
}) => {
  const username = currentUser?.preferred_username || 'User';
  const tenantId = currentUser?.tenant_id || 'Global';
  const licenses = currentUser?.licenses || [];
  const roles = currentUser?.roles || [];

  const hasCourseDemy = licenses.includes('coursedemy') || licenses.includes('vahiztech_hub');
  const hasVihoTask = licenses.includes('vihotask') || licenses.includes('vahiztech_hub');
  const isSuperAdmin = roles.includes('ecosystem_super_admin');

  return (
    <div className="max-w-[1440px] mx-auto space-y-7">
      {/* 1. Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-6 sm:p-8 shadow-xl shadow-blue-500/15">
        {/* Glow & Decorative Shapes */}
        <div className="absolute -top-12 -right-12 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sky-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Cổng Điều Khiển Hệ Sinh Thái Vahiztech Hub</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Xin chào, {currentUser?.name || username}!
            </h1>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Bạn đang kết nối với phiên làm việc <strong>Single Sign-On (SSO)</strong> bảo mật. Truy cập nhanh các ứng dụng đã cấp quyền, theo dõi dự án và khám phá các công cụ số hóa.
            </p>

            {/* Identity Quick Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-black/20 backdrop-blur-md border border-white/20 font-mono font-semibold text-sky-200 flex items-center gap-1.5">
                🏢 Tenant: {tenantId}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/20 backdrop-blur-md border border-white/20 font-semibold text-amber-200 flex items-center gap-1.5">
                🛡️ {isSuperAdmin ? 'Super Admin' : roles[0] || 'Member'}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/30 backdrop-blur-md border border-emerald-400/40 font-semibold text-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> {licenses.length} Apps Active
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
            <button
              onClick={onNavigateToApps}
              className="h-10 px-5 rounded-full bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold transition shadow-md shadow-black/10 flex items-center gap-2 active:scale-95"
            >
              <span>Xem tất cả ứng dụng</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSSODrawer}
              className="h-10 px-5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold transition flex items-center gap-2 active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Quản lý SSO & Token</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Access Apps (Sản phẩm truy cập nhanh) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Ứng dụng truy cập nhanh của bạn
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Các ứng dụng lõi đang chạy trực tiếp trên hệ sinh thái</p>
          </div>
          <button
            onClick={onNavigateToApps}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Tất cả ứng dụng</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {/* 1. CourseDemy */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-md transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <CourseDemyIcon className="w-12 h-12" />
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  hasCourseDemy 
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                }`}>
                  {hasCourseDemy ? 'Đã cấp phép' : 'Chưa có license'}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                CourseDemy Platform
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">E-Learning & Video Courses</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                Xem bài giảng trực tuyến, quản lý khóa học và theo dõi tiến độ học tập đa tổ chức.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Port 3001</span>
              {hasCourseDemy ? (
                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 px-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm active:scale-95"
                >
                  <span>Mở CourseDemy</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={onOpenPlans}
                  className="h-8 px-3.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-blue-50 transition"
                >
                  Mua bản quyền
                </button>
              )}
            </div>
          </div>

          {/* 2. VihoTask */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-md transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <VihoTaskIcon className="w-12 h-12" />
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  hasVihoTask 
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                }`}>
                  {hasVihoTask ? 'Đã cấp phép' : 'Chưa có license'}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 transition-colors">
                VihoTask Management
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Agile & Sprint Kanban</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                Bảng công việc Kanban kéo thả realtime, theo dõi tiến độ sprint và phân chia nhiệm vụ.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Port 3002</span>
              {hasVihoTask ? (
                <a
                  href="http://localhost:3002"
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 px-4 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm active:scale-95"
                >
                  <span>Mở VihoTask</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={onOpenPlans}
                  className="h-8 px-3.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-blue-50 transition"
                >
                  Mua bản quyền
                </button>
              )}
            </div>
          </div>

          {/* 3. Keycloak Console */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-md transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <KeycloakIcon className="w-12 h-12" />
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Port 8080 • IAM
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                Keycloak IAM Console
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Quản trị Realm & Định danh</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                Bảng điều khiển quản trị Keycloak: cấu hình Clients, Users, Roles, Claims và kiểm soát SSO.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">ecosystem-realm</span>
              <a
                href={getKeycloakRealmAdminConsoleUrl()}
                target="_blank"
                rel="noreferrer"
                className="h-8 px-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm active:scale-95"
              >
                <span>Mở Console</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Đoạn Giới Thiệu Hệ Sinh Thái & Kiến Trúc (Ecosystem Overview & Key Highlights) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
              Giới thiệu Tổng quan Kiến trúc Vahiztech
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mô hình Hub trung tâm (Google Workspace style) kết nối các dịch vụ Microservices phân tán
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-850/60 border border-blue-100 dark:border-slate-750 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                1. Single Sign-On (SSO)
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Xác thực tập trung theo chuẩn <strong>OAuth2 / OIDC PKCE S256</strong>. Người dùng chỉ cần đăng nhập 1 lần tại Hub để mở khóa mọi ứng dụng con mà không cần đăng nhập lại.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-850/60 border border-indigo-100 dark:border-slate-750 space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                2. Phân lập Multi-Tenant
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mỗi tổ chức doanh nghiệp được cấp định danh <code className="text-indigo-600 dark:text-indigo-400 font-mono font-semibold">tenant_id</code> riêng biệt. Dữ liệu bài giảng, task và logs được phân lập tuyệt đối an toàn.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-slate-850/60 border border-teal-100 dark:border-slate-750 space-y-2">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                3. Cấp phép Bản quyền (Licenses)
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Các giấy phép <code className="text-teal-600 dark:text-teal-400 font-mono font-semibold">licenses: ["coursedemy", "vihotask"]</code> được Protocol Mapper tự động nhúng vào JWT Token, backend xác thực quyền hạn tức thì.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Upcoming Innovation & Roadmap Teaser */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-50/60 via-white to-blue-50/40 dark:from-purple-950/20 dark:via-[#121723] dark:to-[#121723] border border-purple-200/80 dark:border-purple-800/40 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/20">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Ý Tưởng & Roadmap Đang Phát Triển
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Các công cụ trí tuệ nhân tạo và đám mây sắp tích hợp vào Hub</p>
            </div>
          </div>
          <button
            onClick={onNavigateToApps}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline self-start sm:self-auto"
          >
            Khám phá phòng thí nghiệm AI →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-purple-100 dark:border-purple-900/40 flex items-start gap-3">
            <VahizAIIcon className="w-10 h-10 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Vahiz AI Assistant</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Sinh code AI, tóm tắt bài giảng video tự động.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-blue-100 dark:border-blue-900/40 flex items-start gap-3">
            <VahizCloudIcon className="w-10 h-10 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Vahiz Cloud Drive 1TB</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Lưu trữ tệp dự án mã hóa E2EE đa nền tảng.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-violet-100 dark:border-violet-900/40 flex items-start gap-3">
            <VahizMeetIcon className="w-10 h-10 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Vahiz Meet & Whiteboard</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Họp video HD và bảng vẽ kỹ thuật số trực tiếp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
