import { SeedsAvailabilityView } from '@/components/SeedsAvailabilityView';

export const metadata = {
  title: 'Farm Implements & Machinery | MPKV Rahuri',
  description: 'Patented agricultural implements and farm machinery designed and manufactured at MPKV Rahuri.',
};

export default function FarmImplementsPage() {
  return <SeedsAvailabilityView initialTab="implements" />;
}
