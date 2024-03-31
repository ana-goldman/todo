import { renderHook, act } from '@testing-library/react';
import { useTodoList } from './useTodoList';

const mockLocalStorage = JSON.stringify([
  { id: 1, name: 'todo 1', completed: false },
  { id: 2, name: 'todo 2', completed: true },
]);

localStorage.setItem('tasks', mockLocalStorage);

test('loads the initial state from localStorage if available', () => {
  const { result } = renderHook(() => useTodoList());

  expect(result.current.tasks).toEqual(JSON.parse(mockLocalStorage));
});

test('toggling updates complition', () => {
  const { result } = renderHook(() => useTodoList());

  act(() => result.current.toggleCompleted(2));
  const updatedTasks = result.current.tasks;
  const updatedLocalStorage = localStorage.getItem('tasks');
  const parsedUpdatedLocalStorage = updatedLocalStorage ? JSON.parse(updatedLocalStorage) : null;

  expect(updatedTasks).toEqual([
    { id: 1, name: 'todo 1', completed: false },
    { id: 2, name: 'todo 2', completed: false },
  ]);
  expect(parsedUpdatedLocalStorage).toEqual([
    { id: 1, name: 'todo 1', completed: false },
    { id: 2, name: 'todo 2', completed: false },
  ]);
});

test('removing tasks updates both state and localStorage', () => {
  const { result } = renderHook(() => useTodoList());

  act(() => result.current.deleteTask(2));
  const updatedTasks = result.current.tasks;
  const updatedLocalStorage = localStorage.getItem('tasks');
  const parsedUpdatedLocalStorage = updatedLocalStorage ? JSON.parse(updatedLocalStorage) : null;

  expect(updatedTasks).not.toContainEqual({ id: 2, name: 'todo 2', completed: true });
  expect(parsedUpdatedLocalStorage).toEqual([{ id: 1, name: 'todo 1', completed: false }]);
});

test('adding todos updates localStorage', () => {
  const { result } = renderHook(() => useTodoList());

  act(() => result.current.addTask('todo 3'));
  const updatedLocalStorage = localStorage.getItem('tasks');
  const parsedUpdatedLocalStorage = updatedLocalStorage ? JSON.parse(updatedLocalStorage) : null;

  expect(parsedUpdatedLocalStorage).toContainEqual({
    id: expect.any(Number),
    name: 'todo 3',
    completed: false,
  });
});

test('localStorage Interaction, setItem', () => {
  const mockLocalStorage: Record<string, string> = {};

  const localStorageMock: { setItem: jest.Mock<void, [string, string]> } = {
    setItem: jest.fn((key: string, value: string) => {
      (mockLocalStorage as Record<string, string>)[key] = value.toString();
    }),
  };

  const windowSpy = jest.spyOn(localStorageMock, 'setItem');

  const newTask = { id: Date.now(), text: 'New Task', completed: false };
  localStorageMock.setItem('tasks', JSON.stringify([newTask]));

  expect(windowSpy).toHaveBeenCalledWith('tasks', JSON.stringify([newTask]));
});
