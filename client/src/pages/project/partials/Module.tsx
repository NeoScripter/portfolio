import AdaptiveImg from '@/components/ui/AdaptiveImg';
import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import type { ModuleType } from '@/lib/types/models/module';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const Module: FC<{ className?: string; module: ModuleType }> = ({
    className,
    module,
}) => {
    const type = module.attr.type;

    return (
        <AppSection className={cn('xl:px-0 2xl:px-8', className)}>
            <div
                className={cn('pt-1 sm:pt-20 sm:pb-18 lg:mx-0 xl:py-0', {
                    'lg:flex lg:items-center lg:gap-19 2xl:gap-21':
                        type === 'one_image_split' ||
                        type === 'two_image_split',
                })}
            >
                {type !== 'only_text' && (
                    <div
                        className={cn('mb-13.5 sm:mb-16.5', {
                            'flex flex-col items-center gap-6 sm:gap-11.5 lg:gap-7':
                                type === 'two_image_split' ||
                                type === 'two_image_block',
                            'lg:mb-12.5 lg:flex-row 2xl:mb-17.5':
                                type === 'two_image_block',
                            'lg:mb-0':
                                type === 'one_image_split' ||
                                type === 'two_image_split',
                            'lg:order-2 lg:basis-1/2':
                                type === 'one_image_split',
                            'items-stretch lg:flex-[1_0_0]':
                                type === 'two_image_split',
                        })}
                    >
                        {module.firstImage && (
                            <AdaptiveImg
                                prtClass={cn('mx-auto w-full rounded-sm', {
                                    'max-w-150': ['one_image_split'].includes(
                                        type,
                                    ),
                                    'max-w-140': ['two_image_split'].includes(
                                        type,
                                    ),
                                    'aspect-video max-w-200': [
                                        'two_image_block',
                                    ].includes(type),
                                })}
                                imgClass={cn('size-full object-contain', {
                                    // '': [
                                    //     'one_image_split',
                                    // ].includes(type),
                                    // '': [
                                    //     'two_image_split',
                                    // ].includes(type),
                                    'object-cover': [
                                        'two_image_block',
                                    ].includes(type),
                                })}
                                alt={module.firstImage?.alt?.[locale.value]}
                                srcs={module.firstImage.srcSet}
                            />
                        )}
                        {module.secondImage && (
                            <AdaptiveImg
                                prtClass={cn('mx-auto w-full rounded-sm', {
                                    'max-w-80': ['one_image_split'].includes(
                                        type,
                                    ),
                                    'max-w-140': ['two_image_split'].includes(
                                        type,
                                    ),
                                    'aspect-video max-w-200': [
                                        'two_image_block',
                                    ].includes(type),
                                })}
                                imgClass={cn('size-full object-contain', {
                                    // '': [
                                    //     'one_image_split',
                                    // ].includes(type),
                                    // '': [
                                    //     'two_image_split',
                                    // ].includes(type),
                                    'object-cover': [
                                        'two_image_block',
                                    ].includes(type),
                                })}
                                alt={module.secondImage?.alt?.[locale.value]}
                                srcs={module.secondImage.srcSet}
                            />
                        )}
                    </div>
                )}
                <div
                    className={cn('max-w-[85ch]', {
                        'lg:basis-2/3': type === 'one_image_split',
                        'lg:flex-[1_0_0]': type === 'two_image_split',
                    })}
                >
                    {module.attr.heading && (
                        <h3
                            key={`${locale.value}-heading`}
                            className="motion-safe:animate-fade-in mb-5.5 text-lg font-bold sm:mb-6.5 sm:text-2xl"
                        >
                            {module.attr.heading[locale.value]}
                        </h3>
                    )}

                    <div
                        key={`${locale.value}-content`}
                        class="[&>p]:break-text motion-safe:animate-fade-in [&>p]:mb-[1.5em]"
                        dangerouslySetInnerHTML={{
                            __html: module.attr.html[locale.value],
                        }}
                    />
                </div>
            </div>
        </AppSection>
    );
};

export default Module;
