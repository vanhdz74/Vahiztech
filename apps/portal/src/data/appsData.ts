export interface AppItem {
  id: string;
  name: string;
  iconKey: 
    | 'coursedemy' 
    | 'vihotask' 
    | 'keycloak' 
    | 'vahiz_ai' 
    | 'vahiz_cloud' 
    | 'vahiz_meet' 
    | 'vahiz_billing' 
    | 'vahiz_forms' 
    | 'vahiz_docs'
    | 'vahiztech';
  categoryIds: string[];
  infoStatus?: string;
  badgeType?: 'live' | 'coming_soon' | 'iam';
  description: string;
  fullDescription?: string;
  productInfoUrl?: string;
  actionType: 'saas_app' | 'concept_app';
  price?: string;
  originalPrice?: string;
  discountNote?: string;
  termsUrl?: string;
  licenseKey?: string;
  targetUrl?: string;
  version?: string;
  isPopular?: boolean;
  accentColor?: string;
  bgGradient?: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'Tất cả ứng dụng', icon: 'Grid' },
  { id: 'your_apps', label: 'Đang hoạt động (Live)', icon: 'Bookmark' },
  { id: 'coming_soon', label: 'Sắp ra mắt 🚀', icon: 'Clock' },
  { id: 'education', label: 'Giáo dục & Đào tạo', icon: 'GraduationCap' },
  { id: 'productivity', label: 'Năng suất & Quản việc', icon: 'Briefcase' },
  { id: 'ai_cloud', label: 'AI & Đám mây', icon: 'Sparkles' },
];

