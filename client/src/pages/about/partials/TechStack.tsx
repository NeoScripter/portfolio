import AdaptiveImg from '@/components/ui/AdaptiveImg';
import ApiError from '@/components/ui/ApiError';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { API_BASE_URL } from '@/lib/const/api';
import { cn, hasErrorDetails, range } from '@/lib/helpers/utils';
import type { TechStackType } from '@/lib/types/models/tech-stack';
import { locale } from '@/signals/locale';
import { useEffect, useRef, useState, type FC } from 'preact/compat';
import { useFetch } from '../../../hooks/useFetch';
import { canvasSrcSet } from '../data';
import TechPill, { TechPillFallback } from './TechPill';

const TechStack = () => {
    const { fetchData, loading, errors } = useFetch();
    const [stacks, setStacks] = useState<TechStackType[] | null>(null);
    const [active, setActive] = useState<number | null>(null);

    const lang = locale.value === 'ru' ? 'ru' : 'en';
    const content = active ? stacks?.[active].attr.html[lang] : null;
    const lastContent = useRef(content);

    const isBrowser = typeof window !== 'undefined';

    useEscapeKey(() => handleSetActive(null));

    useEffect(() => {
        if (!isBrowser) {
            return;
        }

        const onClick = (e: MouseEvent) => {
            const el = e.target as HTMLElement | null;
            if (!el) return;

            const inside = ['#stack-btns', '#stack-canvas'].some((sel) =>
                el.closest(sel),
            );
            if (!inside) handleSetActive(null);
        };

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, []);

    const handleSetActive = (idx: number | null) => {
        if (typeof idx === 'number') {
            lastContent.current = stacks?.[idx].attr.html[lang];
        }
        setActive((prev) => (prev === idx ? null : idx));
    };

    useEffect(() => {
        fetchData({
            url: `${API_BASE_URL}tech-stacks/`,
            onSuccess: (data) => {
                setStacks(data.data);
            },
        });
    }, []);

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
                alt=""
            />

            <div
                class="prose sm:prose-base prose-sm max-w-full text-white! [&>h2,h3,h4,h5,h6,p,strong,ol,*]:text-white!"
                dangerouslySetInnerHTML={{
                    __html: content || '',
                }}
            />
        </div>
    );
};
