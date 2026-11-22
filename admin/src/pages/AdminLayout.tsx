import React, { useState } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
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
  Home,
  ExternalLink,
  ChevronRight,
  LogOut,
  Bell
} from 'lucide-react';

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { currentUser, switchRole, hasPermission } = useAdminAuth();
  const { language } = useLanguage();
  const location = useLocation();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      to: '/admin',
      labelEn: 'Admin Dashboard',
      labelMr: 'प्रशासन डॅशबोर्ड',
      icon: Layers,
      end: true
    },
    {
      to: '/admin/reviews',
      labelEn: 'Maker-Checker Queue',
      labelMr: 'मेकर-चेकर मंजुरी कक्ष',
      icon: Clock,
      badge: '3 Pending'
    },
    {
      to: '/admin/pages',
      labelEn: 'Page Editor (25 Templates)',
      labelMr: 'पृष्ठ संपादन (२५ साचे)',
      icon: FileEdit
    },
    {
      to: '/admin/menu',
      labelEn: '3-Level Menu Builder',
      labelMr: '३-स्तरीय मेनू व्यवस्थापन',
      icon: MenuIcon
    },
    {
      to: '/admin/media',
      labelEn: 'Local Media Library',
      labelMr: 'स्थानिक माध्यम ग्रंथालय',
      icon: Image,
      badge: '69 Assets'
    },
    {
      to: '/admin/audit',
      labelEn: 'Immutable Audit Logs',
      labelMr: 'अपरिवर्तनीय ऑडिट नोंदी',
      icon: History
    },
    {
      to: '/admin/settings',
      labelEn: 'Global Settings',
      labelMr: 'सर्वसाधारण सेटिंग्ज',
      icon: Settings
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Administrative Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4">
          {/* Brand & Scope Indicator */}
          <div className="flex items-center gap-3">
            <Link to="/admin" className="flex items-center gap-2.5">
              <img src="/media/logos/Logo.png" alt="MPKV Logo" className="w-8 h-8 object-contain rounded-full" />
              <div>
                <div className="text-sm font-semibold tracking-tight flex items-center gap-1.5 text-amber-400">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>MPKV Rahuri — Governance CMS</span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal">
                  {language === 'mr' ? 'राहुरी मुख्यालय प्रशासन प्रणाली' : 'Rahuri Campus Only · MahaPrisons Reference Standard'}
                </div>
              </div>
            </Link>
          </div>

          {/* Right Role Switcher Toolbar */}
          <div className="flex items-center gap-3">
            {/* Interactive Persona Role Switcher */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-1 flex items-center gap-1 text-xs">
              <span className="text-[10px] text-slate-400 font-medium px-2 hidden sm:inline uppercase">
                Role Persona:
              </span>
              {(['SUPER_ADMIN', 'CHECKER', 'MAKER'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    currentUser.role === r
                      ? r === 'SUPER_ADMIN'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : r === 'CHECKER'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-blue-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                  title={`Switch active persona to ${r}`}
                >
                  {r === 'SUPER_ADMIN' ? '👑 SUPER ADMIN' : r === 'CHECKER' ? '🛡️ CHECKER' : '✏️ MAKER'}
                </button>
              ))}
            </div>

            {/* Link back to public frontend */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white text-xs font-bold transition-all border border-emerald-700/60"
              title="Return to Public Frontend"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'mr' ? 'सार्वजनिक पोर्टल' : 'Public Site'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Dynamic Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-6 flex-shrink-0">
          {/* Active User Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Active Session
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  currentUser.role === 'SUPER_ADMIN'
                    ? 'bg-amber-500'
                    : currentUser.role === 'CHECKER'
                    ? 'bg-emerald-500'
                    : 'bg-blue-500'
                }`}
              />
            </div>
            <div className="font-semibold text-xs text-slate-800 truncate">
              {currentUser.name}
            </div>
            <div className="text-[11px] text-slate-500 truncate font-normal">
              {currentUser.department}
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {language === 'mr' ? item.labelMr : item.labelEn}
                    </span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-semibold ml-1">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Guidance Box */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1">
            <div className="font-semibold text-[11px] uppercase tracking-wider text-amber-900 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              <span>मेकर-चेकर मार्गदर्शक</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed font-normal">
              Makers can only create and edit draft revisions. Checkers review side-by-side diffs and publish to live portal.
            </p>
          </div>
        </aside>

        {/* Right Main Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
