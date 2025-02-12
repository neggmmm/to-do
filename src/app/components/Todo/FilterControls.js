import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faSortAlphaUp, faTag } from "@fortawesome/free-solid-svg-icons";

function FilterControls({ filter, sortBy, onFilterChange, onSortToggle, addTag }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <button
                    onClick={() => onFilterChange("all")}
                    className={`px-3 py-1 rounded-md text-sm ${filter === "all"
                        ? "bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        } transition-colors duration-200`}
                >
                    All
                </button>
                <button
                    onClick={() => onFilterChange("active")}
                    className={`px-3 py-1 rounded-md text-sm ${filter === "active"
                        ? "bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        } transition-colors duration-200`}
                >
                    Active
                </button>
                <button
                    onClick={() => onFilterChange("completed")}
                    className={`px-3 py-1 rounded-md text-sm ${filter === "completed"
                        ? "bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        } transition-colors duration-200`}
                >
                    Completed
                </button>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onSortToggle}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
                >
                    {sortBy === null && <FontAwesomeIcon icon={faSortAlphaDown} />}
                    {sortBy === "asc" && <FontAwesomeIcon icon={faSortAlphaUp} />}
                    {sortBy === "desc" && <FontAwesomeIcon icon={faSortAlphaDown} />}
                </button>
                <button
                    onClick={addTag}
                    className="px-3 py-1 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                    <FontAwesomeIcon icon={faTag} className="mr-1" /> Add Tag
                </button>
            </div>
        </div>
    );
}

export default FilterControls;