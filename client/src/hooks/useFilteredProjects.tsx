import { useDebounce } from '@/hooks/useDebounce';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import type { ProjectResource } from '@/lib/types/models/projects';
import { useLocation } from 'preact-iso';
import { useEffect, useRef, useState } from 'preact/hooks';

type Props = {
    delay?: number;
};

const useFilteredProjects = ({ delay = 400 }: Props) => {
    const { fetchData, loading, errors } = useFetch();
    const [projectData, setProjectData] = useState<ProjectResource | null>(
        null,
    );
    const { query } = useLocation();
    const search = query?.search == null ? '' : query.search;
    const debouncedQuery = useDebounce(search, delay);

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

                    const isInitialVisit =
                        currentPage === 1 && debouncedQuery === '';

                    if (!projectsRef.current || isInitialVisit) return;

                    projectsRef.current.scrollIntoView({
                        block: 'start',
                    });
                },
            });
        };

        if (!isBrowser) {
            return;
        }

        fetchProjects();

        const onFormSuccess = () => fetchProjects();

        window.addEventListener(events.FORM_SUCCESS_EVENT, onFormSuccess);

        return () =>
            window.removeEventListener(
                events.FORM_SUCCESS_EVENT,
                onFormSuccess,
            );
    }, [currentPage, debouncedQuery]);

    return { projectData, errors, loading, projectsRef };
};

export default useFilteredProjects;
