import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useLanguage } from '../context/LanguageContext';
import pagesDataRaw from '../data/scraped/rahuri_pages.json';
import { PhoneticInput } from '../components/PhoneticInput';
import { TemplateSelectorModal } from '../components/TemplateSelectorModal';
import {
  FileEdit,
  Layout,
  Save,
  Send,
  Eye,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  Plus,
  Trash2,
  Globe,
  Languages
} from 'lucide-react';

export const PageEditor: React.FC = () => {
  const { currentUser, hasPermission } = useAdminAuth();
  const { language } = useLanguage();

  const pagesMap = pagesDataRaw as Record<string, any>;
  const pageKeys = Object.keys(pagesMap);

  const [selectedSlug, setSelectedSlug] = useState<string>(pageKeys[0] || 'mpkv-at-a-glance');
  const [activeLangTab, setActiveLangTab] = useState<'mr' | 'en'>('mr');
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('ContentWithRightSidebar');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State initialized from selected page
  const page = pagesMap[selectedSlug] || {};
  const [formData, setFormData] = useState<any>(page);

  const handlePageChange = (slug: string) => {
    setSelectedSlug(slug);
    const p = pagesMap[slug] || {};
    setFormData(JSON.parse(JSON.stringify(p)));
  };

  const handleTemplateSelect = (tplId: string) => {
    setCurrentTemplate(tplId);
    setToastMessage(`मांडणी साचा बदलला: ${tplId}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveDraft = () => {
    setToastMessage('मसुदा स्थानिकरित्या जतन केला (Draft Saved Successfully).');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmitToChecker = () => {
    setToastMessage('मेकर-चेकर पुनरावलोकन डेस्ककडे मंजुरीसाठी सादर केले (Submitted to Checker Queue).');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 bg-emerald-700 text-white rounded-2xl shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)}>✕</button>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200/60 rounded-full text-xs font-semibold uppercase mb-1.5">
            <FileEdit className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bilingual Page Editor & 25 Layout Templates</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'mr' ? 'राहुरी पृष्ठ सामग्री संपादक' : 'Rahuri Page Content Editor'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            {language === 'mr'
              ? 'मराठी व इंग्रजी द्विभाषिक मजकूर संपादन, २५ शासकीय साचे निवड व थेट पूर्वदृश्य.'
              : 'Edit 1:1 Marathi and English inner pages with Devanagari transliteration and live split-preview.'}
          </p>
        </div>

        {/* Template Selector Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setTemplateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-semibold rounded-xl text-xs transition-all shadow-xs"
          >
            <Layout className="w-4 h-4" />
            <span>साचा बदला ({currentTemplate})</span>
          </button>
        </div>
      </div>

      {/* Page Selector & Language Switcher Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Select Target Page */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Select Page:</span>
          <select
            value={selectedSlug}
            onChange={(e) => handlePageChange(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {pageKeys.map((slug) => (
              <option key={slug} value={slug}>
                /{slug} — {pagesMap[slug]?.title?.mr || pagesMap[slug]?.title?.en}
              </option>
            ))}
          </select>
        </div>

        {/* Dual Language Switcher Tabs */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
          <button
            onClick={() => setActiveLangTab('mr')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLangTab === 'mr'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>मराठी संपादन (देवनागरी)</span>
          </button>
          <button
            onClick={() => setActiveLangTab('en')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLangTab === 'en'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>English Content</span>
          </button>
        </div>
      </div>

      {/* Split Screen: Left Editor Form (60%) | Right Live Preview (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <h3 className="font-semibold text-sm text-slate-800">
                {activeLangTab === 'mr' ? 'मराठी मजकूर संपादन' : 'English Content Form'}
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-500 font-mono">
              Template: {currentTemplate}
            </span>
          </div>

          {/* Field 1: Headline */}
          {activeLangTab === 'mr' ? (
            <PhoneticInput
              label="मुख्य शीर्षक (Hero Headline)"
              value={formData.hero?.headline?.mr || formData.title?.mr || ''}
              onChange={(v) =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, headline: { ...formData.hero?.headline, mr: v } },
                  title: { ...formData.title, mr: v }
                })
              }
            />
          ) : (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Hero Headline (English)</label>
              <input
                type="text"
                value={formData.hero?.headline?.en || formData.title?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, headline: { ...formData.hero?.headline, en: e.target.value } },
                    title: { ...formData.title, en: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          )}

          {/* Field 2: Subheadline */}
          {activeLangTab === 'mr' ? (
            <PhoneticInput
              label="उपशीर्षक (Subheadline)"
              multiline
              rows={2}
              value={formData.hero?.subheadline?.mr || ''}
              onChange={(v) =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, subheadline: { ...formData.hero?.subheadline, mr: v } }
                })
              }
            />
          ) : (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Subheadline (English)</label>
              <textarea
                rows={2}
                value={formData.hero?.subheadline?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, subheadline: { ...formData.hero?.subheadline, en: e.target.value } }
                  })
                }
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          )}

          {/* Field 3: Paragraph 1 */}
          {activeLangTab === 'mr' ? (
            <PhoneticInput
              label="पहिला परिच्छेद (Paragraph 1)"
              multiline
              rows={4}
              value={formData.content?.p1?.mr || ''}
              onChange={(v) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, p1: { ...formData.content?.p1, mr: v } }
                })
              }
            />
          ) : (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Paragraph 1 (English)</label>
              <textarea
                rows={4}
                value={formData.content?.p1?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, p1: { ...formData.content?.p1, en: e.target.value } }
                  })
                }
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          )}

          {/* Field 4: Paragraph 2 */}
          {activeLangTab === 'mr' ? (
            <PhoneticInput
              label="दुसरा परिच्छेद (Paragraph 2)"
              multiline
              rows={4}
              value={formData.content?.p2?.mr || ''}
              onChange={(v) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, p2: { ...formData.content?.p2, mr: v } }
                })
              }
            />
          ) : (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Paragraph 2 (English)</label>
              <textarea
                rows={4}
                value={formData.content?.p2?.en || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, p2: { ...formData.content?.p2, en: e.target.value } }
                  })
                }
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Local Draft / मसुदा जतन करा</span>
            </button>

            <button
              onClick={handleSubmitToChecker}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit to Checker / चेकरकडे मंजुरीसाठी पाठवा</span>
            </button>
          </div>
        </div>

        {/* Right: Live Responsive Preview (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-700" />
              <h3 className="font-semibold text-sm text-slate-800">
                थेट पूर्वदृश्य (Live Preview)
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
              {activeLangTab === 'mr' ? 'मराठी' : 'English'}
            </span>
          </div>

          {/* Mini rendered card simulation */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 text-xs space-y-3">
            {/* Header simulated */}
            <div className="bg-slate-900 text-white p-4 space-y-1">
              <span className="text-[10px] font-semibold uppercase text-amber-300">
                MPKV Rahuri Central Campus
              </span>
              <h4 className="font-semibold text-sm text-white">
                {activeLangTab === 'mr'
                  ? formData.hero?.headline?.mr || formData.title?.mr
                  : formData.hero?.headline?.en || formData.title?.en}
              </h4>
              <p className="text-[11px] text-emerald-100 line-clamp-2">
                {activeLangTab === 'mr'
                  ? formData.hero?.subheadline?.mr
                  : formData.hero?.subheadline?.en}
              </p>
            </div>

            {/* Content simulated */}
            <div className="p-4 space-y-2.5 bg-white text-slate-700 text-justify text-[11px] leading-relaxed">
              <p>
                {activeLangTab === 'mr'
                  ? formData.content?.p1?.mr
                  : formData.content?.p1?.en}
              </p>
              <p>
                {activeLangTab === 'mr'
                  ? formData.content?.p2?.mr
                  : formData.content?.p2?.en}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 25 Templates Selector Modal */}
      <TemplateSelectorModal
        currentTemplate={currentTemplate}
        isOpen={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        onSelect={handleTemplateSelect}
      />
    </div>
  );
};
