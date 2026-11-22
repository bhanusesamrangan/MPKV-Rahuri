import React, { useState, useRef } from 'react';
import { Languages, Copy, Check, Sparkles } from 'lucide-react';

interface PhoneticInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  englishCompanion?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

// Simple rule-based English-to-Devanagari mapping dictionary for instant offline typing
const phoneticMap: Record<string, string> = {
  a: 'अ', aa: 'आ', i: 'इ', ee: 'ई', u: 'उ', oo: 'ऊ', e: 'ए', ai: 'ऐ', o: 'ओ', au: 'औ',
  k: 'क', kh: 'ख', g: 'ग', gh: 'घ', ch: 'च', chh: 'छ', j: 'ज', jh: 'झ',
  t: 'ट', th: 'ठ', d: 'ड', dh: 'ढ', n: 'न', p: 'प', ph: 'फ', f: 'फ',
  b: 'ब', bh: 'भ', m: 'म', y: 'य', r: 'र', l: 'ल', v: 'व', w: 'व',
  sh: 'श', s: 'स', h: 'ह', gn: 'ज्ञ', tr: 'त्र', ksh: 'क्ष',
  rahuri: 'राहुरी', mpkv: 'मफुकृवि', vidyapeeth: 'विद्यापीठ', krishi: 'कृषि',
  mahatma: 'महात्मा', phule: 'फुले', shetkari: 'शेतकरी', biyane: 'बियाणे',
  ropvatika: 'रोपवाटिका', arakhda: 'आराखडा', paripatrak: 'परिपत्रक'
};

export const PhoneticInput: React.FC<PhoneticInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  englishCompanion,
  multiline = false,
  rows = 3,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [showHelper, setShowHelper] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickInsert = (marathiWord: string) => {
    onChange(value ? `${value} ${marathiWord}` : marathiWord);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <label className="flex items-center gap-1.5 text-emerald-900">
            <Languages className="w-3.5 h-3.5 text-emerald-700" />
            <span>{label}</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-semibold border border-emerald-200">
              मराठी (देवनागरी)
            </span>
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowHelper(!showHelper)}
              className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold underline"
            >
              {showHelper ? 'मदत लपवा' : 'शब्द सुचवा'}
            </button>
            {value && (
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
                title="मजकूर कॉपी करा"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'कॉपी झाले' : 'कॉपी'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {showHelper && (
        <div className="p-2.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1.5 text-xs animate-in fade-in duration-150">
          <div className="text-[11px] font-bold text-emerald-950 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>वारंवार लागणारे राहुरी शब्द (क्लिक करून जोडा):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              'महात्मा फुले कृषि विद्यापीठ',
              'राहुरी',
              'बियाणे विभाग',
              'मध्यवर्ती रोपवाटिका',
              'प्रमाणित साठा',
              'पदव्युत्तर महाविद्यालय',
              'कृषि अभियांत्रिकी',
              'शेतकरी सेवा',
              'परिपत्रक',
              'मा. कुलगुरू'
            ].map((kw, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickInsert(kw)}
                className="px-2 py-0.5 rounded-md bg-white border border-emerald-300 hover:border-emerald-500 text-emerald-900 text-[11px] font-semibold transition-colors shadow-2xs"
              >
                + {kw}
              </button>
            ))}
          </div>
        </div>
      )}

      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'येथे मराठी देवनागरी मजकूर प्रविष्ट करा...'}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'येथे मराठी देवनागरी मजकूर प्रविष्ट करा...'}
          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs md:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
        />
      )}
    </div>
  );
};
