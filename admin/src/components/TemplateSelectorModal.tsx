import React, { useState } from 'react';
import { X, Check, Layout, Sparkles, AlertTriangle, Layers, Grid, FileText, Phone, Users } from 'lucide-react';

export interface LayoutTemplateOption {
  id: string;
  name: string;
  marathiName: string;
  category: 'Hero' | 'Content' | 'Grid' | 'Feed' | 'Directory';
  description: string;
  marathiDescription: string;
}

export const MPKV_TEMPLATES: LayoutTemplateOption[] = [
  // 1-5: Hero Variations
  {
    id: 'HeroCarousel',
    name: 'Hero Carousel & Authorities',
    marathiName: 'मुख्य स्लाइडर व नेतृत्व फलक',
    category: 'Hero',
    description: 'Cinematic full-width crossfading banner with VC quote card and top authorities.',
    marathiDescription: 'कुलगुरू संदेश व प्रमुख अधिकारी वर्गासह पूर्ण रुंदीचा स्लाइडर.'
  },
  {
    id: 'HeroFeaturesTimelineLayout',
    name: 'Hero Features Timeline',
    marathiName: 'वैशिष्ट्ये व कालमर्यादा',
    category: 'Hero',
    description: 'Hero section with agricultural milestone vertical timeline and highlighted features.',
    marathiDescription: 'कृषि विद्यापीठाच्या ऐतिहासिक टप्प्यांचा अनुलंब कालपट.'
  },
  {
    id: 'HeroStatsGrid',
    name: 'Hero Stats Grid',
    marathiName: 'विद्यापीठ सांख्यिकी ग्रिड',
    category: 'Hero',
    description: 'Prominent header banner with 7-column statistical impact cards and Rahuri research metrics.',
    marathiDescription: 'विद्यापीठाचे संशोधन व शिक्षण आकडेवारी दाखवणारा ग्रिड.'
  },
  {
    id: 'HeroThreeColGrid',
    name: 'Hero Three Column Grid',
    marathiName: 'तीन स्तंभ वैशिष्ट्ये',
    category: 'Hero',
    description: 'Hero banner with 3-column academic pillars and campus photo stream.',
    marathiDescription: 'शिक्षण, संशोधन व विस्तार या तीन स्तंभांची मांडणी.'
  },
  {
    id: 'HeroSplitTimeline',
    name: 'Hero Split Timeline',
    marathiName: 'दुहेरी विभाग व कालपट',
    category: 'Hero',
    description: 'Split-screen layout pairing narrative history with research breakthrough achievements.',
    marathiDescription: 'इतिहास आणि संशोधन यशोगाथांची समांतर मांडणी.'
  },

  // 6-10: Content & Tabular Layouts
  {
    id: 'ContentWithTabs',
    name: 'Content with Tabs',
    marathiName: 'टॅब आधारित सामग्री',
    category: 'Content',
    description: 'Multi-tab content layout for departments, course structures, and facilities.',
    marathiDescription: 'विभाग, अभ्यासक्रम व सुविधांसाठी बहु-टॅब मांडणी.'
  },
  {
    id: 'ContentWithRightSidebar',
    name: 'Content with Right Sidebar',
    marathiName: 'उजव्या साइडबारसह सामग्री',
    category: 'Content',
    description: 'Standard institutional page layout with 2/3 main body and 1/3 quick contacts/downloads.',
    marathiDescription: 'मुख्य परिच्छेद आणि उजव्या बाजूला संपर्क व परिपत्रक डाउनलोड.'
  },
  {
    id: 'ContentWithAccordion',
    name: 'Content with Accordion',
    marathiName: 'संक्षिप्त प्रश्नोत्तरे व अ‍ॅकॉर्डियन',
    category: 'Content',
    description: 'Collapsible accordion sections for FAQs, regulations, and student guidelines.',
    marathiDescription: 'विद्यार्थी मार्गदर्शक तत्त्वे व वारंवार विचारले जाणारे प्रश्न.'
  },
  {
    id: 'AboutMahatmaPhuleSection',
    name: 'Memorial Narrative Frame',
    marathiName: 'महात्मा फुले विचार व स्मारक',
    category: 'Content',
    description: 'Dedicated commemorative layout with statue frame, visionary quote, and social reform mission.',
    marathiDescription: 'महात्मा फुले यांच्या शेतीविषयक क्रांतीकारी विचारांची मांडणी.'
  },
  {
    id: 'SideBySideListCards',
    name: 'Side by Side Comparison Cards',
    marathiName: 'समोरासमोर यादी कार्डे',
    category: 'Content',
    description: 'Side-by-side comparative cards for undergraduate vs postgraduate degree requirements.',
    marathiDescription: 'पदवी व पदव्युत्तर नियमावलींची तुलनात्मक मांडणी.'
  },

  // 11-15: Grids & Bento Layouts
  {
    id: 'UniversityBentoGrid',
    name: 'University Bento Grid (6 Pillars)',
    marathiName: '६ स्तंभ बेंटो ग्रिड',
    category: 'Grid',
    description: 'Modern asymmetric bento grid showcasing 6 central pillars of MPKV Rahuri.',
    marathiDescription: 'राहुरी मुख्यालयाचे ६ मुख्य आधारस्तंभ दर्शवणारा बेंटो ग्रिड.'
  },
  {
    id: 'BasicFeatureGrid',
    name: 'Basic Feature Grid',
    marathiName: 'साधी वैशिष्ट्ये ग्रिड',
    category: 'Grid',
    description: 'Clean responsive grid of academic laboratories and Rahuri field testing grounds.',
    marathiDescription: 'प्रयोगशाळा व संशोधन क्षेत्रांचा सुटसुटीत ग्रिड.'
  },
  {
    id: 'MinimalIconGrid',
    name: 'Minimal Icon Grid',
    marathiName: 'चिन्हांकित सेवा ग्रिड',
    category: 'Grid',
    description: 'Minimal icon-first grid for central student amenities (Hostel, Gymkhana, Health Clinic).',
    marathiDescription: 'वसतिगृह, क्रीडा संकुल व आरोग्य केंद्रांच्या चिन्हांकित सेवा.'
  },
  {
    id: 'ThreeColServiceCards',
    name: 'Three Column Service Cards',
    marathiName: '३-स्तंभ शेतकरी सेवा कार्डे',
    category: 'Grid',
    description: 'Three equal cards highlighting Soil Testing, Plant Clinic, and Water Quality Analysis.',
    marathiDescription: 'माती परीक्षण, वनस्पती चिकित्सालय व पाणी तपासणी सेवा.'
  },
  {
    id: 'TwoColEventCards',
    name: 'Two Column Event Cards',
    marathiName: '२-स्तंभ कार्यक्रम व चर्चासत्रे',
    category: 'Grid',
    description: 'Two-column layout highlighting upcoming Krishi Melas, conferences, and workshops.',
    marathiDescription: 'कृषि मेळावे व राष्ट्रीय परिषदांचे कार्यक्रम फलक.'
  },

  // 16-20: Portals & Feeds
  {
    id: 'AnnouncementsTabs',
    name: 'Announcements & Circulars Desk',
    marathiName: 'परिपत्रक, निविदा व भरती कक्ष',
    category: 'Feed',
    description: 'Tabbed document feed for Recruitment, Central Tenders, Notifications, and Circulars.',
    marathiDescription: 'नवीन जाहिराती, निविदा व प्रशासकीय परिपत्रकांचा टॅब डेस्क.'
  },
  {
    id: 'FarmerServicesRibbon',
    name: 'Farmer Services & Agri Calendar',
    marathiName: 'शेतकरी सेवा व कृषि दिनदर्शिका',
    category: 'Feed',
    description: 'Full-width farmer ribbon linking seeds, nursery, farm implements, and monthly PDF calendar.',
    marathiDescription: 'बियाणे, रोपवाटिका व १२ महिन्यांची कृषि दिनदर्शिका.'
  },
  {
    id: 'HeroBannerWithArticles',
    name: 'Hero Banner with Research Articles',
    marathiName: 'संशोधन लेख व वृत्तपट',
    category: 'Feed',
    description: 'Hero banner atop scholarly research publications and crop advisories.',
    marathiDescription: 'हवामान अंदाज व पिक व्यवस्थापन संशोधन लेख.'
  },
  {
    id: 'HeroBannerWithMedia',
    name: 'Media Gallery & Audio Streamer',
    marathiName: 'ध्वनीमुद्रिका व छायाचित्र दालन',
    category: 'Feed',
    description: 'Integrated multimedia suite for university songs, 90.8 FM broadcasts, and photo archives.',
    marathiDescription: 'विद्यापीठ गीत, राज्यगीत व ९०.८ एफएम ऑडिओ प्लेअर.'
  },
  {
    id: 'HolidayCalendarLayout',
    name: 'Agricultural Operations Calendar',
    marathiName: 'हंगामवार शेती नियोजन दिनदर्शिका',
    category: 'Feed',
    description: 'Monthly schedule for Kharif, Rabi, and Summer agronomic operations.',
    marathiDescription: 'खरीप, रब्बी व उन्हाळी पिकांचे हंगामवार नियोजन.'
  },

  // 21-25: Directories & Inventory Catalogs
  {
    id: 'SeedsAvailabilityCatalog',
    name: 'Seeds & Nursery Live Catalog',
    marathiName: 'बियाणे व रोपवाटिका थेट साठा सूची',
    category: 'Directory',
    description: 'Filterable, printable inventory table for Rahuri certified seeds and nursery saplings.',
    marathiDescription: 'राहुरी प्रक्षेत्रावरील उपलब्ध बियाणे व रोपांची प्रमाणित सूची.'
  },
  {
    id: 'ContactInfoGrid',
    name: 'Campus Directory & Authorities Roster',
    marathiName: 'मुख्यालय संपर्क व अधिकारी निर्देशिका',
    category: 'Directory',
    description: 'Comprehensive directory of university officers, deans, directors, and helpline desks.',
    marathiDescription: 'कुलगुरू, अधिष्ठाता, संचालक व विभाग प्रमुखांची संपर्क यादी.'
  },
  {
    id: 'MinisterProfiles',
    name: 'University Chancellor & Leadership Showcase',
    marathiName: 'कुलपती, कृषिमंत्री व नेतृत्व परिचय',
    category: 'Directory',
    description: 'Executive leadership profiles of Hon. Governor, Minister of Agriculture, and Vice-Chancellor.',
    marathiDescription: 'मा. राज्यपाल, मा. कृषिमंत्री व मा. कुलगुरू यांचे परिचय फलक.'
  },
  {
    id: 'HeroWithPricingList',
    name: 'Farm Implements & Service Tariffs',
    marathiName: 'अवजारे व प्रयोगशाळा दर सूची',
    category: 'Directory',
    description: 'Official price catalog for university implements, seeds, and soil testing fees.',
    marathiDescription: 'शेती अवजारे, माती नमुने तपासणी व रोपांचे अधिकृत दर.'
  },
  {
    id: 'PhotoGalleryLayout',
    name: 'Campus Infrastructure & Research Fields Gallery',
    marathiName: 'राहुरी मध्यवर्ती परिसर छायाचित्र दालन',
    category: 'Directory',
    description: 'Categorized responsive image gallery of central buildings, farms, and labs.',
    marathiDescription: 'प्रशासकीय इमारत, मध्यवर्ती ग्रंथालय व प्रक्षेत्रांचे छायाचित्र दालन.'
  }
];

interface TemplateSelectorModalProps {
  currentTemplate: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  currentTemplate,
  isOpen,
  onClose,
  onSelect
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'Hero', 'Content', 'Grid', 'Feed', 'Directory'];

  const filteredTemplates = MPKV_TEMPLATES.filter((tpl) => {
    const matchesCategory = filterCategory === 'All' || tpl.category === filterCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.marathiName.includes(searchQuery) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConfirm = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                Select Layout Template / मांडणी साचा निवडा
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                २५ आधुनिक शासकीय साचे (MahaPrisons PRD Compliance)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search templates / शोधा..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-3.5 py-1.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id || (!selectedTemplate && currentTemplate === tpl.id);
            return (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {tpl.category}
                    </span>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-emerald-600 text-white">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm">
                    {tpl.name}
                  </h4>
                  <div className="text-xs font-semibold text-emerald-800">
                    {tpl.marathiName}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            Selected: <strong className="text-emerald-900">{selectedTemplate || currentTemplate}</strong>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors"
            >
              Cancel / रद्द करा
            </button>
            <button
              onClick={handleConfirm}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
            >
              Apply Template / साचा लागू करा
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
