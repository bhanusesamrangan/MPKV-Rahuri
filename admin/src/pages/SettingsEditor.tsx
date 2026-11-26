import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useLanguage } from '../context/LanguageContext';
import { PhoneticInput } from '../components/PhoneticInput';
import {
  Settings,
  Save,
  CheckCircle2,
  Building,
  Phone,
  Mail,
  BellRing,
  ShieldCheck,
  Globe,
  Sliders
} from 'lucide-react';

export const SettingsEditor: React.FC = () => {
  const { currentUser } = useAdminAuth();
  const { language } = useLanguage();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings state
  const [siteTitleMr, setSiteTitleMr] = useState('महात्मा फुले कृषि विद्यापीठ, राहुरी');
  const [siteTitleEn, setSiteTitleEn] = useState('Mahatma Phule Krishi Vidyapeeth, Rahuri');
  const [campusScopeMr, setCampusScopeMr] = useState('मध्यवर्ती विद्यापीठ मुख्यालय, अहिल्यानगर (महाराष्ट्र)');
  const [campusScopeEn, setCampusScopeEn] = useState('Central University Headquarters · Ahilyanagar (M.S.)');
  const [seedPhone, setSeedPhone] = useState('02426-243345');
  const [registrarPhone, setRegistrarPhone] = useState('02426-243215, 243366');
  const [contactEmail, setContactEmail] = useState('registrar.mpkv@nic.in');
  const [alertTickerActive, setAlertTickerActive] = useState(true);
  const [alertTickerMr, setAlertTickerMr] = useState('राहुरी बियाणे विक्री कक्षात हरभरा विश्‍वराज व गहू समाधान बियाणे थेट विक्रीसाठी उपलब्ध.');
  const [alertTickerEn, setAlertTickerEn] = useState('Gram Vishwaraj and Wheat Samadhan certified seeds are available for direct sale at Rahuri Central Seed Desk.');

  const handleSave = () => {
    setToastMessage('सर्वसाधारण सेटिंग्ज यशस्वीरित्या जतन केल्या (Global Settings Saved).');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="p-4 bg-emerald-700 text-white rounded-2xl shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)}>✕</button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-900 border border-teal-200/60 rounded-full text-xs font-semibold uppercase mb-1.5">
            <Settings className="w-3.5 h-3.5 text-teal-600" />
            <span>Portal Configuration & GIGW 3.0</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'mr' ? 'सर्वसाधारण सेटिंग्ज व मानके' : 'Global Settings & Portal Compliance'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            {language === 'mr'
              ? 'विद्यापीठ माहिती, थेट संपर्क क्रमांक, आपत्कालीन सूचना पट्टी व GIGW मानके.'
              : 'Institutional identities, official helplines, emergency tickers, and accessibility flags.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings / बदल जतन करा</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Identity & Campus Scope */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-sm text-slate-800">
              विद्यापीठ ओळख व परिसर (Institutional Identity)
            </h3>
          </div>

          <PhoneticInput
            label="विद्यापीठ शीर्षक (मराठी)"
            value={siteTitleMr}
            onChange={setSiteTitleMr}
          />

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">University Title (English)</label>
            <input
              type="text"
              value={siteTitleEn}
              onChange={(e) => setSiteTitleEn(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <PhoneticInput
            label="परिसर कार्यक्षेत्र उपशीर्षक (मराठी)"
            value={campusScopeMr}
            onChange={setCampusScopeMr}
          />

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Campus Scope Tagline (English)</label>
            <input
              type="text"
              value={campusScopeEn}
              onChange={(e) => setCampusScopeEn(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Card 2: Contact Helplines */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Phone className="w-4 h-4 text-emerald-700" />
            <h3 className="font-semibold text-sm text-slate-800">
              अधिकृत संपर्क व हेल्पलाईन (Official Helplines)
            </h3>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              बियाणे विक्री कक्ष थेट दूरध्वनी (Seed Desk Hotline)
            </label>
            <input
              type="text"
              value={seedPhone}
              onChange={(e) => setSeedPhone(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              कुलसचिव कार्यालय दूरध्वनी (Registrar Phone Lines)
            </label>
            <input
              type="text"
              value={registrarPhone}
              onChange={(e) => setRegistrarPhone(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              अधिकृत ईमेल (Official Registrar Email)
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>GIGW 3.0 & WCAG 2.1 AA Certified Metadata Configured</span>
          </div>
        </div>

        {/* Card 3: Emergency Alert Ribbon (Full Width) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-amber-500" />
              <h3 className="font-semibold text-sm text-slate-800">
                आपत्कालीन / महत्त्वपूर्ण सूचना पट्टी (Emergency Alert Ticker)
              </h3>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={alertTickerActive}
                onChange={(e) => setAlertTickerActive(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>सूचना पट्टी सक्रिय करा (Enable Ticker)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhoneticInput
              label="सूचना मजकूर (मराठी)"
              multiline
              rows={2}
              value={alertTickerMr}
              onChange={setAlertTickerMr}
            />

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Alert Ticker Text (English)</label>
              <textarea
                rows={2}
                value={alertTickerEn}
                onChange={(e) => setAlertTickerEn(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
