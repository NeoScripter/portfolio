import { cn, range } from '@/lib/helpers/utils';
import { ChevronLeftIcon } from 'lucide-preact';
import type { FunctionalComponent } from 'preact';
import type { FC } from 'preact/compat';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationMeta = {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
};

type PaginationProps = {
    // meta: PaginationMeta;
    total: number;
    className?: string;
};

const getPageNumber = (): number => {
    if (typeof window === 'undefined') return 1;

    try {
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page');
        return page ? parseInt(page, 10) : 1;
    } catch {
        return 1;
    }
};

const getPageUrl = (newPage: number): string => {
    if (typeof window === 'undefined') return '';

    try {
        const url = new URL(window.location.href);
        url.searchParams.set('page', newPage.toString());
        return url.toString();
    } catch (err) {
        console.error(err);
        return '';
    }
};

const Pagination: FC<PaginationProps> = ({
    // meta,
    total,
    className,
}) => {
    // const { total } = meta;
    const currentPage = getPageNumber();

    return (
        <div
            className={cn(
                'flex items-center justify-center py-7 md:py-10 xl:py-14',
                className,
            )}
        >
            <nav
                aria-label="Pagination"
                className="isolate flex w-full max-w-3/5 items-center justify-between gap-3 sm:max-w-4/5 sm:justify-center"
            >
                {range(0, total + 1).map((to) => (
                    <PageLink
                        key={`pagination-${to}`}
                        to={to}
                        currentPage={currentPage}
                        total={total}
                    />
                ))}
            </nav>
        </div>
    );
};

type PageLinkProps = {
    currentPage: number;
    to: number;
    total: number;
    className?: string;
};

const PageLink: FC<PageLinkProps> = ({
    className,
    currentPage,
    to,
    total,
}) => {
    const isActive = currentPage === to;
    const isLeftmost = to === 0;
    const isRightmost = to === total + 1;
    const isEdge = isRightmost || isLeftmost;
    const isRegular = !isActive && !isEdge;
    const isDisabled =
        (isLeftmost && currentPage === 1) ||
        (isRightmost && currentPage === total);

    if (isLeftmost) {
        to = currentPage - 1;
    }
    if (isRightmost) {
        to = currentPage + 1;
    }

    return (
        <a
            href={getPageUrl(to)}
            className={cn(
                'relative hidden size-12 items-center justify-center rounded-sm text-xl font-medium ring-1 transition duration-200 ease-in ring-inset sm:inline-flex sm:size-12',
                {
                    'text-background ring-muted-foreground bg-foreground':
                        isActive,
                    'text-foreground ring-inherit hover:scale-110': isRegular,
                    'pointer-forbidden pointer-events-none inline-flex opacity-50':
                        isDisabled,
                },
                className,
            )}
        >
            {isEdge ? (
                <ChevronLeftIcon
                    className={cn(
                        'text-foreground size-10 2xl:size-10',
                        isRightmost && 'rotate-180',
                    )}
                />
            ) : (
                to
            )}
        </a>
    );
};

export default Pagination;
