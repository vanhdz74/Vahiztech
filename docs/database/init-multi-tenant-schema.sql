-- =============================================================================
-- VAHIZTECH SAAS MULTI-TENANT DATABASE INITIALIZATION SCRIPT (POSTGRESQL 16)
-- Architecture: Shared Database with Discriminator Column & Row-Level Security (RLS)
-- =============================================================================

-- 1. Bật Extensions cần thiết
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Thiết lập Schema chính
CREATE SCHEMA IF NOT EXISTS vahiztech;
SET search_path TO vahiztech, public;

-- =============================================================================
-- 2. BẢNG HỆ THỐNG QUẢN TRỊ TỔ CHỨC & BẢN QUYỀN (CORE TENANT MANAGEMENT)
-- =============================================================================

-- Bảng Quản lý Tenant (Tổ chức / Doanh nghiệp)
CREATE TABLE IF NOT EXISTS tenants (
    id VARCHAR(64) PRIMARY KEY, -- Trùng với Keycloak Org / Tenant ID (VD: tenant-alpha)
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'TERMINATED')),
    contact_email VARCHAR(255) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Quản lý Bản quyền Sản phẩm theo từng Tenant (Licenses)
CREATE TABLE IF NOT EXISTS tenant_licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    license_key VARCHAR(64) NOT NULL CHECK (license_key IN ('coursedemy', 'vihotask')),
    max_seats INTEGER NOT NULL DEFAULT 10,
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'EXPIRED', 'REVOKED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_tenant_license UNIQUE (tenant_id, license_key)
);

-- Bảng Nhật ký Hoạt động (Audit Logs)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    actor_username VARCHAR(100) NOT NULL,
    action_type VARCHAR(64) NOT NULL,
    target_resource VARCHAR(128) NOT NULL,
    payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 3. DOMAIN COURSEDEMY (E-LEARNING SYSTEM)
-- =============================================================================

-- Bảng Khóa học (Courses)
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(512),
    instructor_username VARCHAR(100) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
    price NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_tenant_course_slug UNIQUE (tenant_id, slug)
);

-- Bảng Chương học (Course Modules)
CREATE TABLE IF NOT EXISTS course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Bài học & Video (Lessons)
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    video_url VARCHAR(1024),
    duration_seconds INTEGER DEFAULT 0,
    content TEXT,
    sort_order INTEGER NOT NULL DEFAULT 1,
    is_free_preview BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Đăng ký Khóa học (Enrollments)
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    user_id VARCHAR(128) NOT NULL, -- Keycloak sub (UUID người dùng)
    username VARCHAR(100) NOT NULL,
    progress_percent REAL DEFAULT 0.0 CHECK (progress_percent >= 0.0 AND progress_percent <= 100.0),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT uq_tenant_user_course UNIQUE (tenant_id, course_id, user_id)
);

-- Bảng Tiến độ Bài học (Lesson Progress)
CREATE TABLE IF NOT EXISTS lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    last_watched_second INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_enrollment_lesson UNIQUE (enrollment_id, lesson_id)
);

-- =============================================================================
-- 4. DOMAIN VIHOTASK (TASK & PROJECT MANAGEMENT)
-- =============================================================================

-- Bảng Dự án (Projects)
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key VARCHAR(16) NOT NULL, -- Tiền tố Task (VD: PROJ)
    description TEXT,
    owner_username VARCHAR(100) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'ARCHIVED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_tenant_project_key UNIQUE (tenant_id, key)
);

-- Bảng Cột Kanban (Kanban Columns)
CREATE TABLE IF NOT EXISTS kanban_columns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(64) NOT NULL,
    position INTEGER NOT NULL DEFAULT 1,
    wip_limit INTEGER DEFAULT 0, -- 0 nghĩa là không giới hạn
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Công việc (Tasks)
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    column_id UUID NOT NULL REFERENCES kanban_columns(id) ON DELETE RESTRICT,
    task_number INTEGER NOT NULL, -- Số thứ tự trong dự án (VD: 1, 2 -> PROJ-1)
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(32) NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
    reporter_username VARCHAR(100) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_project_task_number UNIQUE (project_id, task_number)
);

