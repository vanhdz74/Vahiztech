import { AuthTokens, KeycloakUser, TestPersona } from '../types/auth';
import { decodeJwt } from '../utils/jwt';

export const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080';
export const REALM_NAME = import.meta.env.VITE_KEYCLOAK_REALM || 'ecosystem-realm';
export const CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'vahiztech-hub';

export const TEST_PERSONAS: TestPersona[] = [
  {
    id: 'super-admin',
    username: 'vahiztech_super_admin',
    password: 'SuperAdmin@123456',
    roleName: 'Ecosystem Super Admin',
    roleBadgeColor: 'from-amber-500 to-yellow-600',
    tenantId: 'vahiztech-hq',
    licenses: ['vahiztech_hub', 'coursedemy', 'vihotask'],
    description: 'Admin tối cao hệ sinh thái Vahiztech Hub. Sở hữu trọn bộ bản quyền.',
  },
  {
    id: 'alpha-admin',
    username: 'alpha_corp_admin',
    password: 'Admin@123456',
    roleName: 'Alpha Corp Admin',
    roleBadgeColor: 'from-cyan-500 to-blue-600',
    tenantId: 'alpha-corp',
    licenses: ['coursedemy', 'vihotask'],
    description: 'Doanh nghiệp Alpha - Đã mua đầy đủ 2 ứng dụng CourseDemy & VihoTask.',
  },
  {
    id: 'alpha-staff',
    username: 'alpha_employee_tasks',
    password: 'Staff@123456',
    roleName: 'Alpha Corp Member',
    roleBadgeColor: 'from-indigo-500 to-purple-600',
    tenantId: 'alpha-corp',
    licenses: ['vihotask'],
    description: 'Nhân viên Alpha - Chỉ được cấp quyền VihoTask, bị chặn CourseDemy.',
  },
  {
    id: 'beta-student',
    username: 'beta_school_student',
    password: 'Student@123456',
    roleName: 'Beta Student',
    roleBadgeColor: 'from-emerald-500 to-teal-600',
    tenantId: 'beta-school',
    licenses: ['coursedemy'],
    description: 'Học viên Beta School - Chỉ có bản quyền CourseDemy, bị chặn VihoTask.',
  },
  {
    id: 'free-user',
    username: 'free_tier_user',
    password: 'Free@123456',
    roleName: 'Free Tier User',
    roleBadgeColor: 'from-slate-500 to-gray-600',
    tenantId: 'free-tier',
    licenses: [],
    description: 'Người dùng miễn phí - Chưa mua license nào, bị chặn các ứng dụng con.',
  },
];

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'vahiztech_access_token',
  REFRESH_TOKEN: 'vahiztech_refresh_token',
  USER_DATA: 'vahiztech_user_data',
};

function parseUserFromToken(tokens: AuthTokens, fallbackUsername?: string): KeycloakUser {
  const decoded = decodeJwt(tokens.access_token);
  if (!decoded || !decoded.payload) {
    throw new Error('Không thể giải mã Access Token nhận được từ Keycloak');
  }

  const payload = decoded.payload;
  const username = payload.preferred_username || fallbackUsername || 'user';

  return {
    sub: payload.sub,
    preferred_username: username,
    email: payload.email,
    name: payload.name || `${payload.given_name || ''} ${payload.family_name || ''}`.trim() || username,
    given_name: payload.given_name,
    family_name: payload.family_name,
    email_verified: payload.email_verified,
    tenant_id: payload.tenant_id,
    licenses: Array.isArray(payload.licenses) ? payload.licenses : payload.licenses ? [payload.licenses] : [],
    roles: Array.isArray(payload.roles) ? payload.roles : [],
    exp: payload.exp,
    iat: payload.iat,
    iss: payload.iss,
    aud: payload.aud,
    session_state: payload.session_state,
  };
}

export async function loginWithCredentials(username: string, password: string): Promise<{ tokens: AuthTokens; user: KeycloakUser }> {
  const tokenUrl = `${KEYCLOAK_URL}/realms/${REALM_NAME}/protocol/openid-connect/token`;

  const body = new URLSearchParams({
    grant_type: 'password',
    client_id: CLIENT_ID,
    username: username,
    password: password,
    scope: 'openid profile email tenant-info',
  });

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error_description || errorData.error || `Xác thực thất bại (HTTP ${res.status})`);
  }

  const tokens: AuthTokens = await res.json();
  const user = parseUserFromToken(tokens, username);

  saveSession(tokens, user);
  return { tokens, user };
}

export async function exchangeAuthorizationCode(code: string): Promise<{ tokens: AuthTokens; user: KeycloakUser }> {
  const tokenUrl = `${KEYCLOAK_URL}/realms/${REALM_NAME}/protocol/openid-connect/token`;
  const redirectUri = window.location.origin + window.location.pathname;

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    code: code,
    redirect_uri: redirectUri,
    scope: 'openid profile email tenant-info',
  });

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error_description || errorData.error || `Đổi mã xác thực thất bại (HTTP ${res.status})`);
  }

  const tokens: AuthTokens = await res.json();
  const user = parseUserFromToken(tokens);

  saveSession(tokens, user);
  return { tokens, user };
}

export function saveSession(tokens: AuthTokens, user: KeycloakUser) {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
  if (tokens.refresh_token) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
  }
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
}

export function getStoredSession(): { token: string | null; user: KeycloakUser | null } {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  const userJson = localStorage.getItem(STORAGE_KEYS.USER_DATA);

  if (!token || !userJson) {
    return { token: null, user: null };
  }

  try {
    const user: KeycloakUser = JSON.parse(userJson);
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
}

export function redirectToKeycloakOIDCLogin() {
  const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);
  const authUrl = `${KEYCLOAK_URL}/realms/${REALM_NAME}/protocol/openid-connect/auth?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email%20tenant-info`;
  window.location.href = authUrl;
}

export function getKeycloakAccountConsoleUrl(): string {
  return `${KEYCLOAK_URL}/realms/${REALM_NAME}/account`;
}

// Realm Ecosystem Admin Console (Dành cho tài khoản thuộc realm ecosystem-realm như vahiztech_super_admin)
export function getKeycloakRealmAdminConsoleUrl(): string {
  return `${KEYCLOAK_URL}/admin/${REALM_NAME}/console/`;
}

// Master Realm Admin Console (Dành cho tài khoản admin master)
export function getKeycloakMasterAdminConsoleUrl(): string {
  return `${KEYCLOAK_URL}/admin/master/console/#/${REALM_NAME}`;
}

export async function checkKeycloakHealth(): Promise<{ status: 'online' | 'offline'; latencyMs: number; details?: any }> {
  const startTime = performance.now();
  try {
    const res = await fetch(`${KEYCLOAK_URL}/realms/${REALM_NAME}/.well-known/openid-configuration`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    const latencyMs = Math.round(performance.now() - startTime);
    if (res.ok) {
      const data = await res.json();
      return { status: 'online', latencyMs, details: data };
    }
    return { status: 'offline', latencyMs };
  } catch (err) {
    const latencyMs = Math.round(performance.now() - startTime);
    return { status: 'offline', latencyMs };
  }
}
