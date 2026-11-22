import React from 'react';
import { ArrowRight, PlusCircle, MinusCircle, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface DiffItem {
  field: string;
  fieldLabel: string;
  oldValue: string;
  newValue: string;
  language: 'mr' | 'en' | 'both';
}

interface ReviewDiffViewerProps {
  title: string;
  entityType: string;
  submittedBy: string;
  submittedAt: string;
  diffs: DiffItem[];
  comment?: string;
}

export const ReviewDiffViewer: React.FC<ReviewDiffViewerProps> = ({
  title,
  entityType,
  submittedBy,
  submittedAt,
  diffs,
  comment
}) => {
  return (
    <div className="space-y-4">
      {/* Overview Metadata */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Target Page / Entity
          </span>
          <div className="font-semibold text-sm text-slate-800 mt-0.5">{title}</div>
          <div className="text-emerald-700 font-medium">{entityType}</div>
        </div>
        <div className="text-right sm:text-right">
          <span className="text-[10px] uppercase font-medium text-slate-500 tracking-wider">
            Submitted by Maker
          </span>
          <div className="font-medium text-slate-800">{submittedBy}</div>
          <div className="text-slate-500">{submittedAt}</div>
        </div>
      </div>

      {comment && (
        <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">मेकर टिप्पणी (Maker Note):</span> {comment}
          </div>
        </div>
      )}

      {/* Diffs List */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>तुलनात्मक बदल (Side-by-Side Field Diffs)</span>
        </h4>

        {diffs.map((d, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{d.fieldLabel} ({d.field})</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 uppercase">
                {d.language === 'mr' ? 'मराठी' : d.language === 'en' ? 'English' : 'द्विभाषिक'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 text-xs">
              {/* Old Live Value */}
              <div className="p-4 bg-rose-50/40">
                <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MinusCircle className="w-3 h-3 text-rose-600" />
                  <span>सध्याचे थेट मूल्य (Current Live Content)</span>
                </div>
                <div className="text-slate-700 whitespace-pre-wrap leading-relaxed line-through decoration-rose-400">
                  {d.oldValue || <span className="italic text-slate-400">रिक्त (Empty)</span>}
                </div>
              </div>

              {/* Proposed New Value */}
              <div className="p-4 bg-emerald-50/60">
                <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <PlusCircle className="w-3 h-3 text-emerald-600" />
                  <span>सुचवलेले नवीन मूल्य (Proposed New Content)</span>
                </div>
                <div className="text-slate-900 font-medium whitespace-pre-wrap leading-relaxed">
                  {d.newValue || <span className="italic text-slate-400">रिक्त (Empty)</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
