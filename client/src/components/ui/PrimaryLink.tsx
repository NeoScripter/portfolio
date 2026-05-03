import useFollowCursor from '@/hooks/useFollowCursor';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { ArrowDownRight } from 'lucide-preact';
import type { ComponentChildren } from 'preact';
import { type FC } from 'preact/compat';
import { useId, useRef } from 'preact/hooks';

const PrimaryLink: FC<{
    className?: string;
    children: ComponentChildren;
    href: string;
    onClick?: () => void;
}> = ({ className, children, href, onClick }) => {
    const arrowRef = useRef<HTMLDivElement>(null);
    const id = useId();

    useFollowCursor(arrowRef);

    const lang = locale.value === 'en' ? 'en' : 'ru';

    return (
        <a
            href={href}
            onClick={onClick}
            class={cn(
                'group bg-foreground text-user-background hover:ring-footer-text focus-visible:ring-footer-text flex items-center justify-center gap-[0.5em] rounded-xl py-[0.5em] pr-[1em] pl-[1.5em] font-medium whitespace-nowrap shadow-xs transition-[color,box-shadow,opacity] outline-none hover:ring-[3px] focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
                className,
            )}
        >
            <span key={`${lang}-${id}`} className="motion-safe:animate-fade-in">
                {children}
            </span>

            <div
                ref={arrowRef}
                class="transition-transform duration-100 ease-out"
            >
                <ArrowDownRight class="size-[1.25em] -rotate-45" />
            </div>
        </a>
    );
};

export default PrimaryLink;
