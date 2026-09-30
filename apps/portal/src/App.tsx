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
  Globe
} from 'lucide-react';

const DEFAULT_SUPER_ADMIN_USER: KeycloakUser = {
  sub: '3df739ef-c5ee-4eb3-b68e-9080b0bb1123',
  preferred_username: 'vahiztech_super_admin',
  name: 'Vahiztech SuperAdmin',
  email: 'superadmin@vahiztech.com',
  tenant_id: 'vahiztech-hq',
  roles: ['ecosystem_super_admin', 'org_admin'],
  licenses: ['vahiztech_hub', 'coursedemy', 'vihotask', 'photoshop', 'illustrator'],
  email_verified: true,
  exp: Math.floor(Date.now() / 1000) + 3600,
};

export const App: React.FC = () => {
  // Authentication & Session State
  const [currentUser, setCurrentUser] = useState<KeycloakUser | null>(() => {
    const session = getStoredSession();
    return session.user || DEFAULT_SUPER_ADMIN_USER;
  });
  const [rawToken, setRawToken] = useState<string | null>(() => {
    const session = getStoredSession();
    return session.token || null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // UI Navigation State
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('apps');
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
        return;
      }

      if (!rawToken && currentUser) {
        const defaultPersona = TEST_PERSONAS.find((p) => p.username === currentUser.preferred_username) || TEST_PERSONAS[0];
        loginWithCredentials(defaultPersona.username, defaultPersona.password)
          .then(({ tokens, user }) => {
            setRawToken(tokens.access_token);
            setCurrentUser(user);
          })
          .catch(() => {
            // Offline fallback
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
        showToast(`Đã chuyển sang tài khoản: @${user.preferred_username}`, 'success');
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
    showToast('Đã đăng xuất khỏi hệ sinh thái', 'success');
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
  const showFeaturedProCard = (selectedCategory === 'all' || selectedCategory === 'photo' || selectedCategory === 'design' || selectedCategory === 'video') && !searchQuery.trim() && featuredProApp;

  return (
    <div className="min-h-screen bg-[#111215] text-slate-100 flex flex-col selection:bg-[#1473e6] selection:text-white antialiased font-sans">
      {/* 1. Window Header / Top Navigation */}
      <TopNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenPlans={() => setIsPlansModalOpen(true)}
        onOpenSSODrawer={() => setIsSSODrawerOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        currentUser={currentUser}
      />

      {/* 2. Main Body Container with Sidebar and Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Vertical Sidebar */}
        <Sidebar
          activeTab={activeSidebarTab}
          onTabChange={setActiveSidebarTab}
          onOpenSSODrawer={() => setIsSSODrawerOpen(true)}
          currentUser={currentUser}
        />

        {/* Right Main Scrollable View Area */}
        <main className="flex-1 bg-[#131417] overflow-y-auto p-6 lg:p-8 space-y-6">
          {/* Render Active View Tab */}
          {activeSidebarTab === 'apps' || activeSidebarTab === 'home' ? (
            <div className="max-w-[1400px] mx-auto space-y-6">
              {/* Category Filter Tabs Bar */}
              <CategoryFilterTabs
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onOpenUpdatesModal={() => setIsUpdatesModalOpen(true)}
                appCount={filteredApps.length}
              />

              {/* Section Header */}
              <div className="pt-2">
                <h2 className="text-lg lg:text-xl font-bold text-white tracking-tight">
                  Ứng dụng nổi bật nên thử
                </h2>
              </div>

              {/* Apps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                {/* 1. Featured Pro Rainbow Border Card */}
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
                <div className="py-16 text-center text-slate-400 bg-[#17191e] rounded-3xl border border-[#262a33] p-8">
                  <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-200">Không tìm thấy ứng dụng phù hợp</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn danh mục "Tất cả ứng dụng".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-4 px-4 py-2 rounded-full bg-[#1473e6] hover:bg-[#0d66d0] text-xs font-semibold text-white transition"
                  >
                    Xem tất cả ứng dụng
                  </button>
                </div>
              )}
            </div>
          ) : activeSidebarTab === 'files' ? (
            /* Cloud Files View */
            <div className="max-w-[1400px] mx-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#24272c]">
                <div>
                  <h2 className="text-xl font-bold text-white">Tệp & Đám Mây Sáng Tạo</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Quản lý các tài sản PSD, AI, video, preset và đồng bộ Cloud 100GB</p>
                </div>
                <button className="h-9 px-4 rounded-full bg-[#1473e6] hover:bg-[#0d66d0] text-xs font-semibold text-white flex items-center gap-2 transition">
                  <UploadCloud className="w-4 h-4" />
                  <span>Tải lên tệp mới</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#17191e] border border-[#262a33] flex flex-col justify-between h-40">
                  <div className="flex items-center justify-between">
                    <Layers className="w-6 h-6 text-sky-400" />
                    <span className="text-[11px] font-mono text-slate-400">1.2 GB</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Dự án Banner Marketing</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Photoshop .PSD • 4 layers</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#17191e] border border-[#262a33] flex flex-col justify-between h-40">
                  <div className="flex items-center justify-between">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                    <span className="text-[11px] font-mono text-slate-400">450 MB</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Logo Vector Brand Identity</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Illustrator .AI • 12 artboards</p>
                  </div>
                </div>
              </div>
            </div>
          ) : activeSidebarTab === 'create' ? (
            /* Creation Studio View */
            <div className="max-w-[1400px] mx-auto space-y-6">
              <div className="pb-4 border-b border-[#24272c]">
                <h2 className="text-xl font-bold text-white">Không Gian Sáng Tạo & AI Generative</h2>
                <p className="text-xs text-slate-400 mt-0.5">Khởi tạo nhanh với hàng ngàn mẫu thiết kế chuyên nghiệp hoặc tạo ảnh AI Firefly</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 via-[#181a20] to-[#181a20] border border-purple-500/30">
                  <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="text-base font-bold text-white">Text-to-Image AI Studio</h3>
                  <p className="text-xs text-slate-400 mt-2 mb-4">Biến ý tưởng văn bản thành hình ảnh chân thực chuẩn thương mại với Adobe Firefly v3.</p>
                  <button
                    onClick={() => setSelectedAppDetail(APPS_DATA.find((a) => a.id === 'firefly') || null)}
                    className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition"
                  >
                    Mở Firefly Studio
                  </button>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900/40 via-[#181a20] to-[#181a20] border border-blue-500/30">
                  <Layers className="w-8 h-8 text-sky-400 mb-3" />
                  <h3 className="text-base font-bold text-white">Tạo Mẫu Bài Đăng Xã Hội</h3>
                  <p className="text-xs text-slate-400 mt-2 mb-4">Tạo banner Facebook, Story Instagram, Thumbnail YouTube chỉ trong 3 phút.</p>
                  <button
                    onClick={() => setSelectedAppDetail(APPS_DATA.find((a) => a.id === 'adobe_express') || null)}
                    className="px-4 py-2 rounded-full bg-[#1473e6] hover:bg-[#0d66d0] text-xs font-semibold text-white transition"
                  >
                    Mở Adobe Express
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Stock & Marketplace View */
            <div className="max-w-[1400px] mx-auto space-y-6">
              <div className="pb-4 border-b border-[#24272c]">
                <h2 className="text-xl font-bold text-white">Adobe Stock & SaaS Marketplace</h2>
                <p className="text-xs text-slate-400 mt-0.5">Khám phá hàng triệu hình ảnh bản quyền, video 4K, template 3D và các ứng dụng con</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-3xl bg-[#17191e] border border-[#262a33]">
                  <ShoppingBag className="w-8 h-8 text-emerald-400 mb-3" />
                  <h3 className="text-base font-bold text-white">CourseDemy SaaS E-Learning</h3>
                  <p className="text-xs text-slate-400 mt-2 mb-4">Nền tảng học trực tuyến SaaS đa tổ chức, cấp phép token JWT tập trung.</p>
                  <a
                    href="http://localhost:3001"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition"
                  >
                    Mở CourseDemy
                  </a>
                </div>

                <div className="p-6 rounded-3xl bg-[#17191e] border border-[#262a33]">
                  <Zap className="w-8 h-8 text-teal-400 mb-3" />
                  <h3 className="text-base font-bold text-white">VihoTask Management</h3>
                  <p className="text-xs text-slate-400 mt-2 mb-4">Hệ thống quản lý công việc và Sprint Kanban cho đội nhóm phát triển.</p>
                  <a
                    href="http://localhost:3002"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-500 text-xs font-semibold text-white transition"
                  >
                    Mở VihoTask
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl text-xs font-semibold ${
            toastMessage.type === 'success'
              ? 'bg-[#181a20]/95 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10'
              : 'bg-[#181a20]/95 text-rose-300 border-rose-500/40 shadow-rose-500/10'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
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
