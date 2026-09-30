export interface KeycloakUser {
  sub: string;
  preferred_username: string;
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  email_verified?: boolean;
  tenant_id?: string;
  licenses?: string[];
  roles?: string[];
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string | string[];
  session_state?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in?: number;
  scope?: string;
}

export interface TestPersona {
  id: string;
  username: string;
  password: string;
  roleName: string;
  roleBadgeColor: string;
  tenantId: string;
  licenses: string[];
  description: string;
  avatarUrl?: string;
}

export interface EcosystemApp {
  id: string;
  name: string;
  licenseKey: string;
  description: string;
  icon: string;
  badge: string;
  color: string;
  url: string;
  targetRole?: string[];
}
