import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Key, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  Kanban, 
  CheckCircle2, 
  RefreshCw, 
  HelpCircle, 
  Globe, 
  Users, 
  Lock, 
  ExternalLink,
  ShieldAlert,
  Clock,
  Ticket
} from 'lucide-react';
import { KeycloakUser } from '../types/auth';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (newUser: KeycloakUser) => void;
  onSwitchToLogin: () => void;
}

type RegType = 'b2b_org' | 'b2c_individual' | 'invited_member';
type B2BStep = 1 | 2 | 3;

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  onSwitchToLogin,
}) => {
  // Main Tab State
  const [regType, setRegType] = useState<RegType>('b2b_org');
  const [b2bStep, setB2bStep] = useState<B2BStep>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // B2B Specific Fields
  const [companyName, setCompanyName] = useState('');
  const [workspaceSlug, setWorkspaceSlug] = useState('');
  const [companySize, setCompanySize] = useState('1-10');
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>(['coursedemy', 'vihotask']);
  const [selectedPlan, setSelectedPlan] = useState<'trial_pro' | 'starter' | 'enterprise'>('trial_pro');

  // Invitation Specific Fields
  const [inviteCode, setInviteCode] = useState('INV-ALPHA-8921');
  const [inviteStatus, setInviteStatus] = useState<'valid' | 'expired' | 'seat_limit'>('valid');

  // OTP Verification Simulation State
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [otpError, setOtpError] = useState<string | null>(null);

  // Interactive Edge Case Simulation Switches
  const [simulateExistingEmail, setSimulateExistingEmail] = useState(false);
  const [simulateDisposableEmail, setSimulateDisposableEmail] = useState(false);
  const [simulateDuplicateSlug, setSimulateDuplicateSlug] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setB2bStep(1);
      setIsOtpStep(false);
      setFormError(null);
      setOtpError(null);
      setOtpValues(['', '', '', '', '', '']);
      setOtpTimer(60);
    }
  }, [isOpen]);

  // OTP Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (isOtpStep && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpStep, otpTimer]);

  // Auto generate workspace slug from company name
  useEffect(() => {
    if (companyName && !simulateDuplicateSlug) {
      const slug = companyName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setWorkspaceSlug(slug || 'my-workspace');
    }
  }, [companyName, simulateDuplicateSlug]);

  // Password Strength Calculation
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: 'Chưa nhập', color: 'bg-slate-200' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: 'Yếu', color: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' };
      case 2:
        return { score: 50, label: 'Trung bình', color: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' };
      case 3:
        return { score: 75, label: 'Khá mạnh', color: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400' };
      case 4:
        return { score: 100, label: 'Rất an toàn', color: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' };
      default:
        return { score: 0, label: 'Quá ngắn', color: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' };
    }
  }, [password]);

  // Check reserved / duplicate slugs
  const slugValidation = useMemo(() => {
    const reservedSlugs = ['admin', 'api', 'auth', 'portal', 'billing', 'support', 'vahiztech', 'root'];
    const takenSlugs = ['alpha', 'beta', 'demo', 'techcorp'];

    if (!workspaceSlug) return { valid: false, message: 'Vui lòng nhập workspace slug' };
    if (reservedSlugs.includes(workspaceSlug.toLowerCase())) {
      return { valid: false, message: `Slug "${workspaceSlug}" là từ khóa hệ thống được bảo vệ.` };
    }
    if (simulateDuplicateSlug || takenSlugs.includes(workspaceSlug.toLowerCase())) {
      return { 
        valid: false, 
        message: `Slug "${workspaceSlug}" đã có người đăng ký! Gợi ý: "${workspaceSlug}-vn" hoặc "${workspaceSlug}-hq"`,
        suggested: `${workspaceSlug}-vn`
      };
    }
    return { valid: true, message: 'Slug khả dụng (https://vahiztech.com/' + workspaceSlug + ')' };
  }, [workspaceSlug, simulateDuplicateSlug]);

  if (!isOpen) return null;

  // Handle Step 1 Validation (B2B Admin Account Info)
  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate email
    if (simulateExistingEmail || email.toLowerCase().includes('admin@vahiztech.com') || email.toLowerCase().includes('demo@vahiz.com')) {
      setFormError('Email này đã tồn tại trong hệ sinh thái Vahiztech IAM. Bạn có muốn đăng nhập hoặc liên kết tài khoản?');
      return;
    }

    if (simulateDisposableEmail || email.endsWith('@tempmail.com') || email.endsWith('@10minutemail.com')) {
      setFormError('Hệ thống từ chối email rác/tạm thời. Vui lòng sử dụng email công việc hoặc cá nhân thực tế.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (passwordStrength.score < 50) {
      setFormError('Vui lòng chọn mật khẩu mạnh hơn (tối thiểu 8 ký tự, gồm số hoặc ký tự viết hoa).');
      return;
    }

    setB2bStep(2);
  };

  // Handle Step 2 Validation (Workspace Information)
  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!companyName.trim()) {
      setFormError('Vui lòng nhập tên công ty hoặc tổ chức.');
      return;
    }

    if (!slugValidation.valid) {
      setFormError(slugValidation.message);
      return;
    }

    setB2bStep(3);
  };

  // Trigger OTP Verification Screen
  const handleStartVerification = () => {
    setIsOtpStep(true);
    setOtpTimer(60);
    setOtpError(null);
  };

  // OTP Input Handler
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otpValues];
    newOtp[index] = val;
    setOtpValues(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Submit OTP & Complete Registration
  const handleCompleteRegistration = () => {
    const fullOtp = otpValues.join('');
    if (fullOtp.length < 6) {
      setOtpError('Vui lòng nhập đủ 6 chữ số mã xác thực.');
      return;
    }

    // Simulate OTP validation: Reject if code is 000000
    if (fullOtp === '000000') {
      setOtpError('Mã OTP không chính xác hoặc đã hết hạn. Vui lòng kiểm tra lại hòm thư.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const generatedUsername = username || email.split('@')[0] || 'user_new';
      const tenantId = regType === 'b2b_org' ? (workspaceSlug || 'tenant-new') : regType === 'invited_member' ? 'tenant-alpha' : 'default-personal';
      const userRoles = regType === 'b2b_org' ? ['org_admin'] : regType === 'invited_member' ? ['org_member'] : ['individual_user'];
      const licenses = regType === 'b2b_org' ? selectedLicenses : ['coursedemy', 'vihotask'];

      const newUser: KeycloakUser = {
        sub: 'usr-' + Math.random().toString(36).substr(2, 9),
        preferred_username: generatedUsername,
        name: fullName || generatedUsername,
        email: email || `${generatedUsername}@company.com`,
        tenant_id: tenantId,
        roles: userRoles,
        licenses: licenses,
        email_verified: true,
        exp: Math.floor(Date.now() / 1000) + 7200,
      };

      onRegisterSuccess(newUser);
      onClose();
    }, 1000);
  };

  // Quick Direct B2C / Social registration
  const handleQuickRegisterB2C = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Vui lòng điền đầy đủ Email và Mật khẩu.');
      return;
    }
    handleStartVerification();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto transition-colors">
        
        {/* Top Gradient Banner */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Đăng Ký Tài Khoản & Khởi Tạo Workspace
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Hệ thống định danh tập trung Vahiztech SSO Multi-Tenant
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          
          {/* Edge Case Simulation & Testing Toolbar (Collapsible / Banner) */}
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xs">
            <div className="flex items-center justify-between font-bold text-amber-900 dark:text-amber-300 mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Thanh mô phỏng các kịch bản thực tế (Interactive Edge Cases)</span>
              </span>
              <span className="text-[10px] bg-amber-200/80 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full">
                Test UI
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={simulateExistingEmail}
                  onChange={(e) => setSimulateExistingEmail(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Mô phỏng Email đã tồn tại</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={simulateDisposableEmail}
                  onChange={(e) => setSimulateDisposableEmail(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Mô phỏng Email rác (Spam)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={simulateDuplicateSlug}
                  onChange={(e) => setSimulateDuplicateSlug(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Mô phỏng Slug Workspace trùng</span>
              </label>
            </div>
          </div>

          {/* Form Level Error Message */}
          {formError && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{formError}</span>
                {formError.includes('đã tồn tại') && (
                  <div className="mt-1.5 flex gap-2">
                    <button
                      onClick={onSwitchToLogin}
                      className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-[11px] hover:bg-rose-700 transition"
                    >
                      Đăng nhập ngay
                    </button>
                    <button
                      onClick={() => setSimulateExistingEmail(false)}
                      className="px-3 py-1 bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 rounded-lg text-[11px] hover:bg-rose-200 transition"
                    >
                      Thử email khác
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Registration Type Switcher (Hide if in OTP step) */}
          {!isOtpStep && (
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => { setRegType('b2b_org'); setFormError(null); }}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  regType === 'b2b_org'
                    ? 'bg-white dark:bg-[#1a2234] text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Doanh nghiệp (B2B)</span>
              </button>

              <button
                type="button"
                onClick={() => { setRegType('b2c_individual'); setFormError(null); }}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  regType === 'b2c_individual'
                    ? 'bg-white dark:bg-[#1a2234] text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Cá nhân (B2C)</span>
              </button>

              <button
                type="button"
                onClick={() => { setRegType('invited_member'); setFormError(null); }}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  regType === 'invited_member'
                    ? 'bg-white dark:bg-[#1a2234] text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Ticket className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Được mời (Invite)</span>
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 1: OTP VERIFICATION VIEW (Common to all registration) */}
          {/* ========================================================= */}
          {isOtpStep ? (
            <div className="text-center py-4 space-y-5 animate-in fade-in">
              <div className="w-14 h-14 mx-auto rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900 shadow-md shadow-blue-500/10">
                <Mail className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Xác Thực Địa Chỉ Email
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
                  Chúng tôi đã gửi mã xác thực gồm 6 chữ số tới địa chỉ email{' '}
                  <span className="font-bold text-blue-600 dark:text-blue-400">{email || 'user@company.com'}</span>.
                  Vui lòng nhập mã bên dưới để kích hoạt tài khoản.
                </p>
                <div className="mt-2 text-[11px] text-slate-400 italic">
                  💡 Mẹo kiểm thử: Nhập bất kỳ 6 số (ngoại trừ "000000" để test lỗi).
                </div>
              </div>

              {/* 6 Digit Inputs */}
              <div className="flex justify-center gap-2 sm:gap-3 my-4">
                {otpValues.map((val, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-black rounded-2xl bg-blue-50/40 dark:bg-slate-900 border-2 border-blue-200/80 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 outline-none transition text-slate-900 dark:text-slate-100 shadow-sm"
                  />
                ))}
              </div>

              {otpError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                {otpTimer > 0 ? (
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>Gửi lại mã sau: </span>
                    <strong className="text-blue-600 dark:text-blue-400 font-mono">{otpTimer}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpTimer(60);
                      setOtpError(null);
                    }}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Gửi lại mã xác thực mới</span>
                  </button>
                )}
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOtpStep(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Quay lại chỉnh sửa
                </button>

                <button
                  type="button"
                  onClick={handleCompleteRegistration}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Xác nhận & Hoàn tất</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* VIEW 2: REGISTRATION FORMS (B2B, B2C, INVITATION) */
            /* ========================================================= */
            <>
              {/* -------------------- 1. B2B FLOW -------------------- */}
              {regType === 'b2b_org' && (
                <div className="space-y-5">
                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                        b2bStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        {b2bStep > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
                      </div>
                      <span className={`text-xs font-bold ${b2bStep === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                        Tài khoản Admin
                      </span>
                    </div>

                    <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-700" />

                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                        b2bStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        {b2bStep > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
                      </div>
                      <span className={`text-xs font-bold ${b2bStep === 2 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                        Không gian làm việc
                      </span>
                    </div>

                    <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-700" />

                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                        b2bStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        3
                      </div>
                      <span className={`text-xs font-bold ${b2bStep === 3 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                        Gói & Giấy phép
                      </span>
                    </div>
                  </div>

                  {/* STEP 1: Admin Account */}
                  {b2bStep === 1 && (
                    <form onSubmit={handleNextToStep2} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Họ và tên Quản trị viên
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="VD: Nguyễn Văn Anh"
                              required
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Email công việc (Business Email)
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="admin@company.com"
                              required
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Mật khẩu khởi tạo
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Tối thiểu 8 ký tự..."
                              required
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Xác nhận mật khẩu
                          </label>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Nhập lại mật khẩu..."
                              required
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Password Strength Indicator */}
                      {password && (
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                          <div className="flex justify-between items-center text-[11px] mb-1.5">
                            <span className="text-slate-500 dark:text-slate-400">Độ an toàn mật khẩu:</span>
                            <span className={`font-bold ${passwordStrength.text}`}>{passwordStrength.label}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${passwordStrength.color} transition-all duration-300`}
                              style={{ width: `${passwordStrength.score}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition active:scale-95"
                        >
                          <span>Tiếp theo: Thông tin Workspace</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 2: Workspace Setup */}
                  {b2bStep === 2 && (
                    <form onSubmit={handleNextToStep3} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Tên Công ty / Tổ chức
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="VD: Alpha Tech Solutions JSC"
                            required
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Đường dẫn Không gian làm việc (Workspace Slug)
                        </label>
                        <div className="flex rounded-xl overflow-hidden border border-blue-200/80 dark:border-slate-700 bg-blue-50/40 dark:bg-slate-900 focus-within:ring-2 focus-within:ring-blue-400">
                          <span className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs border-r border-slate-200 dark:border-slate-700 flex items-center font-mono">
                            vahiztech.com/
                          </span>
                          <input
                            type="text"
                            value={workspaceSlug}
                            onChange={(e) => setWorkspaceSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                            placeholder="alpha-tech"
                            required
                            className="flex-1 px-3 py-2.5 bg-transparent text-xs font-mono font-bold text-blue-600 dark:text-blue-400 outline-none"
                          />
                        </div>

                        {/* Slug Validation Feedback */}
                        <div className="mt-1.5 flex items-center justify-between text-[11px]">
                          <span className={slugValidation.valid ? 'text-emerald-600 dark:text-emerald-400 flex items-center gap-1' : 'text-rose-600 dark:text-rose-400 flex items-center gap-1'}>
                            {slugValidation.valid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                            <span>{slugValidation.message}</span>
                          </span>
                          {slugValidation.suggested && (
                            <button
                              type="button"
                              onClick={() => {
                                setWorkspaceSlug(slugValidation.suggested || '');
                                setSimulateDuplicateSlug(false);
                              }}
                              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                            >
                              Dùng: {slugValidation.suggested}
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Quy mô tổ chức
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {['1-10', '11-50', '51-200', '200+'].map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setCompanySize(size)}
                              className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                                companySize === size
                                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                              }`}
                            >
                              {size} nhân sự
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setB2bStep(1)}
                          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Quay lại</span>
                        </button>

                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition active:scale-95"
                        >
                          <span>Tiếp theo: Chọn Gói & Kích hoạt</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 3: Plan & Licenses */}
                  {b2bStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          Chọn gói bản quyền cho Workspace:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div
                            onClick={() => setSelectedPlan('trial_pro')}
                            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition relative ${
                              selectedPlan === 'trial_pro'
                                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span className="absolute -top-2.5 right-3 text-[10px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                              Phổ biến
                            </span>
                            <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">14 Ngày Dùng Thử Pro</h5>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Full tính năng CourseDemy + VihoTask, không cần thẻ tín dụng.</p>
                            <div className="mt-2 text-xs font-black text-blue-600 dark:text-blue-400">0 VNĐ (Trial)</div>
                          </div>

                          <div
                            onClick={() => setSelectedPlan('starter')}
                            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition ${
                              selectedPlan === 'starter'
                                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">Gói Starter Team</h5>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Dành cho team dưới 10 thành viên.</p>
                            <div className="mt-2 text-xs font-black text-slate-800 dark:text-slate-200">499.000 đ/tháng</div>
                          </div>

                          <div
                            onClick={() => setSelectedPlan('enterprise')}
                            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition ${
                              selectedPlan === 'enterprise'
                                ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100">Enterprise Custom</h5>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Keycloak Dedicated Realm, SLA 99.99%.</p>
                            <div className="mt-2 text-xs font-black text-slate-800 dark:text-slate-200">Liên hệ báo giá</div>
                          </div>
                        </div>
                      </div>

                      {/* Included App Licenses */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-2">
                          Các ứng dụng được cấp phép tự động trong Token Claims:
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <label className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedLicenses.includes('coursedemy')}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedLicenses([...selectedLicenses, 'coursedemy']);
                                else setSelectedLicenses(selectedLicenses.filter(l => l !== 'coursedemy'));
                              }}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <GraduationCap className="w-4 h-4 text-indigo-600" />
                            <span className="font-semibold text-slate-800 dark:text-slate-200">CourseDemy SaaS</span>
                          </label>

                          <label className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#121723] border border-blue-100 dark:border-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedLicenses.includes('vihotask')}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedLicenses([...selectedLicenses, 'vihotask']);
                                else setSelectedLicenses(selectedLicenses.filter(l => l !== 'vihotask'));
                              }}
                              className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <Kanban className="w-4 h-4 text-teal-600" />
                            <span className="font-semibold text-slate-800 dark:text-slate-200">VihoTask Kanban</span>
                          </label>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setB2bStep(2)}
                          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Quay lại</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleStartVerification}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition active:scale-95"
                        >
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          <span>Gửi mã OTP xác thực & Tạo Workspace</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* -------------------- 2. B2C FLOW -------------------- */}
              {regType === 'b2c_individual' && (
                <form onSubmit={handleQuickRegisterB2C} className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900/60 mb-3">
                    <h5 className="text-xs font-bold text-blue-900 dark:text-blue-200">Đăng ký Học tập & Trải nghiệm Cá nhân</h5>
                    <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-0.5">
                      Miễn phí truy cập các khóa học lập trình CourseDemy và tạo bảng quản lý task cá nhân.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email của bạn
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition active:scale-95"
                  >
                    <span>Tiếp tục & Xác thực Email</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="relative my-4 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
                    <span className="relative bg-white dark:bg-[#121723] px-3 text-[11px] text-slate-400">hoặc đăng ký nhanh với SSO</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('google_user@gmail.com');
                        handleStartVerification();
                      }}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition"
                    >
                      <Globe className="w-4 h-4 text-rose-500" />
                      <span>Google SSO</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEmail('github_dev@github.com');
                        handleStartVerification();
                      }}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition"
                    >
                      <Layers className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                      <span>GitHub SSO</span>
                    </button>
                  </div>
                </form>
              )}

              {/* -------------------- 3. INVITATION FLOW -------------------- */}
              {regType === 'invited_member' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs">
                    <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold mb-1">
                      <Ticket className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Gia nhập Không gian làm việc đã được mời</span>
                    </div>
                    <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
                      Nhập mã Token hoặc click đường link từ email mời của Quản trị viên để tự động gán vào Tổ chức.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mã Lời mời (Invitation Token)
                    </label>
                    <div className="relative">
                      <Ticket className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        placeholder="VD: INV-ALPHA-8921"
                        required
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-700 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                    </div>
                  </div>

                  {/* Invitation Edge Case Status Tester */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1.5 font-bold">
                      Thử nghiệm trạng thái Lời mời (Edge cases):
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setInviteStatus('valid')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          inviteStatus === 'valid'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Hợp lệ (Alpha Corp)
                      </button>
                      <button
                        type="button"
                        onClick={() => setInviteStatus('expired')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          inviteStatus === 'expired'
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Lời mời hết hạn
                      </button>
                      <button
                        type="button"
                        onClick={() => setInviteStatus('seat_limit')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                          inviteStatus === 'seat_limit'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Hết slot (Seat Limit)
                      </button>
                    </div>
                  </div>

                  {/* State Result Display */}
                  {inviteStatus === 'valid' ? (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-bold mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Lời mời hợp lệ từ: Alpha Corp (tenant-alpha)</span>
                      </div>
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-300">
                        Vai trò được cấp: <span className="font-mono font-bold">org_member</span> • Quyền truy cập: <span className="font-mono font-bold">CourseDemy + VihoTask</span>
                      </div>
                    </div>
                  ) : inviteStatus === 'expired' ? (
                    <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Lời mời này đã hết hạn hiệu lực (quá 7 ngày)</span>
                      </div>
                      <p className="text-[11px]">Vui lòng liên hệ Admin của Alpha Corp để tạo đường dẫn mời mới.</p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Tổ chức đã sử dụng hết số lượng ghế bản quyền (Seat Exhausted)</span>
                      </div>
                      <p className="text-[11px]">Admin của bạn cần nâng cấp gói để thêm thành viên mới vào workspace.</p>
                    </div>
                  )}

                  {inviteStatus === 'valid' && (
                    <button
                      type="button"
                      onClick={handleStartVerification}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 transition active:scale-95"
                    >
                      <span>Chấp nhận lời mời & Kích hoạt tài khoản</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Switch to Login & Anti-Bot Badge */}
        <div className="p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[11px]">Được bảo vệ bởi Keycloak IAM & Cloudflare Turnstile</span>
          </div>

          <div className="text-slate-600 dark:text-slate-400">
            Đã có tài khoản?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
