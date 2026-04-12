import { cn } from '@/lib/helpers/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-preact';
import type { ComponentChildren, FunctionalComponent } from 'preact';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

interface PaginationProps {
    meta: PaginationMeta;
    label?: string;
    className?: string;
    onClick: (newPage: number) => void;
}

const getPageNumber = (url: string): number => {
    try {
        const params = new URLSearchParams(url.split('?')[1]);
        const page = params.get('page');
        return page ? parseInt(page, 10) : 1;
    } catch {
        return 1;
    }
};

const Pagination: FunctionalComponent<PaginationProps> = ({
    meta,
    label,
    className,
    onClick,
}) => {
    const { links, from, to, total } = meta;

    if (!links || links.length === 0) return null;

    return (
        <div
            className={cn(
                'flex items-center justify-between py-7 md:py-10 xl:py-14',
                className,
            )}
        >
            {/* Mobile Navigation */}
            <div className="mx-auto flex max-w-8/10 flex-1 justify-between sm:hidden">
                <PaginationButton
                    link={links[0]}
                    handleClick={onClick}
                    class="size-16"
                >
                    <ChevronLeftIcon className="text-foreground size-16" />
                </PaginationButton>

                <PaginationButton
                    link={links[links.length - 1]}
                    handleClick={onClick}
                    class="size-16"
                >
                    <ChevronRightIcon className="text-foreground size-16" />
                </PaginationButton>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden flex-wrap sm:flex sm:flex-1 sm:items-center sm:justify-center">
                {/* Optional label - currently hidden */}
                {label && from && to && total && (
                    <div className="hidden">
                        <p className="text-sm font-medium 2xl:text-base">
                            Показаны {label} с <span>{from}</span> по{' '}
                            <span>{to}</span> из <span>{total}</span>
                        </p>
                    </div>
                )}

                <nav
                    aria-label="Pagination"
                    className="isolate flex items-center justify-center gap-2 2xl:gap-3"
                >
                    {links.map((link, index) => {
                        const isFirst = index === 0;
                        const isLast = index === links.length - 1;

                        return (
                            <PaginationButton
                                handleClick={onClick}
                                key={`pagination-${index}`}
                                link={link}
                            >
                                {isFirst ? (
                                    <ChevronLeftIcon className="text-foreground size-6 2xl:size-10" />
                                ) : isLast ? (
                                    <ChevronRightIcon className="text-foreground size-6 2xl:size-10" />
                                ) : (
                                    link.label
                                )}
                            </PaginationButton>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

interface PaginationButtonProps {
    link: PaginationLink;
    children: ComponentChildren;
    handleClick: (newPage: number) => void;
    class?: string;
}

const PaginationButton: FunctionalComponent<PaginationButtonProps> = ({
    link,
    children,
    handleClick,
    class: className,
}) => {
    const baseClasses = cn(
        'relative inline-flex size-8 items-center justify-center rounded-sm font-medium ring-1 transition duration-200 ease-in ring-inset 2xl:size-12 2xl:text-[1.325rem]',
        {
            'text-background ring-muted-foreground bg-foreground': link.active,
            'text-foreground ring-inherit hover:scale-110':
                !link.active && link.url,
            'opacity-50': !link.url,
        },
        className,
    );

    // Disabled state
    if (!link.url) {
        return <span className={baseClasses}>{children}</span>;
    }

    const page = getPageNumber(link.url);
    return (
        <button
            onClick={() => handleClick(page)}
            type="button"
            className={baseClasses}
        >
            {children}
        </button>
    );
};

export default Pagination;
