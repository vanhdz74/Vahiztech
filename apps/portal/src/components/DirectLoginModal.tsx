import React, { useState } from 'react';
import { X, LogIn, Key, User, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { redirectToKeycloakOIDCLogin } from '../services/keycloak';

interface DirectLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<void>;
  onOpenRegisterModal?: () => void;
  isLoading: boolean;
  error?: string | null;
}

export const DirectLoginModal: React.FC<DirectLoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onOpenRegisterModal,
  isLoading,
  error,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    await onLogin(username, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-colors">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Đăng Nhập SSO Vahiztech</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Keycloak 25.0+ Ecosystem Realm</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Direct Password Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Tên đăng nhập hoặc Email</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="VD: alpha_corp_admin hoặc email..."
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 text-slate-800 dark:text-slate-100 text-xs font-medium transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Mật khẩu</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 text-slate-800 dark:text-slate-100 text-xs font-medium transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !username || !password}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập trực tiếp</span>
              </>
            )}
          </button>
        </form>

        {/* Alternative: Standard Keycloak Hosted Login Page */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center space-y-3">
          {onOpenRegisterModal && (
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenRegisterModal();
                }}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Đăng ký / Tạo Workspace mới
              </button>
            </div>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-400">Hoặc sử dụng trang đăng nhập chính thức của Keycloak:</p>
          <button
            type="button"
            onClick={redirectToKeycloakOIDCLogin}
            className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 text-xs font-semibold border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <span>Mở Keycloak Hosted Login (PKCE Flow)</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
