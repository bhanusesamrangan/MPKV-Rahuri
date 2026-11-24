import { SeedsAvailabilityView } from '@/components/SeedsAvailabilityView';

export const metadata = {
  title: 'Nursery Plant Stock | MPKV Rahuri',
  description: 'Verified live fruit grafts and plant saplings available at Nursery, MPKV Rahuri.',
};

export default function NurseryStockPage() {
  return <SeedsAvailabilityView initialTab="central" />;
}
