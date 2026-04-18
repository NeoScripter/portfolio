import useFollowCursor from '@/hooks/useFollowCursor';
import { cn } from '@/lib/helpers/utils';
import { locale } from '@/signals/locale';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowDownRight } from 'lucide-preact';
import type { JSX } from 'preact';
import { useId, useRef } from 'preact/hooks';

const buttonVariants = cva(
    'inline-flex w-fit items-center justify-center gap-[0.5em] whitespace-nowrap rounded-xl group transition-[color,box-shadow,opacity] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                primary:
                    'bg-foreground flex text-user-background font-medium shadow-xs py-[0.5em] pl-[1.5em] pr-[1em] hover:ring-[3px] hover:ring-footer-text focus-visible:ring-footer-text',
                hero: 'bg-zinc-700/20 hover:bg-zinc-700/60 text-white shadow-xs py-[0.5em] pl-[1.5em] pr-[1em] backdrop-blur-sm border border-white hover:ring-[3px] hover:ring-white focus-visible:ring-white',
                footer: 'bg-white text-footer-bg font-medium shadow-xs py-[0.5em] pl-[1.5em] pr-[1em] backdrop-blur-sm hover:ring-[3px] hover:ring-footer-text focus-visible:ring-footer-text',
                outline:
                    'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

type ButtonProps = Omit<
    JSX.IntrinsicElements['button'] & JSX.IntrinsicElements['a'],
    'ref'
> &
    VariantProps<typeof buttonVariants> & {
        href?: string;
    };

const Button = ({
    class: className,
    children,
    variant,
    href,
    ...props
}: ButtonProps) => {
    const arrowRef = useRef<HTMLDivElement>(null);
    useFollowCursor(arrowRef);

    const Comp = href ? 'a' : 'button';

    return (
        <Comp
            href={href}
            data-slot="button"
            class={cn(buttonVariants({ variant, className }))}
            {...props}
        >
            <span>
                {children}
            </span>

            <div
                ref={arrowRef}
                class="transition-transform duration-100 ease-out"
            >
                <ArrowDownRight class="size-[1.25em] -rotate-45" />
            </div>
        </Comp>
    );
};

export { Button, buttonVariants };
