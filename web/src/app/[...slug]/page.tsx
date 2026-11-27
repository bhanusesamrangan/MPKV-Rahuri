import { DynamicPageView } from '@/components/DynamicPageView';
import { getPageData } from '@/lib/pageLoader';
import { PhotoGalleryView } from '@/views/HomePage/PhotoGalleryView';

// Specialized Education Views
import { EducationAtAGlanceView } from '@/views/Education/EducationAtAGlanceView';
import { OrganizationalProfileView } from '@/views/Education/OrganizationalProfileView';
import { ThrustAreasView } from '@/views/Education/ThrustAreasView';
import { AcademicRegulationsView } from '@/views/Education/AcademicRegulationsView';
import { ConstituentCollegesView } from '@/views/Education/ConstituentCollegesView';
import { AffiliatedCollegesView } from '@/views/Education/AffiliatedCollegesView';
import { CoursesCurriculumView } from '@/views/Education/CoursesCurriculumView';
import { FacultyBranchView } from '@/views/Education/FacultyBranchView';
import { FacultyDirectoryView } from '@/views/Education/FacultyDirectoryView';

// Specialized Stakeholder & Governance Views
import { StudentsHubView } from '@/views/Stakeholder/StudentsHubView';
import { AlumniPortalView } from '@/views/Stakeholder/AlumniPortalView';
import { GuestHouseView } from '@/views/Stakeholder/GuestHouseView';
import { TrainingsView } from '@/views/Stakeholder/TrainingsView';
import { TransparencyRtiView } from '@/views/Stakeholder/TransparencyRtiView';
import { CentralAdministrationView } from '@/views/Stakeholder/CentralAdministrationView';
import { AboutMahatmaPhuleView } from '@/views/About/AboutMahatmaPhuleView';
import { MpkvAtAGlanceView } from '@/views/About/MpkvAtAGlanceView';
import { ActStatuteView } from '@/views/About/ActStatuteView';
import { FinanceAccountsView } from '@/views/Stakeholder/FinanceAccountsView';
import { UniversityEngineerView } from '@/views/Stakeholder/UniversityEngineerView';
import { CircularsView } from '@/views/Stakeholder/CircularsView';
import { EmployeeCornerView } from '@/views/Stakeholder/EmployeeCornerView';
import { PeriodicEventsView } from '@/views/Stakeholder/PeriodicEventsView';
import { AkmuView } from '@/views/Stakeholder/AkmuView';
import { NodalCellView } from '@/views/Stakeholder/NodalCellView';
import { PmeCellView } from '@/views/Stakeholder/PmeCellView';
import { IqacView } from '@/views/Stakeholder/IqacView';
import { ExecutiveCouncilView } from '@/views/Stakeholder/ExecutiveCouncilView';
import { OfficersDirectoryView } from '@/views/Stakeholder/OfficersDirectoryView';
import { ContactsView } from '@/views/Stakeholder/ContactsView';

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

// Specialized Library Views (10 Unique Pages)
import { LibraryAboutView } from '@/views/Library/LibraryAboutView';
import { LibraryCollectionsView } from '@/views/Library/LibraryCollectionsView';
import { LibrarySectionsView } from '@/views/Library/LibrarySectionsView';
import { LibraryFacilitiesView } from '@/views/Library/LibraryFacilitiesView';
import { LibraryServicesView } from '@/views/Library/LibraryServicesView';
import { LibraryLinksView } from '@/views/Library/LibraryLinksView';
import { LibraryActivitiesView } from '@/views/Library/LibraryActivitiesView';
import { LibraryOffCampusView } from '@/views/Library/LibraryOffCampusView';
import { LibraryNewsEventsView } from '@/views/Library/LibraryNewsEventsView';
import { LibraryContactView } from '@/views/Library/LibraryContactView';

// Specialized Students Views (9 Unique Pages)
import { StudentAdmissionView } from '@/views/Students/StudentAdmissionView';
import { StudentSportsView } from '@/views/Students/StudentSportsView';
import { StudentHostelsView } from '@/views/Students/StudentHostelsView';
import { StudentCircularsView } from '@/views/Students/StudentCircularsView';
import { StudentInternationalView } from '@/views/Students/StudentInternationalView';
import { StudentPgiFormsView } from '@/views/Students/StudentPgiFormsView';
import { StudentComplaintsView } from '@/views/Students/StudentComplaintsView';
import { StudentScholarshipsView } from '@/views/Students/StudentScholarshipsView';
import { StudentGalleryView } from '@/views/Students/StudentGalleryView';

