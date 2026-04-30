import { cn } from '@/lib/helpers/utils';

const PageLoader = () => {
    return (
        <div
            className={cn(
                'fixed inset-0 z-100 flex items-center justify-center bg-black/60',
            )}
        >
            <div class="page-loader" />
        </div>
    );
};

export default PageLoader;
