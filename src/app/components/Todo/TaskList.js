import TaskItem from "./TaskItem";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function TaskList({
    tasks,
    editingTaskId,
    editedTaskText,
    startEditing,
    cancelEditing,
    saveEditedTask,
    toggleComplete,
    assignTag,
    clearTag,
    openConfirmDialog,
    onDragEnd
}) {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks" isDropDisabled={false}>
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
                                editingTaskId={editingTaskId}
                                editedTaskText={editedTaskText}
                                startEditing={startEditing}
                                cancelEditing={cancelEditing}
                                saveEditedTask={saveEditedTask}
                                toggleComplete={toggleComplete}
                                assignTag={assignTag}
                                clearTag={clearTag}
                                openConfirmDialog={openConfirmDialog}
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