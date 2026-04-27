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
        <AppSection
            className={cn('sm:text-xl xl:px-0 2xl:px-8 2xl:text-xl', className)}
        >
            <div
                className={cn('pt-15 pb-13.5 sm:pt-20 sm:pb-18 xl:py-0', {
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
                            'lg:order-2 lg:basis-1/3':
                                type === 'one_image_split',
                            'items-stretch lg:flex-[1_0_0]':
                                type === 'two_image_split',
                        })}
                    >
                        {module.firstImage && (
                            <AdaptiveImg
                                prtClass={cn('mx-auto w-full rounded-sm', {
                                    'max-w-80': [
                                        'one_image_split',
                                    ].includes(type),
                                    'max-w-140': [
                                        'two_image_split',
                                    ].includes(type),
                                    'max-w-200 aspect-video': [
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
                                    'max-w-80': [
                                        'one_image_split',
                                    ].includes(type),
                                    'max-w-140': [
                                        'two_image_split',
                                    ].includes(type),
                                    'max-w-200 aspect-video': [
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
                    className={cn({
                        'lg:basis-2/3': type === 'one_image_split',
                        'lg:flex-[1_0_0]': type === 'two_image_split',
                    })}
                >
                    {module.attr.heading && (
                        <h3 className="mb-5.5 font-bold">
                            {module.attr.heading[locale.value]}
                        </h3>
                    )}

                    <div
                        class="[&>p]:mb-[1.5em]"
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
