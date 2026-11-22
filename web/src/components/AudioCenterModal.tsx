'use client';

import React, { useState } from 'react';
import { X, Play, Pause, Radio, Music, Volume2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AudioCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'rajya' | 'uni' | 'icar' | 'radio';
}

export const AudioCenterModal: React.FC<AudioCenterModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'rajya'
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'rajya' | 'uni' | 'icar' | 'radio'>(initialTab);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-emerald-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold text-base">
              {language === 'mr' ? 'मफुकृवि राहुरी - ध्वनी व रेडिओ केंद्र' : 'MPKV Rahuri Audio & Radio Station'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('rajya')}
            className={`flex-1 py-2.5 px-3 text-center transition-all ${
              activeTab === 'rajya' ? 'bg-white text-emerald-900 border-b-2 border-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-800'
            }`}
          >
            {language === 'mr' ? 'राज्य गीत' : 'Rajya Geet'}
          </button>
          <button
            onClick={() => setActiveTab('uni')}
            className={`flex-1 py-2.5 px-3 text-center transition-all ${
              activeTab === 'uni' ? 'bg-white text-emerald-900 border-b-2 border-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-800'
            }`}
          >
            {language === 'mr' ? 'विद्यापीठ गीत' : 'University Song'}
          </button>
          <button
            onClick={() => setActiveTab('icar')}
            className={`flex-1 py-2.5 px-3 text-center transition-all ${
              activeTab === 'icar' ? 'bg-white text-emerald-900 border-b-2 border-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-800'
            }`}
          >
            {language === 'mr' ? 'ICAR गीत' : 'ICAR Song'}
          </button>
          <button
            onClick={() => setActiveTab('radio')}
            className={`flex-1 py-2.5 px-3 text-center transition-all ${
              activeTab === 'radio' ? 'bg-white text-red-700 border-b-2 border-red-600 font-bold' : 'text-slate-600 hover:text-red-700'
            }`}
          >
            <span className="flex items-center justify-center gap-1">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>FM 90.8</span>
            </span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {activeTab === 'rajya' && (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-950 text-base mb-1">
                  {language === 'mr' ? 'जय जय महाराष्ट्र माझा (राज्य गीत)' : 'Rajya Geet — Jai Jai Maharashtra Maza'}
                </h4>
                <p className="text-xs text-slate-600 mb-4">
                  {language === 'mr' ? 'महाराष्ट्र शासनाचे अधिकृत राज्यगीत' : 'Official State Anthem of Maharashtra'}
                </p>
                <audio controls className="w-full" src="/media/audio/RajyaGeet.mp3">
                  Your browser does not support audio playback.
                </audio>
              </div>
            </div>
          )}

          {activeTab === 'uni' && (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <h4 className="font-bold text-amber-950 text-base mb-1">
                  {language === 'mr' ? 'महात्मा फुले कृषि विद्यापीठ गीत' : 'MPKV Rahuri University Anthem'}
                </h4>
                <p className="text-xs text-slate-600 mb-4">
                  {language === 'mr' ? 'मफुकृवि राहुरी चे अधिकृत विद्यापीठ गीत' : 'Official Institutional Song of MPKV Rahuri'}
                </p>
                <audio controls className="w-full" src="/media/audio/MPKV_Song.mp3">
                  Your browser does not support audio playback.
                </audio>
              </div>
            </div>
          )}

          {activeTab === 'icar' && (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-950 text-base mb-1">
                  {language === 'mr' ? 'भारतीय कृषि अनुसंधान परिषद (ICAR) गीत' : 'ICAR Theme Song'}
                </h4>
                <p className="text-xs text-slate-600 mb-4">
                  {language === 'mr' ? 'नवी दिल्ली' : 'Indian Council of Agricultural Research, New Delhi'}
                </p>
                <audio controls className="w-full" src="/media/audio/IcarThemeSong.mp3">
                  Your browser does not support audio playback.
                </audio>
              </div>
            </div>
          )}

          {activeTab === 'radio' && (
            <div className="space-y-4 text-center">
              <div className="p-5 bg-gradient-to-br from-red-50 to-amber-50 rounded-xl border border-red-200">
                <div className="inline-flex p-3 rounded-full bg-red-100 text-red-600 mb-2">
                  <Radio className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">
                  {language === 'mr' ? 'फुले कृषिवाहिनी (९०.८ FM)' : 'Phule Krishi Vahini 90.8 FM'}
                </h4>
                <p className="text-xs text-slate-600 font-medium mb-4">
                  {language === 'mr' ? 'मफुकृवि राहुरी मध्यवर्ती स्टुडिओवरून थेट प्रक्षेपण' : 'Live Broadcast from Central Studio, MPKV Rahuri Campus'}
                </p>
                <audio
                  controls
                  className="w-full"
                  src="https://digitalradio.co.in:8020/stream"
                  onPlay={() => setIsRadioPlaying(true)}
                  onPause={() => setIsRadioPlaying(false)}
                >
                  Your browser does not support live streaming.
                </audio>
                <p className="text-[11px] text-slate-500 mt-2">
                  {language === 'mr' ? 'टीप: लाईव्ह प्रसारण ऐकताना अडचण आल्यास कृपया प्ले बटणावर पुन्हा क्लिक करा.' : 'Note: If stream disconnects, click play again to reconnect.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-3 text-right border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-colors"
          >
            {language === 'mr' ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
