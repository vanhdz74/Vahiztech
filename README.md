# Hệ thống Định danh Tập trung (Central IAM & SSO) cho SaaS Multi-Tenant

Dự án thiết lập toàn bộ hạ tầng Identity and Access Management (IAM) và Single Sign-On (SSO) cho hệ sinh thái SaaS Multi-tenant sử dụng **Keycloak 25.0+** kết hợp cơ sở dữ liệu **PostgreSQL 16 Alpine**.

---

## 1. Kiến trúc Hệ sinh thái & Các Thành phần

```
                                    +-----------------------+
                                    |    PostgreSQL 16      |
                                    |       Alpine          |
                                    +-----------+-----------+
                                                |
                                                | (auth_net)
                                                v
                                    +-----------------------+
                                    |    Keycloak 25.0+     |
                                    |  (ecosystem-realm)    |
                                    |  --features=org       |
                                    +-----------+-----------+
                                                |
                 +------------------------------+------------------------------+
                 |                              |                              |
                 v                              v                              v
    +-------------------------+    +-------------------------+    +-------------------------+
    |      nextjs-portal      |    |    coursedemy-client    |    |  backend-admin-client   |
    |      Public Client      |    |       Bearer-only       |    |      Confidential       |
    |     (PKCE Flow S256)    |    |     Resource Server     |    |    (Service Account)    |
    +-------------------------+    +-------------------------+    +-------------------------+
                 |                              |                              |
                 v                              v                              v
        Redirect URI: 3000/*            Bảo vệ API Video/Khóa học       Quản lý Users/Tenants
```

### Chi tiết các Clients trong Realm `ecosystem-realm`:

| Client ID | Loại Client | Cơ chế Xác thực (Auth Flow) | Quyền hạn / Mục đích |
| :--- | :--- | :--- | :--- |
| `nextjs-portal` | **Public** | Authorization Code Flow + **PKCE (S256)** | Frontend SPA Portal cho người dùng đăng nhập SSO. Redirect: `http://localhost:3000/*`. |
| `coursedemy-client` | **Bearer-only** | JWT Validation (Resource Server) | Backend API bảo vệ tài nguyên học tập của sản phẩm Coursedemy. |
| `vihotask-client` | **Bearer-only** | JWT Validation (Resource Server) | Backend API bảo vệ tài nguyên quản lý công việc của sản phẩm VihoTask. |
| `backend-admin-client` | **Confidential** | Client Credentials (Service Account) | Backend Core Microservice có quyền `manage-users`, `view-users` để quản trị người dùng. |

---

## 2. Cấu trúc Thư mục Hệ Sinh Thái (Ecosystem Monorepo Hub)

```
.
├── .github/workflows/     # CI/CD Workflows (Lint manifests, Deploy Dev/Prod, Submodule Sync)
├── apps/                  # Các ứng dụng & Client Microservices trong hệ sinh thái
│   ├── coursedemy/        # [Git Submodule] -> github.com/vanhdz74/CourseDemy_v2
│   └── vihotask/          # [Git Submodule] -> github.com/vanhdz74/VihoTask
├── infra/                 # Toàn bộ Hạ tầng Dùng chung & Central IAM/SSO
│   ├── keycloak/
│   │   ├── realms/        # File định nghĩa Realm, Clients, Roles, Protocol Mappers & Users
│   │   │   └── ecosystem-realm.json
│   │   ├── themes/        # Custom login/registration branding themes
│   │   ├── extensions/    # Keycloak custom SPIs & Providers
│   │   └── scripts/       # Script test-token.sh và export-realm.sh
│   └── postgres/          # Cấu hình DB Hub & Initialization scripts
│       └── init-scripts/
│           └── 01-init-multi-postgres-dbs.sh
├── k8s/                   # Kubernetes Manifests (Kustomize Base & Overlays Dev/Prod)
│   ├── base/
│   └── overlays/
├── docker-compose.yml     # Master Docker Compose Hub (include infra & apps)
├── docker-compose.infra.yml # Khởi chạy PostgreSQL 16, Keycloak 25+, Kafka
├── docker-compose.apps.yml  # Khởi chạy Microservices apps
├── docs/                  # Tài liệu kiến trúc, Database, OpenAPI, DevOps guides
├── .env.example           # File mẫu biến môi trường
├── .env                   # File cấu hình môi trường thực thi
├── .gitmodules            # Cấu hình liên kết Git Submodules
└── README.md              # Tài liệu hướng dẫn chi tiết
```

### Cách Clone toàn bộ hệ sinh thái kèm các Submodule:
```bash
git clone --recurse-submodules https://github.com/vanhdz74/Vahiztech.git
cd Vahiztech
```


---

## 3. Protocol Mappers & Token Payload Structure

Access Token được cấu hình tự động nhúng các Claims phục vụ Multi-tenancy và cấp phép bản quyền:

