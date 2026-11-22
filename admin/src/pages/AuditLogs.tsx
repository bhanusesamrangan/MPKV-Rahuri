import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  History,
  ShieldAlert,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  FileCode
} from 'lucide-react';

interface AuditEntry {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'APPROVE' | 'REJECT' | 'PUBLISH' | 'DELETE';
  module: string;
  targetId: string;
  user: string;
  role: string;
  timestamp: string;
  ipAddress: string;
  details: string;
  payload: any;
}

const mockAuditLogs: AuditEntry[] = [
  {
    id: 'AUD-9481',
    action: 'APPROVE',
    module: 'Seeds Inventory',
    targetId: 'rahuri_seed_stock.cereal_seeds',
    user: 'Prof. S. R. Patil',
    role: 'CHECKER',
    timestamp: '2026-11-21 11:45:12 IST',
    ipAddress: '10.20.4.15',
    details: 'मंजूर केले: हरभरा विश्‍वराज दर ₹३,५०० व उपलब्ध बॅगा १६५ थेट पोर्टलवर प्रकाशित.',
    payload: {
      crop: 'हरभरा (Gram)',
      variety: 'विश्‍वराज (Vishwaraj)',
      rate_per_bag: '३,५०० /-',
      available_bags: '१६५ बॅगा'
    }
  },
  {
    id: 'AUD-9480',
    action: 'CREATE',
    module: 'Review Queue',
    targetId: 'REV-2026-001',
    user: 'Er. R. D. Shinde',
    role: 'MAKER',
    timestamp: '2026-11-21 10:15:30 IST',
    ipAddress: '10.20.4.88',
    details: 'नवीन मसुदा सादर: राहुरी प्रक्षेत्र बियाणे साठा अद्यतन.',
    payload: { revision_id: 'REV-2026-001', department: 'Central Seed Desk' }
  },
  {
    id: 'AUD-9479',
    action: 'UPDATE',
    module: 'Inner Pages',
    targetId: 'vc-desk',
    user: 'Er. R. D. Shinde',
    role: 'MAKER',
    timestamp: '2026-11-20 16:30:00 IST',
    ipAddress: '10.20.4.88',
    details: 'कुलगुरू संदेश २०२६-२७ मसुदा तयार केला.',
    payload: { page: 'vc-desk', language: 'both' }
  },
  {
    id: 'AUD-9478',
    action: 'PUBLISH',
    module: 'Documents & Circulars',
    targetId: 'convocation_40_notice',
    user: 'Dr. V. K. Kharche',
    role: 'SUPER_ADMIN',
    timestamp: '2026-11-19 14:10:45 IST',
    ipAddress: '10.20.1.2',
    details: '४० वा दीक्षांत समारंभ परिपत्रक अधिकृत पोर्टलवर प्रकाशित केले.',
    payload: { doc_id: '20261117_160948_9ce404dba955b1b1cd65dbc6e3cecd3a.pdf' }
  },
  {
    id: 'AUD-9477',
    action: 'UPDATE',
    module: '3-Level Menu',
    targetId: 'nav_menu_tree',
    user: 'Prof. S. R. Patil',
    role: 'CHECKER',
    timestamp: '2026-11-18 11:22:18 IST',
    ipAddress: '10.20.4.15',
    details: 'राहुरी बियाणे थेट साठा दुवा मुख्य मेनूमध्ये अग्रक्रमावर ठेवला.',
    payload: { item_id: 'seeds-availability', order: 1 }
  }
];

export const AuditLogs: React.FC = () => {
  const { language } = useLanguage();
  const [logs, setLogs] = useState<AuditEntry[]>(mockAuditLogs);
  const [filterAction, setFilterAction] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);

  const filteredLogs = logs.filter((log) => {
    if (filterAction !== 'ALL' && log.action !== filterAction) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        log.id.toLowerCase().includes(q) ||
        log.user.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.module.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportCSV = () => {
    const headers = 'ID,Action,Module,Target,User,Role,Timestamp,IP,Details\n';
    const rows = filteredLogs
      .map(
        (l) =>
          `"${l.id}","${l.action}","${l.module}","${l.targetId}","${l.user}","${l.role}","${l.timestamp}","${l.ipAddress}","${l.details}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mpkv_audit_logs_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-900 border border-rose-200/60 rounded-full text-xs font-semibold uppercase mb-1.5">
            <History className="w-3.5 h-3.5 text-rose-600" />
            <span>Tamper-Proof Immutable Audit Log</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'mr' ? 'अपरिवर्तनीय ऑडिट नोंदी' : 'Immutable System Audit Logs'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            {language === 'mr'
              ? 'मेकर-चेकर मंजुरी, सामग्री बदल, वापरकर्ता सत्रे व IP पत्त्यांची संपूर्ण पारदर्शक नोंद.'
              : 'Complete chronological audit trail recording user IDs, IP addresses, timestamps, and JSON diffs.'}
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>Export Audit Trail (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap gap-1">
          {['ALL', 'APPROVE', 'CREATE', 'UPDATE', 'PUBLISH', 'REJECT'].map((act) => (
            <button
              key={act}
              onClick={() => setFilterAction(act)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterAction === act
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {act}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 uppercase text-[10px] font-semibold tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Audit ID</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Module & Target</th>
                <th className="py-3.5 px-4">User & Role</th>
                <th className="py-3.5 px-4">Timestamp (IST)</th>
                <th className="py-3.5 px-4">IP Address</th>
                <th className="py-3.5 px-4 text-right">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-500">
                    {log.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        log.action === 'APPROVE'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                          : log.action === 'PUBLISH'
                          ? 'bg-amber-50 text-amber-900 border border-amber-200/60'
                          : log.action === 'CREATE'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200/60'
                          : log.action === 'REJECT'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200/60'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{log.module}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{log.targetId}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{log.user}</div>
                    <div className="text-[10px] text-emerald-800 font-semibold">{log.role}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                    {log.ipAddress}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedEntry(log)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="Inspect JSON Payload"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payload Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-xs font-bold text-amber-300">
                  Payload: {selectedEntry.id}
                </span>
              </div>
              <button onClick={() => setSelectedEntry(null)} className="text-white/80 hover:text-white">✕</button>
            </div>
            <div className="p-5 space-y-3 text-xs">
              <div className="text-slate-700 font-medium">
                <strong>Description:</strong> {selectedEntry.details}
              </div>
              <div className="p-3 bg-slate-900 rounded-xl text-emerald-300 font-mono text-[11px] overflow-x-auto max-h-60">
                <pre>{JSON.stringify(selectedEntry.payload, null, 2)}</pre>
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedEntry(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
