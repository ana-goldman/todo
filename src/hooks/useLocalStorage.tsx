import { TodoItemType } from './useTodoList';

export const useLocalStorage = () => {
  const getItem = (key: string): TodoItemType[] => {
    const tasksFromStorage = localStorage.getItem(key);
    return tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
  };

  const setItem = (tasks: TodoItemType[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  return {
    getItem,
    setItem,
  };
};
