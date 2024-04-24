import { renderHook, act } from '@testing-library/react';
import { useTodoList } from './useTodoList';
import { useLocalStorage } from './useLocalStorage';

let storage: { [key: string]: any } = {};

jest.mock('./useLocalStorage', () => {
  const mockedGetItem = jest.fn((key: string) => storage[key]);
  const mockedSetItem = jest.fn((value: any) => {
    storage['tasks'] = value;
  });
  return {
    __esModule: true,
    useLocalStorage: () => ({
      getItem: mockedGetItem,
      setItem: mockedSetItem,
    }),
    storage,
  };
});

const mockedUseLocalStorage = useLocalStorage as jest.MockedFunction<typeof useLocalStorage>;
const { getItem, setItem } = mockedUseLocalStorage();

describe('useTodoList', () => {
  beforeEach(() => {
    storage = {};
  });

  test('loads the initial state from localStorage if available', () => {
    renderHook(() => useTodoList());

    expect(getItem).toHaveBeenCalledWith('tasks');
  });

  test('adding todos updates localStorage', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.addTask('todo 1');
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks).toContainEqual({
      id: expect.any(Number),
      name: 'todo 1',
      completed: false,
    });
  });

  test('removing todos updates localStorage', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.addTask('todo 1');
    });

    act(() => {
      result.current.addTask('todo 2');
    });

    const taskToDelete = result.current.tasks[0].id;

    act(() => {
      result.current.deleteTask(taskToDelete);
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks).not.toContainEqual(taskToDelete);
  });

  test('toggling comletion updates localStorage', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.addTask('todo 1');
    });

    act(() => {
      result.current.toggleCompleted(result.current.tasks[0].id);
    });

    expect(result.current.tasks[0]).toEqual({
      id: result.current.tasks[0].id,
      name: 'todo 1',
      completed: true,
    });
  });
});
