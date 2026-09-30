import React, { useState, useRef, useEffect } from 'react';
import { Search, HelpCircle, Bell, Cloud, ChevronDown, Check, Sparkles, Shield, LogOut, Key } from 'lucide-react';
import { KeycloakUser } from '../types/auth';

interface TopNavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenPlans: () => void;
  onOpenSSODrawer: () => void;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  currentUser: KeycloakUser | null;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenPlans,
  onOpenSSODrawer,
  onOpenLoginModal,
  onLogout,
  currentUser,
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-[#141518] border-b border-[#24272c] px-4 flex items-center justify-between select-none sticky top-0 z-40">
      {/* 1. Left: Mac Window Controls */}
      <div className="flex items-center gap-2 w-48">
        <div className="flex items-center gap-2 pl-1">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 cursor-pointer transition shadow-sm" title="Đóng cửa sổ" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 cursor-pointer transition shadow-sm" title="Thu nhỏ" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 cursor-pointer transition shadow-sm" title="Phóng to toàn màn hình" />
        </div>
      </div>

      {/* 2. Center: Search Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm Creative Cloud"
            className="w-full h-9 pl-9 pr-8 bg-[#202328] hover:bg-[#25282e] focus:bg-[#202328] text-sm text-slate-200 placeholder-slate-400 rounded-full border border-[#2e323a] focus:border-[#1473e6] focus:outline-none transition shadow-inner font-normal"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3. Right: Header Action Buttons & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3 w-auto justify-end">
        {/* "Xem các gói" Pill Button */}
        <button
          onClick={onOpenPlans}
          className="h-8 px-4 rounded-full border border-slate-400/80 hover:border-white text-xs font-medium text-slate-100 hover:text-white hover:bg-slate-800/60 transition flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <span>Xem các gói</span>
        </button>

        {/* Feedback / Creative Cloud Icon button */}
        <button
          onClick={() => window.open('https://helpx.adobe.com/creative-cloud/faq.html', '_blank')}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#24272c] transition"
          title="Phản hồi & Tính năng"
        >
          <span className="font-serif italic font-bold text-sm">f</span>
        </button>

        {/* Help Circle Button */}
        <button
          onClick={() => window.open('https://helpx.adobe.com', '_blank')}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#24272c] transition"
          title="Trợ giúp & Hỗ trợ"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#24272c] transition relative"
            title="Thông báo"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1473e6]" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#1e2127] border border-[#2d313a] rounded-2xl shadow-2xl p-4 z-50 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-[#2d313a]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Thông Báo Hệ Thống</h4>
                <span className="text-[10px] text-sky-400 font-medium">3 mới</span>
              </div>
              <div className="space-y-2.5 mt-3 text-xs">
                <div className="p-2.5 rounded-xl bg-[#252830] border border-[#323742]">
                  <div className="text-white font-medium">Cập nhật Adobe Firefly v3</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Tạo hình ảnh AI nhanh gấp 2 lần với phong cách mới.</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#252830] border border-[#323742]">
                  <div className="text-white font-medium">SSO Hub Đồng Bộ Hoá</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Đã kết nối với Keycloak 25.0+ ecosystem-realm.</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#252830] border border-[#323742]">
                  <div className="text-white font-medium">Gói Tiết Kiệm 40% Pro</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Ưu đãi giảm giá đặc biệt cho Creative Cloud Pro.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cloud Sync Icon */}
        <button
          onClick={onOpenSSODrawer}
          className="w-8 h-8 rounded-full flex items-center justify-center text-sky-400 hover:text-sky-300 hover:bg-[#24272c] transition"
          title="Trạng thái đồng bộ Cloud & SSO"
        >
          <Cloud className="w-4 h-4" />
        </button>

        {/* User Profile Avatar Dropdown */}
        <div className="relative pl-1" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#2e333d] hover:ring-sky-400 transition"
            title="Hồ sơ người dùng & Cài đặt"
          >
            {currentUser?.preferred_username ? currentUser.preferred_username[0].toUpperCase() : 'A'}
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-[#1b1e24] border border-[#2c303a] rounded-2xl shadow-2xl p-4 z-50 text-left">
              <div className="flex items-center gap-3 pb-3 border-b border-[#2c303a]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow">
                  {currentUser?.preferred_username ? currentUser.preferred_username[0].toUpperCase() : 'U'}
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-white truncate">{currentUser?.name || currentUser?.preferred_username || 'Adobe User'}</div>
                  <div className="text-xs text-sky-400 truncate">{currentUser?.email || 'user@creative.cloud'}</div>
                </div>
              </div>

              <div className="py-2 space-y-1">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onOpenSSODrawer();
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-200 hover:bg-[#272b34] hover:text-white flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-sky-400" />
                    <span>Quản lý SSO & Licenses</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-[#16181d] px-1.5 py-0.5 rounded">
                    {currentUser?.licenses?.length || 0} active
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    onOpenPlans();
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-200 hover:bg-[#272b34] hover:text-white flex items-center gap-2 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nâng cấp Creative Cloud Pro</span>
                </button>
              </div>

              <div className="pt-2 border-t border-[#2c303a]">
                {currentUser ? (
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất khỏi SSO Hub</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      onOpenLoginModal();
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#1473e6] hover:bg-[#0d66d0] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Đăng nhập SSO Keycloak</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