-- Bảng Phân công Công việc (Task Assignments)
CREATE TABLE IF NOT EXISTS task_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    assignee_username VARCHAR(100) NOT NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_task_assignee UNIQUE (task_id, assignee_username)
);

-- Bảng Bình luận Công việc (Task Comments)
CREATE TABLE IF NOT EXISTS task_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    author_username VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 5. CHỈ MỤC HIỆU NĂNG CHO MULTI-TENANT (COMPOSITE INDEXES)
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_tenant_licenses_tid ON tenant_licenses (tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_tid_created ON audit_logs (tenant_id, created_at DESC);

-- CourseDemy Indexes
CREATE INDEX IF NOT EXISTS idx_courses_tid_status ON courses (tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_course_modules_tid_cid ON course_modules (tenant_id, course_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_lessons_tid_mid ON lessons (tenant_id, module_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_enrollments_tid_uid ON enrollments (tenant_id, user_id);

-- VihoTask Indexes
CREATE INDEX IF NOT EXISTS idx_projects_tid_status ON projects (tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_kanban_columns_tid_pid ON kanban_columns (tenant_id, project_id, position);
CREATE INDEX IF NOT EXISTS idx_tasks_tid_pid_col ON tasks (tenant_id, project_id, column_id);
CREATE INDEX IF NOT EXISTS idx_task_assignments_tid_user ON task_assignments (tenant_id, assignee_username);
CREATE INDEX IF NOT EXISTS idx_task_comments_tid_task ON task_comments (tenant_id, task_id, created_at);

-- =============================================================================
-- 6. THIẾT LẬP POSTGRESQL ROW-LEVEL SECURITY (RLS)
-- Cưỡng chế phân lập dữ liệu cấp engine: chỉ xem được dòng khi tenant_id = app.current_tenant_id
-- =============================================================================

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE kanban_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Tạo Function kiểm tra Tenant hiện tại từ Session Variable
CREATE OR REPLACE FUNCTION current_tenant() RETURNS VARCHAR(64) AS $$
BEGIN
    RETURN NULLIF(current_setting('app.current_tenant_id', true), '');
END;
$$ LANGUAGE plpgsql STABLE;

-- Áp dụng RLS Policy cho các bảng (Áp dụng cho mọi câu lệnh SELECT, INSERT, UPDATE, DELETE)
DO $$
DECLARE
    tbl text;
    tables text[] := ARRAY[
        'courses', 'course_modules', 'lessons', 'enrollments', 'lesson_progress',
        'projects', 'kanban_columns', 'tasks', 'task_assignments', 'task_comments',
        'audit_logs'
    ];
BEGIN
    FOREACH tbl IN ARRAY tables LOOP
        EXECUTE format('DROP POLICY IF EXISTS tenant_isolation_policy ON %I', tbl);
        EXECUTE format('
            CREATE POLICY tenant_isolation_policy ON %I
            FOR ALL
            USING (tenant_id = current_tenant() OR current_tenant() = ''admin_bypass'')
            WITH CHECK (tenant_id = current_tenant() OR current_tenant() = ''admin_bypass'')
        ', tbl);
    END LOOP;
END $$;

-- =============================================================================
-- 7. DỮ LIỆU KHỞI TẠO MẪU (PRE-SEEDED DATA)
-- Khớp với cấu hình tài khoản trong Keycloak realm-config.json
-- =============================================================================

INSERT INTO tenants (id, name, subdomain, contact_email, metadata)
VALUES
    ('tenant-alpha', 'Alpha Corporation', 'alpha', 'admin@tenant-alpha.com', '{"theme": "blue", "max_users": 50}'::jsonb),
    ('tenant-beta', 'Beta Enterprise', 'beta', 'admin@tenant-beta.com', '{"theme": "dark", "max_users": 20}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO tenant_licenses (tenant_id, license_key, max_seats, valid_until, status)
VALUES
    ('tenant-alpha', 'coursedemy', 50, CURRENT_TIMESTAMP + INTERVAL '1 year', 'ACTIVE'),
    ('tenant-alpha', 'vihotask', 50, CURRENT_TIMESTAMP + INTERVAL '1 year', 'ACTIVE'),
    ('tenant-beta', 'vihotask', 20, CURRENT_TIMESTAMP + INTERVAL '1 year', 'ACTIVE')
ON CONFLICT (tenant_id, license_key) DO NOTHING;
