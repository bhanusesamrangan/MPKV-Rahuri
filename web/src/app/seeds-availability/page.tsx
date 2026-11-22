import { SeedsAvailabilityView } from '@/components/SeedsAvailabilityView';

export const metadata = {
  title: 'Certified Seeds & Nursery Stock | MPKV Rahuri',
  description: 'Verified live stock of certified cereal seeds, central nursery fruit grafts, horticulture nursery saplings and farm implements at MPKV Rahuri.',
};

export default function SeedsAvailabilityPage() {
  return <SeedsAvailabilityView initialTab="cereal" />;
}
