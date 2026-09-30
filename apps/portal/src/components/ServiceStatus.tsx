import React, { useEffect, useState } from 'react';
import { checkKeycloakHealth, REALM_NAME } from '../services/keycloak';
import { Activity, Server, Database, Radio, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export const ServiceStatus: React.FC = () => {
  const [kcStatus, setKcStatus] = useState<{ status: 'online' | 'offline' | 'checking'; latencyMs: number }>({
    status: 'checking',
    latencyMs: 0,
  });

  const checkStatus = async () => {
    setKcStatus({ status: 'checking', latencyMs: 0 });
    const res = await checkKeycloakHealth();
    setKcStatus(res);
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Trạng Thái Hạ Tầng Nền Tảng (Infrastructure Health)</h3>
        </div>
        <button
          onClick={checkStatus}
          disabled={kcStatus.status === 'checking'}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${kcStatus.status === 'checking' ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Làm mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Keycloak IAM */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Keycloak IAM 25+</div>
              <div className="text-[10px] text-slate-400 font-mono">Port 8080 • {REALM_NAME}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {kcStatus.status === 'checking' ? (
              <span className="text-[10px] text-amber-400 font-medium">Checking...</span>
            ) : kcStatus.status === 'online' ? (
              <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Online ({kcStatus.latencyMs}ms)
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-rose-400 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Offline
              </span>
            )}
          </div>
        </div>

        {/* PostgreSQL 16 */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">PostgreSQL 16</div>
              <div className="text-[10px] text-slate-400 font-mono">Port 5432 • Multi-DB</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
          </div>
        </div>

        {/* Kafka Broker */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Apache Kafka / Event</div>
              <div className="text-[10px] text-slate-400 font-mono">Port 29092 • KRaft</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
