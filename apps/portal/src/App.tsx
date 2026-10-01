import React, { useEffect, useState, useMemo } from 'react';
import { TopNavbar } from './components/TopNavbar';
import { Sidebar, SidebarTab } from './components/Sidebar';
import { CategoryFilterTabs } from './components/CategoryFilterTabs';
import { FeaturedProCard } from './components/FeaturedProCard';
import { AppCard } from './components/AppCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PlansModal } from './components/PlansModal';
import { UpdatesModal } from './components/UpdatesModal';
import { SSODrawerModal } from './components/SSODrawerModal';
import { DirectLoginModal } from './components/DirectLoginModal';
import { PublicLandingPage } from './components/PublicLandingPage';
import { HomeOverview } from './components/HomeOverview';
import { APPS_DATA, AppItem } from './data/appsData';
import { KeycloakUser } from './types/auth';
import { 
  getStoredSession, 
  loginWithCredentials, 
  exchangeAuthorizationCode, 
  clearSession, 
  TEST_PERSONAS 
} from './services/keycloak';
import { 
  CheckCircle2, 
  AlertCircle, 
  FolderPlus, 
  UploadCloud, 
  Sparkles, 
  Layers, 
  ShoppingBag, 
  Search,
  Zap,
  Globe,
  ArrowUpRight,
  GraduationCap,
  Kanban,
  KeyRound,
  Rocket,
  ShieldCheck,
  HardDrive
} from 'lucide-react';

