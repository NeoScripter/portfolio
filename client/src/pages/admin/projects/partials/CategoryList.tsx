import { useFetch } from '@/hooks/useFetch';
import useFetchCategories from '@/hooks/useFetchCategories';
import { API_BASE_URL } from '@/lib/const/api';
import { events } from '@/lib/const/events';
import { X } from 'lucide-preact';
import { toast } from 'sonner';
import CategoryCreate from './CategoryCreate';
import { hasErrorDetails } from '@/lib/helpers/utils';

const CategoryList = () => {
    const { errors, categories } = useFetchCategories();

    const { fetchData } = useFetch();

    async function handleDelete(id: number) {
        await fetchData({
            url: `${API_BASE_URL}categories/${id}`,
            method: 'DELETE',
            onSuccess: (data) => {
                toast.success(data.message ?? 'Success!');
                window.dispatchEvent(new Event(events.FORM_SUCCESS_EVENT));
            },
            onError: () => toast.error('Error'),
        });
    }

    if (hasErrorDetails(errors)) {
        return <div className="text-red-500">Error fetching categories :(</div>;
    }

    return (
        <div>
            <ul className="mb-6 grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))] gap-2">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="flex items-center justify-between gap-1 rounded border p-2"
                    >
                        <span className="grid">
                            <span>{category.name?.en}</span>
                            <span className="text-sm text-gray-500">
                                {category.name?.ru}
                            </span>
                        </span>
                        <button
                            onClick={() => handleDelete(category.id)}
                            className="rounded bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                        >
                            <X size={16} />
                        </button>
                    </li>
                ))}
                {categories.length === 0 && (
                    <p className="text-sm">There are no categories</p>
                )}
            </ul>

            <h3 className="mb-4 text-lg font-bold">Add Category</h3>
            <CategoryCreate />
        </div>
    );
};

export default CategoryList;
