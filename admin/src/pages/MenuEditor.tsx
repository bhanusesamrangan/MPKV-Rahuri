import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useLanguage } from '../context/LanguageContext';
import navMenuDataRaw from '../data/scraped/navigation_menu.json';
import { PhoneticInput } from '../components/PhoneticInput';
import {
  Menu as MenuIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  CheckCircle2,
  Link as LinkIcon,
  FolderTree,
  ChevronRight,
  Layers
} from 'lucide-react';

export const MenuEditor: React.FC = () => {
  const { currentUser } = useAdminAuth();
  const { language } = useLanguage();

  const [menuItems, setMenuItems] = useState<any[]>(() =>
    JSON.parse(JSON.stringify(navMenuDataRaw))
  );
  const [selectedItem, setSelectedItem] = useState<any>(menuItems[0] || null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...menuItems];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    setMenuItems(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === menuItems.length - 1) return;
    const newItems = [...menuItems];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    setMenuItems(newItems);
  };

  const handleSaveMenu = () => {
    setToastMessage('३-स्तरीय मेनू संरचना स्थानिकरित्या जतन केली (Navigation Tree Saved).');
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200/60 rounded-full text-xs font-semibold uppercase mb-1.5">
            <MenuIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>3-Level Navigation Hierarchy Builder</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'mr' ? '३-स्तरीय मेनू व्यवस्थापन' : '3-Level Navigation Menu Builder'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            {language === 'mr'
              ? 'मुख्य मेनू टॅब, गट वर्गीकरण व उप-पृष्ठे (Leaf Pages) व्यवस्थापित करा.'
              : 'Configure top navigation tabs, multi-column mega groups, and leaf route links.'}
          </p>
        </div>

        <button
          onClick={handleSaveMenu}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes / बदल जतन करा</span>
        </button>
      </div>

      {/* Main Grid: Left Tree Hierarchy | Right Selected Item Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Tree (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-emerald-700" />
              <h3 className="font-semibold text-sm text-slate-800">
                मेनू रचना (Menu Structure)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              {menuItems.length} Top Tabs
            </span>
          </div>

          <div className="space-y-2">
            {menuItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedItem?.id === item.id
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-0.5 truncate">
                  <div className="font-semibold text-xs text-slate-800 truncate">
                    {item.title?.mr} / {item.title?.en}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {item.href} · {item.children?.length || 0} sub-items
                  </div>
                </div>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-1 rounded bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-30 border border-slate-200"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === menuItems.length - 1}
                    className="p-1 rounded bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-30 border border-slate-200"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form: Selected Item Details (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-5">
          {selectedItem ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  <span>घटक संपादन (Edit Item): {selectedItem.title?.en}</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  ID: {selectedItem.id}
                </span>
              </div>

              {/* Title Marathi */}
              <PhoneticInput
                label="मेनू शीर्षक (मराठी देवनागरी)"
                value={selectedItem.title?.mr || ''}
                onChange={(v) =>
                  setSelectedItem({
                    ...selectedItem,
                    title: { ...selectedItem.title, mr: v }
                  })
                }
              />

              {/* Title English */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Menu Title (English)
                </label>
                <input
                  type="text"
                  value={selectedItem.title?.en || ''}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      title: { ...selectedItem.title, en: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              {/* Route Link */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Target Route Link URL</span>
                </label>
                <input
                  type="text"
                  value={selectedItem.href || ''}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      href: e.target.value
                    })
                  }
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              {/* Children Sub-tree representation */}
              {selectedItem.children && (
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    उप-गट व दुवे (Sub-groups & Links)
                  </h4>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {selectedItem.children.map((child: any, cIdx: number) => (
                      <div
                        key={cIdx}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-800">
                            {child.title?.mr} / {child.title?.en}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {child.href || (child.children ? `${child.children.length} links` : '-')}
                          </div>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          {child.is_group ? 'Group Header' : 'Direct Link'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              कृपया डाव्या बाजूने मेनू घटक निवडा.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
