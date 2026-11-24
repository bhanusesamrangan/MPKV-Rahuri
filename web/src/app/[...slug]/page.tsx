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

  // Default fallback for other pages
  return (
    <DynamicPageView
      slug={slugArray.join('/')}
      path={slugArray.join('/')}
      initialPageData={page}
    />
  );
}
