import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ReviewDiffViewer, DiffItem } from '../components/ReviewDiffViewer';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Send,
  ShieldAlert,
  ArrowRight,
  Filter,
  FileCheck
} from 'lucide-react';

interface ReviewQueueItem {
  id: string;
  title: string;
  entityType: string;
  submittedBy: string;
  submittedAt: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'DRAFT';
  makerComment: string;
  checkerRemark?: string;
  diffs: DiffItem[];
}

const initialQueue: ReviewQueueItem[] = [
  {
    id: 'REV-2026-001',
    title: 'राहुरी बियाणे साठा अद्यतन (Rahuri Seed Stock Update)',
    entityType: 'Seed Availability Inventory',
    submittedBy: 'Er. R. D. Shinde (Maker)',
    submittedAt: '21 Nov 2026, 10:15 AM',
    status: 'PENDING_REVIEW',
    makerComment: 'हरभरा विश्‍वराज बियाणाचे नवीन २० क्विंटल आलेले साठा व बॅग दर ₹३,५०० अद्ययावत केले आहे.',
    diffs: [
      {
        field: 'rate_per_bag',
        fieldLabel: 'दर प्रती बॅग (Rate / Bag)',
        oldValue: '३,४०० /-',
        newValue: '३,५०० /-',
        language: 'both'
      },
      {
        field: 'available_bags',
        fieldLabel: 'उपलब्ध बॅगा (Available Bags)',
        oldValue: '१२५ बॅगा (६२.५० क्विंटल)',
        newValue: '१६५ बॅगा (८२.५० क्विंटल)',
        language: 'both'
      }
    ]
  },
  {
    id: 'REV-2026-002',
    title: 'मा. कुलगुरू संदेश २०२६ (VC Desk Address Update)',
    entityType: 'Inner Page: vc-desk',
    submittedBy: 'Er. R. D. Shinde (Maker)',
    submittedAt: '20 Nov 2026, 04:30 PM',
    status: 'PENDING_REVIEW',
    makerComment: 'पदव्युत्तर प्रवेश २०२६-२७ च्या पार्श्वभूमीवर मा. कुलगुरूंचा संदेश अद्यतनित केला आहे.',
    diffs: [
      {
        field: 'address_mr',
        fieldLabel: 'कुलगुरू संदेश (मराठी)',
        oldValue: 'महात्मा फुले कृषि विद्यापीठ हे राज्यातील शेतकऱ्यांच्या उन्नतीसाठी निरंतर कार्यरत आहे.',
        newValue: 'महात्मा फुले कृषि विद्यापीठ, राहुरी हे कृषी शिक्षण, आंतरराष्ट्रीय दर्जाचे संशोधन व आधुनिक तंत्रज्ञान विस्तारात देशात अग्रेसर आहे. नवीन शैक्षणिक वर्षात सर्व विद्यार्थ्यांचे हार्दिक स्वागत.',
        language: 'mr'
      },
      {
        field: 'address_en',
        fieldLabel: 'VC Address (English)',
        oldValue: 'MPKV is committed to the welfare of farmers across Maharashtra.',
        newValue: 'Mahatma Phule Krishi Vidyapeeth, Rahuri leads the nation in agricultural education, frontier research, and smart extension. A warm welcome to all students for academic year 2026-27.',
        language: 'en'
      }
    ]
  },
  {
    id: 'REV-2026-003',
    title: '४० वा दीक्षांत समारंभ परिपत्रक (40th Convocation Notice)',
    entityType: 'Home Announcements & Documents',
    submittedBy: 'Er. R. D. Shinde (Maker)',
    submittedAt: '19 Nov 2026, 11:00 AM',
    status: 'PENDING_REVIEW',
    makerComment: 'दीक्षांत समारंभ २०२६ अधिकृत परिपत्रक व अर्ज लिंक जोडली.',
    diffs: [
      {
        field: 'notice_title',
        fieldLabel: 'परिपत्रक शीर्षक (Notice Title)',
        oldValue: '३९ वा पदवीप्रदान दीक्षांत समारंभ',
        newValue: '४० वा पदवीप्रदान दीक्षांत समारंभ - पदवी प्राप्त विद्यार्थ्यांसाठी सूचना',
        language: 'both'
      },
      {
        field: 'pdf_path',
        fieldLabel: 'स्थानिक PDF फाइल (Local PDF)',
        oldValue: '/media/docs/20261029_170823_076f9e632d377675d7eac8cfb5f5e60e.pdf',
        newValue: '/media/docs/20261117_160948_9ce404dba955b1b1cd65dbc6e3cecd3a.pdf',
        language: 'both'
      }
    ]
  },
  {
    id: 'REV-2026-004',
    title: 'मध्यवर्ती रोपवाटिका - डाळिंब भगवा साठा',
    entityType: 'Central Nursery Plant Stock',
    submittedBy: 'Er. R. D. Shinde (Maker)',
    submittedAt: '18 Nov 2026, 02:15 PM',
    status: 'APPROVED',
    makerComment: 'डाळिंब भगवा ५,००० कलमे विक्रीसाठी सज्ज नोंदवली.',
    checkerRemark: 'तपासणी पूर्ण, दर सूची मंजूर करून थेट पोर्टलवर प्रकाशित केले.',
    diffs: [
      {
        field: 'available_qty',
        fieldLabel: 'उपलब्ध रोपे (Available Saplings)',
        oldValue: '२,०००',
        newValue: '५,०००',
        language: 'both'
      }
    ]
  }
];