export const APPS_DATA: AppItem[] = [
  // ================= 1. APPS ĐÃ CÓ (LIVE TRONG HỆ SINH THÁI) =================
  {
    id: 'coursedemy',
    name: 'VCourseDemy E-Learning',
    iconKey: 'coursedemy',
    categoryIds: ['all', 'your_apps', 'education', 'saas'],
    infoStatus: 'Đang chạy (Live SaaS)',
    badgeType: 'live',
    description: 'Nền tảng học trực tuyến, video bài giảng và theo dõi lộ trình học viên SaaS đa tổ chức.',
    fullDescription: 'Hệ thống E-learning phân phối khóa học trực tuyến Multi-Tenant hoàn chỉnh. Tích hợp bảo mật Token JWT Bearer, phân quyền Role học viên & giảng viên, bảo vệ video stream và đồng bộ kết quả qua Keycloak IAM.',
    targetUrl: 'http://localhost:3001',
    actionType: 'saas_app',
    licenseKey: 'coursedemy',
    version: 'v2.1.0 (Live)',
    isPopular: true,
    accentColor: '#6366f1',
    bgGradient: 'from-indigo-500 via-indigo-600 to-purple-600',
  },
  {
    id: 'vihotask',
    name: 'VihoTask Management',
    iconKey: 'vihotask',
    categoryIds: ['all', 'your_apps', 'productivity', 'saas'],
    infoStatus: 'Đang chạy (Live SaaS)',
    badgeType: 'live',
    description: 'Quản lý dự án Agile/Scrum, bảng Kanban kéo thả, theo dõi sprint và phân công công việc.',
    fullDescription: 'Giải pháp quản lý dự án Agile/Scrum toàn diện cho doanh nghiệp với phân chia Sprint, tích hợp WebSocket realtime, giao việc Kanban kéo thả, xác thực SSO tập trung và bảo vệ dữ liệu Tenant.',
    targetUrl: 'http://localhost:3002',
    actionType: 'saas_app',
    licenseKey: 'vihotask',
    version: 'v1.8.4 (Live)',
    isPopular: true,
    accentColor: '#0d9488',
    bgGradient: 'from-teal-500 via-emerald-500 to-teal-700',
  },
  {
    id: 'keycloak_realm_admin',
    name: 'Keycloak IAM Admin Hub',
    iconKey: 'keycloak',
    categoryIds: ['all', 'your_apps', 'saas'],
    infoStatus: 'Quản trị bảo mật IAM',
    badgeType: 'iam',
    description: 'Bảng điều khiển định danh trung tâm, phân quyền Roles, Multi-Tenant Orgs & JWT Claims.',
    fullDescription: 'Cổng điều khiển trung tâm của Keycloak IAM 25.0+ cho phép cấu hình Clients OIDC PKCE, cấp phát Licenses, quản lý Group Tenants, phân tích Logs bảo mật và đồng bộ Token cho toàn bộ ứng dụng con.',
    targetUrl: 'http://localhost:8080/admin/ecosystem-realm/console/',
    actionType: 'saas_app',
    licenseKey: 'vahiztech_hub',
    version: 'v25.0.2 (IAM)',
    isPopular: true,
    accentColor: '#ea580c',
    bgGradient: 'from-amber-500 via-orange-500 to-amber-700',
  },

  // ================= 2. CÁC ỨNG DỤNG ĐỀ XUẤT PHỤC VỤ SỐ ĐÔNG (SẮP RA MẮT) =================
  {
    id: 'vahiz_ai',
    name: 'Vahiz AI Copilot & Tutor',
    iconKey: 'vahiz_ai',
    categoryIds: ['all', 'coming_soon', 'ai_cloud', 'education', 'productivity'],
    infoStatus: 'Sắp ra mắt',
    badgeType: 'coming_soon',
    description: 'Trợ lý AI thông minh hỏi đáp bài học, sinh đề trắc nghiệm và tự động hóa phân chia task dự án.',
    fullDescription: 'Hệ thống trợ lý trí tuệ nhân tạo tích hợp Large Language Models (LLM) hỗ trợ giải đáp thắc mắc bài giảng 24/7 cho VCourseDemy, gợi ý phân rã công việc trong VihoTask và tóm tắt biên bản họp tự động.',
    actionType: 'concept_app',
    version: 'Lộ trình Q3/2026',
    isPopular: true,
    accentColor: '#ec4899',
    bgGradient: 'from-pink-500 via-rose-500 to-purple-600',
  },
  {
    id: 'vahiz_cloud',
    name: 'Vahiz Cloud Drive & Storage',
    iconKey: 'vahiz_cloud',
    categoryIds: ['all', 'coming_soon', 'ai_cloud', 'productivity'],
    infoStatus: 'Sắp ra mắt',
    badgeType: 'coming_soon',
    description: 'Không gian lưu trữ đám mây mã hóa, tải lên video bài giảng và chia sẻ tệp tài liệu tốc độ cao.',
    fullDescription: 'Hạ tầng lưu trữ đối tượng đám mây (Object Storage) bảo mật cao theo mô hình S3/MinIO. Giúp giảng viên lưu trữ tài nguyên video 4K, tệp đính kèm dự án cho học viên và phân quyền truy cập theo Tenant.',
    actionType: 'concept_app',
    version: 'Lộ trình Q3/2026',
    isPopular: true,
    accentColor: '#0284c7',
    bgGradient: 'from-sky-400 via-blue-500 to-indigo-600',
  },
  {
    id: 'vahiz_meet',
    name: 'Vahiz Live Classroom & Meet',
    iconKey: 'vahiz_meet',
    categoryIds: ['all', 'coming_soon', 'education', 'productivity'],
    infoStatus: 'Sắp ra mắt',
    badgeType: 'coming_soon',
    description: 'Phòng học trực tuyến WebRTC tương tác 2 chiều, bảng trắng kỹ thuật số và ghi hình tự động.',
    fullDescription: 'Giải pháp phòng họp và lớp học ảo trực tuyến độ trễ siêu thấp. Tích hợp tính năng điểm danh học viên tự động, giơ tay phát biểu, chia nhóm thảo luận (Breakout Rooms) và chia sẻ màn hình trực tiếp.',
    actionType: 'concept_app',
    version: 'Lộ trình Q4/2026',
    accentColor: '#8b5cf6',
    bgGradient: 'from-violet-500 via-purple-600 to-indigo-700',
  },
  {
    id: 'vahiz_billing',
    name: 'Vahiz Billing & Pay Gateway',
    iconKey: 'vahiz_billing',
    categoryIds: ['all', 'coming_soon', 'productivity'],
    infoStatus: 'Sắp ra mắt',
    badgeType: 'coming_soon',
    description: 'Cổng thanh toán tự động, thu học phí, xuất hóa đơn điện tử qua VietQR, MoMo và thẻ ngân hàng.',
    fullDescription: 'Hệ thống thanh toán định kỳ (Recurring Billing) và nạp tiền tự động cho các tổ chức SaaS. Hỗ trợ tạo mã VietQR động đối soát tức thì, tự động kích hoạt License cho người dùng ngay khi thanh toán thành công.',
    actionType: 'concept_app',
    version: 'Lộ trình Q4/2026',
    isPopular: true,
    accentColor: '#10b981',
    bgGradient: 'from-emerald-500 via-teal-600 to-cyan-600',
  },
  {
    id: 'vahiz_forms',
    name: 'Vahiz Forms & Quizzes',
    iconKey: 'vahiz_forms',
    categoryIds: ['all', 'coming_soon', 'education', 'productivity'],
    infoStatus: 'Sắp ra mắt',
    badgeType: 'coming_soon',
    description: 'Tạo đề thi trắc nghiệm trực tuyến, chấm điểm tự động và biểu mẫu khảo sát phản hồi học viên.',
    fullDescription: 'Công cụ khảo sát và kiểm tra kiến thức đa năng. Hỗ trợ tạo ngân hàng câu hỏi, xáo đề ngẫu nhiên, giới hạn thời gian làm bài, chống gian lận và tự động xuất báo cáo phân tích phổ điểm.',
    actionType: 'concept_app',
    version: 'Lộ trình 2027',
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-400 via-orange-500 to-rose-500',
  },
  {
    id: 'vahiz_docs',
    name: 'Vahiz Docs & Knowledge Wiki',
    iconKey: 'vahiz_docs',
    categoryIds: ['all', 'coming_soon', 'education', 'productivity'],
    infoStatus: 'Sắp ra mắt',
    badgeType: 'coming_soon',
    description: 'Soạn thảo giáo trình, sổ tay học tập và wiki tài liệu nội bộ hỗ trợ Markdown cộng tác realtime.',
    fullDescription: 'Không gian ghi chép và xây dựng cơ sở tri thức số cho trường học và doanh nghiệp. Hỗ trợ Markdown, nhúng video bài giảng, vẽ sơ đồ tư duy và phân quyền chia sẻ theo nhóm người dùng.',
    actionType: 'concept_app',
    version: 'Lộ trình 2027',
    accentColor: '#3b82f6',
    bgGradient: 'from-blue-500 via-indigo-600 to-cyan-600',
  },
];
