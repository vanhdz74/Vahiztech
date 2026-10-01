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
    <div className="bg-white dark:bg-[#121723] rounded-2xl p-5 border border-blue-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Trạng Thái Hạ Tầng Nền Tảng (Infrastructure Health)</h3>
        </div>
        <button
          onClick={checkStatus}
          disabled={kcStatus.status === 'checking'}
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-semibold transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${kcStatus.status === 'checking' ? 'animate-spin text-blue-600' : ''}`} />
          <span className="hidden sm:inline">Làm mới</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Keycloak IAM */}
        <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-slate-850/60 border border-blue-100 dark:border-slate-750 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-900">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Keycloak IAM 25+</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Port 8080 • {REALM_NAME}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {kcStatus.status === 'checking' ? (
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Checking...</span>
            ) : kcStatus.status === 'online' ? (
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Online ({kcStatus.latencyMs}ms)
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800 flex items-center gap-1">
                <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" /> Offline
              </span>
            )}
          </div>
        </div>

        {/* PostgreSQL 16 */}
        <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-slate-850/60 border border-blue-100 dark:border-slate-750 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">PostgreSQL 16</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Port 5433 • Multi-DB</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Active
            </span>
          </div>
        </div>

        {/* Kafka Broker */}
        <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-slate-850/60 border border-blue-100 dark:border-slate-750 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Apache Kafka</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Port 29092 • KRaft</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
