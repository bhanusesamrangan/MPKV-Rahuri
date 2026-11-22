import { SeedsAvailabilityView } from '@/components/SeedsAvailabilityView';

export const metadata = {
  title: 'Central Nursery Plant Stock | MPKV Rahuri',
  description: 'Verified live fruit grafts and plant saplings available at Central Nursery, MPKV Rahuri Campus.',
};

export default function NurseryStockPage() {
  return <SeedsAvailabilityView initialTab="central" />;
}
