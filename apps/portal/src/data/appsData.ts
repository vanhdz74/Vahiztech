export interface AppItem {
  id: string;
  name: string;
  iconKey: 'cc_pro' | 'ps' | 'ai' | 'acrobat' | 'fi' | 'pr' | 'express' | 'id' | 'ae' | 'lr' | 'lrc' | 'pt' | 'cd' | 'vt' | 'kc';
  categoryIds: string[];
  infoStatus?: string;
  description: string;
  fullDescription?: string;
  productInfoUrl?: string;
  actionType: 'featured_pro' | 'trial_and_buy' | 'free' | 'saas_app';
  price?: string;
  originalPrice?: string;
  discountNote?: string;
  termsUrl?: string;
  licenseKey?: string;
  targetUrl?: string;
  version?: string;
  isPopular?: boolean;
}

export const CATEGORIES = [
  { id: 'all', label: 'Tất cả ứng dụng', icon: 'Grid' },
  { id: 'your_apps', label: 'Ứng dụng của bạn', icon: 'Bookmark' },
  { id: 'photo', label: 'Sáng tạo hình ảnh', icon: 'Camera' },
  { id: 'video', label: 'Video', icon: 'Film' },
  { id: 'design', label: 'Thiết kế', icon: 'Palette' },
  { id: 'doc', label: 'Tài liệu', icon: 'FileText' },
  { id: '3d', label: '3D', icon: 'Box' },
  { id: 'beta', label: 'Beta', icon: 'Flask' },
  { id: 'prerelease', label: 'Tiền phát hành', icon: 'Rocket' },
];

