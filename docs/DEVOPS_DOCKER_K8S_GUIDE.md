# HƯỚNG DẪN THAO TÁC DEVOPS: DOCKER, DOCKER COMPOSE & KUBERNETES (K8S)
## Hệ Sinh Thái SaaS Multi-Tenant Vahiztech

Tài liệu này cung cấp toàn bộ hướng dẫn thực hành, các câu lệnh thao tác chi tiết và quy chuẩn kiến trúc để xây dựng, vận hành và mở rộng hạ tầng container cho hệ sinh thái **Vahiztech**.

---

## 1. TỔNG QUAN KIẾN TRÚC 4 TẦNG DEVOPS & GITOPS

```
[Mã nguồn Microservices & Submodules]
         │
         ▼
[TẦNG 1: DOCKER] ── (Multi-stage build, Non-root, Cache layer, JRE Minimal)
         │
         ├─────────────────────────────────────────┐
         ▼                                         ▼
[TẦNG 2: DOCKER COMPOSE]                 [TẦNG 3: KUBERNETES (K8S)]
(Môi trường Local Dev & Testing)          (Môi trường Staging & Production)
  ├── docker-compose.infra.yml              ├── k8s/base/ (Cấu hình dùng chung)
  ├── docker-compose.apps.yml               └── k8s/overlays/
  ├── docker-compose.yml (Master Hub)             ├── dev/  (1 replica, ít RAM)
  └── infra/ (Keycloak SSO, Postgres DB Hub)      └── prod/ (HA >= 2, HPA, TLS)
         │                                         ▲
         └───────────────────┬─────────────────────┘
                             ▼
                 [TẦNG 4: CI/CD & GITOPS HUB]
                 (.github/workflows/)
                   ├── ci-infra-lint.yml
                   ├── deploy-k8s-dev.yml
                   ├── deploy-k8s-prod.yml
                   └── sync-submodules.yml
```

---

## 2. TẦNG 1: BUILD VÀ ĐÓNG GÓI DOCKER IMAGES

Tất cả các dịch vụ đều được chuẩn hóa Multi-Stage Build với người dùng non-root (`spring` / `nextjs`) và tối ưu kích thước image (< 150MB).

### 2.1. Lệnh Build Từng Image Độc Lập

Từ thư mục gốc dự án (`Vahiztech/`):

```bash
# 1. Build CourseDemy Backend (Spring Boot 3.x / Java 17)
docker build -t vahiztech/coursedemy-backend:latest ./apps/coursedemy/back-end

# 2. Build CourseDemy Frontend (Next.js 14+ Standalone)
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8081 \
  -t vahiztech/coursedemy-frontend:latest ./apps/coursedemy/front-end

# 3. Build VihoTask Backend (Spring Boot 3.2+ / Java 17)
docker build -t vahiztech/vihotask-backend:latest ./apps/vihotask/backend
```

### 2.2. Kiểm tra Dung lượng & Bảo mật Images
```bash
docker images | grep vahiztech
```

---

## 3. TẦNG 2: ĐIỀU PHỐI VỚI DOCKER COMPOSE (LOCAL DEVELOPMENT)

Hệ thống được module hóa thành các file compose chuyên biệt, cho phép bật/tắt linh hoạt theo nhu cầu làm việc của lập trình viên mà không gây quá tải tài nguyên máy tính.

### 3.1. Các Kịch Bản Khởi Chạy Thường Gặp

#### Kịch bản 1: Chỉ chạy Hạ tầng Dùng chung (Infra: PostgreSQL + Keycloak + Kafka)
*Dành cho lập trình viên Backend muốn debug code trực tiếp trên IDE (IntelliJ / VS Code)*:
```bash
docker compose -f docker-compose.infra.yml up -d
```
*Kiểm tra trạng thái:*
```bash
docker compose -f docker-compose.infra.yml ps
```

#### Kịch bản 2: Khởi chạy Toàn bộ Hệ Sinh Thái (Ecosystem Mode)
*Bao gồm cả Hạ tầng và toàn bộ Microservices (CourseDemy Backend/Frontend, VihoTask)*:
```bash
docker compose up -d
```

#### Kịch bản 3: Build lại code sau khi sửa mã nguồn
```bash
# Rebuild toàn bộ
docker compose up -d --build

# Chỉ rebuild 1 service cụ thể (ví dụ vihotask-backend)
docker compose up -d --build vihotask-backend
```

### 3.2. Bảng Phân Bổ Cổng Dịch Vụ Khi Chạy Local
| Dịch vụ | Cổng Container | Cổng Ánh Xạ Host | Mục đích / Đường dẫn |
| :--- | :--- | :--- | :--- |
| **Keycloak IAM** | 8080 | **8080** | Quản trị SSO: `http://localhost:8080` (admin/admin1234) |
| **PostgreSQL** | 5432 | **5432** | DB Hub: `keycloak`, `coursedemy_db`, `vihotask_db` |
| **Kafka Broker** | 9092 | **29092** | Message Streaming (KRaft Mode) |
| **CourseDemy BE** | 8080 | **8081** | API Khóa học: `http://localhost:8081` |
| **CourseDemy FE** | 3000 | **3000** | Giao diện E-Learning: `http://localhost:3000` |
| **VihoTask BE** | 8080 | **8083** | API Quản lý dự án: `http://localhost:8083` |

### 3.3. Dừng và Dọn Dẹp Môi Trường
```bash
# Dừng các container (dữ liệu DB vẫn giữ nguyên trong volumes)
docker compose down

# Dừng và xóa toàn bộ dữ liệu database để reset sạch từ đầu
docker compose down -v
```

---

## 4. TẦNG 3: TRIỂN KHAI TRÊN KUBERNETES (K8S)

