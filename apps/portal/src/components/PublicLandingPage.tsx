import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  LogIn, 
  ArrowRight, 
  GraduationCap, 
  Kanban, 
  KeyRound, 
  Cloud, 
  Video, 
  FileText, 
  BarChart3, 
  Terminal, 
  CheckCircle2, 
  Lock, 
  Globe, 
  Layers, 
  Zap, 
  Rocket, 
  ExternalLink,
  Users,
  HardDrive
} from 'lucide-react';
import { TEST_PERSONAS, getKeycloakRealmAdminConsoleUrl } from '../services/keycloak';
import { 
  CourseDemyIcon, 
  VihoTaskIcon, 
  KeycloakIcon,
  VahizAIIcon,
  VahizCloudIcon,
  VahizMeetIcon,
  VahizDocsIcon,
  VahizAnalyticsIcon,
  VahizDevHubIcon
} from './AppIcons';

interface PublicLandingPageProps {
  onOpenLoginModal: () => void;
  onOpenPlans: () => void;
  onSelectPersona: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const PublicLandingPage: React.FC<PublicLandingPageProps> = ({
  onOpenLoginModal,
  onOpenPlans,
  onSelectPersona,
  isLoading,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <div className="min-h-screen bg-[#f1f5fb] dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* 1. Public Top Navigation Bar */}
      <header className="h-16 bg-white/90 dark:bg-[#0e131d]/90 backdrop-blur-md border-b border-blue-100/90 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40 shadow-[0_1px_4px_rgba(37,99,235,0.04)] dark:shadow-none">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Vahiztech
            </span>
            <span className="font-black text-base sm:text-lg tracking-tight text-slate-800 dark:text-slate-100 ml-1">
              Hub
            </span>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
          <a href="#apps" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Hệ sinh thái</a>
          <a href="#personas" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Thử nghiệm 1-Click</a>
          <a href="#architecture" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Kiến trúc IAM</a>
          <button onClick={onOpenPlans} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Bảng giá</button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-amber-300 hover:text-blue-600 dark:hover:text-amber-200 bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200/60 dark:border-slate-700 transition active:scale-95"
            title="Đổi giao diện Sáng / Tối"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Quick SSO Login Button */}
          <button
            onClick={onOpenLoginModal}
            className="h-9 px-4 sm:px-5 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition shadow-md shadow-blue-500/25 flex items-center gap-1.5 active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng nhập SSO</span>
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 border-b border-blue-100 dark:border-slate-800/80 bg-gradient-to-b from-blue-50/60 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent">
        {/* Glow Effects */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Hệ Thống Định Danh Tập Trung Keycloak IAM 25+ & SaaS Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Một Định Danh Duy Nhất.<br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Mở Khóa Toàn Bộ Hệ Sinh Thái SaaS.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Nền tảng Portal trung tâm tích hợp Single Sign-On (SSO OIDC PKCE). Đăng nhập 1 lần để truy cập <strong>CourseDemy E-learning</strong>, <strong>VihoTask Kanban</strong>, trợ lý <strong>Vahiz AI</strong> và các ứng dụng doanh nghiệp.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenLoginModal}
              className="h-11 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-blue-500/30 flex items-center gap-2 active:scale-95"
            >
              <span>Đăng nhập Keycloak IAM</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#personas"
              className="h-11 px-6 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm border border-blue-200 dark:border-slate-700 transition flex items-center gap-2 shadow-2xs active:scale-95"
            >
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Thử nghiệm 1-Click Personas</span>
            </a>
          </div>

          {/* Security & Tech Specs Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-800/80 border border-blue-100 dark:border-slate-750 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>OpenID Connect PKCE (S256)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-800/80 border border-blue-100 dark:border-slate-750 shadow-2xs">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Multi-Tenant Org Isolation</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-800/80 border border-blue-100 dark:border-slate-750 shadow-2xs">
              <KeyRound className="w-4 h-4 text-amber-600" />
              <span>JWT Dynamic License Claims</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Live Ecosystem Apps Section */}
      <section id="apps" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ứng Dụng Đang Hoạt Động (Live)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Khám phá các sản phẩm trong hệ sinh thái
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Mỗi ứng dụng được bảo vệ bởi Keycloak JWT Bearer và phân quyền theo giấy phép đã cấp
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. CourseDemy */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <CourseDemyIcon className="w-14 h-14" />
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Port 3001 • Live
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                CourseDemy Platform
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">E-Learning & Video Courses</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Nền tảng học trực tuyến, video bài giảng phân phối theo tổ chức Multi-Tenant, bảo vệ bản quyền nội dung bằng Token JWT.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">license: coursedemy</span>
              <button
                onClick={onOpenLoginModal}
                className="h-8 px-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm active:scale-95"
              >
                Đăng nhập để vào
              </button>
            </div>
          </div>

          {/* 2. VihoTask */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <VihoTaskIcon className="w-14 h-14" />
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Port 3002 • Live
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 transition-colors">
                VihoTask Management
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Agile & Sprint Kanban</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Quản lý dự án Scrum, bảng Kanban kéo thả thời gian thực WebSocket, phân công sprint và báo cáo hiệu suất đội nhóm.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold">license: vihotask</span>
              <button
                onClick={onOpenLoginModal}
                className="h-8 px-4 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-sm active:scale-95"
              >
                Đăng nhập để vào
              </button>
            </div>
          </div>

          {/* 3. Keycloak Realm Admin */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <KeycloakIcon className="w-14 h-14" />
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Port 8080 • IAM
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                Keycloak IAM Console
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Ecosystem Central Security</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Quản lý người dùng, nhóm Tenant, cấu hình Protocol Mappers nhúng claims và phân quyền giấy phép truy cập ứng dụng.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">realm: ecosystem-realm</span>
              <a
                href={getKeycloakRealmAdminConsoleUrl()}
                target="_blank"
                rel="noreferrer"
                className="h-8 px-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm flex items-center gap-1 active:scale-95"
              >
                <span>Mở Console</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive 1-Click Persona Switcher Section (Demo Sandbox) */}
      <section id="personas" className="py-16 px-4 sm:px-8 bg-blue-50/40 dark:bg-[#0e131d]/60 border-y border-blue-100 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Chế Độ Trải Nghiệm 1-Click (Demo Personas)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Chọn vai trò để đăng nhập & trải nghiệm ngay
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Mỗi tài khoản được cài đặt sẵn các quyền hạn và Tenant khác nhau để kiểm tra tính năng phân quyền
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEST_PERSONAS.map((persona) => (
              <div
                key={persona.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${persona.roleBadgeColor}`} />
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{persona.username}</span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      🏢 {persona.tenantId}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {persona.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    <span className="text-[10px] text-slate-400 font-semibold">Giấy phép:</span>
                    {persona.licenses.length > 0 ? (
                      persona.licenses.map((lic) => (
                        <span key={lic} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {lic}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        Chưa có license
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPersona(persona.username, persona.password)}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Trải nghiệm với @{persona.username}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Future Roadmap Concept Labs */}
      <section className="py-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold">
            <Rocket className="w-3.5 h-3.5 text-purple-600" />
            <span>Roadmap & Ý Tưởng Tương Lai</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Các ứng dụng đang phát triển
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Hệ sinh thái sẽ tiếp tục mở rộng với các giải pháp AI và công cụ làm việc số hóa
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 flex items-start gap-4">
            <VahizAIIcon className="w-12 h-12 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Vahiz AI Assistant & Studio</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Trợ lý AI sinh code tự động, tóm tắt bài giảng và hỗ trợ phân việc.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 flex items-start gap-4">
            <VahizCloudIcon className="w-12 h-12 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Vahiz Cloud Vault (1TB)</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Kho lưu trữ đám mây phân tán mã hóa E2EE cho doanh nghiệp.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 flex items-start gap-4">
            <VahizMeetIcon className="w-12 h-12 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Vahiz Meet & Whiteboard</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Họp video HD WebRTC kết hợp bảng vẽ kỹ thuật số cho lớp học & Scrum.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 flex items-start gap-4">
            <VahizDocsIcon className="w-12 h-12 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Vahiz Docs & Wiki</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Trình soạn thảo văn bản cộng tác thời gian thực, Mermaid & Markdown.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 flex items-start gap-4">
            <VahizAnalyticsIcon className="w-12 h-12 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Vahiz Metric & BI</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Bảng phân tích dữ liệu kinh doanh, KPI và doanh thu Multi-Tenant.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 flex items-start gap-4">
            <VahizDevHubIcon className="w-12 h-12 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Vahiz DevHub & API</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">API Gateway, OpenAPI Swagger và giám sát Apache Kafka streams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-8 px-4 sm:px-8 border-t border-blue-100 dark:border-slate-800 bg-white dark:bg-[#0e131d] text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">Vahiztech SaaS Ecosystem</span>
            <span>• Keycloak 25.0+ IAM</span>
          </div>

          <div className="flex items-center gap-4 font-medium">
            <button onClick={onOpenLoginModal} className="hover:text-blue-600 transition">Đăng nhập SSO</button>
            <button onClick={onOpenPlans} className="hover:text-blue-600 transition">Bảng giá</button>
            <a href="http://localhost:8080" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">Keycloak Admin</a>
          </div>

          <div>
            <span>© 2026 Vahiztech. Bảo lưu mọi quyền.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
