import AdaptiveImg from '@/components/ui/AdaptiveImg';
import CardActions from '@/components/ui/CardActions';
import { useDeleteModal } from '@/context/DeleteModelContext';
import type { ProjectType } from '@/lib/types/models/projects';
import { locale } from '@/signals/locale';
import type { FC } from 'preact/compat';

const ProjectCard: FC<{ project: ProjectType }> = ({ project }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            <h3 class="mb-3 font-bold">{project.attr.title.en}</h3>
            <div className="mb-4">{project.attr.description.en}</div>

            {project.image && (
                <AdaptiveImg
                    prtClass="max-w-100 aspect-video w-full mb-6 shrink-0 rounded-xl"
                    alt={project.image.alt?.[locale.value]}
                    srcs={project.image.srcSet}
                />
            )}

            <CardActions
                path={`/admin/projects/${project.id}`}
                onClick={() => (itemToDelete.value = project)}
            />
        </li>
    );
};

export default ProjectCard;

export const ProjectCardSkeleton = () => {
    return (
        <li className="w-full max-w-140 list-none text-base">
            <h3 class="skeleton mb-3 w-fit rounded-sm font-bold">
                Lorem ipsum dolor sit
            </h3>
            <div className="skeleton mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                nostrum consequatur quas suscipit possimus temporibus! Quis
                molestias minima illum accusantium! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Tempora, earum!
            </div>
            <div class="skeleton mb-6 aspect-video w-100 shrink-0 rounded-xl" />

            <div class="flex items-center gap-2">
                <div class="skeleton w-fit rounded-xl px-3 py-1">Loremmm</div>
                <div class="skeleton w-fit rounded-xl px-3 py-1">Loremmm</div>
            </div>
        </li>
    );
};
