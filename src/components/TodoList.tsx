import { useState } from 'react';
import TodoItem from './TodoItem';
import { useTodoList } from '../hooks/useTodoList';

const TodoList = () => {
  const { tasks, addTask, deleteTask, toggleCompleted } = useTodoList();

  const [text, setText] = useState<string>('');

  return (
    <>
      <div>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </div>

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => addTask(text)}>Add</button>
    </>
  );
};

export default TodoList;
