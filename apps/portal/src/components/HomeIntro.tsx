import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  GraduationCap, 
  Kanban, 
  KeyRound, 
  Rocket, 
  CheckCircle2, 
  Users, 
  HardDrive, 
  Lock, 
  Zap, 
  Cpu, 
  ExternalLink,
  ChevronRight,
  Database,
  Server,
  CloudLightning,
  Workflow
} from 'lucide-react';
import { KeycloakUser } from '../types/auth';

interface HomeIntroProps {
  onExploreApps: () => void;
  onOpenRegisterModal: () => void;
  onOpenPlans: () => void;
  onOpenSSODrawer: () => void;
  currentUser: KeycloakUser | null;
}

export const HomeIntro: React.FC<HomeIntroProps> = ({
  onExploreApps,
  onOpenRegisterModal,
  onOpenPlans,
  onOpenSSODrawer,
  currentUser,
}) => {
  return (
    <div className="max-w-[1440px] mx-auto space-y-10 sm:space-y-14 animate-in fade-in duration-300 pb-12">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-white via-blue-50/70 to-indigo-50/50 dark:from-[#121723] dark:via-[#111726] dark:to-[#171f33] border border-blue-100/90 dark:border-slate-800 p-6 sm:p-10 lg:p-14 shadow-lg shadow-blue-500/5">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-bold tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Hệ Sinh Thái SaaS Đa Tổ Chức & Central IAM Tập Trung</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-[1.2] sm:leading-[1.18]">
            Vahiztech Ecosystem <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Một Định Danh - Vạn Kết Nối Phần Mềm
            </span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Vahiztech là nền tảng quản trị định danh tập trung (SSO/IAM) và hệ sinh thái ứng dụng đám mây (SaaS Multi-tenant). Chúng tôi cung cấp giải pháp toàn diện từ đào tạo trực tuyến <strong>CourseDemy</strong>, quản trị dự án <strong>VihoTask</strong> đến <strong>AI Generative Studio</strong> cho doanh nghiệp hiện đại.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onOpenRegisterModal}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition active:scale-95 flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Đăng ký & Tạo Không Gian Làm Việc</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreApps}
              className="px-5 py-3 rounded-2xl bg-white dark:bg-[#1a2234] hover:bg-slate-50 dark:hover:bg-[#202a40] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs sm:text-sm transition shadow-2xs active:scale-95 flex items-center gap-2"
            >
              <span>Khám phá Ứng dụng</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={onOpenSSODrawer}
              className="px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Keycloak IAM Console</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-blue-100/60 dark:border-slate-800">
              <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">100%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Xác thực SSO PKCE S256</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-blue-100/60 dark:border-slate-800">
              <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">Multi-Tenant</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Cô lập dữ liệu theo Tổ chức</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-blue-100/60 dark:border-slate-800">
              <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">Keycloak 25+</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">PostgreSQL 16 Alpine Hub</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/40 border border-blue-100/60 dark:border-slate-800">
              <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">99.99%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Độ sẵn sàng dịch vụ</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CORE PRODUCTS IN THE ECOSYSTEM */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Hệ Sinh Thái Sản Phẩm</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
              Bộ Ứng Dụng Nòng Cốt Vahiztech
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Tất cả các sản phẩm đều được kết nối liền mạch qua chuẩn Token JWT và phân quyền License động
            </p>
          </div>

          <button
            onClick={onExploreApps}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: CourseDemy */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121723] border border-indigo-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-600/50 transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                    Live Service
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Port: 3001</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1.5">
                  CourseDemy E-Learning
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Hệ thống quản lý đào tạo trực tuyến (LMS) thế hệ mới. Hỗ trợ đa tổ chức, cấp chứng chỉ tự động, lộ trình video bài giảng React, DevOps và AI.
                </p>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Xác thực OIDC PKCE bảo vệ video API</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Phân chia khóa học theo Tenant ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Thống kê tiến độ học tập của nhân sự</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">license: "coursedemy"</span>
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center gap-1 hover:bg-indigo-600 hover:text-white transition"
              >
                <span>Mở App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: VihoTask */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121723] border border-teal-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-teal-300 dark:hover:border-teal-600/50 transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition">
                <Kanban className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                    Live Service
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Port: 3002</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1.5">
                  VihoTask Sprint & Kanban
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Công cụ quản trị dự án, Sprint Kanban realtime chuẩn Agile. Cho phép gán task, theo dõi tiến độ công việc và đồng bộ thông báo đội ngũ.
                </p>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Bảng Kanban kéo thả mượt mà</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Phân quyền org_admin / org_member</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Tích hợp thông báo real-time qua Webhook</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-bold">license: "vihotask"</span>
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center gap-1 hover:bg-teal-600 hover:text-white transition"
              >
                <span>Mở App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 3: Central IAM Hub */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121723] border border-amber-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-600/50 transition-all duration-300 group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
                <KeyRound className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full">
                    IAM Core
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Port: 8080</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1.5">
                  Keycloak IAM 25.0+ Hub
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Trái tim định danh của toàn hệ sinh thái. Quản lý Realm `ecosystem-realm`, phân giải Protocol Mappers, Roles, Licenses và Token Lifecycle.
                </p>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Keycloak Features: Multi-Tenancy Org</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>PostgreSQL 16 Alpine High Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>JWT Token nhúng tenant_id & licenses</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">realm: "ecosystem-realm"</span>
              <button
                onClick={onOpenSSODrawer}
                className="px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center gap-1 hover:bg-amber-600 hover:text-white transition"
              >
                <span>Quản trị SSO</span>
                <ShieldCheck className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MULTI-TENANCY ARCHITECTURE SHOWCASE */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Kiến Trúc Kỹ Thuật</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 mt-1">
              Cơ Chế Phân Quyền & Cấp Phép Bản Quyền (License Claims)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Mỗi Access Token phát hành từ Keycloak đều chứa đầy đủ thông tin định danh và bản quyền được ký số RS256
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-mono font-bold">
              tenant_id: {currentUser?.tenant_id || 'alpha-corp'}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-mono font-bold">
              role: {currentUser?.roles?.[0] || 'org_admin'}
            </span>
          </div>
        </div>

        {/* Architecture Flow Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-xs">
              <KeyRound className="w-4 h-4" />
              <span>1. Single Sign-On (SSO)</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Người dùng đăng nhập 1 lần tại Portal qua Authorization Code Flow + PKCE (S256). Nhận JWT Token chứa Roles và Licenses.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/50 border border-indigo-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs">
              <Server className="w-4 h-4" />
              <span>2. Bearer Token Verification</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Các Microservices (CourseDemy, VihoTask) chỉ cần giải mã chữ ký công khai JWKS từ Keycloak để xác thực mà không cần query lại DB.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-slate-900/50 border border-teal-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-xs">
              <Database className="w-4 h-4" />
              <span>3. Multi-Tenant Data Isolation</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Mỗi truy vấn cơ sở dữ liệu được lọc tự động theo <code className="text-teal-600 font-mono">tenant_id</code>, đảm bảo bảo mật dữ liệu tuyệt đối giữa các công ty.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY CHOOSE VAHIZTECH */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Ưu Thế Nổi Bật</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            Vì Sao Doanh Nghiệp Chọn Vahiztech?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Thiết kế theo chuẩn kiến trúc Cloud-Native và sẵn sàng mở rộng quy mô lớn
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Triển khai Tức thì</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Khởi tạo Tenant và phân bổ nhân sự chỉ trong vài phút thông qua giao diện đăng ký trực quan.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Bảo mật Doanh nghiệp</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Keycloak IAM chuẩn OpenID Connect, hỗ trợ 2FA, brute-force protection và SSO bên thứ 3.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Trí Tuệ Nhân Tạo AI</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tích hợp sẵn trợ lý AI hỗ trợ gợi ý giải pháp, tóm tắt khóa học và tối ưu sprint dự án.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CloudLightning className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Hạ tầng Đám mây</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Container hóa toàn diện với Docker Compose và Kubernetes manifests sẵn sàng deploy production.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CALL TO ACTION (CTA) FOOTER BANNER */}
      {/* ========================================================================= */}
      <section className="p-8 sm:p-12 rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center space-y-5 shadow-xl shadow-blue-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <h3 className="text-xl sm:text-3xl font-black tracking-tight">
            Sẵn Sàng Bứt Phá Năng Suất Doanh Nghiệp?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Khởi tạo Không gian làm việc miễn phí hôm nay. Trải nghiệm trọn vẹn sức mạnh của hệ sinh thái Vahiztech với 14 ngày dùng thử Pro Suite.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenRegisterModal}
              className="px-6 py-3 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-black text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Bắt Đầu Đăng Ký Miễn Phí</span>
            </button>

            <button
              onClick={onOpenPlans}
              className="px-5 py-3 rounded-2xl bg-blue-700/60 hover:bg-blue-700 text-white border border-white/20 font-bold text-xs sm:text-sm transition active:scale-95"
            >
              <span>Xem Bảng Giá & Gói Cước</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
