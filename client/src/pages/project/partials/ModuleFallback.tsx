import AppSection from '@/layouts/SectionLayout';
import { cn } from '@/lib/helpers/utils';
import type{ FC } from 'preact/compat';

const ModuleFallback: FC<{ className?: string; type: string }> = ({
    className,
    type,
}) => {
    return (
        <AppSection
            className={cn('px-0 sm:px-0 sm:text-xl lg:px-0', className)}
        >
            <div
                className={cn('pt-15 pb-13.5 sm:pt-20 sm:pb-18', {
                    'lg:items-start': type === 'two_image_split',
                    'lg:items-center': type === 'one_image_split',
                    'lg:flex lg:gap-19 2xl:gap-21':
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
                            'lg:flex-[1_0_0]': type === 'two_image_split',
                        })}
                    >
                        {type !== 'only_text' && (
                            <div
                                className={cn('skeleton w-full rounded-sm', {
                                    'aspect-2/3': type === 'one_image_split',
                                    'aspect-3/2': type !== 'one_image_split',
                                })}
                            />
                        )}
                        {type === 'two_image_split' ||
                            (type === 'two_image_block' && (
                                <div className="skeleton aspect-3/2 w-full rounded-sm" />
                            ))}
                    </div>
                )}
                <div
                    className={cn({
                        'lg:basis-2/3': type === 'one_image_split',
                        'lg:flex-[1_0_0]': type === 'two_image_split',
                    })}
                >
                    <h3 className="skeleton mb-5.5 w-fit rounded-sm font-bold">
                        Lorem ipsum dolor, sit amet consectetur
                    </h3>

                    <div>
                        <p className="skeleton mb-3 rounded-sm">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Modi velit deleniti sapiente? Quo ea nam
                            voluptatem perferendis porro numquam. Fugit nam
                            praesentium maiores qui delectus velit, minima,
                            reprehenderit quae vitae molestiae dolor unde minus
                            at tempora. Debitis accusantium alias laboriosam
                            quam explicabo, a quaerat. Tempore aliquid fugit
                            nesciunt iste accusamus tenetur placeat esse
                            molestias, soluta laudantium ullam repellat
                            inventore exercitationem!
                        </p>
                        <p className="skeleton rounded-sm">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Modi velit deleniti sapiente? Quo ea nam
                            voluptatem perferendis porro numquam. Fugit nam
                            praesentium maiores qui delectus velit, minima,
                            reprehenderit quae vitae molestiae dolor unde minus
                            at tempora. Debitis accusantium alias laboriosam
                            quam explicabo, a quaerat. Tempore aliquid fugit
                            nesciunt iste accusamus tenetur placeat esse
                            molestias, soluta laudantium ullam repellat
                            inventore exercitationem!
                        </p>
                    </div>
                </div>
            </div>
        </AppSection>
    );
};

export default ModuleFallback;
