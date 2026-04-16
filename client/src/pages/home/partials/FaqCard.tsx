import { cn } from '@/lib/helpers/utils';
import type { FaqType } from '@/lib/types/models/faqs';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';
import { useState } from 'preact/hooks';

const FaqCard: FC<{
    isReached: boolean;
    faq: FaqType;
    open: boolean;
    onClick: () => void;
    idx: number;
}> = ({ faq, open, onClick, idx, isReached }) => {
    const lang = locale.value === 'ru' ? 'ru' : 'en',
        isEven = idx % 2 === 0;

    const [hasAnimated, setHasAnimated] = useState(false);

    if (isReached && !hasAnimated) {
        setHasAnimated(true);
    }

    return (
        <li
            class={cn(
                'border-accent-foreground/10 bg-muted relative rounded-sm border px-5 py-7 shadow-xl sm:px-7 sm:pt-10 sm:pb-11 xl:px-9.5',
                {
                    'faq-animation': hasAnimated,
                },
            )}
            style={{
                '--offsetY': isEven ? idx : idx + 1,
                '--offsetX': isEven ? -idx : idx + 1,
                zIndex: 20 - idx,
            }}
        >
            <button
                onClick={onClick}
                type="button"
                class="absolute inset-0 z-5"
                aria-expanded={open}
                aria-controls={`faq-content-${faq.id}`}
                aria-label={faq.attr.title[lang]}
            >
                <span class="sr-only">
                    {open ? 'Collapse' : 'Expand'} {faq.attr.title[lang]}
                </span>
            </button>

            <div class="flex items-start gap-5 sm:gap-7 xl:gap-9.5">
                <div>
                    <SvgIcon open={open} />
                </div>
                <div>
                    <h3
                        key={`title-${lang}`}
                        id={`faq-title-${faq.id}`}
                        class="xs:text-lg motion-safe:animate-fade-in font-bold xl:text-[1.325rem]"
                    >
                        {faq.attr.title[lang]}
                    </h3>

                    <div
                        key={`content-${lang}`}
                        id={`faq-content-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-title-${faq.id}`}
                        className={cn(
                            'motion-safe:animate-fade-in overflow-hidden transition-[max-height] duration-750 ease-[cubic-bezier(0.85,0.09,0.15,0.91)]',
                            open ? 'max-h-200' : 'max-h-0',
                        )}
                        aria-hidden={!open}
                    >
                        <p class="mt-6 text-sm text-pretty lg:mt-7 xl:text-xl">
                            {faq.attr.content?.[lang]}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default FaqCard;

export const FaqFallback = () => {
    return (
        <li class="border-accent-foreground/10 bg-muted shadow-faq relative rounded-sm border px-5 py-7 sm:px-7 sm:pt-10 sm:pb-11 xl:px-9.5">
            <div>
                <h3 class="xs:text-lg skeleton min-h-15 w-full rounded-sm font-bold xl:min-h-20 xl:text-[1.325rem]">
                    Lorem ipsum Lorem ipsum Lorem ipsum
                </h3>
            </div>
        </li>
    );
};

const SvgIcon: FC<{ open: boolean }> = ({ open }) => {
    return (
        <span
            aria-hidden="true"
            class="mt-1 block size-4.5 sm:size-6 xl:mt-0 xl:size-8"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus-icon lucide-plus size-full"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M5 12h14"
                    className={cn(
                        'origin-center transition-transform duration-500 ease-in-out',
                        open ? 'rotate-0' : 'rotate-180',
                    )}
                />
                <path
                    d="M12 5v14"
                    className={cn(
                        'origin-center transition-transform duration-500 ease-in-out',
                        open ? 'rotate-90' : 'rotate-0',
                    )}
                />
            </svg>
        </span>
    );
};
