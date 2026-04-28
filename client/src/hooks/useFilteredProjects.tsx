import { useDebounce } from '@/hooks/useDebounce';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import type { ProjectResource } from '@/lib/types/models/projects';
import { useLocation } from 'preact-iso';
import { useEffect, useRef, useState } from 'preact/hooks';

const useFilteredProjects = () => {
    const { fetchData, loading, errors } = useFetch();
    const [projectData, setProjectData] = useState<ProjectResource | null>(
        null,
    );
    const { query } = useLocation();
    const search = query?.search == null ? '' : query.search;
    const debouncedQuery = useDebounce(search, 400);

    const currentPage = query?.page == null ? 1 : query.page;
    const projectsRef = useRef<HTMLUListElement | null>(null);

    const isBrowser = typeof window !== 'undefined';

    useEffect(() => {
        const fetchProjects = () => {
            const params = new URLSearchParams();
            params.set('page', currentPage.toString());

            if (debouncedQuery !== '') {
                params.set('search', debouncedQuery);
            }

            let url = `${API_BASE_URL}projects?${params.toString()}`;

            fetchData({
                url: url,
                onSuccess: (data) => {
                    setProjectData(data);
                },
            });

            if (!projectsRef.current) return;

            projectsRef.current.scrollIntoView({
                block: 'start',
            });
        };

        if (!isBrowser) {
            return;
        }

        fetchProjects();

        window.addEventListener(events.FORM_SUCCESS_EVENT, fetchProjects);

        return () =>
            window.removeEventListener(
                events.FORM_SUCCESS_EVENT,
                fetchProjects,
            );
    }, [currentPage, debouncedQuery]);

    return { projectData, errors, loading, projectsRef };
};

export default useFilteredProjects;
