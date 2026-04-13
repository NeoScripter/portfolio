import AdminShell from '@/components/layout/AdminShell';
import AppTitle from '@/components/layout/AppTitle';
import AdminLayout from '@/layouts/AdminLayout';

const Dashboard = () => {
    return (
        <AdminLayout title={{ en: 'Dashboard', ru: 'Панель управления' }}>
            <AppTitle titleRu="Панель управления" titleEn="Dashboard" />

            <AdminShell>
                <div>This is the dashboard page</div>
            </AdminShell>
        </AdminLayout>
    );
};

export default Dashboard;
