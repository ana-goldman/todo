import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type TodoItemType = {
  id: number;
  name: string;
  completed: boolean;
};

export const useTodoList = () => {
  const { getItem, setItem } = useLocalStorage();
  const [tasks, setTasks] = useState<TodoItemType[]>(getItem('tasks') ?? []);

  useEffect(() => {
    setItem(tasks);
  }, [setItem, tasks]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), name: text, completed: false }]);
  };

  const deleteTask = (id: number) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id: number) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleCompleted,
  };
};
