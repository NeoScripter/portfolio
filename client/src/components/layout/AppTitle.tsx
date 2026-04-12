import { locale } from '@/signals/locale';
import { pageTitle } from '@/signals/page-title';
import { type FC } from 'preact/compat';
import { useEffect } from 'preact/hooks';

const AppTitle: FC<{ titleEn: string; titleRu: string }> = ({
    titleRu,
    titleEn,
}) => {
    const lang = locale.value === 'en' ? 'en' : 'ru';
    const title = lang === 'en' ? titleEn : titleRu;

    useEffect(() => {
        pageTitle.value = title;
    }, [lang]);

    return null;
};

export default AppTitle;
