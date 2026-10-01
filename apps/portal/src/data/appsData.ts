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
    | 'vahiz_docs' 
    | 'vahiz_analytics' 
    | 'vahiz_devhub' 
    | 'vahiz_mail' 
    | 'cc_pro' 
    | 'ps' 
    | 'ai' 
    | 'acrobat' 
    | 'fi' 
    | 'pr' 
    | 'express' 
    | 'id' 
    | 'ae' 
    | 'lr' 
    | 'lrc' 
    | 'pt';
  categoryIds: string[];
  infoStatus?: string;
  badgeType?: 'live' | 'concept' | 'iam' | 'trial' | 'free' | 'pro';
  description: string;
  fullDescription?: string;
  productInfoUrl?: string;
  actionType: 'featured_pro' | 'trial_and_buy' | 'free' | 'saas_app' | 'concept_app';
  price?: string;
  originalPrice?: string;
  discountNote?: string;
  termsUrl?: string;
  licenseKey?: string;
  targetUrl?: string;
  version?: string;
  isPopular?: boolean;
  accentColor?: string; // Brand characteristic color
  bgGradient?: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'Tất cả ứng dụng', icon: 'Grid' },
  { id: 'your_apps', label: 'Ứng dụng của bạn (Live)', icon: 'Bookmark' },
  { id: 'ecosystem', label: 'Hệ sinh thái Vahiztech', icon: 'Layers' },
  { id: 'future_concept', label: 'Ý tưởng tương lai 🚀', icon: 'Rocket' },
  { id: 'ai_creative', label: 'AI & Sáng tạo', icon: 'Sparkles' },
  { id: 'productivity', label: 'Năng suất & Quản việc', icon: 'Briefcase' },
  { id: 'design', label: 'Thiết kế đồ họa', icon: 'Palette' },
  { id: 'doc', label: 'Tài liệu & PDF', icon: 'FileText' },
];

