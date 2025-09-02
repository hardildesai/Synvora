import AdminDashboard from '@/components/admin/AdminDashboard';
import { getRegistrations } from '@/lib/mock-db';

export default async function AdminPage() {
  const registrations = await getRegistrations();

  return <AdminDashboard initialRegistrations={registrations} />;
}
