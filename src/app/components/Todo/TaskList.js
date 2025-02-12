import TaskItem from "./TaskItem";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function TaskList({
    tasks,
    editingTaskId,
    editedTaskText,
    startEditing,
    cancelEditing,
    saveEditedTask,
    deleteTask,
    toggleComplete,
    assignTag,
    clearTag,
    setConfirmDeleteId,
    onDragEnd
}) {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <ul
                        className="space-y-3"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {tasks.map((task, index) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                index={index}
                                editingTaskId={editingTaskId}
                                editedTaskText={editedTaskText}
                                startEditing={startEditing}
                                cancelEditing={cancelEditing}
                                saveEditedTask={saveEditedTask}
                                deleteTask={deleteTask}
                                toggleComplete={toggleComplete}
                                assignTag={assignTag}
                                clearTag={clearTag}
                                setConfirmDeleteId={setConfirmDeleteId}
                                provided = {provided}
                            />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default TaskList;
