import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

function TodoInput({ value, onChange, onKeyDown, onAdd, searchTerm, onSearchChange }) {
    return (
        <>
            <div className="flex gap-2 mb-4">
                <input
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    className="flex-1 px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200 transition-shadow duration-200"
                    placeholder="What do you need to do?"
                />
                <button
                    onClick={onAdd}
                    className="px-7 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 flex items-center gap-2 font-semibold"
                >
                    <FontAwesomeIcon icon={faPlus} /> Add
                </button>
            </div>
             <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon icon={faSearch} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="block w-full pl-10 px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-200 transition-shadow duration-200"
                    />
                </div>
        </>
    );
}

export default TodoInput;