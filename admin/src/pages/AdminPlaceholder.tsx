import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth, UserRole } from '../context/AdminAuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Shield,
  Layers,
  Menu as MenuIcon,
  FileEdit,
  Image,
  Settings,
  History,
  CheckCircle,
  AlertCircle,
  Clock,
  UserCheck,
  ArrowRight,
  Sparkles,
  Sprout
} from 'lucide-react';

export const AdminPlaceholder: React.FC = () => {
  const { currentUser, switchRole, hasPermission } = useAdminAuth();
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Top Banner with Role Switcher */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-950 text-xs font-semibold rounded-full uppercase mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>MahaPrisons Governance Reference CMS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {language === 'mr' ? 'मफुकृवि राहुरी - प्रशासन CMS पोर्टल' : 'MPKV Rahuri — Admin CMS Portal'}
          </h1>
          <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl font-normal">
            {language === 'mr'
              ? 'मेकर-चेकर मंजुरी प्रणाली, २५ मांडणी साचे, देवनागरी ध्वन्यात्मक टायपिंग व बहुभाषिक सामग्री व्यवस्थापन.'
              : 'Strict Maker-Checker approval desk, 25 semantic layout templates, Devanagari phonetic transliteration & audit logs.'}
          </p>
        </div>

        {/* Role Selector Card */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex flex-col gap-2 flex-shrink-0">
          <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Active Persona Switcher:</span>
          </div>
          <div className="font-semibold text-sm text-white">{currentUser.name}</div>
          <div className="text-[11px] text-slate-300 font-normal">{currentUser.department}</div>

          <div className="flex items-center gap-1.5 pt-2">
            {(['SUPER_ADMIN', 'CHECKER', 'MAKER'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  currentUser.role === r
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {r === 'SUPER_ADMIN' ? 'SUPER ADMIN' : r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Module 1: Maker-Checker Approval Queue */}
        <Link
          to="/admin/reviews"
          className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-semibold group-hover:scale-105 transition-transform border border-amber-100">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800 text-base group-hover:text-emerald-900 transition-colors">
              Maker-Checker Review Queue
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Review submitted changes from Makers, inspect side-by-side visual diffs in Marathi & English, and approve or reject with audit remarks.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
              3 Pending Drafts
            </span>
            <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              <span>Open Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Module 2: Page Editor with 25 Layout Templates */}
        <Link
          to="/admin/pages"
          className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-semibold group-hover:scale-105 transition-transform border border-emerald-100">
              <FileEdit className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800 text-base group-hover:text-emerald-900 transition-colors">
              Page Editor (25 Templates)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Split-screen live editor with typed blocks, Devanagari phonetic transliteration (`PhoneticInput`), and bidirectional translation.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              25 Semantic Layouts
            </span>
            <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              <span>Open Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Module 3: 3-Level Menu Builder */}
        <Link
          to="/admin/menu"
          className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-semibold group-hover:scale-105 transition-transform border border-blue-100">
              <MenuIcon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800 text-base group-hover:text-emerald-900 transition-colors">
              3-Level Navigation Builder
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Drag-and-drop hierarchy builder managing top tabs, category groupings, leaf page slugs, icons, and bilingual labels.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
              Rahuri Tree Active
            </span>
            <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              <span>Manage Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Module 4: Local Media Library */}
        <Link
          to="/admin/media"
          className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-semibold group-hover:scale-105 transition-transform border border-purple-100">
              <Image className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800 text-base group-hover:text-emerald-900 transition-colors">
              Local Media Asset Manager
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Zero external runtime dependencies. Manage uploaded logos, audio songs, slide imagery, and notices with mandatory alt text.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60">
              69 Local Assets
            </span>
            <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              <span>Open Assets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Module 5: Immutable Audit Logs */}
        <Link
          to="/admin/audit"
          className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center font-semibold group-hover:scale-105 transition-transform border border-rose-100">
              <History className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800 text-base group-hover:text-emerald-900 transition-colors">
              Immutable Audit Logs
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Full accountability logs recording user IDs, IP timestamps, modified JSON payloads, and approval/rejection justifications.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/60">
              Tamper Proof
            </span>
            <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              <span>View Logs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Module 6: Global Settings & GIGW */}
        <Link
          to="/admin/settings"
          className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 hover:border-emerald-500 hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-semibold group-hover:scale-105 transition-transform border border-teal-100">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-800 text-base group-hover:text-emerald-900 transition-colors">
              Global Settings & GIGW
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              University contact directory, social links, GIGW 3.0 accessibility flags, ownership metadata, and copyright notices.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60">
              WCAG 2.1 AA
            </span>
            <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              <span>Configure</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
