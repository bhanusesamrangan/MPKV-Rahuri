import { DynamicPageView } from '@/components/DynamicPageView';
import { getPageData } from '@/lib/pageLoader';

// Specialized Education Views
import { EducationAtAGlanceView } from '@/views/Education/EducationAtAGlanceView';
import { OrganizationalProfileView } from '@/views/Education/OrganizationalProfileView';
import { ThrustAreasView } from '@/views/Education/ThrustAreasView';
import { AcademicRegulationsView } from '@/views/Education/AcademicRegulationsView';
import { ConstituentCollegesView } from '@/views/Education/ConstituentCollegesView';
import { AffiliatedCollegesView } from '@/views/Education/AffiliatedCollegesView';
import { CoursesCurriculumView } from '@/views/Education/CoursesCurriculumView';
import { FacultyBranchView } from '@/views/Education/FacultyBranchView';

// Specialized Stakeholder & Governance Views
import { StudentsHubView } from '@/views/Stakeholder/StudentsHubView';
import { AlumniPortalView } from '@/views/Stakeholder/AlumniPortalView';
import { GuestHouseView } from '@/views/Stakeholder/GuestHouseView';
import { TrainingsView } from '@/views/Stakeholder/TrainingsView';
import { TransparencyRtiView } from '@/views/Stakeholder/TransparencyRtiView';
import { CentralAdministrationView } from '@/views/Stakeholder/CentralAdministrationView';
import { AboutMahatmaPhuleView } from '@/views/About/AboutMahatmaPhuleView';

// Specialized Research Views
import { ResearchAtAGlanceView } from '@/views/Research/ResearchAtAGlanceView';
import { ResearchOrganizationalProfileView } from '@/views/Research/ResearchOrganizationalProfileView';
import { ResearchThrustAreasView } from '@/views/Research/ResearchThrustAreasView';
import { ResearchReviewMechanismView } from '@/views/Research/ResearchReviewMechanismView';
import { ResearchSchemesView } from '@/views/Research/ResearchSchemesView';
import { ResearchAgroClimaticZonesView, ZoneSlug } from '@/views/Research/ResearchAgroClimaticZonesView';
import { ResearchVarietiesView } from '@/views/Research/ResearchVarietiesView';
import { ResearchRecommendationsView } from '@/views/Research/ResearchRecommendationsView';
import { ResearchFarmImplementsView } from '@/views/Research/ResearchFarmImplementsView';
import { ResearchPatentsView } from '@/views/Research/ResearchPatentsView';

// Specialized Extension Views
import { ExtensionAtAGlanceView } from '@/views/Extension/ExtensionAtAGlanceView';
import { ExtensionProfileView } from '@/views/Extension/ExtensionProfileView';
import { ExtensionThrustAreasView } from '@/views/Extension/ExtensionThrustAreasView';
import { ExtensionKVKView } from '@/views/Extension/ExtensionKVKView';
import { ExtensionAticView } from '@/views/Extension/ExtensionAticView';
import { ExtensionCommunicationCenterView } from '@/views/Extension/ExtensionCommunicationCenterView';
import { ExtensionPublicationsView } from '@/views/Extension/ExtensionPublicationsView';
import { ExtensionAdhocProjectsView } from '@/views/Extension/ExtensionAdhocProjectsView';
import { ExtensionRegionalCentersView } from '@/views/Extension/ExtensionRegionalCentersView';
import { ExtensionDistrictCentersView } from '@/views/Extension/ExtensionDistrictCentersView';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const page = getPageData(slugArray);

  if (page?.title) {
    const enTitle = typeof page.title === 'object' ? page.title.en : page.title;
    const mrTitle = typeof page.title === 'object' ? page.title.mr : page.title;
    return {
      title: `${mrTitle || enTitle} | MPKV Rahuri`,
      description:
        page.hero?.subtitle?.en ||
        page.hero?.subheadline?.en ||
        'Official Portal of Mahatma Phule Krishi Vidyapeeth, Rahuri.',
    };
  }

  return {
    title: 'MPKV Rahuri',
    description: 'Mahatma Phule Krishi Vidyapeeth, Rahuri.',
  };
}