export const APPS_DATA: AppItem[] = [
  // ================= 1. APPS ĐÃ LÀM (LIVE IN ECOSYSTEM) =================
  {
    id: 'coursedemy',
    name: 'CourseDemy E-Learning',
    iconKey: 'coursedemy',
    categoryIds: ['all', 'your_apps', 'ecosystem', 'saas'],
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
    categoryIds: ['all', 'your_apps', 'ecosystem', 'productivity', 'saas'],
    infoStatus: 'Đang chạy (Live SaaS)',
    badgeType: 'live',
    description: 'Quản lý dự án Agile/Scrum, bảng Kanban, theo dõi sprint, giao việc và báo cáo tiến độ.',
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
    categoryIds: ['all', 'your_apps', 'ecosystem'],
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

  // ================= 2. Ý TƯỞNG TƯƠNG LAI (FUTURE CONCEPT ROADMAP) =================
  {
    id: 'vahiz_ai',
    name: 'Vahiz AI Assistant & Studio',
    iconKey: 'vahiz_ai',
    categoryIds: ['all', 'ecosystem', 'future_concept', 'ai_creative'],
    infoStatus: 'Ý tưởng tương lai • AI Copilot',
    badgeType: 'concept',
    description: 'Trợ lý AI đa phương thức: sinh mã tự động, phân tích tài liệu và trợ lý thông minh.',
    fullDescription: 'Hệ thống trợ lý AI thế hệ mới tích hợp Large Language Models (LLM) hỗ trợ viết code, tóm tắt bài giảng CourseDemy, tự động phân việc trong VihoTask và tạo nội dung marketing tự động.',
    actionType: 'concept_app',
    version: 'v3.0.0 (Concept)',
    isPopular: true,
    accentColor: '#ec4899',
    bgGradient: 'from-pink-500 via-rose-500 to-purple-600',
  },
  {
    id: 'vahiz_cloud',
    name: 'Vahiz Cloud Drive & Vault',
    iconKey: 'vahiz_cloud',
    categoryIds: ['all', 'ecosystem', 'future_concept', 'productivity'],
    infoStatus: 'Ý tưởng tương lai • Storage Hub',
    badgeType: 'concept',
    description: 'Không gian lưu trữ đám mây mã hóa 1TB, chia sẻ tệp tốc độ cao và đồng bộ đa thiết bị.',
    fullDescription: 'Nền tảng lưu trữ tệp đám mây phân tán mã hóa đầu cuối (E2EE) cho doanh nghiệp. Lưu trữ bài giảng video, tài liệu dự án PSD/AI và đồng bộ tức thì trên web, mobile và desktop.',
    actionType: 'concept_app',
    version: 'v1.0 (Roadmap 2026)',
    isPopular: true,
    accentColor: '#0284c7',
    bgGradient: 'from-sky-400 via-blue-500 to-indigo-600',
  },
  {
    id: 'vahiz_meet',
    name: 'Vahiz Meet & Whiteboard',
    iconKey: 'vahiz_meet',
    categoryIds: ['all', 'ecosystem', 'future_concept', 'productivity'],
    infoStatus: 'Ý tưởng tương lai • Video Hub',
    badgeType: 'concept',
    description: 'Họp video HD độ trễ thấp, chia sẻ màn hình tương tác và bảng vẽ cộng tác nhóm realtime.',
    fullDescription: 'Phòng họp trực tuyến WebRTC độ phân giải cao kết hợp bảng vẽ kỹ thuật số (Collaborative Whiteboard), tích hợp sẵn lớp học CourseDemy và họp Daily Scrum trong VihoTask.',
    actionType: 'concept_app',
    version: 'v1.2 (Concept Labs)',
    accentColor: '#8b5cf6',
    bgGradient: 'from-violet-500 via-purple-600 to-indigo-700',
  },
  {
    id: 'vahiz_docs',
    name: 'Vahiz Docs & Knowledge Wiki',
    iconKey: 'vahiz_docs',
    categoryIds: ['all', 'ecosystem', 'future_concept', 'productivity', 'doc'],
    infoStatus: 'Ý tưởng tương lai • Docs Engine',
    badgeType: 'concept',
    description: 'Soạn thảo văn bản cộng tác đồng thời, tài liệu nhóm, sơ đồ Mermaid và Markdown blocks.',
    fullDescription: 'Không gian ghi chú và xây dựng cơ sở tri thức (Knowledge Base) hiện đại theo phong cách Notion/Confluence, hỗ trợ Markdown, Mermaid diagrams, nhúng video bài giảng và quản lý versioning.',
    actionType: 'concept_app',
    version: 'v2.0 (Concept)',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-400 via-teal-500 to-cyan-600',
  },
  {
    id: 'vahiz_analytics',
    name: 'Vahiz Analytics & KPI Hub',
    iconKey: 'vahiz_analytics',
    categoryIds: ['all', 'ecosystem', 'future_concept'],
    infoStatus: 'Ý tưởng tương lai • Business Intelligence',
    badgeType: 'concept',
    description: 'Bảng tổng hợp chỉ số kinh doanh BI, phân tích lưu lượng người dùng, KPI và doanh thu SaaS.',
    fullDescription: 'Công cụ đo lường và trực quan hóa dữ liệu kinh doanh thông minh (BI Dashboard). Tự động phân tích tỷ lệ hoàn thành khóa học, hiệu suất hoàn thành task của nhân viên và giám sát doanh thu multi-tenant.',
    actionType: 'concept_app',
    version: 'v1.5 (Concept Labs)',
    accentColor: '#f59e0b',
    bgGradient: 'from-amber-400 via-orange-500 to-rose-500',
  },
  {
    id: 'vahiz_devhub',
    name: 'Vahiz DevHub & API Gateway',
    iconKey: 'vahiz_devhub',
    categoryIds: ['all', 'ecosystem', 'future_concept'],
    infoStatus: 'Ý tưởng tương lai • Developer Suite',
    badgeType: 'concept',
    description: 'Cổng tích hợp API Gateway, quản lý Webhooks, SDK Client và theo dõi Microservices logs.',
    fullDescription: 'Trung tâm công cụ dành cho lập trình viên (Developer Portal) với tài liệu OpenAPI/Swagger trực quan, quản lý API Keys, webhook dispatchers và monitoring Apache Kafka streams.',
    actionType: 'concept_app',
    version: 'v2.4 (Roadmap)',
    accentColor: '#3b82f6',
    bgGradient: 'from-slate-700 via-blue-700 to-cyan-600',
  },
  {
    id: 'vahiz_mail',
    name: 'Vahiz Mail & Automations',
    iconKey: 'vahiz_mail',
    categoryIds: ['all', 'ecosystem', 'future_concept', 'productivity'],
    infoStatus: 'Ý tưởng tương lai • Mail Service',
    badgeType: 'concept',
    description: 'Hệ thống email doanh nghiệp, tự động gửi thông báo transactional và chiến dịch email marketing.',
    fullDescription: 'Hạ tầng gửi nhận email doanh nghiệp hiệu năng cao, tự động gửi chứng chỉ hoàn thành khóa học CourseDemy và thông báo deadline công việc từ VihoTask.',
    actionType: 'concept_app',
    version: 'v1.1 (Concept)',
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-400 via-sky-500 to-blue-600',
  },

  // ================= 3. FEATURED PRO SUITE CARD =================
  {
    id: 'cc_pro',
    name: 'Vahiztech All-in-One Pro Suite',
    iconKey: 'cc_pro',
    categoryIds: ['all', 'ecosystem', 'ai_creative', 'design', 'doc'],
    description: 'Gói giải pháp trọn bộ: Không giới hạn tất cả ứng dụng hiện tại & quyền truy cập sớm mọi app tương lai.',
    fullDescription: 'Gói thuê bao tổng hợp cao cấp nhất của Vahiztech. Bao gồm trọn gói quyền truy cập CourseDemy, VihoTask, bộ công cụ AI Generative, 1TB Cloud Storage và toàn quyền sử dụng các công cụ sáng tạo mở rộng.',
    price: 'US$37.38/tháng',
    originalPrice: 'US$67.99/tháng',
    discountNote: 'Tiết kiệm hơn 45% cho gói thành viên năm đầu tiên',
    termsUrl: 'https://vahiztech.com/terms',
    actionType: 'featured_pro',
    isPopular: true,
    accentColor: '#2563eb',
    bgGradient: 'from-blue-600 via-indigo-600 to-purple-600',
  },

  // ================= 4. CREATIVE & INTEGRATED DESIGN APPS =================
  {
    id: 'photoshop',
    name: 'Photoshop',
    iconKey: 'ps',
    categoryIds: ['all', 'ai_creative', 'design', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    badgeType: 'trial',
    description: 'Tạo ảnh đồ họa, hình ảnh và ảnh nghệ thuật đẹp hút hồn ở bất cứ đâu.',
    fullDescription: 'Phần mềm đồ họa raster và chỉnh sửa ảnh số 1 thế giới với công cụ Generative Fill hỗ trợ bởi Adobe Firefly AI, xử lý layer chuyên sâu, tách nền thông minh và bộ lọc camera raw.',
    productInfoUrl: 'https://www.adobe.com/products/photoshop.html',
    actionType: 'trial_and_buy',
    price: 'US$22.99/tháng',
    licenseKey: 'photoshop',
    version: 'v25.12.0',
    isPopular: true,
    accentColor: '#31a8ff',
    bgGradient: 'from-blue-900 to-sky-700',
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    iconKey: 'ai',
    categoryIds: ['all', 'design', 'ai_creative', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    badgeType: 'trial',
    description: 'Tạo hình minh họa, biểu tượng logo và đồ họa vector tuyệt đẹp.',
    fullDescription: 'Ứng dụng đồ họa vector tiêu chuẩn cho thiết kế logo, biểu tượng, hình minh họa, bao bì và đồ họa web sắc nét ở mọi kích thước không giảm chất lượng.',
    productInfoUrl: 'https://www.adobe.com/products/illustrator.html',
    actionType: 'trial_and_buy',
    price: 'US$22.99/tháng',
    licenseKey: 'illustrator',
    version: 'v28.6.0',
    isPopular: true,
    accentColor: '#ff9a00',
    bgGradient: 'from-amber-900 to-orange-600',
  },
  {
    id: 'acrobat',
    name: 'Acrobat Pro',
    iconKey: 'acrobat',
    categoryIds: ['all', 'doc', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    badgeType: 'trial',
    description: 'Xem, chỉnh sửa, ký điện tử và bảo mật tài liệu PDF thông minh.',
    fullDescription: 'Giải pháp PDF toàn diện cho phép chuyển đổi, chỉnh sửa, ký điện tử, mã hóa và cộng tác tài liệu trên máy tính, điện thoại di động và trình duyệt.',
    productInfoUrl: 'https://www.adobe.com/acrobat.html',
    actionType: 'trial_and_buy',
    price: 'US$19.99/tháng',
    licenseKey: 'acrobat',
    version: 'v24.002',
    isPopular: true,
    accentColor: '#ef4444',
    bgGradient: 'from-red-600 to-rose-700',
  },
  {
    id: 'firefly',
    name: 'Adobe Firefly AI',
    iconKey: 'fi',
    categoryIds: ['all', 'ai_creative', 'design'],
    infoStatus: 'Tạo sinh Text-to-Image AI',
    badgeType: 'free',
    description: 'Lên ý tưởng, tạo nội dung, thiết kế và phối màu bằng AI tạo sinh.',
    fullDescription: 'Mô hình AI tạo sinh được thiết kế an toàn cho mục đích thương mại, biến văn bản thành hình ảnh ấn tượng, hiệu ứng chữ và phối màu độc đáo trong tích tắc.',
    productInfoUrl: 'https://www.adobe.com/products/firefly.html',
    actionType: 'free',
    isPopular: true,
    accentColor: '#f97316',
    bgGradient: 'from-orange-500 to-red-600',
  },
  {
    id: 'premiere',
    name: 'Premiere Pro',
    iconKey: 'pr',
    categoryIds: ['all', 'ai_creative', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    badgeType: 'trial',
    description: 'Chỉnh sửa và tự tay tạo phim, video 4K chất lượng điện ảnh.',
    fullDescription: 'Phần mềm biên tập video chuyên nghiệp hàng đầu cho phim điện ảnh, truyền hình và video trực tuyến với tính năng tự động tạo phụ đề, phối màu Lumetri và âm thanh tự động tinh chỉnh.',
    productInfoUrl: 'https://www.adobe.com/products/premiere.html',
    actionType: 'trial_and_buy',
    price: 'US$22.99/tháng',
    licenseKey: 'premiere',
    version: 'v24.5.0',
    accentColor: '#9333ea',
    bgGradient: 'from-purple-900 to-indigo-800',
  },
  {
    id: 'adobe_express',
    name: 'Adobe Express',
    iconKey: 'express',
    categoryIds: ['all', 'design', 'ai_creative'],
    infoStatus: 'Miễn phí với nhiều mẫu sẵn',
    badgeType: 'free',
    description: 'Tạo bài đăng mạng xã hội, tờ rơi, video ngắn chỉ trong vài phút.',
    fullDescription: 'Nền tảng sáng tạo nội dung đa năng tất cả trong một với hàng ngàn mẫu thiết kế chuyên nghiệp, tích hợp tạo ảnh AI Firefly và xuất bản mạng xã hội nhanh chóng.',
    productInfoUrl: 'https://www.adobe.com/express/',
    actionType: 'free',
    accentColor: '#a855f7',
    bgGradient: 'from-purple-500 via-pink-500 to-amber-500',
  },
  {
    id: 'indesign',
    name: 'InDesign',
    iconKey: 'id',
    categoryIds: ['all', 'doc', 'design', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    badgeType: 'trial',
    description: 'Thiết kế và xuất bản bố cục trang chuyên nghiệp cho bản in & ebook.',
    fullDescription: 'Phần mềm thiết kế bố cục trang tiêu chuẩn công nghiệp cho tạp chí, sách báo, tài liệu quảng cáo và ấn phẩm điện tử tương tác.',
    productInfoUrl: 'https://www.adobe.com/products/indesign.html',
    actionType: 'trial_and_buy',
    price: 'US$22.99/tháng',
    licenseKey: 'indesign',
    version: 'v19.4.0',
    accentColor: '#ec4899',
    bgGradient: 'from-pink-900 to-rose-700',
  },
  {
    id: 'after_effects',
    name: 'After Effects',
    iconKey: 'ae',
    categoryIds: ['all', 'design', 'ai_creative'],
    infoStatus: 'Đã có bản dùng thử',
    badgeType: 'trial',
    description: 'Hiệu ứng kỹ xảo điện ảnh VFX và đồ họa chuyển động ấn tượng.',
    fullDescription: 'Tạo hiệu ứng hình ảnh VFX đỉnh cao, tiêu đề chuyển động nghệ thuật và hoạt hình 3D cho các tác phẩm điện ảnh và video.',
    productInfoUrl: 'https://www.adobe.com/products/aftereffects.html',
    actionType: 'trial_and_buy',
    price: 'US$22.99/tháng',
    licenseKey: 'after_effects',
    version: 'v24.6.0',
    accentColor: '#6366f1',
    bgGradient: 'from-indigo-900 to-blue-800',
  },
  {
    id: 'lightroom',
    name: 'Lightroom',
    iconKey: 'lr',
    categoryIds: ['all', 'design', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    badgeType: 'trial',
    description: 'Chỉnh sửa, sắp xếp, lưu trữ và chia sẻ ảnh từ bất kỳ thiết bị nào.',
    fullDescription: 'Dịch vụ lưu trữ và biên tập ảnh đám mây mạnh mẽ với công cụ khử nhiễu AI Denoise, mặt nạ chọn chủ thể tự động và preset màu sắc cao cấp.',
    productInfoUrl: 'https://www.adobe.com/products/photoshop-lightroom.html',
    actionType: 'trial_and_buy',
    price: 'US$9.99/tháng',
    licenseKey: 'lightroom',
    version: 'v7.4.0',
    accentColor: '#0ea5e9',
    bgGradient: 'from-sky-900 to-cyan-700',
  },
];