export const App: React.FC = () => {
  // Theme State (Dark / Light Theme Toggle)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('vahiztech_theme');
    if (saved) return saved === 'dark';
    return false; // Default: Soft light blue theme
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vahiztech_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vahiztech_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Authentication & Session State (null when not logged in or logged out)
  const [currentUser, setCurrentUser] = useState<KeycloakUser | null>(() => {
    const session = getStoredSession();
    return session.user || null;
  });
  const [rawToken, setRawToken] = useState<string | null>(() => {
    const session = getStoredSession();
    return session.token || null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // UI Navigation State
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers State
  const [selectedAppDetail, setSelectedAppDetail] = useState<AppItem | null>(null);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState<boolean>(false);
  const [isUpdatesModalOpen, setIsUpdatesModalOpen] = useState<boolean>(false);
  const [isSSODrawerOpen, setIsSSODrawerOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1. Initial OIDC Token & Code Sync
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        setIsLoading(true);
        exchangeAuthorizationCode(code)
          .then(({ tokens, user }) => {
            setRawToken(tokens.access_token);
            setCurrentUser(user);
            showToast(`Đăng nhập SSO OIDC thành công: @${user.preferred_username}!`, 'success');
            window.history.replaceState({}, document.title, window.location.pathname);
          })
          .catch((err: any) => {
            showToast(`Lỗi xác thực OIDC Authorization Code: ${err.message || 'Lỗi'}`, 'error');
            window.history.replaceState({}, document.title, window.location.pathname);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (e) {
      console.error('Session sync error:', e);
    }
  }, []);

  const handleLogin = async (username: string, password: string, showNotification = true) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      const { tokens, user } = await loginWithCredentials(username, password);
      setRawToken(tokens.access_token);
      setCurrentUser(user);
      setIsLoginModalOpen(false);
      if (showNotification) {
        showToast(`Đã đăng nhập thành công: @${user.preferred_username}`, 'success');
      }
    } catch (err: any) {
      const errorMsg = err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.';
      setLoginError(errorMsg);
      if (showNotification) {
        showToast(errorMsg, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    setCurrentUser(null);
    setRawToken(null);
    showToast('Đã đăng xuất. Bạn đang ở giao diện công khai.', 'success');
  };

  // Filtered Apps Computation
  const filteredApps = useMemo(() => {
    return APPS_DATA.filter((app) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'your_apps') {
          const userLicenses = currentUser?.licenses || [];
          const isUserApp = app.licenseKey ? userLicenses.includes(app.licenseKey) || userLicenses.includes('vahiztech_hub') : false;
          if (!isUserApp && !app.categoryIds.includes('your_apps')) {
            return false;
          }
        } else if (!app.categoryIds.includes(selectedCategory)) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = app.name.toLowerCase().includes(q);
        const matchesDesc = app.description.toLowerCase().includes(q);
        return matchesName || matchesDesc;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, currentUser]);

  const featuredProApp = APPS_DATA.find((app) => app.id === 'cc_pro');
  const regularApps = filteredApps.filter((app) => app.id !== 'cc_pro');
  const showFeaturedProCard = (selectedCategory === 'all' || selectedCategory === 'ecosystem' || selectedCategory === 'ai_creative') && !searchQuery.trim() && featuredProApp;

  return (
    <div className="min-h-screen bg-[#f1f5fb] dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white antialiased font-sans transition-colors duration-200">
      {/* If user is NOT logged in: Show Public Landing Page */}
      {!currentUser ? (
        <PublicLandingPage
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onOpenPlans={() => setIsPlansModalOpen(true)}
          onSelectPersona={(u, p) => handleLogin(u, p, true)}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
      ) : (
        /* If user is Logged In: Show Authenticated Workspace Dashboard */
        <>
          {/* 1. Window Header / Top Navigation */}
          <TopNavbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenPlans={() => setIsPlansModalOpen(true)}
            onOpenSSODrawer={() => setIsSSODrawerOpen(true)}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            onLogout={handleLogout}
            currentUser={currentUser}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />

          {/* 2. Main Body Container with Sidebar and Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Vertical Sidebar / Bottom Nav */}
            <Sidebar
              activeTab={activeSidebarTab}
              onTabChange={setActiveSidebarTab}
              onOpenSSODrawer={() => setIsSSODrawerOpen(true)}
              currentUser={currentUser}
            />

            {/* Right Main Scrollable View Area */}
            <main className="flex-1 bg-gradient-to-br from-[#f1f5fb] via-[#eef4fc] to-[#e8f1fb] dark:from-[#0b0f17] dark:via-[#0e131e] dark:to-[#111827] overflow-y-auto p-3.5 sm:p-6 lg:p-8 pb-24 md:pb-8 space-y-5 sm:space-y-6 transition-colors duration-200">
              {/* Render Active View Tab */}
              {activeSidebarTab === 'home' ? (
                <HomeOverview
                  currentUser={currentUser}
                  onNavigateToApps={() => setActiveSidebarTab('apps')}
                  onOpenSSODrawer={() => setIsSSODrawerOpen(true)}
                  onOpenPlans={() => setIsPlansModalOpen(true)}
                />
              ) : activeSidebarTab === 'apps' ? (
                <div className="max-w-[1440px] mx-auto space-y-6">
                  {/* Category Filter Tabs Bar */}
                  <CategoryFilterTabs
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    onOpenUpdatesModal={() => setIsUpdatesModalOpen(true)}
                    appCount={filteredApps.length}
                  />

                  {/* Section Header */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <h2 className="text-lg lg:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                        {selectedCategory === 'your_apps' 
                          ? 'Ứng dụng đã kích hoạt giấy phép của bạn' 
                          : selectedCategory === 'future_concept'
                          ? 'Ý tưởng tương lai & Roadmap phát triển'
                          : 'Hệ sinh thái ứng dụng Vahiztech Hub'}
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Truy cập nhanh các giải pháp SaaS đang chạy và khám phá công nghệ tương lai
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-[#121723] px-3 py-1 rounded-full border border-blue-100 dark:border-slate-800 shadow-2xs">
                        Hiển thị {filteredApps.length} ứng dụng
                      </span>
                    </div>
                  </div>

                  {/* Apps Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                    {/* 1. Featured Pro Suite Card */}
                    {showFeaturedProCard && (
                      <FeaturedProCard
                        app={featuredProApp}
                        onOpenPlans={() => setIsPlansModalOpen(true)}
                        onOpenDetails={setSelectedAppDetail}
                      />
                    )}

                    {/* 2. Regular App Cards */}
                    {regularApps.map((app) => {
                      const isLicensed = app.licenseKey ? (currentUser?.licenses?.includes(app.licenseKey) || currentUser?.licenses?.includes('vahiztech_hub')) : false;
                      return (
                        <AppCard
                          key={app.id}
                          app={app}
                          onOpenDetails={setSelectedAppDetail}
                          onOpenPlans={() => setIsPlansModalOpen(true)}
                          isLicensed={isLicensed}
                        />
                      );
                    })}
                  </div>

                  {/* Empty Search Result State */}
                  {filteredApps.length === 0 && (
                    <div className="py-16 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-[#121723] rounded-3xl border border-blue-100 dark:border-slate-800 p-8 shadow-sm">
                      <Search className="w-9 h-9 text-blue-400 mx-auto mb-3" />
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Không tìm thấy ứng dụng phù hợp</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                        Vui lòng thử tìm kiếm với từ khóa khác như "CourseDemy", "VihoTask", "AI", "Cloud" hoặc chọn danh mục "Tất cả ứng dụng".
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}
                        className="mt-4 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition shadow-sm shadow-blue-500/20 active:scale-95"
                      >
                        Xem tất cả ứng dụng
                      </button>
                    </div>
                  )}
                </div>
              ) : activeSidebarTab === 'files' ? (
                /* Cloud Files View */
                <div className="max-w-[1440px] mx-auto space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-blue-100 dark:border-slate-800 gap-3">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Tài nguyên & Vahiz Cloud Vault</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Quản lý các tài sản video khóa học CourseDemy, tài liệu Sprint VihoTask và tệp thiết kế</p>
                    </div>
                    <button className="h-9 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center gap-2 transition shadow-sm shadow-blue-500/20 active:scale-95 self-start sm:self-auto">
                      <UploadCloud className="w-4 h-4" />
                      <span>Tải lên tài nguyên mới</span>
                    </button>
                  </div>

                  {/* Storage Overview */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                        <HardDrive className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Dung lượng Vahiz Cloud Drive</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Đã sử dụng 14.8 GB trên tổng số 1,000 GB (1TB Cloud Vault)</p>
                      </div>
                    </div>
                    <div className="w-full sm:w-64">
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '15%' }} />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                        <span>14.8 GB</span>
                        <span>1,000 GB</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm flex flex-col justify-between h-44 hover:border-blue-300 dark:hover:border-blue-500/40 transition">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">4.2 GB</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Khóa học React & Next.js Pro</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">CourseDemy Media • 24 video bài giảng</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm flex flex-col justify-between h-44 hover:border-blue-300 dark:hover:border-blue-500/40 transition">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                          <Kanban className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">850 MB</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Tài liệu Sprint Q3 Backlog</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">VihoTask Export • 48 task specs</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm flex flex-col justify-between h-44 hover:border-blue-300 dark:hover:border-blue-500/40 transition">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">1.2 GB</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Bộ thiết kế Brand Identity 2026</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Photoshop & Illustrator • 12 artboards</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 shadow-sm flex flex-col justify-between h-44 hover:border-blue-300 dark:hover:border-blue-500/40 transition">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                          <KeyRound className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">120 MB</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Ecosystem Realm JWT Backups</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Keycloak IAM Config • JSON Snapshots</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeSidebarTab === 'create' ? (
                /* Creation Studio View */
                <div className="max-w-[1440px] mx-auto space-y-6">
                  <div className="pb-4 border-b border-blue-100 dark:border-slate-800">
                    <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Vahiz AI Generative Studio & Ý Tưởng Tương Lai</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tạo nội dung đa phương thức, sinh code AI, tạo hình ảnh Firefly và mẫu thiết kế tức thì</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-purple-50/40 dark:from-purple-950/20 dark:via-[#121723] dark:to-[#121723] border border-purple-200 dark:border-purple-800/40 shadow-sm hover:shadow-md transition">
                      <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-3 shadow-md shadow-purple-500/20">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full">AI Roadmap 2026</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2">Vahiz AI Copilot & Code Assistant</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 mb-4 leading-relaxed">Tự động hóa tác vụ phân việc VihoTask, tóm tắt bài giảng CourseDemy và gợi ý kiến trúc phần mềm.</p>
                      <button
                        onClick={() => setSelectedAppDetail(APPS_DATA.find((a) => a.id === 'vahiz_ai') || null)}
                        className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white transition shadow-sm shadow-purple-500/20 active:scale-95"
                      >
                        Khám phá Vahiz AI
                      </button>
                    </div>

                    <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-blue-50/40 dark:from-blue-950/20 dark:via-[#121723] dark:to-[#121723] border border-blue-200 dark:border-blue-800/40 shadow-sm hover:shadow-md transition">
                      <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/20">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">Sáng tạo tức thì</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2">Mẫu Thiết Kế & Xuất Bản Nhanh</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 mb-4 leading-relaxed">Tạo thumbnail video bài giảng, banner quảng bá sự kiện và giao diện tương tác chuyên nghiệp.</p>
                      <button
                        onClick={() => setSelectedAppDetail(APPS_DATA.find((a) => a.id === 'adobe_express') || null)}
                        className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition shadow-sm shadow-blue-500/20 active:scale-95"
                      >
                        Mở Adobe Express
                      </button>
                    </div>

                    <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50 via-white to-teal-50/40 dark:from-teal-950/20 dark:via-[#121723] dark:to-[#121723] border border-teal-200 dark:border-teal-800/40 shadow-sm hover:shadow-md transition">
                      <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center mb-3 shadow-md shadow-teal-500/20">
                        <Rocket className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full">Text-to-Image AI</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2">Adobe Firefly AI Studio</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 mb-4 leading-relaxed">Biến ý tưởng văn bản thành hình ảnh chân thực chuẩn thương mại với Adobe Firefly v3.</p>
                      <button
                        onClick={() => setSelectedAppDetail(APPS_DATA.find((a) => a.id === 'firefly') || null)}
                        className="px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-700 text-xs font-bold text-white transition shadow-sm shadow-teal-500/20 active:scale-95"
                      >
                        Mở Firefly Studio
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Marketplace View */
                <div className="max-w-[1440px] mx-auto space-y-6">
                  <div className="pb-4 border-b border-blue-100 dark:border-slate-800">
                    <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Vahiztech SaaS Hub & Ecosystem Marketplace</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Khám phá các ứng dụng thực tế đã triển khai và các giải pháp chuẩn bị ra mắt</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 rounded-3xl bg-white dark:bg-[#121723] border border-indigo-200 dark:border-indigo-900/60 shadow-sm hover:shadow-md transition">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-500/20">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">Đang chạy (Live)</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2">CourseDemy SaaS E-Learning</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 mb-4 leading-relaxed">Nền tảng học trực tuyến SaaS đa tổ chức, cấp phép token JWT tập trung.</p>
                      <a
                        href="http://localhost:3001"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition shadow-sm shadow-indigo-500/20"
                      >
                        <span>Mở CourseDemy</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="p-6 rounded-3xl bg-white dark:bg-[#121723] border border-teal-200 dark:border-teal-900/60 shadow-sm hover:shadow-md transition">
                      <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center mb-3 shadow-md shadow-teal-500/20">
                        <Kanban className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">Đang chạy (Live)</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2">VihoTask Management</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 mb-4 leading-relaxed">Hệ thống quản lý công việc và Sprint Kanban realtime cho đội nhóm phát triển.</p>
                      <a
                        href="http://localhost:3002"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-700 text-xs font-bold text-white transition shadow-sm shadow-teal-500/20"
                      >
                        <span>Mở VihoTask</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="p-6 rounded-3xl bg-white dark:bg-[#121723] border border-amber-200 dark:border-amber-900/60 shadow-sm hover:shadow-md transition">
                      <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center mb-3 shadow-md shadow-amber-500/20">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 rounded-full">IAM Console</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2">Keycloak IAM Admin Hub</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 mb-4 leading-relaxed">Quản lý Users, Roles, Multi-Tenant Orgs & Claims của Realm ecosystem-realm.</p>
                      <a
                        href="http://localhost:8080/admin/ecosystem-realm/console/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-xs font-bold text-white transition shadow-sm shadow-amber-500/20"
                      >
                        <span>Mở Keycloak Console</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-xl text-xs font-bold ${
            toastMessage.type === 'success'
              ? 'bg-white/95 dark:bg-[#151c2b]/95 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80 shadow-emerald-500/10'
              : 'bg-white/95 dark:bg-[#151c2b]/95 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/80 shadow-rose-500/10'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Modals & Slide-overs */}
      <ProductDetailModal
        app={selectedAppDetail}
        onClose={() => setSelectedAppDetail(null)}
        onOpenPlans={() => setIsPlansModalOpen(true)}
      />

      <PlansModal
        isOpen={isPlansModalOpen}
        onClose={() => setIsPlansModalOpen(false)}
        onOpenSSODrawer={() => {
          setIsPlansModalOpen(false);
          setIsSSODrawerOpen(true);
        }}
      />

      <UpdatesModal
        isOpen={isUpdatesModalOpen}
        onClose={() => setIsUpdatesModalOpen(false)}
      />

      <SSODrawerModal
        isOpen={isSSODrawerOpen}
        onClose={() => setIsSSODrawerOpen(false)}
        currentUser={currentUser}
        rawToken={rawToken}
        onSelectPersona={(u, p) => handleLogin(u, p, true)}
        isLoading={isLoading}
        onLogout={handleLogout}
        onOpenLoginModal={() => {
          setIsSSODrawerOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      <DirectLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={(u, p) => handleLogin(u, p, true)}
        isLoading={isLoading}
        error={loginError}
      />
    </div>
  );
};

export default App;