// Specialized Farmer Views (7 Unique Designs)
import { FarmerScientistForumView } from '@/views/Farmer/FarmerScientistForumView';
import { FarmerKisanAadharView } from '@/views/Farmer/FarmerKisanAadharView';
import { FarmerServicesView } from '@/views/Farmer/FarmerServicesView';
import { FarmerSuccessStoriesView } from '@/views/Farmer/FarmerSuccessStoriesView';
import { FarmerSeedsView } from '@/views/Farmer/FarmerSeedsView';
import { FarmerNurseryView } from '@/views/Farmer/FarmerNurseryView';
import { FarmerInputsView } from '@/views/Farmer/FarmerInputsView';

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
    return {
      title: `${enTitle} | MPKV Rahuri`,
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

  // 13b. Faculty & Scientists Directory (/faculty-directory, /Home/factDada)
  if (
    pageSlug === 'faculty-directory' ||
    pageSlug === 'home-factdada' ||
    pageSlug === 'factdada' ||
    pageSlug === 'factdata' ||
    fullPath === 'faculty-directory' ||
    fullPath === 'home/factdada' ||
    fullPath === 'home/factdata' ||
    fullPath === 'education/faculty-directory' ||
    fullPath === 'faculty'
  ) {
    return <FacultyDirectoryView pageData={page} />;
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

  // 14b. Specialized Students Submenu & Internal Pages (9 Unique Designs)
  if (
    pageSlug === 'student-admission-procedure' ||
    fullPath === 'students/admission' ||
    fullPath === 'student/admissionprocedure'
  ) {
    return <StudentAdmissionView pageData={page} />;
  }

  if (
    pageSlug === 'student-sports' ||
    fullPath === 'students/sports' ||
    fullPath === 'student/sporthome'
  ) {
    return <StudentSportsView pageData={page} />;
  }

  if (
    pageSlug === 'student-hostels' ||
    fullPath === 'students/hostels' ||
    fullPath === 'student/studhostel'
  ) {
    return <StudentHostelsView pageData={page} />;
  }

  if (
    pageSlug === 'student-circulars' ||
    fullPath === 'students/circulars' ||
    fullPath === 'student/studcircular'
  ) {
    return <StudentCircularsView pageData={page} />;
  }

  if (
    pageSlug === 'student-international-cell' ||
    fullPath.startsWith('students/international') ||
    fullPath.startsWith('student/international')
  ) {
    const intlTab = fullPath.includes('facilities')
      ? 'facilities'
      : fullPath.includes('desk')
      ? 'desk'
      : fullPath.includes('reach')
      ? 'reach'
      : 'home';
    return <StudentInternationalView pageData={page} defaultTab={intlTab} />;
  }

  if (
    pageSlug === 'student-pgi-form' ||
    fullPath === 'students/pgi-form' ||
    fullPath === 'student/studentform'
  ) {
    return <StudentPgiFormsView pageData={page} />;
  }

  if (
    pageSlug === 'student-complaints' ||
    fullPath === 'students/complaints' ||
    fullPath === 'student/studentcomplaints'
  ) {
    return <StudentComplaintsView pageData={page} />;
  }

  if (
    pageSlug === 'student-scholarships' ||
    fullPath === 'students/scholarships' ||
    fullPath === 'student/scoler'
  ) {
    return <StudentScholarshipsView pageData={page} />;
  }

  if (
    pageSlug === 'photo-gallery' ||
    fullPath === 'gallery' ||
    fullPath === 'photo-gallery' ||
    fullPath === 'home/homegalleryall'
  ) {
    return <PhotoGalleryView pageData={page} />;
  }

  if (
    pageSlug === 'student-photo-gallery' ||
    fullPath === 'students/photo-gallery' ||
    fullPath === 'student/studcorner'
  ) {
    return <StudentGalleryView pageData={page} />;
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

  // 17. Trainings, Workshops & Capacity Building (AKMU National Training Programs)
  if (
    pageSlug === 'trainings' ||
    pageSlug === 'training' ||
    pageSlug === 'workshops' ||
    pageSlug === 'akmu-training' ||
    pageSlug === 'akmu-traning' ||
    fullPath === 'trainings' ||
    fullPath === 'training' ||
    fullPath === 'workshops' ||
    fullPath === 'akmu/traning' ||
    fullPath === 'akmu/training' ||
    fullPath === 'akmu-training' ||
    fullPath.startsWith('akmu/tran') ||
    fullPath.startsWith('akmu/train')
  ) {
    return <TrainingsView pageData={page} />;
  }

  // 18. Transparency, RTI, Grievance Redressal & Statutory Committees
  if (
    pageSlug === 'transparency' ||
    pageSlug === 'transparency-and-grievance' ||
    pageSlug === 'transparency-rti' ||
    pageSlug === 'grievance-redressal' ||
    pageSlug === 'grievanceredressalsystem' ||
    fullPath === 'transparency' ||
    fullPath === 'transparency-rti' ||
    fullPath === 'transparency-and-grievance' ||
    fullPath === 'rti' ||
    fullPath === 'home/grievanceredressalsystem' ||
    fullPath === 'officers/grivence' ||
    fullPath === 'grievance-redressal'
  ) {
    return <TransparencyRtiView pageData={page} />;
  }

  // 19. Central Administration & Statutory Leadership
  if (
    pageSlug === 'administration' ||
    pageSlug === 'administration-profile' ||
    pageSlug.startsWith('adminstration-admins') ||
    pageSlug.startsWith('administration-admins') ||
    fullPath === 'administration' ||
    fullPath === 'administration-profile' ||
    fullPath.startsWith('adminstration/admins') ||
    fullPath.startsWith('administration/admins')
  ) {
    return <CentralAdministrationView pageData={page} />;
  }

  // 19b. Act & Statute (Maharashtra Agricultural Universities Act 1983 & Statutes 1990)
  if (
    pageSlug === 'act-and-statute' ||
    pageSlug === 'actstatute' ||
    pageSlug === 'act-statute' ||
    fullPath === 'home/actstatute' ||
    fullPath === 'home/act-statute' ||
    fullPath === 'actstatute' ||
    fullPath === 'act-and-statute' ||
    fullPath === 'act-statute'
  ) {
    return <ActStatuteView pageData={page} />;
  }

  // 19c. Finance & Accounts Directorate (Office of the Comptroller)
  if (
    pageSlug === 'finance' ||
    pageSlug === 'comptroller' ||
    pageSlug === 'finance-and-accounts' ||
    pageSlug === 'finance-accounts' ||
    pageSlug.startsWith('finance-') ||
    pageSlug.startsWith('finance') ||
    fullPath === 'finance' ||
    fullPath === 'comptroller' ||
    fullPath.startsWith('finance/') ||
    fullPath.startsWith('finance-')
  ) {
    return <FinanceAccountsView pageData={page} />;
  }

  // 19d. University Engineer & Works Division (Estate Infrastructure & Capital Works)
  if (
    pageSlug === 'university-engineer-works' ||
    pageSlug === 'university-engineer' ||
    pageSlug === 'universityengineer' ||
    pageSlug === 'work' ||
    pageSlug === 'works' ||
    pageSlug.startsWith('work-') ||
    pageSlug.startsWith('university-engineer') ||
    fullPath === 'university-engineer' ||
    fullPath === 'university-engineer-works' ||
    fullPath === 'work' ||
    fullPath === 'works' ||
    fullPath.startsWith('work/') ||
    fullPath.startsWith('works/')
  ) {
    return <UniversityEngineerView pageData={page} />;
  }

  // 19e. Official University Circulars & Office Memoranda Archive
  if (
    pageSlug === 'circulars' ||
    pageSlug === 'circular' ||
    pageSlug === 'allcircular' ||
    pageSlug === 'all-circular' ||
    fullPath === 'circulars' ||
    fullPath === 'circular' ||
    fullPath === 'allcircular/circular' ||
    fullPath === 'all-circular/circular' ||
    fullPath.startsWith('allcircular') ||
    fullPath.startsWith('all-circular') ||
    fullPath.startsWith('circulars')
  ) {
    return <CircularsView pageData={page} />;
  }

  // 19f. Employee Corner & Pension Portal (Staff Welfare & Service Book)
  if (
    pageSlug === 'employee-corner' ||
    pageSlug === 'employee' ||
    pageSlug === 'employees' ||
    pageSlug === 'empcorner' ||
    pageSlug === 'emp-corner' ||
    fullPath === 'employee-corner' ||
    fullPath === 'employee' ||
    fullPath === 'employees' ||
    fullPath === 'home/empcorner' ||
    fullPath === 'home/emp-corner' ||
    fullPath === 'empcorner' ||
    fullPath === 'emp-corner' ||
    fullPath.startsWith('home/emp') ||
    fullPath.startsWith('employee')
  ) {
    return <EmployeeCornerView pageData={page} />;
  }

  // 19g. Periodical Events & Convocation Portal (Joint AGRESCO, Foundation Day, Van Mahotsav, Retrospection)
  if (
    pageSlug === 'events-convocation' ||
    pageSlug === 'convocation' ||
    pageSlug === 'periodic-events' ||
    pageSlug === 'periodical-events' ||
    pageSlug === 'events-joint-agresco' ||
    pageSlug === 'joint-agresco' ||
    pageSlug === 'agresco' ||
    pageSlug === 'events-vanmohotsav' ||
    pageSlug === 'vanmahostav' ||
    pageSlug === 'vanmohotsav' ||
    pageSlug === 'unifday' ||
    pageSlug === 'foundation-day' ||
    pageSlug === 'retrospection' ||
    pageSlug === 'magova' ||
    pageSlug === 'kisan-aadhar' ||
    pageSlug === 'kisan-aadhar-sammelan' ||
    pageSlug === 'kisanaadhar' ||
    fullPath === 'kisan-aadhar' ||
    fullPath === 'kisan-aadhar-sammelan' ||
    fullPath.startsWith('periodicalevent') ||
    fullPath.startsWith('periodical-event') ||
    fullPath.startsWith('periodical_event') ||
    fullPath.startsWith('events-convocation') ||
    fullPath.startsWith('events-joint-agresco') ||
    fullPath.startsWith('events-vanmohotsav')
  ) {
    let initialTab = 'convocation';
    const lower = fullPath.toLowerCase();
    if (lower.includes('agresco')) initialTab = 'agresco';
    else if (lower.includes('vanmahostav') || lower.includes('vanmohotsav')) initialTab = 'vanmohotsav';
    else if (lower.includes('unifday') || lower.includes('foundation')) initialTab = 'foundation_day';
    else if (lower.includes('retrospection') || lower.includes('magova')) initialTab = 'retrospection';
    else if (lower.includes('kisan') || lower.includes('aadhar')) initialTab = 'kisan_aadhar';

    return <PeriodicEventsView pageData={page} initialTab={initialTab} />;
  }

  // 19g-b. Specialized Farmer Menu & Internal Pages (7 Unique Designs)
  if (
    pageSlug === 'farmer-scientist-forum' ||
    fullPath === 'farmer/scientist-forum' ||
    fullPath === 'farmer/farmersciforum'
  ) {
    return <FarmerScientistForumView pageData={page} />;
  }

  if (
    pageSlug === 'farmer-kisan-aadhar' ||
    fullPath === 'farmer/kisan-aadhar' ||
    fullPath === 'farmer/farmerkisanadhar'
  ) {
    return <FarmerKisanAadharView pageData={page} />;
  }

  if (
    pageSlug === 'farmer-services' ||
    fullPath === 'farmer/services'
  ) {
    return <FarmerServicesView pageData={page} />;
  }

  if (
    pageSlug === 'farmer-success-stories' ||
    fullPath === 'farmer/success-stories' ||
    fullPath === 'farmer/successstory'
  ) {
    return <FarmerSuccessStoriesView pageData={page} />;
  }

  if (
    pageSlug === 'seeds-availability' ||
    fullPath === 'seeds-availability' ||
    fullPath === 'farmer/seeds'
  ) {
    return <FarmerSeedsView pageData={page} />;
  }

  if (
    pageSlug === 'nursery-stock' ||
    fullPath === 'nursery-stock' ||
    fullPath === 'farmer/planting-materials'
  ) {
    return <FarmerNurseryView pageData={page} />;
  }

  if (
    pageSlug === 'farmer-inputs' ||
    fullPath === 'farmer/farmerinputes' ||
    fullPath === 'farmer/bio-fertilizers' ||
    fullPath === 'farmer/bio-pesticides' ||
    fullPath === 'farmer/phule-micrograde' ||
    fullPath === 'farmer/bio-inputs'
  ) {
    const focus = fullPath.includes('bio-pesticides')
      ? 'bio-pesticides'
      : fullPath.includes('micrograde')
      ? 'phule-micrograde'
      : fullPath.includes('bio-fertilizers')
      ? 'bio-fertilizers'
      : 'all';
    return <FarmerInputsView pageData={page} focusProduct={focus} />;
  }

  // 19h. Agricultural Knowledge Management Unit (AKMU) & NKN Cyber Centre
  if (
    pageSlug === 'akmu-introduction' ||
    pageSlug === 'akmu-rahuri' ||
    pageSlug === 'akmu' ||
    fullPath === 'akmu' ||
    fullPath === 'akmu-introduction' ||
    fullPath === 'akmu-rahuri' ||
    fullPath === 'akmu/introduction' ||
    fullPath === 'akmu/activity' ||
    fullPath === 'akmu/trainingsconducted' ||
    fullPath === 'akmu/publication' ||
    fullPath === 'akmu/contact' ||
    fullPath === 'akmu/networkcomplaints'
  ) {
    let initialTab = 'introduction';
    const lower = fullPath.toLowerCase();
    if (lower.includes('activity')) initialTab = 'activities';
    else if (lower.includes('trainingsconducted')) initialTab = 'trainings';
    else if (lower.includes('publication')) initialTab = 'publications';
    else if (lower.includes('contact')) initialTab = 'contact';
    else if (lower.includes('networkcomplaints') || lower.includes('network')) initialTab = 'network_query';

    return <AkmuView pageData={page} initialTab={initialTab} />;
  }

  // 19i. ICAR Nodal Cell (Higher Agricultural Education)
  if (
    pageSlug === 'nodal-cell' ||
    pageSlug === 'icar-nodal-cell' ||
    fullPath === 'nodal-cell' ||
    fullPath === 'icar-nodal-cell' ||
    fullPath === 'pmeandnodel/nodelguidelines' ||
    fullPath === 'pmeandnodel/nodelproforma' ||
    fullPath === 'pmeandnodel/nodelcirculars' ||
    fullPath === 'pmeandnodel/nodelofficer'
  ) {
    let initialTab = 'guidelines';
    const lower = fullPath.toLowerCase();
    if (lower.includes('proforma')) initialTab = 'proforma';
    else if (lower.includes('circular')) initialTab = 'circulars';
    else if (lower.includes('officer')) initialTab = 'officer';

    return <NodalCellView pageData={page} initialTab={initialTab} />;
  }

  // 19j. Planning, Monitoring & Evaluation (PME) Cell
  if (
    pageSlug === 'pme-cell' ||
    pageSlug === 'pme' ||
    fullPath === 'pme-cell' ||
    fullPath === 'pme' ||
    fullPath === 'pmeandnodel/pmeintroduction' ||
    fullPath === 'pmeandnodel/pmecirculars' ||
    fullPath === 'pmeandnodel/pmeofficer'
  ) {
    let initialTab = 'guidelines';
    const lower = fullPath.toLowerCase();
    if (lower.includes('circular')) initialTab = 'circulars';
    else if (lower.includes('officer') || lower.includes('contact')) initialTab = 'officer';

    return <PmeCellView pageData={page} initialTab={initialTab} />;
  }

  // 19k. Internal Quality Assurance Cell (IQAC)
  if (
    pageSlug === 'iqac' ||
    fullPath === 'iqac' ||
    fullPath === 'home/iqac'
  ) {
    return <IqacView pageData={page} />;
  }

  // 19l. Executive Council (Section 30 of MAU Act 1983)
  if (
    pageSlug === 'executive-council' ||
    pageSlug === 'exconcil' ||
    fullPath === 'executive-council' ||
    fullPath === 'officers/exconcil' ||
    fullPath === 'exconcil'
  ) {
    return <ExecutiveCouncilView pageData={page} />;
  }

  // 19m. Statutory University Officers Directory (/officers/directory, /Officers/OfficersContacts)
  if (
    pageSlug === 'officers-directory' ||
    fullPath === 'officers' ||
    fullPath === 'officers/directory' ||
    fullPath === 'officers/officerscontacts'
  ) {
    return <OfficersDirectoryView pageData={page} />;
  }

  // 19n. University Contacts Desk (/contact-us, /contacts, /Officers/Contacts)
  if (
    pageSlug === 'contacts-directory' ||
    fullPath === 'contact-us' ||
    fullPath === 'contacts' ||
    fullPath === 'officers/contacts'
  ) {
    return <ContactsView pageData={page} />;
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

  // 20b. MPKV At a Glance (Official Comprehensive Overview & Institutional Dossier)
  if (
    pageSlug === 'mpkv-at-a-glance' ||
    pageSlug === 'home-mpkvataglance' ||
    pageSlug === 'mpkvataglance' ||
    fullPath === 'mpkv-at-a-glance' ||
    fullPath === 'home/mpkvataglance' ||
    fullPath === 'home/mpkv-at-a-glance' ||
    fullPath === 'about/mpkv-at-a-glance' ||
    fullPath === 'about/at-a-glance' ||
    fullPath === 'at-a-glance'
  ) {
    return <MpkvAtAGlanceView pageData={page} />;
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

  // =========================================================================
  // SPECIALIZED LIBRARY VIEWS (All 10 Submenu Pages - Each With Unique Design)
  // =========================================================================

  if (
    pageSlug === 'library-about' ||
    pageSlug === 'central-library-rahuri' ||
    fullPath === 'library' ||
    fullPath === 'library/about' ||
    fullPath === 'library/libabout' ||
    fullPath === 'central-library-rahuri'
  ) {
    return <LibraryAboutView pageData={page} />;
  }

  if (
    pageSlug === 'library-collections' ||
    fullPath === 'library/collections' ||
    fullPath === 'library/libcollections'
  ) {
    return <LibraryCollectionsView pageData={page} />;
  }

  if (
    pageSlug === 'library-sections' ||
    fullPath === 'library/sections' ||
    fullPath === 'library/libsections'
  ) {
    return <LibrarySectionsView pageData={page} />;
  }

  if (
    pageSlug === 'library-facilities' ||
    fullPath === 'library/facilities' ||
    fullPath === 'library/libfacilities'
  ) {
    return <LibraryFacilitiesView pageData={page} />;
  }

  if (
    pageSlug === 'library-services' ||
    fullPath === 'library/services' ||
    fullPath === 'library/libservices'
  ) {
    return <LibraryServicesView pageData={page} />;
  }

  if (
    pageSlug === 'library-links' ||
    fullPath === 'library/links' ||
    fullPath === 'library/liblinks'
  ) {
    return <LibraryLinksView pageData={page} />;
  }

  if (
    pageSlug === 'library-activities' ||
    fullPath === 'library/activities' ||
    fullPath === 'library/libactivities'
  ) {
    return <LibraryActivitiesView pageData={page} />;
  }

  if (
    pageSlug === 'library-off-campus' ||
    fullPath === 'library/off-campus' ||
    fullPath === 'library/liboffcampus'
  ) {
    return <LibraryOffCampusView pageData={page} />;
  }

  if (
    pageSlug === 'library-news-events' ||
    fullPath === 'library/news-events' ||
    fullPath === 'library/libnewsevents'
  ) {
    return <LibraryNewsEventsView pageData={page} />;
  }

  if (
    pageSlug === 'library-contact' ||
    fullPath === 'library/contact' ||
    fullPath === 'library/libcontact'
  ) {
    return <LibraryContactView pageData={page} />;
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
