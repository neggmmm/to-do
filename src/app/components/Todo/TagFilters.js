function TagFilters({ tags, selectedTag, onTagFilterChange }) {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <button
                onClick={() => onTagFilterChange(null)}
                className={`px-3 py-1 rounded-full text-sm ${selectedTag === null
                    ? "bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    } transition-colors duration-200`}
            >
                All Tags
            </button>
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => onTagFilterChange(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${selectedTag === tag
                        ? "bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        } transition-colors duration-200`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}

export default TagFilters;