export default async function CatchAllPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const page = getPageData(slugArray);

  const fullPath = slugArray.join('/').toLowerCase();
  const pageSlug = page?.slug || '';

  // 1. Education At a Glance
  if (
    pageSlug === 'education-at-a-glance' ||
    fullPath === 'education/at-a-glance' ||
    fullPath === 'education/ataglance'
  ) {
    return <EducationAtAGlanceView pageData={page} />;
  }

  // 2. Organizational Profile
  if (
    pageSlug === 'education-organizational-profile' ||
    fullPath === 'education/profile' ||
    fullPath === 'education/eduprofile'
  ) {
    return <OrganizationalProfileView pageData={page} />;
  }

  // 3. Thrust Areas
  if (
    pageSlug === 'education-thrust-areas' ||
    fullPath === 'education/thrust-areas' ||
    fullPath === 'education/eduthrustareas'
  ) {
    return <ThrustAreasView pageData={page} />;
  }

  // 4. Academic Regulations
  if (
    pageSlug === 'education-academic-regulations' ||
    fullPath === 'education/regulations' ||
    fullPath === 'education/eduacademicregulations'
  ) {
    return <AcademicRegulationsView pageData={page} />;
  }

  // 5. Constituent Colleges
  if (
    pageSlug === 'education-constituent-colleges' ||
    fullPath === 'education/constituent-colleges' ||
    fullPath === 'education/educonstituenclg'
  ) {
    return <ConstituentCollegesView pageData={page} />;
  }

  // 6. Affiliated Colleges
  if (
    pageSlug === 'education-affiliated-colleges' ||
    fullPath === 'education/affiliated-colleges' ||
    fullPath === 'education/eduaffiletedclg'
  ) {
    return <AffiliatedCollegesView pageData={page} />;
  }

  // 7. Diploma
  if (
    pageSlug === 'education-courses-diploma' ||
    fullPath === 'education/diploma' ||
    fullPath === 'education/educoursediploma'
  ) {
    return <CoursesCurriculumView pageData={page} subType="diploma" />;
  }

  // 8. Bachelors
  if (
    pageSlug === 'education-courses-bachelors' ||
    fullPath === 'education/bachelors' ||
    fullPath === 'education/educoursebachlor'
  ) {
    return <CoursesCurriculumView pageData={page} subType="bachelors" />;
  }

  // 9. Masters & Doctoral
  if (
    pageSlug === 'education-courses-masters' ||
    pageSlug === 'education-courses-doctoral' ||
    pageSlug === 'education-courses-masters-doctoral' ||
    fullPath === 'education/masters-doctoral' ||
    fullPath === 'education/masters' ||
    fullPath === 'education/doctoral' ||
    fullPath === 'education/educoursemaster' ||
    fullPath === 'education/educoursedoctoral'
  ) {
    return <CoursesCurriculumView pageData={page} subType="masters-doctoral" />;
  }

  // 10. Diploma (Agril. Tech Schools)
  if (
    pageSlug === 'education-diploma-schools' ||
    fullPath === 'education/diploma-schools' ||
    fullPath === 'education/edudiplomaschool'
  ) {
    return <CoursesCurriculumView pageData={page} subType="diploma-schools" />;
  }

  // 11. Certificate Courses
  if (
    pageSlug === 'education-certificate-courses' ||
    fullPath === 'education/certificate-courses' ||
    fullPath === 'education/educirtificatecourse'
  ) {
    return <CoursesCurriculumView pageData={page} subType="certificate-courses" />;
  }

  // 12. Faculty of Agricultural Science
  if (
    pageSlug === 'education-faculty-agricultural-science' ||
    fullPath === 'education/faculty-agricultural-science' ||
    fullPath === 'education/edufaclatyscience'
  ) {
    return <FacultyBranchView pageData={page} facultyType="science" />;
  }

  // 13. Faculty of Agricultural Engineering
  if (
    pageSlug === 'education-faculty-agricultural-engineering' ||
    fullPath === 'education/faculty-agricultural-engineering' ||
    fullPath === 'education/edufaclatyengg'
  ) {
    return <FacultyBranchView pageData={page} facultyType="engineering" />;
  }

  // 14. Students Corner & Welfare Hub
  if (
    pageSlug === 'students' ||
    pageSlug === 'student-corner' ||
    fullPath === 'students' ||
    fullPath === 'students/corner'
  ) {
    return <StudentsHubView pageData={page} />;
  }

  // 15. Alumni Portal & Global Network
  if (
    pageSlug === 'alumni' ||
    fullPath === 'alumni'
  ) {
    return <AlumniPortalView pageData={page} />;
  }

  // 16. University Guest Houses & Accommodation
  if (
    pageSlug === 'guest-house' ||
    pageSlug === 'guest-house-booking' ||
    fullPath === 'guest-house' ||
    fullPath === 'guest-house-booking'
  ) {
    return <GuestHouseView pageData={page} />;
  }

  // 17. Trainings, Workshops & Capacity Building
  if (
    pageSlug === 'trainings' ||
    fullPath === 'trainings'
  ) {
    return <TrainingsView pageData={page} />;
  }

  // 18. Transparency & Right to Information (RTI / RTS)
  if (
    pageSlug === 'transparency' ||
    pageSlug === 'transparency-and-grievance' ||
    fullPath === 'transparency' ||
    fullPath === 'transparency-and-grievance' ||
    fullPath === 'rti'
  ) {
    return <TransparencyRtiView pageData={page} />;
  }

  // 19. Central Administration & Statutory Leadership
  if (
    pageSlug === 'administration' ||
    pageSlug === 'administration-profile' ||
    fullPath === 'administration' ||
    fullPath === 'administration-profile'
  ) {
    return <CentralAdministrationView pageData={page} />;
  }

  // 20. About Mahatma Jyotirao Phule (Official Biography & Archival Portrait)
  if (
    pageSlug === 'about-mahatma-phule' ||
    fullPath === 'home/aboutphule' ||
    fullPath === 'about-mahatma-phule' ||
    fullPath === 'aboutphule'
  ) {
    return <AboutMahatmaPhuleView pageData={page} />;
  }

  // =========================================================================
  // SPECIALIZED RESEARCH VIEWS (Zero Data Loss & Tailored Unique UIs)
  // =========================================================================

  // 21. Research at a Glance
  if (
    pageSlug === 'research-at-a-glance' ||
    fullPath === 'research/at-a-glance' ||
    fullPath === 'research/researchatagalance'
  ) {
    return <ResearchAtAGlanceView pageData={page} />;
  }

  // 22. Research Organizational Profile & Directorates
  if (
    pageSlug === 'research-organizational-profile' ||
    fullPath === 'research/profile' ||
    fullPath === 'research/organizational-profile' ||
    fullPath === 'research/organizationalprofile' ||
    fullPath === 'research/directorates' ||
    fullPath === 'research/researchdirectorates' ||
    fullPath === 'research/researchprofile' ||
    fullPath === 'research/researchorgprofile'
  ) {
    return <ResearchOrganizationalProfileView pageData={page} />;
  }

  // 23. Research Thrust Areas
  if (
    pageSlug === 'research-thrust-areas' ||
    fullPath === 'research/thrust-areas' ||
    fullPath === 'research/researchthrustarea' ||
    fullPath === 'research/researchthrustareas'
  ) {
    return <ResearchThrustAreasView pageData={page} />;
  }

  // 24. Research Review Mechanism
  if (
    pageSlug === 'research-review-mechanism' ||
    fullPath === 'research/review-mechanism' ||
    fullPath === 'research/researchreviewmechanism' ||
    fullPath === 'research/researchreviewmech'
  ) {
    return <ResearchReviewMechanismView pageData={page} />;
  }

  // 25. ICAR-AICRP Projects (45 Schemes) & General Schemes Hub
  if (
    pageSlug === 'research-icar-aicrp' ||
    fullPath === 'research/aicrp' ||
    fullPath === 'research/schemes' ||
    fullPath === 'research/researchschemes' ||
    fullPath === 'research/researchschemicar'
  ) {
    return <ResearchSchemesView pageData={page} schemeType="aicrp" />;
  }

  // 26. Non-Plan State Schemes (82 Schemes)
  if (
    pageSlug === 'research-non-plan-state-schemes' ||
    fullPath === 'research/state-schemes' ||
    fullPath === 'research/researchschemnonplan'
  ) {
    return <ResearchSchemesView pageData={page} schemeType="state-schemes" />;
  }

  // 27. Externally Funded Projects (Ad-hoc & Grants)
  if (
    pageSlug === 'research-externally-funded-projects' ||
    fullPath === 'research/funded-projects' ||
    fullPath === 'research/researchschemfundedproj'
  ) {
    return <ResearchSchemesView pageData={page} schemeType="funded-projects" />;
  }

  // 28. Western Ghat Zone & Regional Research Stations
  if (
    pageSlug === 'research-western-ghat-zone' ||
    fullPath === 'research/western-ghat-zone' ||
    fullPath === 'research/stations' ||
    fullPath === 'research/researchstations' ||
    fullPath === 'research/researchwzone'
  ) {
    return <ResearchAgroClimaticZonesView pageData={page} currentZone="western-ghat-zone" />;
  }

  // 29. Sub-Montane Zone
  if (
    pageSlug === 'research-sub-montane-zone' ||
    fullPath === 'research/sub-montane-zone' ||
    fullPath === 'research/researchsubmzone' ||
    fullPath === 'research/researchsmzone'
  ) {
    return <ResearchAgroClimaticZonesView pageData={page} currentZone="sub-montane-zone" />;
  }

  // 30. Plain Zone
  if (
    pageSlug === 'research-plain-zone' ||
    fullPath === 'research/plain-zone' ||
    fullPath === 'research/researchplainzone' ||
    fullPath === 'research/researchplianzone'
  ) {
    return <ResearchAgroClimaticZonesView pageData={page} currentZone="plain-zone" />;
  }

  // 31. Scarcity Zone
  if (
    pageSlug === 'research-scarcity-zone' ||
    fullPath === 'research/scarcity-zone' ||
    fullPath === 'research/researchscarcityzone'
  ) {
    return <ResearchAgroClimaticZonesView pageData={page} currentZone="scarcity-zone" />;
  }

  // 32. Central Plateau Zone
  if (
    pageSlug === 'research-central-plateau-zone' ||
    fullPath === 'research/central-plateau-zone' ||
    fullPath === 'research/researchcentralzone'
  ) {
    return <ResearchAgroClimaticZonesView pageData={page} currentZone="central-plateau-zone" />;
  }

  // 33. Crop Varieties Released (14 Categories) & Research Technology
  if (
    pageSlug === 'research-varieties' ||
    fullPath === 'research/varieties' ||
    fullPath === 'research/technology' ||
    fullPath === 'research/researchtechnology' ||
    fullPath === 'research/researchtechvariety'
  ) {
    return <ResearchVarietiesView pageData={page} />;
  }

  // 34. Agro Recommendations (19 Compendiums & Practices)
  if (
    pageSlug === 'research-recommendations' ||
    fullPath === 'research/recommendations' ||
    fullPath === 'research/researchtechrecomm' ||
    fullPath === 'research/researchtechagrorec'
  ) {
    return <ResearchRecommendationsView pageData={page} />;
  }

  // 35. Farm Implements & Machinery (35 Implements)
  if (
    pageSlug === 'farm-implements' ||
    pageSlug === 'research-farm-implements' ||
    fullPath === 'farm-implements' ||
    fullPath === 'research/farm-implements' ||
    fullPath === 'research/implements' ||
    fullPath === 'research/researchfarmimplement'
  ) {
    return <ResearchFarmImplementsView pageData={page} />;
  }

  // 36. Registered Patents & IPR (6 Granted Patents)
  if (
    pageSlug === 'research-patents' ||
    fullPath === 'research/patents' ||
    fullPath === 'research/researchpatents' ||
    fullPath === 'research/researchtechpatents'
  ) {
    return <ResearchPatentsView pageData={page} />;
  }

  // 37. Extension at a Glance
  if (
    pageSlug === 'extension-at-a-glance' ||
    fullPath === 'extension/at-a-glance' ||
    fullPath === 'extension/ataglance' ||
    fullPath === 'extension/extensionatagalance' ||
    fullPath === 'extension'
  ) {
    return <ExtensionAtAGlanceView pageData={page} />;
  }

  // 38. Extension Organizational Profile
  if (
    pageSlug === 'extension-organizational-profile' ||
    pageSlug === 'extension-profile' ||
    fullPath === 'extension/profile' ||
    fullPath === 'extension/organizational-profile' ||
    fullPath === 'extension/extensionprofile'
  ) {
    return <ExtensionProfileView pageData={page} />;
  }

  // 39. Extension Thrust Areas
  if (
    pageSlug === 'extension-thrust-areas' ||
    fullPath === 'extension/thrust-areas' ||
    fullPath === 'extension/thrustarea' ||
    fullPath === 'extension/extensionthrustarea'
  ) {
    return <ExtensionThrustAreasView pageData={page} />;
  }

  // 40. Krishi Vigyan Kendras (KVK Network)
  if (
    pageSlug === 'extension-krishi-vigyan-kendras' ||
    pageSlug === 'krishi-vigyan-kendras' ||
    fullPath === 'extension/krishi-vigyan-kendras' ||
    fullPath === 'extension/kvk' ||
    fullPath === 'extension/extensionkvk' ||
    fullPath === 'kvk'
  ) {
    return <ExtensionKVKView pageData={page} />;
  }

  // 41. Agricultural Technology Information Centre (ATIC)
  if (
    pageSlug === 'extension-atic' ||
    pageSlug === 'atic-rahuri' ||
    fullPath === 'atic-rahuri' ||
    fullPath === 'atic' ||
    fullPath === 'extension/atic' ||
    fullPath === 'extension/extensionatic'
  ) {
    return <ExtensionAticView pageData={page} />;
  }

  // 42. Communication Centre & Radio 90.8 FM
  if (
    pageSlug === 'extension-communication-center' ||
    pageSlug === 'communication-centre' ||
    fullPath === 'communication-centre' ||
    fullPath === 'communication-center' ||
    fullPath === 'extension/communication-center' ||
    fullPath === 'extension/communication-centre' ||
    fullPath === 'extension/extensioncc' ||
    fullPath === 'radio-90-8-fm'
  ) {
    return <ExtensionCommunicationCenterView pageData={page} />;
  }

  // 43. Extension Publications & Krishidarshani
  if (
    pageSlug === 'extension-publications' ||
    fullPath === 'extension/publications' ||
    fullPath === 'extension/publication' ||
    fullPath === 'extension/extensionpublication' ||
    fullPath === 'publications'
  ) {
    return <ExtensionPublicationsView pageData={page} />;
  }

  // 44. Ad-hoc Extension Projects (Farmer FIRST)
  if (
    pageSlug === 'extension-adhoc-projects' ||
    fullPath === 'extension/adhoc-projects' ||
    fullPath === 'extension/adhoc' ||
    fullPath === 'extension/extensionadproj' ||
    fullPath === 'farmer-first'
  ) {
    return <ExtensionAdhocProjectsView pageData={page} />;
  }

  // 45. Regional Extension Centers (RECs)
  if (
    pageSlug === 'extension-regional-centers' ||
    fullPath === 'extension/regional-centers' ||
    fullPath === 'extension/regional' ||
    fullPath === 'extension/extensioncenter'
  ) {
    return <ExtensionRegionalCentersView pageData={page} />;
  }

  // 46. District Extension Centers (DECs)
  if (
    pageSlug === 'extension-district-centers' ||
    fullPath === 'extension/district-centers' ||
    fullPath === 'extension/district' ||
    fullPath === 'extension/extensioncenterdec'
  ) {
    return <ExtensionDistrictCentersView pageData={page} />;
  }

  // Default fallback for other pages
  return (
    <DynamicPageView
      slug={slugArray.join('/')}
      path={slugArray.join('/')}
      initialPageData={page}
    />
  );
}
