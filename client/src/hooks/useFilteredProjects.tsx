import { useDebounce } from '@/hooks/useDebounce';
import { API_BASE_URL } from '@/lib/const/api';
import type { ProjectResource } from '@/lib/types/models/projects';
import { useLocation } from 'preact-iso';
import { useMemo, useRef } from 'preact/hooks';
import useFetchRecords from './useFetchRecords';

type Props = {
    delay?: number;
    limit?: number;
};

const useFilteredProjects = ({ delay = 400, limit = 5 }: Props) => {
    const { query } = useLocation();
    const search = query?.search == null ? '' : query.search;
    const debouncedQuery = useDebounce(search, delay);

    const currentPage = query?.page == null ? 1 : query.page;
    const projectsRef = useRef<HTMLUListElement | null>(null);

    const handleFetchSuccess = () => {
        const isInitialVisit = currentPage === 1 && debouncedQuery === '';

        if (!projectsRef.current || isInitialVisit) return;

        projectsRef.current.scrollIntoView({
            block: 'start',
        });
    };

    const url = useMemo(() => {
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());
        params.set('limit', limit.toString());

        if (debouncedQuery !== '') {
            params.set('search', debouncedQuery);
        }

        return `${API_BASE_URL}projects?${params.toString()}`;
    }, [currentPage, debouncedQuery]);

    const {
        data: projectData,
        loading,
        errors,
    } = useFetchRecords<ProjectResource | null>({
        url,
        shouldCache: true,
        cb: handleFetchSuccess,
    });

    return { projectData, errors, loading, projectsRef };
};

export default useFilteredProjects;
