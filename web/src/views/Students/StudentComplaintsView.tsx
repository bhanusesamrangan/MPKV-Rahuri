'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Send,
  CheckCircle2,
  User,
  Phone,
  GraduationCap,
  Building,
  MessageSquare,
  FileCheck,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { StudentBreadcrumb } from './components/StudentBreadcrumb';

export const StudentComplaintsView: React.FC<{ pageData: any }> = ({ pageData }) => {
  const { language } = useLanguage();
  const [formState, setFormState] = useState({
    regNo: '',
    studentName: '',
    contact: '',
    collegeName: '',
    degree: '',
    message: '',
  });
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const fields: Array<{ key: string; label: { en: string; mr: string }; placeholder: string }> =
    pageData?.formFields || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.regNo.trim() || !formState.studentName.trim() || !formState.message.trim()) return;
    const code = `MPKV-CMP-${Date.now().toString().slice(-6)}`;
    setSubmittedRef(code);
  };

  const getTxt = (v: any) => (typeof v === 'string' ? v : language === 'mr' ? v?.mr || v?.en || '' : v?.en || '');

  return (
    <div className="w-full min-h-screen bg-[#fdf7f8] text-slate-800">
      <StudentBreadcrumb currentTitle={{ en: 'Students Complaints', mr: 'विद्यार्थी तक्रार निवारण' }} />

      {/* CLARET BURGUNDY SUPPORT & GRIEVANCE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#450a0a] via-[#7f1d1d] to-[#9f1239] text-white border-b-4 border-amber-300">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-300/15 border border-amber-200/40 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>{getTxt(pageData?.hero?.badge)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-4xl">
            {getTxt(pageData?.hero?.title)}
          </h1>
          <p className="text-sm sm:text-base text-rose-100/90 max-w-3xl leading-relaxed">
            {getTxt(pageData?.hero?.subtitle)}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Cols: Filing Guide & Official Fields Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-rose-200/80 p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
                <FileCheck className="w-5 h-5 text-rose-800" />
                <h2 className="text-lg font-bold text-slate-900">
                  {language === 'mr' ? 'तक्रार नोंदणीसाठी आवश्यक तपशील' : 'Required Student Submission Details'}
                </h2>
              </div>

              <div className="space-y-3">
                {fields.map((fld, idx) => (
                  <div
                    key={fld.key}
                    className="p-3.5 rounded-xl bg-[#fdf7f8] border border-rose-200/60 flex items-center justify-between gap-3"
                  >
                    <span className="text-sm font-bold text-slate-900">
                      {idx + 1}. {getTxt(fld.label)}
                    </span>
                    <span className="text-[11px] font-semibold text-rose-800 bg-white px-2.5 py-0.5 rounded-md border border-rose-200">
                      Required
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#450a0a] text-white rounded-3xl p-7 space-y-4">
              <h3 className="text-base font-bold text-amber-200">
                {language === 'mr' ? 'अधिकृत तक्रार निवारण व रॅगिंग प्रतिबंध कक्ष' : 'Official Statutory Grievance & RTI Desk'}
              </h3>
              <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
                {language === 'mr'
                  ? 'अतिरिक्त वैधानिक तक्रार निवारण व रॅगिंग विरोधी समितीची माहिती पाहण्यासाठी खालील दालनास भेट द्या.'
                  : 'For statutory Grievance Redressal Committees and University Grievance Officer contacts, visit the official Transparency portal.'}
              </p>
              <Link
                href="/transparency-and-grievance"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-300 text-rose-950 text-xs font-bold hover:bg-amber-200 transition-colors"
              >
                <span>{language === 'mr' ? 'तक्रार निवारण व RTI पोर्टल' : 'Visit Grievance & RTI Cell'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right 7 Cols: Interactive Official Student Complaints Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-rose-200/80 p-7 sm:p-9 shadow-xs">
            {submittedRef ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
                  Ref: {submittedRef}
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  {language === 'mr' ? 'तक्रार अर्ज तयार झाला आहे' : 'Complaint Summary Prepared'}
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {language === 'mr'
                    ? 'आपला तपशील तपासला गेला आहे. अधिकृत कार्यवाहीसाठी कृपया आपल्या महाविद्यालयाच्या विद्यार्थी कल्याण कार्यालयाशी संपर्क साधा.'
                    : 'Your details have been validated locally. Please also forward official records directly to the Students’ Welfare Officer (0246-243250 / 243274) or via official university correspondence.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      setFormState({ regNo: '', studentName: '', contact: '', collegeName: '', degree: '', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#7f1d1d] text-white text-xs font-bold hover:bg-rose-900"
                  >
                    {language === 'mr' ? 'नवीन नोंदणी करा' : 'Submit Another Entry'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="pb-4 border-b border-stone-100">
                  <h2 className="text-xl font-bold text-slate-900">
                    {language === 'mr' ? 'विद्यार्थी तक्रार नोंदणी अर्ज' : 'Student Complaint Registration Form'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'mr' ? 'मूळ MPKV विद्यार्थी तक्रार पोर्टलवरील सर्व ६ रकाने' : 'Exact 6 fields matching https://mpkv.ac.in/Student/StudentComplaints'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-rose-700" />
                      <span>{language === 'mr' ? 'नोंदणी क्रमांक *' : 'Reg. No *'}</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formState.regNo}
                      onChange={(e) => setFormState({ ...formState, regNo: e.target.value })}
                      placeholder="e.g. 2024/AGR/0123"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-rose-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-rose-700" />
                      <span>{language === 'mr' ? 'विद्यार्थ्याचे नाव' : 'Student Name *'}</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formState.studentName}
                      onChange={(e) => setFormState({ ...formState, studentName: e.target.value })}
                      placeholder="Full name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-rose-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-rose-700" />
                      <span>{language === 'mr' ? 'संपर्क क्रमांक' : 'Contact *'}</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formState.contact}
                      onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                      placeholder="Mobile / Phone number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-rose-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-rose-700" />
                      <span>{language === 'mr' ? 'पदवी / अभ्यासक्रम' : 'Degree *'}</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formState.degree}
                      onChange={(e) => setFormState({ ...formState, degree: e.target.value })}
                      placeholder="e.g. B.Sc. (Hons) Agri / M.Sc. / Ph.D."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-rose-700"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-rose-700" />
                    <span>{language === 'mr' ? 'महाविद्यालयाचे नाव' : 'College Name *'}</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formState.collegeName}
                    onChange={(e) => setFormState({ ...formState, collegeName: e.target.value })}
                    placeholder="Constituent or Affiliated College Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-rose-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-rose-700" />
                    <span>{language === 'mr' ? 'तक्रार / संदेश' : 'Message *'}</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={language === 'mr' ? 'आपली तक्रार येथे सविस्तर लिहा...' : 'Describe your complaint or grievance clearly...'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-rose-700"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7f1d1d] hover:bg-rose-900 text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'mr' ? 'तक्रार सादर करा' : 'Submit Complaint'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