1. **`tenant_id`**: Kiểu `String`, định danh Tenant / Tổ chức mà người dùng trực thuộc (ví dụ: `tenant-alpha`, `tenant-beta`).
2. **`licenses`**: Kiểu Multivalued `String` (JSON Array), thể hiện danh sách sản phẩm/dịch vụ người dùng được phép truy cập (ví dụ: `["coursedemy", "vihotask"]`).
3. **`roles`**: Mảng các vai trò của người dùng (`org_admin`, `org_member`, `individual_user`).

### Mẫu Access Token Payload giải mã:
```json
{
  "exp": 1756500000,
  "iat": 1756496400,
  "jti": "8f8ab67c-d6b3-4f96-857c-17937397b91d",
  "iss": "http://localhost:8080/realms/ecosystem-realm",
  "aud": "account",
  "sub": "3df739ef-c5ee-4eb3-b68e-9080b0bb1123",
  "typ": "Bearer",
  "azp": "nextjs-portal",
  "session_state": "ef7d66da-c70e-436f-870a-04b39a3f81e3",
  "scope": "openid email profile tenant-info",
  "sid": "ef7d66da-c70e-436f-870a-04b39a3f81e3",
  "email_verified": true,
  "roles": [
    "org_admin",
    "default-roles-ecosystem-realm"
  ],
  "name": "Alex Admin",
  "preferred_username": "tenant_admin",
  "given_name": "Alex",
  "family_name": "Admin",
  "email": "admin@tenant-alpha.com",
  "tenant_id": "tenant-alpha",
  "licenses": [
    "coursedemy",
    "vihotask"
  ]
}
```

---

## 4. Hướng dẫn Khởi chạy & Kiểm thử

### Bước 1: Khởi động Containers
```bash
docker compose up -d
```

Kiểm tra trạng thái containers:
```bash
docker compose ps
```

### Bước 2: Truy cập Giao diện Quản trị Keycloak
- **URL**: `http://localhost:8080`
- **Master Admin Username**: `admin` (xem trong `.env`)
- **Master Admin Password**: `admin_master_password_2026` (xem trong `.env`)
- **Realm Quản trị**: Chọn realm `ecosystem-realm` trên menu góc trái trên.

### Bước 3: Chạy kịch bản kiểm thử tự động
Chúng tôi đã cung cấp sẵn script `test-token.sh` trong `infra/keycloak/scripts/` để xác minh mọi luồng:
```bash
./infra/keycloak/scripts/test-token.sh
```

*(Tùy chọn) Để xuất cấu hình Realm hiện tại ra file JSON:*
```bash
./infra/keycloak/scripts/export-realm.sh
```

---

## 5. Tài khoản Kiểm thử Mặc định (Pre-seeded User Personas)

Hệ thống mô phỏng mô hình **Google Workspace Hub (Cha) -> Google Apps (Con)**:

| Username | Password | Realm Role | `tenant_id` | `licenses` (Quyền truy cập Apps) | Mô tả vai trò |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `vahiztech_super_admin` | `SuperAdmin@123456` | `ecosystem_super_admin` | `vahiztech-hq` | `["vahiztech_hub", "coursedemy", "vihotask"]` | Super Admin hệ thống Vahiztech Hub |
| `alpha_corp_admin` | `Admin@123456` | `org_admin` | `alpha-corp` | `["coursedemy", "vihotask"]` | Admin Doanh nghiệp Alpha (Mua Full cả 2 Apps) |
| `alpha_employee_tasks` | `Staff@123456` | `org_member` | `alpha-corp` | `["vihotask"]` | Nhân viên Alpha (Chỉ dùng VihoTask, chặn CourseDemy) |
| `beta_school_student` | `Student@123456` | `org_member` | `beta-school` | `["coursedemy"]` | Học viên trường Beta (Chỉ học CourseDemy, chặn VihoTask) |
| `free_tier_user` | `Free@123456` | `individual_user` | `free-tier` | `[]` | Người dùng miễn phí (Chưa mua license -> Chặn vào Apps) |


---

## 6. Hướng dẫn Tích hợp Code (Code Snippets)

### A. Next.js App Router (`next-auth` hoặc OIDC Client với PKCE)
```typescript
// pages/api/auth/[...nextauth].ts hoặc app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: "nextjs-portal",
      clientSecret: "", // Public Client không cần client secret
      issuer: "http://localhost:8080/realms/ecosystem-realm",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.tenant_id = profile?.tenant_id;
        token.licenses = profile?.licenses;
        token.roles = profile?.roles;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.tenant_id = token.tenant_id;
      session.user.licenses = token.licenses;
      session.user.roles = token.roles;
      return session;
    },
  },
};
```

### B. Microservice (Backend Express / NestJS / Spring Boot) Xác thực JWT
Xác thực Token từ Header `Authorization: Bearer <token>`:
1. Xác thực chữ ký bằng JWKS tại URL:
   `http://localhost:8080/realms/ecosystem-realm/protocol/openid-connect/certs`
2. Kiểm tra `req.user.tenant_id` để phân lập dữ liệu Multi-tenancy (Tenant Isolation).
3. Kiểm tra `req.user.licenses.includes("coursedemy")` để phân quyền truy cập chức năng.
