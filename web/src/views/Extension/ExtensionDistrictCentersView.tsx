'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Building2,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Target,
  Users
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';

interface ExtensionDistrictCentersViewProps {
  pageData?: any;
}

export const ExtensionDistrictCentersView: React.FC<ExtensionDistrictCentersViewProps> = () => {
  const { language } = useLanguage();

  const districtCenters = [
    {
      id: 'dec-solapur',
      districtEn: 'Solapur District',
      districtMr: 'सोलापूर जिल्हा',
      designationEn: 'Officer In Charge, District Extension Center, NARP, 97, Ravivar Peth, Near Dayanand College, Solapur',
      designationMr: 'प्रभारी अधिकारी, जिल्हा विस्तार केंद्र, एनएआरपी, ९७, रविवार पेठ, दयानंद कॉलेजजवळ, सोलापूर',
      stationEn: 'Zonal Agricultural Research Station (ZARS), Solapur',
      stationMr: 'विभागीय कृषी संशोधन केंद्र, सोलापूर',
      phone: '0217-2373047, 2373209',
      email: 'zarssolapur@rediffmail.com',
      mandateEn: 'Dryland rabi sorghum, chickpea, safflower, and watershed moisture conservation.',
      mandateMr: 'कोरडवाहू रब्बी ज्वारी, हरभरा, करडई व अवर्षणग्रस्त शेती तंत्रज्ञान.'
    },
    {
      id: 'dec-sangli',
      districtEn: 'Sangli District',
      districtMr: 'सांगली जिल्हा',
      designationEn: 'Officer In Charge, District Extension Center, Agriculture Research Station, Kasbe Digraj, Dist. Sangli',
      designationMr: 'प्रभारी अधिकारी, जिल्हा विस्तार केंद्र, कृषी संशोधन केंद्र, कसबे डिग्रज, जि. सांगली',
      stationEn: 'Agriculture Research Station, Kasbe Digraj',
      stationMr: 'कृषी संशोधन केंद्र, कसबे डिग्रज',
      phone: '0233-2437274',
      email: 'arskdigraj.mpkv@gov.in, arskdigraj@rediffmail.com',
      mandateEn: 'Turmeric (Phule Swaroop), soybean, sugarcane canal agronomy, and salt-affected soil reclamation.',
      mandateMr: 'हळद (फुले स्वरूप), सोयाबीन, ऊस व कृष्णा कालवा क्षारपड जमीन सुधारणा.'
    },
    {
      id: 'dec-satara',
      districtEn: 'Satara District',
      districtMr: 'सातारा जिल्हा',
      designationEn: 'Officer In Charge, District Extension Center, Central Sugarcane Research Station, Padegaon, Dist. Satara',
      designationMr: 'प्रभारी अधिकारी, जिल्हा विस्तार केंद्र, मध्यवर्ती ऊस संशोधन केंद्र, पाडेगाव, जि. सातारा',
      stationEn: 'Central Sugarcane Research Station, Padegaon',
      stationMr: 'मध्यवर्ती ऊस संशोधन केंद्र, पाडेगाव',
      phone: '02169-265334',
      email: 'csrspadegaon@rediffmail.com',
      mandateEn: 'Sugarcane varietal management (Co-86032, CoM-0265, Phule 10001) and drip fertigation.',
      mandateMr: 'ऊस पैदास (को-८६०३२, कोएम-०२६५, फुले १०००१) व ठिबक सिंचन खत व्यवस्थापन.'
    },
    {
      id: 'dec-nashik',
      districtEn: 'Nashik District',
      districtMr: 'नाशिक जिल्हा',
      designationEn: 'Officer In Charge, District Extension Center, Agriculture Research Station, Niphad, Dist. Nashik',
      designationMr: 'प्रभारी अधिकारी, जिल्हा विस्तार केंद्र, कृषी संशोधन केंद्र, निफाड, जि. नाशिक',
      stationEn: 'Agriculture Research Station, Niphad',
      stationMr: 'कृषी संशोधन केंद्र, निफाड',
      phone: '02550-241023',
      email: 'arsniphad@yahoo.co.in',
      mandateEn: 'Wheat varietal improvement (Phule Samadhan, Trimbak), onion storage, and grape advisory.',
      mandateMr: 'गहू वाण सुधारणा (फुले समाधान, त्र्यंबक), कांदा साठवणूक व द्राक्ष मार्गदर्शन.'
    },
    {
      id: 'dec-jalgaon',
      districtEn: 'Jalgaon District',
      districtMr: 'जळगाव जिल्हा',
      designationEn: 'Officer In Charge, District Extension Center, Oilseed Research Station, Jalgaon',
      designationMr: 'प्रभारी अधिकारी, जिल्हा विस्तार केंद्र, गळीतधान्य संशोधन केंद्र, जळगाव',
      stationEn: 'Oilseed Research Station, Jalgaon',
      stationMr: 'गळीतधान्य संशोधन केंद्र, जळगाव',
      phone: '0257-2250888',
      email: 'orsjalgaon@gmail.com',
      mandateEn: 'Khandesh oilseeds (groundnut, sesame), banana tissue culture, and cotton cropping packages.',
      mandateMr: 'खान्देश गळीतधान्ये (भुईमूग जेएल-२४, तीळ), केळी उती संवर्धन व कापूस पीक पद्धती.'
    }
  ];

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'District Extension Centers (DEC)', mr: 'जिल्हा विस्तार केंद्रे' }} />

      <ExtensionHero
        theme="district"
        badge={{ en: 'District Field Liaison Units', mr: 'जिल्हास्तरीय विस्तार संपर्क केंद्रे' }}
        title={{
          en: 'District Extension Centers (5 DECs)',
          mr: 'जिल्हा विस्तार केंद्रे (५ केंद्रे)'
        }}
        subtitle={{
          en: 'Established at key research stations (Solapur, Sangli, Satara, Nashik, Jalgaon) to streamline direct field problem redressal and coordination with line departments.',
          mr: 'संशोधन केंद्रांशी थेट संलग्न सोलापूर, सांगली, सातारा, नाशिक व जळगाव येथील ५ जिल्हा विस्तार केंद्रे.'
        }}
        quickChips={[
          { label: '५ जिल्हा केंद्रे (5 DECs)', icon: Compass },
          { label: language === 'mr' ? 'संशोधन केंद्रांशी संलग्न' : 'Linked to Research Stations', icon: Building2 },
          { label: language === 'mr' ? 'क्षेत्रीय समस्या निवारण' : 'Field Problem Redressal', icon: Target },
          { label: language === 'mr' ? 'शासकीय कृषी समन्वय' : 'State Agril. Dept. Liaison', icon: Users }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* 1. Mandate & Genesis Overview */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-lime-950 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/20 text-lime-300 border border-lime-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'स्थापना: २००२' : 'Established: 2002'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black font-serif leading-tight">
              {language === 'mr'
                ? 'जिल्हा पातळीवर संशोधन व विस्तार कार्याचा थेट समन्वय'
                : 'Direct District-Level Research & Extension Synergy'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
              {language === 'mr'
                ? 'विद्यापीठाने २००२ मध्ये प्रमुख संशोधन केंद्रांच्या ठिकाणी ५ जिल्हा विस्तार केंद्रांची (DECs) स्थापना केली. या केंद्रांचा मुख्य उद्देश त्या त्या जिल्ह्यातील स्थानिक पिकांच्या समस्या सोडवणे, शासकीय कृषी विभाग व जिल्हा परिषदेशी समन्वय साधणे आणि अल्प मुदतीचे शेतकरी प्रशिक्षण वर्ग राबवणे हा आहे.'
                : 'District Extension Centers were instituted in 2002 to effectively carry out extension education activities through existing research stations without creating separate administrative burden. They conduct district workshops, farmer trainings, diagnostic visits, and channel local agro-ecological feedback back to the university research directorate.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400" />
                <span>{language === 'mr' ? 'स्थानिक समस्या निवारण' : 'Local Problem Redressal'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400" />
                <span>{language === 'mr' ? 'मासिक कार्यशाळा' : 'Monthly Workshops'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400" />
                <span>{language === 'mr' ? 'शेतकरी प्रशिक्षण' : 'Farmer Trainings'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400" />
                <span>{language === 'mr' ? 'संशोधन फीडबॅक' : 'Research Feedback'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Five District Extension Centers Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-lime-100 text-lime-950 border border-lime-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5 text-lime-700" />
                <span>{language === 'mr' ? 'जिल्हा केंद्रे' : 'Five Operational DECs'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                {language === 'mr' ? '५ जिल्हा विस्तार केंद्रांची माहिती व संपर्क' : 'Five District Extension Centers (DECs) Directory'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtCenters.map((dec, idx) => (
              <div
                key={dec.id || idx}
                className="p-7 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-lime-400"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md bg-lime-50 text-lime-950 border border-lime-200">
                      DEC #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'mr' ? dec.districtMr : dec.districtEn}</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold font-serif text-slate-900 leading-snug">
                      {language === 'mr' ? dec.designationMr : dec.designationEn}
                    </h4>
                    <p className="text-xs font-bold text-amber-900 mt-1">
                      {language === 'mr' ? dec.stationMr : dec.stationEn}
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-700 space-y-1">
                    <span className="font-bold text-slate-900 block">
                      {language === 'mr' ? 'संशोधन व विस्तार भर:' : 'Research & Extension Focus:'}
                    </span>
                    <span>{language === 'mr' ? dec.mandateMr : dec.mandateEn}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <a
                    href={`tel:${dec.phone.split(',')[0].replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                  >
                    <Phone className="w-3 h-3 text-blue-600" />
                    <span>{dec.phone.split(',')[0]}</span>
                  </a>

                  <a
                    href={`mailto:${dec.email.split(',')[0]}`}
                    className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 truncate max-w-[170px]"
                    title={dec.email}
                  >
                    <Mail className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{dec.email.split(',')[0]}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
