import { playAudio } from '@/lib/helpers/playAudio';
import { cn } from '@/lib/helpers/utils';
import type { NodeProps } from '@/lib/types/shared';
import { prefersSound } from '@/signals/sound';
import { Volume2, VolumeOff } from 'lucide-preact';
import type { FC } from 'preact/compat';

const MuteBtn: FC<NodeProps> = ({ className }) => {
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        playAudio(prefersSound.value ? 'disable' : 'enable');
        prefersSound.value = !prefersSound.value;
    };

    return (
        <button
            onClick={handleClick}
            type="button"
            class={cn('relative size-6 shrink-0 lg:size-8', className)}
        >
            <span className="absolute -inset-3 hidden pointer-coarse:block" />

            {prefersSound.value ? (
                <Volume2 class="size-full" />
            ) : (
                <VolumeOff class="size-full" />
            )}
        </button>
    );
};

export default MuteBtn;
