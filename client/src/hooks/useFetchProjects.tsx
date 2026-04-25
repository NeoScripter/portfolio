import { useDebounce } from '@/hooks/useDebounce';
import { useFetch } from '@/hooks/useFetch';
import { API_BASE_URL } from '@/lib/const/api';
import type { ProjectResource } from '@/lib/types/models/projects';
import { useLocation } from 'preact-iso';
import { useEffect, useRef, useState } from 'preact/hooks';

type FetchProjectsArgs = {
    searchQuery: string;
    isLatest?: boolean;
};

const useFetchProjects = ({ searchQuery }: FetchProjectsArgs) => {
    const { fetchData, loading, errors } = useFetch();
    const [projectData, setProjectData] = useState<ProjectResource | null>(
        null,
    );
    const { query } = useLocation();
    const debouncedQuery = useDebounce(searchQuery, 400);
    const [currentPage, setCurrentPage] = useState(() =>
        query?.page == null ? 1 : query.page,
    );
    const projectsRef = useRef<HTMLUListElement | null>(null);

    const isBrowser = typeof window !== 'undefined';

    const handlePageClick = (newPage: number) => {
        if (projectData?.meta == null) return;
        const lastPage = projectData.meta.last_page;

        if (newPage > lastPage || newPage < 1) return;
        setCurrentPage(newPage);

        if (!projectsRef.current) return;

        projectsRef.current.scrollIntoView({
            block: 'start',
        });
    };

    useEffect(() => {
        if (!isBrowser) {
            return;
        }
        const fetchProjects = () => {
            // let url = `/api/projects.json?page=${currentPage}&search=${debouncedQuery}`;
            let url = `${API_BASE_URL}projects`;
            fetchData({
                url: url,
                onSuccess: (data) => {
                    setProjectData(data);
                },
            });
        };

        fetchProjects();

        document.addEventListener('itemDeleted', fetchProjects);

        return () => document.removeEventListener('itemDeleted', fetchProjects);
    }, [currentPage, debouncedQuery]);

    return { projectData, errors, loading, projectsRef, handlePageClick };
};

export default useFetchProjects;