export const APPS_DATA: AppItem[] = [
  // 1. Featured Card: Creative Cloud Pro
  {
    id: 'cc_pro',
    name: 'Creative Cloud Pro',
    iconKey: 'cc_pro',
    categoryIds: ['all', 'photo', 'video', 'design', 'doc', '3d'],
    description: 'gồm VAT. Tiết kiệm hơn 40% cho gói Creative Cloud Pro. Chỉ năm đầu tiên. Gói hàng năm, lập hóa đơn hàng tháng.',
    fullDescription: 'Toàn bộ hơn 20 ứng dụng sáng tạo đẳng cấp thế giới của Adobe bao gồm Photoshop, Illustrator, Premiere Pro, InDesign, Acrobat Pro và 100GB lưu trữ đám mây cùng công nghệ Adobe Sensei AI tiên tiến.',
    price: 'US$37.38/tháng',
    originalPrice: 'US$67.99/tháng',
    discountNote: 'Tiết kiệm 45% cho gói thành viên hàng năm',
    termsUrl: 'https://www.adobe.com/terms',
    actionType: 'featured_pro',
    isPopular: true,
  },

  // 2. Photoshop
  {
    id: 'photoshop',
    name: 'Photoshop',
    iconKey: 'ps',
    categoryIds: ['all', 'photo', 'design', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    description: 'Tạo ảnh đồ họa, hình ảnh và ảnh nghệ thuật đẹp hút hồn ở bất cứ đâu.',
    fullDescription: 'Phần mềm đồ họa raster và chỉnh sửa ảnh số 1 thế giới với công cụ Generative Fill hỗ trợ bởi Adobe Firefly AI, xử lý layer chuyên sâu, tách nền thông minh và bộ lọc camera raw.',
    productInfoUrl: 'https://www.adobe.com/products/photoshop.html',
    actionType: 'trial_and_buy',
    price: 'US$22.99/tháng',
    licenseKey: 'photoshop',
    version: 'v25.12.0',
    isPopular: true,
  },

  // 3. Illustrator
  {
    id: 'illustrator',
    name: 'Illustrator',
    iconKey: 'ai',
    categoryIds: ['all', 'design', 'photo', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    description: 'Tạo hình minh họa và đồ họa tuyệt đẹp.',
    fullDescription: 'Ứng dụng đồ họa vector tiêu chuẩn cho thiết kế logo, biểu tượng, hình minh họa, bao bì và đồ họa web sắc nét ở mọi kích thước.',
    productInfoUrl: 'https://www.adobe.com/products/illustrator.html',
    actionType: 'trial_and_buy',
    price: 'US$22.99/tháng',
    licenseKey: 'illustrator',
    version: 'v28.6.0',
    isPopular: true,
  },

  // 4. Acrobat
  {
    id: 'acrobat',
    name: 'Acrobat',
    iconKey: 'acrobat',
    categoryIds: ['all', 'doc', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    description: 'Xem, chia sẻ hoặc bình luận trên PDF miễn phí. Đăng ký các công cụ cao cấp, ví dụ như chỉnh sửa.',
    fullDescription: 'Giải pháp PDF toàn diện cho phép chuyển đổi, chỉnh sửa, ký điện tử, mã hóa và cộng tác tài liệu trên máy tính, điện thoại di động và trình duyệt.',
    productInfoUrl: 'https://www.adobe.com/acrobat.html',
    actionType: 'trial_and_buy',
    price: 'US$19.99/tháng',
    licenseKey: 'acrobat',
    version: 'v24.002',
    isPopular: true,
  },

  // 5. Adobe Firefly
  {
    id: 'firefly',
    name: 'Adobe Firefly',
    iconKey: 'fi',
    categoryIds: ['all', 'photo', 'beta', 'design'],
    description: 'Lên ý tưởng, tạo nội dung, thiết kế và chia sẻ bằng Adobe Firefly.',
    fullDescription: 'Mô hình AI tạo sinh được thiết kế an toàn cho mục đích thương mại, biến văn bản thành hình ảnh ấn tượng, hiệu ứng chữ và phối màu độc đáo trong tích tắc.',
    productInfoUrl: 'https://www.adobe.com/products/firefly.html',
    actionType: 'free',
    isPopular: true,
  },

  // 6. Premiere
  {
    id: 'premiere',
    name: 'Premiere',
    iconKey: 'pr',
    categoryIds: ['all', 'video', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    description: 'Chỉnh sửa và tự tay tạo phim và video đẹp mắt.',
    fullDescription: 'Phần mềm biên tập video chuyên nghiệp hàng đầu cho phim điện ảnh, truyền hình và video trực tuyến với tính năng tự động tạo phụ đề, phối màu Lumetri và âm thanh tự động tinh chỉnh.',
    productInfoUrl: 'https://www.adobe.com/products/premiere.html',
    actionType: 'trial_and_buy',
    price: 'US$22.99/tháng',
    licenseKey: 'premiere',
    version: 'v24.5.0',
    isPopular: true,
  },

  // 7. Adobe Express
  {
    id: 'adobe_express',
    name: 'Adobe Express',
    iconKey: 'express',
    categoryIds: ['all', 'design', 'photo', 'video', 'beta'],
    infoStatus: 'Đã có bản dùng thử',
    description: 'Tạo bài đăng trên mạng xã hội, tờ rơi, video nổi bật và nhiều nội dung khác chỉ trong vài phút.',
    fullDescription: 'Nền tảng sáng tạo nội dung đa năng tất cả trong một với hàng ngàn mẫu thiết kế chuyên nghiệp, tích hợp tạo ảnh AI Firefly và xuất bản mạng xã hội nhanh chóng.',
    productInfoUrl: 'https://www.adobe.com/express/',
    actionType: 'free',
    isPopular: true,
  },

  // 8. InDesign
  {
    id: 'indesign',
    name: 'InDesign',
    iconKey: 'id',
    categoryIds: ['all', 'doc', 'design', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    description: 'Thiết kế và xuất bản bố cục chuyên nghiệp cho cả bản in và kỹ thuật số.',
    fullDescription: 'Phần mềm thiết kế bố cục trang tiêu chuẩn công nghiệp cho tạp chí, sách báo, tài liệu quảng cáo và ấn phẩm điện tử tương tác.',
    productInfoUrl: 'https://www.adobe.com/products/indesign.html',
    actionType: 'trial_and_buy',
    price: 'US$22.99/tháng',
    licenseKey: 'indesign',
    version: 'v19.4.0',
    isPopular: true,
  },

  // 9. After Effects
  {
    id: 'after_effects',
    name: 'After Effects',
    iconKey: 'ae',
    categoryIds: ['all', 'video', 'design'],
    infoStatus: 'Đã có bản dùng thử',
    description: 'Hiệu ứng kỹ xảo điện ảnh và đồ họa chuyển động ấn tượng.',
    fullDescription: 'Tạo hiệu ứng hình ảnh VFX đỉnh cao, tiêu đề chuyển động nghệ thuật và hoạt hình 3D cho các tác phẩm điện ảnh và video.',
    productInfoUrl: 'https://www.adobe.com/products/aftereffects.html',
    actionType: 'trial_and_buy',
    price: 'US$22.99/tháng',
    licenseKey: 'after_effects',
    version: 'v24.6.0',
  },

  // 10. Lightroom
  {
    id: 'lightroom',
    name: 'Lightroom',
    iconKey: 'lr',
    categoryIds: ['all', 'photo', 'your_apps'],
    infoStatus: 'Đã có bản dùng thử',
    description: 'Chỉnh sửa, sắp xếp, lưu trữ và chia sẻ ảnh từ bất kỳ đâu.',
    fullDescription: 'Dịch vụ lưu trữ và biên tập ảnh đám mây mạnh mẽ với công cụ khử nhiễu AI Denoise, mặt nạ chọn chủ thể tự động và preset màu sắc cao cấp.',
    productInfoUrl: 'https://www.adobe.com/products/photoshop-lightroom.html',
    actionType: 'trial_and_buy',
    price: 'US$9.99/tháng',
    licenseKey: 'lightroom',
    version: 'v7.4.0',
  },

  // 11. Lightroom Classic
  {
    id: 'lightroom_classic',
    name: 'Lightroom Classic',
    iconKey: 'lrc',
    categoryIds: ['all', 'photo'],
    infoStatus: 'Đã có bản dùng thử',
    description: 'Chỉnh sửa ảnh kỹ thuật số tối ưu hóa cho ứng dụng máy tính bàn.',
    fullDescription: 'Ứng dụng xử lý ảnh RAW chuyên nghiệp cho các nhiếp ảnh gia với khả năng quản lý thư viện ảnh khổng lồ cục bộ trên ổ cứng máy tính.',
    productInfoUrl: 'https://www.adobe.com/products/photoshop-lightroom-classic.html',
    actionType: 'trial_and_buy',
    price: 'US$9.99/tháng',
    licenseKey: 'lightroom_classic',
    version: 'v13.4.0',
  },

  // 12. Substance 3D Painter
  {
    id: 'substance_painter',
    name: 'Substance 3D Painter',
    iconKey: 'pt',
    categoryIds: ['all', '3d', 'design'],
    infoStatus: 'Đã có bản dùng thử',
    description: 'Vẽ kết cấu 3D theo thời gian thực chuẩn tiêu chuẩn công nghiệp game và phim.',
    fullDescription: 'Công cụ vẽ texture 3D số 1 cho các nhà phát triển game AAA và nghệ sĩ hiệu ứng đặc biệt với vật liệu PBR thời gian thực và smart masks thông minh.',
    productInfoUrl: 'https://www.adobe.com/products/substance3d-painter.html',
    actionType: 'trial_and_buy',
    price: 'US$49.99/tháng',
    licenseKey: 'substance_3d',
    version: 'v10.0.1',
  },

  // 13. CourseDemy Platform (Vahiztech SaaS Ecosystem)
  {
    id: 'coursedemy',
    name: 'CourseDemy Platform',
    iconKey: 'cd',
    categoryIds: ['all', 'your_apps', 'saas', 'prerelease'],
    infoStatus: 'Tích hợp SSO Hub',
    description: 'Hệ thống học trực tuyến, video bài giảng và theo dõi lộ trình học viên SaaS.',
    fullDescription: 'Nền tảng E-learning phân phối khóa học trực tuyến đa tổ chức (Multi-Tenant), tích hợp bảo mật Token JWT Bearer, phân quyền Role học viên và giảng viên qua Keycloak IAM.',
    targetUrl: 'http://localhost:3001',
    actionType: 'saas_app',
    licenseKey: 'coursedemy',
    version: 'v2.1.0',
  },

  // 14. VihoTask Management (Vahiztech SaaS Ecosystem)
  {
    id: 'vihotask',
    name: 'VihoTask Management',
    iconKey: 'vt',
    categoryIds: ['all', 'your_apps', 'saas', 'prerelease'],
    infoStatus: 'Tích hợp SSO Hub',
    description: 'Quản lý dự án, bảng Kanban, theo dõi sprint, giao việc và báo cáo tiến độ.',
    fullDescription: 'Giải pháp quản lý dự án Agile/Scrum toàn diện cho doanh nghiệp với phân chia Sprint, tích hợp WebSocket realtime, xác thực SSO tập trung và bảo vệ dữ liệu Tenant.',
    targetUrl: 'http://localhost:3002',
    actionType: 'saas_app',
    licenseKey: 'vihotask',
    version: 'v1.8.4',
  },

  // 15. Keycloak Realm Console (Vahiztech IAM Console)
  {
    id: 'keycloak_realm_admin',
    name: 'Keycloak Realm Admin',
    iconKey: 'kc',
    categoryIds: ['all', 'saas', 'prerelease'],
    infoStatus: 'Quản trị IAM',
    description: 'Quản lý Users, Roles, Multi-Tenant Orgs & Claims của Realm ecosystem-realm.',
    fullDescription: 'Bảng điều khiển quản trị trung tâm của Keycloak IAM 25.0+ cho phép cấu hình Clients OIDC PKCE, cấp phát Licenses, quản lý Group Tenants và phân tích Logs bảo mật.',
    targetUrl: 'http://localhost:8080/admin/ecosystem-realm/console/',
    actionType: 'saas_app',
    licenseKey: 'vahiztech_hub',
    version: 'v25.0.2',
  },
];
