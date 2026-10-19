# HƯỚNG DẪN CÀI ĐẶT VÀ KHỞI CHẠY DỰ ÁN VAHIZTECH

## Central IAM, SSO & Multi-Tenant SaaS Ecosystem Hub

Tài liệu này cung cấp hướng dẫn toàn diện từ A - Z về cách thiết lập môi trường (setup), cấu hình biến môi trường, các phương thức khởi chạy (1-Click, Docker Compose, Hybrid Dev), kiểm thử và khắc phục sự cố cho toàn bộ hệ sinh thái **Vahiztech**.

---

## MỤC LỤC

1. [Tổng quan Kiến trúc Hệ sinh thái](#1-tổng-quan-kiến-trúc-hệ-sinh-thái)
2. [Yêu cầu Môi trường Tiên quyết (Prerequisites)](#2-yêu-cầu-môi-trường-tiên-quyết-prerequisites)
3. [Cấu trúc Thư mục Điều phối](#3-cấu-trúc-thư-mục-điều-phối)
4. [Các Bước Thiết Lập Ban Đầu (Setup từ A - Z)](#4-các-bước-thiết-lập-ban-đầu-setup-từ-a---z)
   - [Bước 1: Clone mã nguồn kèm Git Submodules](#bước-1-clone-mã-nguồn-kèm-git-submodules)
   - [Bước 2: Cấu hình biến môi trường (.env)](#bước-2-cấu-hình-biến-môi-trường-env)
   - [Bước 3: Phân quyền thực thi Scripts](#bước-3-phân-quyền-thực-thi-scripts)
5. [Các Kịch Bản Khởi Chạy Dự Án (Run Scenarios)](#5-các-kịch-bản-khởi-chạy-dự-án-run-scenarios)
   - [Kịch bản 1: Khởi chạy 1-Click (Khuyến nghị)](#kịch-bản-1-khởi-chạy-1-click-khuyến-nghị)
   - [Kịch bản 2: Khởi chạy Độc lập Cụm SSO & Portal Hub](#kịch-bản-2-khởi-chạy-độc-lập-cụm-sso--portal-hub)
   - [Kịch bản 3: Chỉ khởi chạy Hạ tầng Dùng chung (Infra Only)](#kịch-bản-3-chỉ-khởi-chạy-hạ-tầng-dùng-chung-infra-only)
   - [Kịch bản 4: Khởi chạy Toàn bộ Hệ sinh thái qua Docker Compose](#kịch-bản-4-khởi-chạy-toàn-bộ-hệ-sinh-thái-qua-docker-compose)
   - [Kịch bản 5: Chạy Hybrid (Infra Docker + Dev trực tiếp trên Host)](#kịch-bản-5-chạy-hybrid-infra-docker--dev-trực-tiếp-trên-host)
6. [Bảng Phân Bổ Cổng Dịch Vụ & URLs Quản Trị](#6-bảng-phân-bổ-cổng-dịch-vụ--urls-quản-trị)
7. [Tài Khoản Kiểm Thử Mẫu (Pre-seeded Personas)](#7-tài-khoản-kiểm-thử-mẫu-pre-seeded-personas)
8. [Kiểm Thử & Xác Minh Hệ Thống Hoạt Động](#8-kiểm-thử--xác-minh-hệ-thống-hoạt-động)
9. [Dừng và Reset Hệ Thống](#9-dừng-và-reset-hệ-thống)
10. [Xử Lý Sự Cố Thường Gặp (Troubleshooting & FAQs)](#10-xử-lý-sự-cố-thường-gặp-troubleshooting--faqs)

---

## 1. TỔNG QUAN KIẾN TRÚC HỆ SINH THÁI

Hệ sinh thái **Vahiztech** vận hành theo mô hình trung tâm cấp quyền phân tán tương tự **Google Workspace Hub (Cha) -> Google Apps (Con)**:

- **Tầng Hạ tầng Dùng chung (Infra Tier)**:
  - **Keycloak 25.0+**: Định danh tập trung (Central IAM & SSO), hỗ trợ Multi-Tenancy qua Organization feature, quản lý Users, Roles, Mappers, cấp phát JWT mang thông tin `tenant_id` và danh sách bản quyền `licenses`.
  - **PostgreSQL 16 Alpine**: Cụm cơ sở dữ liệu Hub tích hợp script tự động tạo nhiều database (`keycloak`, `coursedemy_db`, `vihotask_db`).
  - **Apache Kafka (Confluent 7.6.1)**: Event streaming & Message broker phục vụ giao tiếp bất đồng bộ giữa các microservices.
- **Tầng Cổng Ứng Dụng Trung Tâm (Portal Hub)**:
  - **Vahiztech Hub Portal (`apps/portal`)**: Ứng dụng React 18 + Vite + TailwindCSS điều phối đăng nhập SSO, hiển thị Dashboard hệ sinh thái, kích hoạt/mua bản quyền các ứng dụng con.
- **Tầng Ứng Dụng Nghiệp Vụ (Sub-Apps / Microservices)**:
  - **CourseDemy (`apps/coursedemy`)**: Nền tảng học trực tuyến (Backend: Spring Boot 3.x / Java 17+, Frontend: Next.js 14+).
  - **VihoTask (`apps/vihotask`)**: Nền tảng quản lý công việc và dự án (Backend: Spring Boot / Quarkus Java 17+, Frontend: Next.js 14+).

```
                                +-----------------------+
                                |    PostgreSQL 16      |
                                |     (Port: 5433)      |
                                +-----------+-----------+
                                            |
                                            v
                                +-----------------------+
                                |    Keycloak 25.0+     |
                                |     (Port: 8080)      |
                                +-----------+-----------+
                                            |
         +----------------------------------+----------------------------------+
         |                                  |                                  |
         v                                  v                                  v
+------------------+              +-------------------+              +-------------------+
|  Portal Hub (3000)              | CourseDemy (3001) |              |  VihoTask (3002)  |
|  (Central Auth)  |              |   API: 8081       |              |    API: 8083      |
+------------------+              +-------------------+              +-------------------+
```

---

## 2. YÊU CẦU MÔI TRƯỜNG TIÊN QUYẾT (PREREQUISITES)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:

| Công cụ            | Phiên bản khuyến nghị     | Mục đích sử dụng                       | Kiểm tra lệnh                    |
| :----------------- | :------------------------ | :------------------------------------- | :------------------------------- |
| **Git**            | `>= 2.30.0`               | Quản lý mã nguồn và Git Submodules     | `git --version`                  |
| **Docker**         | `>= 24.0.0`               | Đóng gói và chạy các dịch vụ container | `docker --version`               |
| **Docker Compose** | `>= v2.20.0` (Compose V2) | Điều phối các cụm dịch vụ              | `docker compose version`         |
| **curl** / **jq**  | Mới nhất                  | Chạy các script tự động kiểm thử token | `curl --version && jq --version` |

> [!IMPORTANT]
> **Tài nguyên phần cứng khuyến nghị:**
>
> - **RAM**: Tối thiểu 8 GB khả dụng (Khuyến nghị 12 GB - 16 GB nếu chạy toàn bộ hệ sinh thái gồm cả Microservices).
> - **CPU**: Tối thiểu 4 Cores.
> - **Dung lượng ổ cứng**: Tối thiểu 15 GB dung lượng trống để lưu Docker images và cơ sở dữ liệu.
> - **Cấu hình Docker Desktop (Mac / Windows)**: Vào mục **Settings > Resources**, cấp tối thiểu **6 GB RAM** và **4 CPUs** cho Docker Engine để tránh tình trạng container bị OOMKilled (Out of Memory).

_(Chỉ cần thiết nếu bạn muốn chạy chế độ **Hybrid Dev - Kịch bản 5** không dùng Docker cho Apps)_:

- **Java Development Kit (JDK)**: OpenJDK 17 LTS hoặc OpenJDK 21 LTS (`java -version`).
- **Node.js**: Phiên bản 18 LTS hoặc 20 LTS (`node -v`).
- **Package Manager**: `npm` hoặc `pnpm` (`npm -v` / `pnpm -v`).

---

## 3. CẤU TRÚC THƯ MỤC ĐIỀU PHỐI

```
Vahiztech/
├── .env.example                  # Template biến môi trường chuẩn
├── .env                          # Biến môi trường hoạt động thực tế (sinh ra khi setup)
├── docker-compose.yml            # Master Compose Hub (Include infra, portal & apps)
├── docker-compose.infra.yml      # Cấu hình cụm Hạ tầng (PostgreSQL 16, Keycloak 25+, Kafka)
├── docker-compose.portal.yml     # Cấu hình Vahiztech Hub Portal
├── docker-compose.apps.yml       # Cấu hình Microservices (CourseDemy, VihoTask)
├── docker-compose.sso.yml        # Cấu hình chạy ĐỘC LẬP cụm SSO & Portal (nhẹ & tiện dụng)
├── apps/                         # Mã nguồn các ứng dụng
│   ├── portal/                   # Web Cổng Trung tâm Vahiztech Hub (Vite + React)
│   ├── coursedemy/               # [Git Submodule] Khóa học & Video LMS
│   │   ├── back-end/             # Spring Boot Service (Port 8081)
│   │   └── front-end/            # Next.js App (Port 3001)
│   └── vihotask/                 # [Git Submodule] Quản lý Công việc & Dự án
│       ├── backend/              # Java Backend Service (Port 8083)
│       └── frontend/             # Next.js App (Port 3002)
├── infra/                        # Tầng Hạ tầng Dùng chung
│   ├── keycloak/
│   │   ├── realms/               # ecosystem-realm.json (Realm, Clients, Mappers, Users)
│   │   ├── themes/               # Giao diện đăng nhập tùy biến
│   │   └── scripts/              # test-token.sh (Script kiểm thử SSO Token)
│   └── postgres/
│       └── init-scripts/         # 01-init-multi-postgres-dbs.sh (Khởi tạo DBs tự động)
├── scripts/
│   ├── start-local.sh            # Script khởi chạy 1-Click thông minh
│   └── stop-local.sh             # Script dừng toàn bộ hệ sinh thái
└── docs/                         # Toàn bộ tài liệu kỹ thuật, kiến trúc, API
```

---

## 4. CÁC BƯỚC THIẾT LẬP BAN ĐẦU (SETUP TỪ A - Z)

### Bước 1: Clone mã nguồn kèm Git Submodules

Dự án Vahiztech sử dụng **Git Submodules** để liên kết các ứng dụng con (`coursedemy`, `vihotask`).

- **Cách 1: Khi clone mới hoàn toàn:**

  ```bash
  git clone --recurse-submodules https://github.com/vanhdz74/Vahiztech.git
  cd Vahiztech
  ```

- **Cách 2: Nếu bạn đã lỡ clone thông thường (chưa có submodules):**
  ```bash
  cd Vahiztech
  git submodule update --init --recursive
  ```

> [!NOTE]
> Kiểm tra các thư mục `apps/coursedemy/back-end` và `apps/vihotask/backend` phải chứa đầy đủ mã nguồn và file `pom.xml`, không được để trống.

---

### Bước 2: Cấu hình biến môi trường (.env)

Hệ thống đã chuẩn hóa file cấu hình mẫu `.env.example`. Tạo file `.env` tại thư mục gốc:

```bash
cp .env.example .env
```

#### Giải thích các biến môi trường quan trọng trong `.env`:

```ini
# --- CƠ SỞ DỮ LIỆU POSTGRESQL 16 ---
POSTGRES_DB=keycloak
POSTGRES_USER=keycloak
POSTGRES_PASSWORD=keycloak_secure_pass_2026
POSTGRES_PORT=5433                           # Cổng ánh xạ ra máy Host (tránh đụng cổng 5432 mặc định)

# --- KEYCLOAK IAM & SSO SERVER ---
KEYCLOAK_ADMIN=admin                         # Tài khoản Master Admin của Keycloak
KEYCLOAK_ADMIN_PASSWORD=admin_master_password_2026
KEYCLOAK_PORT=8080                           # Cổng Keycloak Server
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=ecosystem-realm               # Realm quản trị toàn bộ hệ sinh thái

# --- PORTAL HUB WEB APP ---
PORTAL_PORT=3000                             # Cổng Cổng thông tin trung tâm
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=ecosystem-realm
VITE_KEYCLOAK_CLIENT_ID=vahiztech-hub

# --- M2M SERVICE ACCOUNT CREDENTIALS ---
BACKEND_ADMIN_CLIENT_SECRET=backend_admin_super_secret_2026

# --- CÁC ỨNG DỤNG CON (MICROSERVICES) ---
COURSEDEMY_BACKEND_PORT=8081
COURSEDEMY_FRONTEND_PORT=3001
VIHOTASK_BACKEND_PORT=8083
VIHOTASK_FRONTEND_PORT=3002
JWT_SECRET=ZGV2LW9ubHktY291cnNlZGVteS1qd3Qtc2VjcmV0LTEyMzQ1Ng==
AUTH_SECRET=vahiztech-dev-secret-auth-key-2026
```

---

### Bước 3: Phân quyền thực thi Scripts

Cấp quyền thực thi (`chmod +x`) cho tất cả các script trong dự án:

```bash
chmod +x scripts/*.sh infra/keycloak/scripts/*.sh
```

---

## 5. CÁC KỊCH BẢN KHỞI CHẠY DỰ ÁN (RUN SCENARIOS)

Tùy thuộc vào nhu cầu phát triển và tài nguyên máy tính, bạn có thể lựa chọn 1 trong 5 kịch bản sau:

```
                            BẠN MUỐN LÀM GÌ?
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
[Chạy nhanh nhất]          [Chỉ dev Frontend/SSO]      [Chỉ dev Backend IDE]
  Kịch bản 1:                  Kịch bản 2:                  Kịch bản 3:
 ./scripts/start-local.sh     docker compose -f            docker compose -f
                             docker-compose.sso.yml up    docker-compose.infra.yml up
```

---

### Kịch bản 1: Khởi chạy 1-Click (Khuyến nghị)

Đây là cách đơn giản và an toàn nhất. Script `start-local.sh` sẽ tự động thực hiện:

1. Kiểm tra và sao chép `.env` nếu chưa có.
2. Khởi chạy toàn bộ hạ tầng và các cổng dịch vụ qua Docker Compose.
3. Chờ đợi (Health-check loop) cho đến khi Keycloak nạp xong Realm và mở endpoint OIDC.
4. Chạy script kiểm thử token tự động để xác thực luồng định danh.

**Lệnh thực thi:**

```bash
./scripts/start-local.sh
```

**Dừng hệ thống:**

```bash
./scripts/stop-local.sh
```

---

### Kịch bản 2: Khởi chạy Độc lập Cụm SSO & Portal Hub

_Phù hợp cho:_ Lập trình viên Frontend hoặc kỹ sư cần kiểm thử giao diện Portal Hub, quy trình đăng nhập SSO, phân quyền JWT và cấp phép ứng dụng mà không cần chạy toàn bộ Backend của CourseDemy hay VihoTask.

Kịch bản này **rất nhẹ**, chỉ tiêu tốn khoảng ~1GB RAM:

```bash
# Sử dụng file compose độc lập SSO:
docker compose -f docker-compose.sso.yml up -d

# Hoặc kết hợp infra + portal:
docker compose -f docker-compose.infra.yml -f docker-compose.portal.yml up -d
```

Sau khoảng 20-30 giây, bạn có thể truy cập:

- Portal Hub: [http://localhost:3000](http://localhost:3000)
- Keycloak Console: [http://localhost:8080](http://localhost:8080)

---

### Kịch bản 3: Chỉ khởi chạy Hạ tầng Dùng chung (Infra Only)

_Phù hợp cho:_ Lập trình viên Backend muốn chạy và debug mã nguồn Java (Spring Boot / Quarkus) trực tiếp từ IDE (IntelliJ IDEA, Eclipse, VS Code) để đặt Breakpoints và tận dụng Live Reload.

Khởi chạy PostgreSQL 16, Keycloak 25+ và Kafka:

```bash
docker compose -f docker-compose.infra.yml up -d
```

Kiểm tra trạng thái các container:

```bash
docker compose -f docker-compose.infra.yml ps
```

Khi hạ tầng đã sẵn sàng:

- Database host: `localhost:5433` (User: `keycloak`, Password: ` `).
- Keycloak: `http://localhost:8080`.
- Kafka Broker: `localhost:29092`.

---

### Kịch bản 4: Khởi chạy Toàn bộ Hệ sinh thái qua Docker Compose

Khởi chạy đồng thời:

- PostgreSQL 16 + Keycloak 25+ + Kafka
- Vahiztech Hub Portal
- CourseDemy Backend (Spring Boot) & Frontend (Next.js)
- VihoTask Backend & Frontend (Next.js)

```bash
# Khởi chạy ngầm:
docker compose up -d

# Xem log tổng hợp:
docker compose logs -f

# Xem log của một dịch vụ cụ thể:
docker compose logs -f keycloak
docker compose logs -f coursedemy-backend
docker compose logs -f portal
```

#### Rebuild lại khi sửa mã nguồn:

```bash
# Rebuild và cập nhật tất cả container:
docker compose up -d --build

# Chỉ rebuild 1 dịch vụ cụ thể (tiết kiệm thời gian):
docker compose up -d --build coursedemy-backend
docker compose up -d --build portal
```

---

### Kịch bản 5: Chạy Hybrid (Infra Docker + Dev trực tiếp trên Host)

Dành cho môi trường phát triển hàng ngày khi bạn cần code và thấy kết quả ngay lập tức (Hot Reload):

#### 1. Bật hạ tầng Docker:

```bash
docker compose -f docker-compose.infra.yml up -d
```

#### 2. Chạy Cổng Portal Hub:

```bash
cd apps/portal
npm install
npm run dev
# Truy cập tại: http://localhost:3000
```

#### 3. Chạy CourseDemy:

```bash
# Terminal 1 - Backend (Spring Boot):
cd apps/coursedemy/back-end
./mvnw spring-boot:run
# API lắng nghe tại: http://localhost:8081

# Terminal 2 - Frontend (Next.js):
cd apps/coursedemy/front-end
npm install
npm run dev -- -p 3001
# Web lắng nghe tại: http://localhost:3001
```

#### 4. Chạy VihoTask:

```bash
# Terminal 3 - Backend:
cd apps/vihotask/backend
./mvnw spring-boot:run
# API lắng nghe tại: http://localhost:8083

# Terminal 4 - Frontend (Next.js):
cd apps/vihotask/frontend
npm install
npm run dev -- -p 3002
# Web lắng nghe tại: http://localhost:3002
```

---

## 6. BẢNG PHÂN BỔ CỔNG DỊCH VỤ & URLS QUẢN TRỊ

| Dịch vụ                      | URL / Địa chỉ Host                                             | Cổng Host | Tài khoản / Thông tin xác thực                                                                           | Ghi chú                                        |
| :--------------------------- | :------------------------------------------------------------- | :-------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| **Vahiztech Hub Portal**     | `http://localhost:3000`                                        | `3000`    | Xem bảng User Personas                                                                                   | Giao diện đăng nhập & Cổng App Store           |
| **Keycloak Admin Console**   | `http://localhost:8080`                                        | `8080`    | User: `admin`<br>Pass: `admin_master_password_2026`                                                      | Giao diện quản trị Keycloak Master             |
| **Ecosystem Realm Console**  | `http://localhost:8080/admin/master/console/#/ecosystem-realm` | `8080`    | (Sử dụng tài khoản Master Admin)                                                                         | Quản lý Users, Roles, Clients của hệ sinh thái |
| **Keycloak Account Console** | `http://localhost:8080/realms/ecosystem-realm/account`         | `8080`    | Xem bảng User Personas                                                                                   | Trang tự đổi mật khẩu & quản lý tài khoản User |
| **CourseDemy Frontend**      | `http://localhost:3001`                                        | `3001`    | Đăng nhập SSO qua Keycloak                                                                               | Ứng dụng Học trực tuyến (Next.js)              |
| **CourseDemy Backend API**   | `http://localhost:8081`                                        | `8081`    | JWT Bearer Token                                                                                         | Spring Boot Resource Server                    |
| **VihoTask Frontend**        | `http://localhost:3002`                                        | `3002`    | Đăng nhập SSO qua Keycloak                                                                               | Ứng dụng Quản lý công việc (Next.js)           |
| **VihoTask Backend API**     | `http://localhost:8083`                                        | `8083`    | JWT Bearer Token                                                                                         | Backend Resource Server                        |
| **PostgreSQL 16 Database**   | `localhost:5433`                                               | `5433`    | User: `keycloak`<br>Pass: `keycloak_secure_pass_2026`<br>DBs: `keycloak`, `coursedemy_db`, `vihotask_db` | Kết nối qua DBeaver / DataGrip / TablePlus     |
| **Apache Kafka Broker**      | `localhost:29092`                                              | `29092`   | Không mật khẩu (Plaintext)                                                                               | Event broker                                   |

---

## 7. TÀI KHOẢN KIỂM THỬ MẪU (PRE-SEEDED PERSONAS)

Keycloak đã được cấu hình sẵn các tài khoản thử nghiệm tương ứng với các cấp độ thẩm quyền trong hệ sinh thái:

| Username                | Password            | Realm Role              | Tenant ID      | Quyền Bản Quyền (`licenses`)                  | Hành vi mong đợi khi đăng nhập                                      |
| :---------------------- | :------------------ | :---------------------- | :------------- | :-------------------------------------------- | :------------------------------------------------------------------ |
| `vahiztech_super_admin` | `SuperAdmin@123456` | `ecosystem_super_admin` | `vahiztech-hq` | `["vahiztech_hub", "coursedemy", "vihotask"]` | Toàn quyền quản trị hệ thống, truy cập tất cả ứng dụng              |
| `alpha_corp_admin`      | `Admin@123456`      | `org_admin`             | `alpha-corp`   | `["coursedemy", "vihotask"]`                  | Admin Doanh nghiệp Alpha: Quản trị nội bộ và dùng đủ 2 Apps         |
| `alpha_employee_tasks`  | `Staff@123456`      | `org_member`            | `alpha-corp`   | `["vihotask"]`                                | Nhân viên Alpha: Vào được VihoTask, bị **chặn** vào CourseDemy      |
| `beta_school_student`   | `Student@123456`    | `org_member`            | `beta-school`  | `["coursedemy"]`                              | Học viên trường Beta: Vào được CourseDemy, bị **chặn** vào VihoTask |
| `free_tier_user`        | `Free@123456`       | `individual_user`       | `free-tier`    | `[]` _(Rỗng)_                                 | Người dùng cá nhân chưa mua bản quyền: Không truy cập được Apps con |

---

## 8. KIỂM THỬ & XÁC MINH HỆ THỐNG HOẠT ĐỘNG

### 8.1. Kiểm thử Tự động qua Shell Script

Chạy kịch bản kiểm thử tích hợp để kiểm tra cấp phát Token và phân quyền Claims (`tenant_id`, `licenses`, `roles`):

```bash
./infra/keycloak/scripts/test-token.sh
```

Kết quả mong đợi:

- `backend-admin-client` lấy được Service Account M2M Token và query danh sách Users thành công.
- Tất cả 5 personas lấy được JWT và hiển thị chính xác các mảng claims `licenses`.

### 8.2. Kiểm tra OpenID Connect Discovery & JWKS

Kiểm tra endpoint cấu hình SSO của Realm:

```bash
curl -s http://localhost:8080/realms/ecosystem-realm/.well-known/openid-configuration | grep "issuer"
```

Kiểm tra chứng chỉ khóa công khai (JWKS) dùng để xác minh chữ ký JWT:

```bash
curl -s http://localhost:8080/realms/ecosystem-realm/protocol/openid-connect/certs
```

### 8.3. Kiểm tra Cơ sở dữ liệu PostgreSQL

Kết nối kiểm tra các cơ sở dữ liệu đã tự động được tạo:

```bash
docker exec -it vahiztech-postgres psql -U keycloak -d keycloak -c "\l"
```

Bạn sẽ thấy danh sách cơ sở dữ liệu gồm: `keycloak`, `coursedemy_db`, `vihotask_db`.

---

## 9. DỪNG VÀ RESET HỆ THỐNG

### Dừng hệ thống thông thường (Giữ nguyên dữ liệu DB):

```bash
# Nếu dùng script:
./scripts/stop-local.sh

# Hoặc dùng lệnh Docker Compose:
docker compose down
```

### Dừng và XÓA SẠCH dữ liệu (Reset hoàn toàn):

Khi bạn muốn đưa hệ thống về trạng thái ban đầu để nạp lại từ đầu cấu hình Realm và Database:

```bash
# Dừng và xóa toàn bộ volumes:
docker compose down -v
```

> [!CAUTION]
> Lệnh `docker compose down -v` sẽ xóa bỏ toàn bộ dữ liệu trong volume `auth_postgres_data`. Mọi tài khoản mới tạo hoặc dữ liệu phát sinh trong quá trình test sẽ bị xóa sạch.

---

## 10. XỬ LÝ SỰ CỐ THƯỜNG GẶP (TROUBLESHOOTING & FAQS)

### Sự cố 1: Thư mục `apps/coursedemy` hoặc `apps/vihotask` bị trống rỗng

- **Nguyên nhân**: Khi clone mã nguồn chưa dùng cờ `--recurse-submodules`.
- **Cách khắc phục**:
  ```bash
  git submodule update --init --recursive
  ```

### Sự cố 2: Lỗi trùng cổng (Port Conflict)

- **Hiện tượng**: Docker báo lỗi `bind: address already in use` cho các cổng `8080`, `5432`, `5433`, hoặc `3000`.
- **Cách khắc phục**:
  1. Kiểm tra tiến trình đang chiếm cổng:
     ```bash
     # Trên macOS / Linux:
     lsof -i :8080
     lsof -i :5432
     lsof -i :3000
     ```
  2. Tắt ứng dụng đang chiếm cổng hoặc đổi cổng trong file `.env`:
     ```ini
     POSTGRES_PORT=5434
     KEYCLOAK_PORT=8089
     PORTAL_PORT=3005
     ```

### Sự cố 3: Keycloak không import dữ liệu mới từ `ecosystem-realm.json`

- **Nguyên nhân**: Keycloak đã nạp dữ liệu vào PostgreSQL từ lần chạy đầu tiên. Khi PostgreSQL volume đã tồn tại, Keycloak sẽ không tự động ghi đè dữ liệu cũ.
- **Cách khắc phục**:
  ```bash
  # Xóa volume dữ liệu cũ và khởi động lại:
  docker compose down -v
  docker compose up -d
  ```

### Sự cố 4: Spring Boot / Microservice báo lỗi kết nối cơ sở dữ liệu khi khởi động

- **Nguyên nhân**: Container Backend khởi động nhanh hơn thời gian PostgreSQL khởi tạo xong các DB con.
- **Cách khắc phục**:
  File `docker-compose.infra.yml` và `docker-compose.apps.yml` đã được cấu hình `condition: service_healthy` cho PostgreSQL. Nếu chạy thủ công, hãy đảm bảo PostgreSQL đã báo `healthy` trước khi bật apps:
  ```bash
  docker compose ps vahiztech-postgres
  ```

### Sự cố 5: Lỗi CORS hoặc "Invalid parameter: redirect_uri" trên trình duyệt

- **Nguyên nhân**: URL trên thanh địa chỉ không trùng khớp với các `Valid Redirect URIs` được đăng ký trong Keycloak Client (`nextjs-portal`, `vahiztech-hub`).
- **Cách khắc phục**:
  1. Đăng nhập Keycloak Console: `http://localhost:8080/admin/master/console/#/ecosystem-realm`.
  2. Vào **Clients** > Chọn Client tương ứng (ví dụ `vahiztech-hub` hoặc `nextjs-portal`).
  3. Kiểm tra mục **Valid redirect URIs**, thêm `http://localhost:3000/*`, `http://localhost:3001/*`, `http://localhost:3002/*`.
  4. Đảm bảo **Web origins** có giá trị `+` hoặc `http://localhost:3000`.

---

_Tài liệu được cập nhật cho kiến trúc Vahiztech Ecosystem v2.0._
