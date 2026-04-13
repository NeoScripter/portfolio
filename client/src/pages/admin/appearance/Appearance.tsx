import AppTitle from '@/components/layout/AppTitle';
import SubHeader from '@/components/ui/SubHeader';
import AdminLayout from '@/layouts/AdminLayout';
import ProfileLayout from '@/layouts/ProfileLayout';
import AppearanceTabs from './partials/AppearanceTabs';

export default function Appearance() {
    return (
        <AdminLayout
            title={{ en: 'Appearance settings', ru: 'Настройки темы' }}
        >
            <AppTitle titleEn="Appearance" titleRu="Настройки темы" />
            <ProfileLayout>
                <div className="space-y-6">
                    <SubHeader
                        title={{
                            en: 'Appearance settings',
                            ru: 'Настройки темы',
                        }}
                        description={{
                            en: "Update your account's theme",
                            ru: 'Изменить тему',
                        }}
                    />
                    <AppearanceTabs />
                </div>
            </ProfileLayout>
        </AdminLayout>
    );
}
