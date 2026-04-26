import { X } from 'lucide-preact';
import { categories } from '../data';
import CategoryCreate from './CategoryUpsert';

const CategoryList = () => {
    return (
        <div>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 mb-6">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="flex items-center justify-between gap-1 rounded border px-2"
                    >
                        <span className="grid">
                            <span>{category.name_en}</span>
                            <span className="text-sm text-gray-500">
                                {category.name_ru}
                            </span>
                        </span>
                        <button
                            // onClick={() => handleDelete(cat.id)}
                            className="rounded bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                        >
                            <X size={16} />
                        </button>
                    </li>
                ))}
                {categories.length === 0 && (
                    <p className="text-sm text-gray-400">No items left.</p>
                )}
            </ul>

            <h3 className="mb-4 text-lg font-bold">Add Category</h3>
            <CategoryCreate />
        </div>
    );
};

export default CategoryList;
