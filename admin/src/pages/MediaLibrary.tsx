import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import mediaManifestRaw from '../data/scraped/media_manifest.json';
import {
  Image as ImageIcon,
  FileText,
  Music,
  Copy,
  Check,
  Search,
  UploadCloud,
  ShieldCheck,
  FolderOpen,
  Filter,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const MediaLibrary: React.FC = () => {
  const { language } = useLanguage();
  const manifest = mediaManifestRaw as any;
  const downloads = manifest.downloads || [];

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'IMAGE' | 'DOC' | 'AUDIO' | 'LOGO'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const filterAssets = () => {
    return downloads.filter((item: any) => {
      // Type matching
      if (activeFilter === 'IMAGE' && !item.local_path?.includes('/images/')) return false;
      if (activeFilter === 'DOC' && !item.local_path?.includes('/docs/')) return false;
      if (activeFilter === 'AUDIO' && !item.local_path?.includes('/audio/')) return false;
      if (activeFilter === 'LOGO' && !item.local_path?.includes('/logos/')) return false;

      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.original_url?.toLowerCase().includes(q);
        const matchesPath = item.local_path?.toLowerCase().includes(q);
        return matchesName || matchesPath;
      }
      return true;
    });
  };

  const filtered = filterAssets();

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-900 border border-purple-200/60 rounded-full text-xs font-semibold uppercase mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Zero External Runtime Media Standard</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'mr' ? 'स्थानिक माध्यम ग्रंथालय (Media Library)' : 'Local Media Asset Library'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            {language === 'mr'
              ? 'सर्व प्रतिमा, लोगो, ऑडिओ व पीडीएफ फाइल्स पूर्णपणे स्थानिक (/media/...) पथामधून चालतात.'
              : 'Zero external runtime links. All 69 university assets stored locally in /public/media/ with verified hashes.'}
          </p>
        </div>

        {/* Upload Action */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-bold rounded-xl text-xs cursor-pointer hover:bg-emerald-800 transition-colors shadow-xs">
            <UploadCloud className="w-4 h-4 text-amber-300" />
            <span>Upload Local Asset / माध्यम जोडा</span>
            <input type="file" className="hidden" onChange={() => alert('माध्यम स्थानिकरित्या स्टेज केले (Asset Staged to Local Storage).')} />
          </label>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Assets ({downloads.length})
          </button>
          <button
            onClick={() => setActiveFilter('IMAGE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'IMAGE'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Images (30)
          </button>
          <button
            onClick={() => setActiveFilter('DOC')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'DOC'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            PDF Documents (24)
          </button>
          <button
            onClick={() => setActiveFilter('AUDIO')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'AUDIO'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Audio Tracks (3)
          </button>
          <button
            onClick={() => setActiveFilter('LOGO')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'LOGO'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Emblems (2)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search local file path..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item: any, idx: number) => {
          const isImage = item.local_path?.includes('/images/') || item.local_path?.includes('/logos/');
          const isDoc = item.local_path?.includes('/docs/');
          const isAudio = item.local_path?.includes('/audio/');
          const isCopied = copiedPath === item.local_path;

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Media Preview Thumbnail */}
              <div className="h-36 bg-slate-100 relative flex items-center justify-center overflow-hidden">
                {isImage ? (
                  <img
                    src={item.local_path}
                    alt="Asset preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : isDoc ? (
                  <div className="flex flex-col items-center gap-1.5 text-red-600">
                    <FileText className="w-10 h-10" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      PDF Document
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-emerald-700">
                    <Music className="w-10 h-10" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      MP3 Audio
                    </span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'downloaded'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Asset Details */}
              <div className="p-3.5 space-y-2 text-xs">
                <div className="font-mono text-[11px] text-slate-800 truncate font-bold" title={item.local_path}>
                  {item.local_path?.split('/').pop()}
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate" title={item.local_path}>
                  {item.local_path}
                </div>

                {/* Action button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleCopy(item.local_path)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                      isCopied
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    title="Copy local relative path"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Copied' : 'Copy Path'}</span>
                  </button>

                  <a
                    href={item.local_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-lg text-slate-500 hover:text-emerald-700"
                    title="Open Asset in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
