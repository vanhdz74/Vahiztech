export function safeBase64Decode(str: string): string {
  try {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        return '{}';
    }
    const binary = atob(output);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch (e) {
    try {
      return atob(str);
    } catch {
      return '{}';
    }
  }
}

export function decodeJwt(token: string): { header: Record<string, any>; payload: Record<string, any> } | null {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;

    const header = JSON.parse(safeBase64Decode(parts[0]));
    const payload = JSON.parse(safeBase64Decode(parts[1]));

    return { header, payload };
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

export function isTokenExpired(exp?: number): boolean {
  if (!exp) return false;
  return Date.now() >= exp * 1000;
}

export function formatTimeRemaining(exp?: number): string {
  if (!exp) return 'Vô hạn';
  const diffMs = exp * 1000 - Date.now();
  if (diffMs <= 0) return 'Hết hạn';
  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}
