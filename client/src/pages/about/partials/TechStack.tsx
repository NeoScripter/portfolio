import AdaptiveImg from '@/components/ui/AdaptiveImg';
import ApiError from '@/components/ui/ApiError';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import useFetchRecords from '@/hooks/useFetchRecords';
import { API_BASE_URL } from '@/lib/const/api';
import { playAudio } from '@/lib/helpers/playAudio';
import { cn, hasErrorDetails, range } from '@/lib/helpers/utils';
import type { TechStackResource } from '@/lib/types/models/tech-stack';
import { locale } from '@/signals/locale';
import { useCallback, useRef, useState, type FC } from 'preact/compat';
import { canvasSrcSet } from '../data';
import TechPill, { TechPillFallback } from './TechPill';

const TechStack = () => {
    const {
        data: stackData,
        loading,
        errors,
    } = useFetchRecords<TechStackResource>({
        url: `${API_BASE_URL}tech-stacks/`,
        shouldCache: true,
    });

    const stacks = stackData?.data;

    const [active, setActive] = useState<number | null>(null);

    const lang = locale.value === 'ru' ? 'ru' : 'en';
    const content = active ? stacks?.[active].attr.html[lang] : null;
    const lastContent = useRef(content);

    useEscapeKey(() => handleSetActive(null));

    const scrollToStacks = useCallback(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const stackCanvas = document.querySelector('#stack-canvas');
        const stackBtns = document.querySelector('#stack-btns');

        if (!stackBtns || !stackCanvas) {
            return;
        }

        const rect = stackCanvas.getBoundingClientRect();

        if (
            (rect.top < 500 && rect.top > 0) ||
            (rect.bottom < 500 && rect.bottom > -100)
        ) {
            stackBtns.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    useClickOutside(
        [
            '#stack-btns',
            '#stack-canvas',
            '.theme-switch',
            '#lang-toggle-wrapper',
        ],
        () => handleSetActive(null),
    );

    const handleSetActive = (idx: number | null) => {
        if (typeof idx === 'number') {
            lastContent.current = stacks?.[idx].attr.html[lang];
        }
        setActive((prev) => {
            if (prev === null && idx === null) {
                return null;
            }
            if (idx === prev || idx === null) {
                scrollToStacks();
                playAudio('closeFaq');
                return null;
            }

            playAudio('openFaq');
            return idx;
        });
    };

    if (hasErrorDetails(errors))
        return (
            <ApiError
                resourceRu="языков программирования"
                resourceEn="programming languages"
                mt={true}
            />
        );

    if (stacks && stacks.length === 0) {
        return null;
    }
    return (
        <div>
            <div className="relative mt-16 sm:mt-19">
                <ul
                    id="stack-btns"
                    className={cn(
                        'border-muted mx-auto grid w-full grid-cols-[repeat(auto-fit,minmax(3rem,1fr))] items-start justify-center gap-x-5 gap-y-1 rounded-xl p-4 shadow-md sm:w-fit sm:grid-flow-col',
                    )}
                >
                    {!loading
                        ? stacks?.map((stack, idx) => (
                              <TechPill
                                  onClick={() => handleSetActive(idx)}
                                  key={stack.id}
                                  stack={stack}
                                  active={idx === active}
                              />
                          ))
                        : range(0, 8).map((skeleton) => (
                              <TechPillFallback
                                  key={`stack-skeleton-${skeleton}`}
                              />
                          ))}
                </ul>

                <TechStackCanvas
                    content={content ?? lastContent.current ?? ''}
                    active={active}
                />
            </div>
        </div>
    );
};

export default TechStack;

const TechStackCanvas: FC<{
    content: string | undefined;
    active: number | null;
}> = ({ active, content }) => {
    return (
        <div
            id="stack-canvas"
            class={cn(
                'relative isolate -mx-5 overflow-clip px-5 select-none sm:-mx-20 sm:px-15.5 lg:rounded-xl lg:px-23.5',
                active != null
                    ? 'lg:py-13.4 stack-content-open mt-18 max-h-2000 py-11.5 sm:py-12.5 xl:py-17'
                    : 'stack-content-closed mt-0 max-h-0',
            )}
        >
            <AdaptiveImg
                prtClass="absolute -inset-4 -z-4"
                srcs={canvasSrcSet}
            />

            <div
                key={`${locale.value}-canvas`}
                class="prose sm:prose-base prose-sm motion-safe:animate-fade-in max-w-full text-white! [&>h2,h3,h4,h5,h6,p,strong,ol,*]:text-white!"
                dangerouslySetInnerHTML={{
                    __html: content || '',
                }}
            />
        </div>
    );
};
