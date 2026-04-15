import type { FaqType } from '@/lib/types/models/faqs';
import type { ModuleType } from '@/lib/types/models/module';
import type { ProjectType } from '@/lib/types/models/projects';
import type { ReviewType } from '@/lib/types/models/reviews';
import type { TechStackType } from '@/lib/types/models/tech-stack';
import type { VideoType } from '@/lib/types/models/videos';
import { Signal, signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

interface DeleteModalContext {
    itemToDelete: Signal<
        | FaqType
        | ReviewType
        | VideoType
        | TechStackType
        | ProjectType
        | ModuleType
        | null
        | undefined
    >;
}

const DeleteModalContext = createContext<DeleteModalContext | null>(null);

export function useDeleteModal() {
    const ctx = useContext(DeleteModalContext);
    if (!ctx)
        throw new Error('useDeleteModal used without DeleteModalProvider');
    return ctx;
}

export function DeleteModalProvider({
    children,
}: {
    children: preact.ComponentChildren;
}) {
    const itemToDelete = signal<
        | FaqType
        | ReviewType
        | VideoType
        | TechStackType
        | ProjectType
        | ModuleType
        | null
    >(null);

    return (
        <DeleteModalContext.Provider value={{ itemToDelete }}>
            {children}
        </DeleteModalContext.Provider>
    );
}
