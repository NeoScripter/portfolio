import { cn } from '@/lib/helpers/utils';
import type { FC } from 'preact/compat';

const Mail: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class={cn('lucide lucide-mail-icon lucide-mail', className)}
            overflow="visible"
        >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" class="group-hover:-rotate-x-180 origin-top transition-transform group-hover:translate-y-3 duration-300 ease" />
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" class="group-hover:block hidden group-hover:translate-y-0.5 transition-transform duration-300 ease" />
            <rect x="2" y="4" width="20" height="16" rx="2" class="group-hover:translate-y-0.5 transition-transform duration-300 ease" />
        </svg>
    );
};

export default Mail;
