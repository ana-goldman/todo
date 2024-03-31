import { renderHook, act } from '@testing-library/react';
import { useTodoList } from './useTodoList';

const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
const getItemMock = jest.spyOn(Storage.prototype, 'getItem');

describe('useTodoList', () => {
  test('loads the initial state from localStorage if available', () => {
    renderHook(() => useTodoList());
    expect(getItemMock).toHaveBeenCalledWith('tasks');
  });
});
