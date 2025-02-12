export const getTasksFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    }
    return [];
  };
  
  export const saveTasksToLocalStorage = (tasks) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };
  
  