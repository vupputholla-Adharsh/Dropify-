'use client';

import { DeliveryDashboard } from '@/components/DeliveryDashboard';
import { PartnerSidebar } from '@/components/Layout/PartnerSidebar';

export default function PartnerDashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <PartnerSidebar />
      <div className="flex-1 min-h-screen p-6 max-w-7xl mx-auto">
        <DeliveryDashboard />
      </div>
    </div>
  );
}