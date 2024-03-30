const TodoItem = ({
  task,
  deleteTask,
  toggleCompleted,
}: {
  task: { id: number; name: string; completed: boolean };
  deleteTask: (id: number) => void;
  toggleCompleted: (id: number) => void;
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input type='checkbox' checked={task.completed} onChange={() => toggleCompleted(task.id)} />
      <p>{task.name}</p>
      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  );
};

export default TodoItem;
