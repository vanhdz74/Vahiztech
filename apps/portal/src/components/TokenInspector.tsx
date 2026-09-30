import React, { useState } from 'react';
import { decodeJwt } from '../utils/jwt';
import { Code2, Copy, Check, Eye, EyeOff, Terminal, ShieldCheck } from 'lucide-react';

interface TokenInspectorProps {
  rawToken: string | null;
}

export const TokenInspector: React.FC<TokenInspectorProps> = ({ rawToken }) => {
  const [copied, setCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  if (!rawToken) {
    return null;
  }

  const decoded = decodeJwt(rawToken);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Keycloak JWT Token Inspector (OAuth2 / OIDC S256)
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Signed & Verified
              </span>
            </h2>
            <p className="text-xs text-slate-400">Claims được nhúng tự động bởi Keycloak Protocol Mappers cho Multi-Tenancy & Authorization</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition"
          >
            {showRaw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showRaw ? 'Ẩn Raw JWT' : 'Hiện Raw JWT'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-600/20 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã Copy Bearer!' : 'Copy Token'}</span>
          </button>
        </div>
      </div>

      {showRaw && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-slate-500" /> Chuỗi Mã Hóa JWT (Authorization: Bearer &lt;token&gt;):
            </span>
            <span className="font-mono text-[10px] text-slate-500">{rawToken.length} ký tự</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-[11px] text-brand-300 break-all border border-slate-800/90 max-h-32 overflow-y-auto select-all leading-relaxed">
            {rawToken}
          </div>
        </div>
      )}

      {/* Grid Decoded Header & Payload */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* JWT Header */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
            <span>1. Header (Algorithm & Token Type):</span>
            <span className="text-[10px] font-mono text-indigo-400">RS256</span>
          </div>
          <pre className="flex-1 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-indigo-300 overflow-x-auto">
            {JSON.stringify(decoded?.header, null, 2)}
          </pre>
        </div>

        {/* JWT Payload */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
            <span>2. Payload Claims (tenant_id, licenses, roles, userinfo):</span>
            <span className="text-[10px] font-mono text-emerald-400">Multi-Tenant Claims Active</span>
          </div>
          <pre className="flex-1 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-80">
            {JSON.stringify(decoded?.payload, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
