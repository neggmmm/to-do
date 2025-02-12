import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit, faCheck, faTimes, faTag } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from 'react-beautiful-dnd';

function TaskItem({
    task,
    index,
    editingTaskId,
    editedTaskText,
    startEditing,
    cancelEditing,
    saveEditedTask,
    deleteTask,
    toggleComplete,
    assignTag,
    clearTag,
    setConfirmDeleteId
}) {
      const [localEditedText, setLocalEditedText] = useState(editedTaskText);
    const inputRef = useRef(null);
        useEffect(() => {
        if (editingTaskId === task.id && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingTaskId, task.id]);
     const handleEditInputChange = (e) => {
        setLocalEditedText(e.target.value);
    };
    return (

         <li
            className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-5 py-3 rounded-xl shadow-md transition-all duration-200"
           >
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="mr-3 h-5 w-5 text-purple-600 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600 rounded"
                />
                {editingTaskId === task.id ? (
                    <input
                        type="text"
                        ref={inputRef}
                        value={localEditedText}
                        onChange={handleEditInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                    />
                ) : (
                    <label
                        htmlFor={`task-${task.id}`}
                        className={`text-gray-700 dark:text-gray-200 ${task.completed ? "line-through opacity-50" : ""
                            } cursor-pointer`}
                    >
                        {task.text}
                    </label>
                )}
            </div>

            <div className="flex items-center gap-2">
                {/* Tag Display and Assignment */}
                {task.tag && (
                    <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-600 text-purple-700 dark:text-purple-100 text-xs font-medium mr-2">
                        {task.tag}
                    </span>
                )}
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent li click
                            const tag = prompt("Enter a tag to assign, or leave blank to clear:");
                            if (tag === null) return; // user clicked cancel
                            if (tag.trim() === "") {
                                clearTag(task.id);
                            } else {
                                assignTag(task.id, tag);
                            }
                        }}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faTag} size="lg" />
                    </button>
                </div>
                {editingTaskId === task.id ? (
                    <>
                        <button
                            onClick={() => saveEditedTask(task.id, localEditedText)}
                            className="text-green-500 hover:text-green-700 transition-colors duration-200 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={faCheck} size="lg" />
                        </button>
                        <button
                            onClick={cancelEditing}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={faTimes} size="lg" />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => startEditing(task.id, task.text)}
                            className="text-blue-500 hover:text-blue-700 transition-colors duration-200 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={faEdit} size="lg" />
                        </button>
                        <button
                            onClick={() => setConfirmDeleteId(task.id)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={faTrashCan} size="lg" />
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}

export default TaskItem;