export const ReviewDashboard: React.FC = () => {
  const { currentUser, hasPermission } = useAdminAuth();
  const { language } = useLanguage();

  const [queue, setQueue] = useState<ReviewQueueItem[]>(initialQueue);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [selectedReview, setSelectedReview] = useState<ReviewQueueItem | null>(null);
  const [checkerRemarkInput, setCheckerRemarkInput] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filteredItems = queue.filter((item) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'PENDING') return item.status === 'PENDING_REVIEW';
    if (activeTab === 'APPROVED') return item.status === 'APPROVED';
    if (activeTab === 'REJECTED') return item.status === 'REJECTED';
    return true;
  });

  const handleApprove = (item: ReviewQueueItem) => {
    if (!checkerRemarkInput.trim()) {
      alert('कृपया मंजुरीची नोंद (Audit Remark) प्रविष्ट करा.');
      return;
    }
    const updated = queue.map((q) =>
      q.id === item.id
        ? { ...q, status: 'APPROVED' as const, checkerRemark: checkerRemarkInput }
        : q
    );
    setQueue(updated);
    setSelectedReview(null);
    setCheckerRemarkInput('');
    setSuccessToast(`मंजूर केले: ${item.id} थेट पोर्टलवर यशस्वीरित्या प्रकाशित झाले.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleReject = (item: ReviewQueueItem) => {
    if (!checkerRemarkInput.trim()) {
      alert('कृपया नाकारण्याचे कारण (Rejection Reason) प्रविष्ट करा.');
      return;
    }
    const updated = queue.map((q) =>
      q.id === item.id
        ? { ...q, status: 'REJECTED' as const, checkerRemark: checkerRemarkInput }
        : q
    );
    setQueue(updated);
    setSelectedReview(null);
    setCheckerRemarkInput('');
    setSuccessToast(`नाकारले: ${item.id} मेकरकडे सुधारणेसाठी परत पाठवले.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-lg flex items-center justify-between text-xs font-bold animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-white/80 hover:text-white">✕</button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-full text-xs font-semibold uppercase mb-2">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Maker-Checker Approval Workflow</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'mr' ? 'मेकर-चेकर पुनरावलोकन डेस्क' : 'Maker-Checker Review Desk'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal">
            {language === 'mr'
              ? 'मेकरद्वारे सुचवलेले द्विभाषिक बदल, बियाणे साठा व परिपत्रके यांची चेकरद्वारे पडताळणी व थेट प्रकाशनाची स्वतंत्र प्रणाली.'
              : 'Strict two-man rule governance: Makers propose drafts with side-by-side bilingual diffs; Checkers verify and publish to live site.'}
          </p>
        </div>

        {/* Permission status pill */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div className="text-[10px] uppercase font-medium text-slate-500">Your Authority:</div>
          <div className="font-semibold text-sm text-slate-800 mt-0.5">
            {currentUser.role === 'MAKER'
              ? '✏️ Create & Submit Drafts'
              : currentUser.role === 'CHECKER'
              ? '🛡️ Review & Publish to Live'
              : '👑 Full Super Admin Access'}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200/80">
        <button
          onClick={() => setActiveTab('PENDING')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'PENDING'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-950 font-medium'
          }`}
        >
          {language === 'mr' ? 'प्रलंबित पुनरावलोकन' : 'Pending Review'} (
          {queue.filter((q) => q.status === 'PENDING_REVIEW').length})
        </button>
        <button
          onClick={() => setActiveTab('APPROVED')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'APPROVED'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-950 font-medium'
          }`}
        >
          {language === 'mr' ? 'मंजूर' : 'Approved'} (
          {queue.filter((q) => q.status === 'APPROVED').length})
        </button>
        <button
          onClick={() => setActiveTab('REJECTED')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'REJECTED'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-950 font-medium'
          }`}
        >
          {language === 'mr' ? 'नाकारलेले' : 'Rejected'} (
          {queue.filter((q) => q.status === 'REJECTED').length})
        </button>
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'ALL'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-950 font-medium'
          }`}
        >
          {language === 'mr' ? 'सर्व नोंदी' : 'All Items'} ({queue.length})
        </button>
      </div>

      {/* Queue Items Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 uppercase text-[10px] font-semibold tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Revision ID</th>
                <th className="py-3.5 px-4">Target Scope & Title</th>
                <th className="py-3.5 px-4">Submitted By</th>
                <th className="py-3.5 px-4">Submission Date</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-500">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                      {item.entityType}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {item.submittedBy}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-normal">{item.submittedAt}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        item.status === 'PENDING_REVIEW'
                          ? 'bg-amber-50 text-amber-900 border border-amber-200/60'
                          : item.status === 'APPROVED'
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/60'
                          : 'bg-rose-50 text-rose-900 border border-rose-200/60'
                      }`}
                    >
                      {item.status === 'PENDING_REVIEW' && <Clock className="w-3 h-3 text-amber-600" />}
                      {item.status === 'APPROVED' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {item.status === 'REJECTED' && <XCircle className="w-3 h-3 text-rose-600" />}
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedReview(item);
                        setCheckerRemarkInput('');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-700 font-medium transition-colors text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'तपासा' : 'Inspect Diff'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Diff Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  Diff Inspector — {selectedReview.id}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {selectedReview.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <ReviewDiffViewer
                title={selectedReview.title}
                entityType={selectedReview.entityType}
                submittedBy={selectedReview.submittedBy}
                submittedAt={selectedReview.submittedAt}
                diffs={selectedReview.diffs}
                comment={selectedReview.makerComment}
              />

              {/* Existing Checker Remarks if already reviewed */}
              {selectedReview.checkerRemark && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1">
                  <span className="font-semibold text-emerald-950 uppercase text-[10px]">
                    नोंदवलेली चेकर टिप्पणी (Audited Checker Remark):
                  </span>
                  <p className="text-emerald-900 font-medium">{selectedReview.checkerRemark}</p>
                </div>
              )}

              {/* Action Controls for Checker / Super Admin */}
              {selectedReview.status === 'PENDING_REVIEW' && (
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <label className="block text-xs font-semibold text-slate-800">
                    चेकर अभिप्राय व मंजुरी नोंद (Checker Audit Remark - Mandatory):
                  </label>
                  <textarea
                    rows={2}
                    value={checkerRemarkInput}
                    onChange={(e) => setCheckerRemarkInput(e.target.value)}
                    placeholder="उदा. माहिती पडताळण्यात आली आहे आणि अचूक आढळली आहे / Information verified against official Rahuri seed register."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                  />

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    {currentUser.role === 'MAKER' ? (
                      <div className="text-xs text-amber-700 italic">
                        ⚠️ You are currently in MAKER role. Only CHECKER or SUPER_ADMIN can approve/reject. Switch persona in topbar to test.
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleReject(selectedReview)}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                        >
                          Reject with Feedback / नाकारा
                        </button>
                        <button
                          onClick={() => handleApprove(selectedReview)}
                          className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-amber-300" />
                          <span>Approve & Publish / मंजूर करून प्रकाशित करा</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
