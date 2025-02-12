"use client";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoInput from "./TodoInput";
import TaskList from "./TaskList";
import FilterControls from "./FilterControls.js";
import TagFilters from "./TagFilters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faTag, faSearch } from "@fortawesome/free-solid-svg-icons";
import ConfirmationDialog from "./ConfirmationDialog";

function Todo() {
    const [tasks, setTasks] = useState(() => {
        if (typeof window !== "undefined") {
            const storedTasks = localStorage.getItem("tasks");
            return storedTasks ? JSON.parse(storedTasks) : [];
        }
        return [];
    });
    const [darkMode, setDarkMode] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTaskText, setEditedTaskText] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [tags, setTags] = useState([]); // Array of available tags
    const [selectedTag, setSelectedTag] = useState(null); // Currently selected tag
    const [error, setError] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [value, setValue] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark") {
                document.documentElement.classList.add("dark");
                setDarkMode(true);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    const toggleDarkMode = () => {
        const newTheme = darkMode ? "light" : "dark";
        document.documentElement.classList.toggle("dark");
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme);
        }
        setDarkMode(!darkMode);
    };

    const addTask = () => {
        if (value.trim()) {
            setTasks([...tasks, { id: uuidv4(), text: value, completed: false, tag: null }]);
            setValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") addTask();
    };

    const handleChange = (e) => setValue(e.target.value);

    const deleteTask = (idToRemove) => {
        setTasks(tasks.filter((task) => task.id !== idToRemove));
        setConfirmDeleteId(null); // Close the dialog after deleting
    };
    
    const openConfirmDialog = (id) => {
        setConfirmDeleteId(id);
    };
    
    const cancelConfirmDialog = () => {
        setConfirmDeleteId(null);
    };
    
    const startEditing = (taskId, taskText) => {
        setEditingTaskId(taskId);
        setEditedTaskText(taskText);
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditedTaskText("");
    };

    const saveEditedTask = (taskId, editedText) => {
      if (editedText.trim()) {
          setTasks(
              tasks.map(task =>
                  task.id === taskId ? { ...task, text: editedText } : task
              )
          );
          setEditingTaskId(null);
          setEditedTaskText("");
      } else {
          setError("Task text cannot be empty.");
          setTimeout(() => setError(null), 3000);
      }
  };

    const toggleComplete = (taskId) => {
        setTasks(
            tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleSortToggle = () => {
        if (sortBy === null) {
            setSortBy("asc");
        } else if (sortBy === "asc") {
            setSortBy("desc");
        } else {
            setSortBy(null);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const addTag = () => {
        const newTag = prompt("Enter a new tag name:");
        if (newTag && newTag.trim() !== "") {
            setTags([...tags, newTag.trim()]);
        }
    };

    const assignTag = (taskId, tag) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, tag: tag } : task
        ));
    };

    const clearTag = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, tag: null } : task
        ));
    }

    const handleTagFilterChange = (tag) => {
        setSelectedTag(tag);
    };

      const onDragEnd = useCallback((result) => {
        if (!result.destination) {
            return; // Dropped outside the list
        }

        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        const reorderedTasks = Array.from(tasks);
        const [movedTask] = reorderedTasks.splice(startIndex, 1);
        reorderedTasks.splice(endIndex, 0, movedTask);

        setTasks(reorderedTasks);
    }, [tasks]);


    const filteredTasks = tasks
        .filter((task) => {
            if (filter === "active") {
                return !task.completed;
            }
            if (filter === "completed") {
                return task.completed;
            }
            return true;
        })
        .filter((task) => {
            const searchTermLower = searchTerm.toLowerCase();
            return task.text.toLowerCase().includes(searchTermLower);
        })
        .filter((task) => {
            if (selectedTag) {
                return task.tag === selectedTag;
            }
            return true;
        })
        .sort((a, b) => {
            if (sortBy === "asc") {
                return a.text.localeCompare(b.text);
            }
            if (sortBy === "desc") {
                return b.text.localeCompare(a.text);
            }
            return 0;
        });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
            <section className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl transition-all duration-300">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
                        My Todos
                    </h1>
                    <button
                        onClick={toggleDarkMode}
                        className="p-3 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        {darkMode ? (
                            <FontAwesomeIcon icon={faSun} size="lg" />
                        ) : (
                            <FontAwesomeIcon icon={faMoon} size="lg" />
                        )}
                    </button>
                </div>

                <TodoInput
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onAdd={addTask}
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />

                <FilterControls
                    filter={filter}
                    sortBy={sortBy}
                    onFilterChange={handleFilterChange}
                    onSortToggle={handleSortToggle}
                    addTag={addTag}
                />

                  {/* Tag Filters */}
                  <TagFilters
                        tags={tags}
                        selectedTag={selectedTag}
                        onTagFilterChange={handleTagFilterChange}
                    />

<TaskList
        tasks={filteredTasks}
        editingTaskId={editingTaskId}
        editedTaskText={editedTaskText}
        startEditing={startEditing}
        cancelEditing={cancelEditing}
        saveEditedTask={saveEditedTask}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        assignTag={assignTag}
        clearTag={clearTag}
        openConfirmDialog={openConfirmDialog}
    />
    <ConfirmationDialog
    isOpen={confirmDeleteId !== null}
    onConfirm={() => deleteTask(confirmDeleteId)}
    onCancel={cancelConfirmDialog}
    message="Are you sure you want to delete this task?"
/>


                {/* Error Message and Confirmation Dialog (Implementation omitted for brevity) */}
            </section>
        </div>
    );
}

export default Todo;