Dự án sử dụng **Kustomize** (tích hợp sẵn trong lệnh `kubectl`), tuân thủ triết lý GitOps phân tách rõ ràng giữa `k8s/base/` và `k8s/overlays/`.

### 4.1. Cấu Trúc Thư Mục K8s
```
k8s/
├── base/                                      # Cấu hình độc lập môi trường
│   ├── namespace.yaml                         # Namespace chuẩn: vahiztech
│   ├── postgres/                              # PostgreSQL StatefulSet & ClusterIP
│   ├── keycloak/                              # Keycloak Clustered Deployment
│   ├── coursedemy/                            # Backend & Frontend Deployments
│   ├── vihotask/                              # Backend Deployment
│   ├── ingress.yaml                           # NGINX Ingress Controller
│   └── kustomization.yaml                     # Manifest tổng hợp base
└── overlays/                                  # Cấu hình đặc thù môi trường
    ├── dev/                                   # Môi trường Dev (1 replica, namespace: vahiztech-dev)
    │   └── kustomization.yaml
    └── prod/                                  # Môi trường Prod (Replicas >= 2, HPA, TLS Cert-manager)
        ├── kustomization.yaml
        └── hpa.yaml                           # Tự động co giãn (Auto-scale 2 -> 10 pods)
```

### 4.2. Lệnh Xem Trước (Dry-Run / Preview Manifests)
Trước khi apply vào cluster, bạn luôn có thể kiểm tra file YAML hoàn chỉnh được Kustomize sinh ra:
```bash
# Xem trước cấu hình Dev:
kubectl kustomize k8s/overlays/dev

# Xem trước cấu hình Prod:
kubectl kustomize k8s/overlays/prod
```

### 4.3. Triển Khai Vào Cụm Kubernetes

#### Triển khai Môi trường Dev:
```bash
kubectl apply -k k8s/overlays/dev
```

#### Triển khai Môi trường Production:
```bash
kubectl apply -k k8s/overlays/prod
```

### 4.4. Kiểm Tra Trạng Thái Cụm K8s
```bash
# Xem danh sách Pods, Services và Ingress trong namespace production:
kubectl get pods,svc,ingress,hpa -n vahiztech-prod

# Xem log thời gian thực của một Pod:
kubectl logs -f -l app.kubernetes.io/name=coursedemy-backend -n vahiztech-prod

# Xem sự kiện cảnh báo hoặc lỗi nếu Pod không khởi động được:
kubectl get events -n vahiztech-prod --sort-by='.metadata.creationTimestamp'
```

---

## 5. QUY TRÌNH MỞ RỘNG (KHI THÊM MICROSERVICE MỚI)

Giả sử trong tương lai hệ sinh thái bổ sung thêm **`apps/billing-service`**:

### Bước 1: Tạo Dockerfile
Tạo `apps/billing-service/Dockerfile` theo mẫu Multi-Stage tương tự `vihotask` hoặc `coursedemy`.

### Bước 2: Thêm vào Docker Compose Local
Mở `docker-compose.apps.yml`, bổ sung block:
```yaml
  billing-service:
    build:
      context: ./apps/billing-service
      dockerfile: Dockerfile
    container_name: vahiztech-billing-service
    ports:
      - "8084:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/billing_db
    networks:
      - default
```

### Bước 3: Thêm vào Kubernetes (K8s)
1. Tạo thư mục `k8s/base/billing/` chứa 2 file:
   - `billing-deployment.yaml` (gồm liveness/readiness probe, resource limits).
   - `billing-service.yaml` (ClusterIP port 8080).
2. Mở `k8s/base/kustomization.yaml`, khai báo thêm 2 file trên vào danh sách `resources`.
3. Mở `k8s/base/ingress.yaml`, thêm rule định tuyến domain:
   ```yaml
   - host: billing.vahiztech.com
     http:
       paths:
         - path: /
           pathType: Prefix
           backend:
             service:
               name: billing-service
               port:
                 number: 8080
   ```
4. Chạy `kubectl apply -k k8s/overlays/prod` -> Dịch vụ mới lập tức được triển khai tự động mà không ảnh hưởng tới bất kỳ dịch vụ đang chạy nào khác.

---

## 6. TẦNG 4: TỰ ĐỘNG HÓA CI/CD & GITOPS HUB

Hệ thống CI/CD được thiết lập tại `.github/workflows/` với các pipelines chuyên biệt:

| Pipeline | File cấu hình | Điều kiện kích hoạt | Nhiệm vụ chính |
| :--- | :--- | :--- | :--- |
| **Lint & Test Infra** | `.github/workflows/ci-infra-lint.yml` | Push / PR vào `main`, `develop` thay đổi `k8s/**`, `infra/**`, `docker-compose*.yml` | Validate K8s manifests (Kustomize), validate JSON Schema Realm, kiểm tra Docker Compose. |
| **Deploy K8s Dev** | `.github/workflows/deploy-k8s-dev.yml` | Push vào nhánh `develop` hoặc trigger thủ công | Tự động apply manifest lên Kubernetes Dev Cluster (`k8s/overlays/dev`). |
| **Deploy K8s Prod** | `.github/workflows/deploy-k8s-prod.yml` | Push Git Tag `v*.*.*` hoặc manual trigger với `confirm_deploy: YES` | Triển khai an toàn lên Production (`k8s/overlays/prod`), kiểm tra rollout status và HPA. |
| **Sync Submodules** | `.github/workflows/sync-submodules.yml` | Chạy định kỳ 2h sáng hoặc manual trigger | Cập nhật commit mới nhất của `apps/coursedemy` và `apps/vihotask`. |
| **App Microservice CI** | `.github/workflows/app-ci-template.example.yml` | Template đặt trong từng submodule app | Chạy unit test backend (Maven), frontend (npm build) và publish Docker image. |

