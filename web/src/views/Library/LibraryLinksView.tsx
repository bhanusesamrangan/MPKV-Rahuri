'use client';

import React, { useMemo, useState } from 'react';
import {
  Globe,
  BookOpen,
  FileSpreadsheet,
  Database,
  ShieldCheck,
  ExternalLink,
  Search,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LibrarySubnav } from './components/LibrarySubnav';

interface ResourceLink {
  name: string;
  host: string;
  url: string;
  note: string;
}

interface ResourceGroup {
  id: string;
  title: { en: string; mr: string };
  links: ResourceLink[];
}

const GROUP_ICONS: Record<string, React.ElementType> = {
  ebooks: BookOpen,
  ejournals: Sparkles,
  statistical: FileSpreadsheet,
  repositories: Database,
  plagiarism: ShieldCheck,
};

export const LibraryLinksView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const groups: ResourceGroup[] = pageData?.resourceGroups || [];
  const totalPortals = useMemo(
    () => groups.reduce((acc, g) => acc + g.links.length, 0),
    [groups]
  );

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups
      .filter((g) => activeGroup === 'all' || g.id === activeGroup)
      .map((g) => ({
        ...g,
        links: g.links.filter(
          (l) =>
            !q ||
            l.name.toLowerCase().includes(q) ||
            l.host.toLowerCase().includes(q) ||
            l.note.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.links.length > 0);
  }, [groups, activeGroup, query]);

  const handleCopy = (url: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 1800);
    }
  };

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#f5f3ff] text-slate-800">
      <LibrarySubnav
        activeSlug="library-links"
        currentTitle={{ en: 'Digital Links & CeRA Journals', mr: 'डिजिटल ई-रिसोर्सेस व CeRA' }}
        accentActiveClass="bg-[#312e81] text-indigo-100 border-[#312e81] shadow-xs"
      />

      {/* DEEP INDIGO DIGITAL COMMAND CENTER HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#131136] via-[#1e1b4b] to-[#3730a3] text-white border-b-4 border-violet-400">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-400/15 border border-violet-300/40 text-violet-200 text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>{getTxt(pageData?.hero?.badge)}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {getTxt(pageData?.hero?.title)}
            </h1>
            <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed">
              {getTxt(pageData?.hero?.subtitle)}
            </p>
          </div>

          {/* Search Input inside Command Header */}
          <div className="w-full lg:w-80 shrink-0 space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-violet-200">
              {language === 'mr' ? `सर्व ${totalPortals} पोर्टल्स शोधा` : `Instant Search Across ${totalPortals} Portals`}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-indigo-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'mr' ? 'CABI, CeRA, Krishikosh, ONOS...' : 'Search CABI, CeRA, ONOS, OPAC...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white placeholder:text-indigo-200/70 text-sm focus:outline-violet-300 backdrop-blur-xs"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 space-y-8">
        {/* Category Filter Bar */}
        <div
          className="flex flex-wrap items-center gap-2"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}
        >
          <button
            onClick={() => setActiveGroup('all')}
            className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
              activeGroup === 'all'
                ? 'bg-[#1e1b4b] text-white border-[#1e1b4b]'
                : 'bg-white text-slate-700 border-indigo-200 hover:bg-indigo-50'
            }`}
          >
            {language === 'mr' ? `सर्व संसाधने (${totalPortals})` : `All Portals (${totalPortals})`}
          </button>
          {groups.map((grp) => (
            <button
              key={grp.id}
              onClick={() => setActiveGroup(grp.id)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                activeGroup === grp.id
                  ? 'bg-[#3730a3] text-white border-[#3730a3]'
                  : 'bg-white text-slate-700 border-indigo-200 hover:bg-indigo-50'
              }`}
            >
              {getTxt(grp.title)} ({grp.links.length})
            </button>
          ))}
        </div>

        {/* Portal Clusters */}
        <div className="space-y-8">
          {filteredGroups.map((grp) => {
            const Icon = GROUP_ICONS[grp.id] || Globe;
            return (
              <div key={grp.id} className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-indigo-200/70">
                  <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">{getTxt(grp.title)}</h2>
                  <span className="ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                    {grp.links.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {grp.links.map((lnk) => (
                    <div
                      key={lnk.url + lnk.name}
                      className="bg-white rounded-2xl border border-indigo-200/70 p-5 shadow-2xs hover:shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 truncate max-w-[200px]">
                            {lnk.host}
                          </span>
                          <button
                            onClick={() => handleCopy(lnk.url)}
                            title="Copy URL"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                          >
                            {copiedUrl === lnk.url ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">{lnk.name}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{lnk.note}</p>
                      </div>

                      <a
                        href={lnk.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-900 hover:text-white text-xs font-bold transition-colors"
                      >
                        <span>{language === 'mr' ? 'पोर्टल उघडा' : 'Open Official Portal'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
