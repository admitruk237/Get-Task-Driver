import { TasksStateType, TodoListType } from '../App';
import { tasksReducer } from './tasks-reducer';
import {
  addTodoListAC,
  removeTodoListAC,
  todoListReducer,
} from './todoList-reducer';

test('ids should be equals', () => {
  const startTaskState: TasksStateType = {};
  const startTodoListState: Array<TodoListType> = [];

  const action = addTodoListAC('new todoList');
  const endTaskState = tasksReducer(startTaskState, action);
  const endTodoListState = todoListReducer(startTodoListState, action);

  const keys = Object.keys(endTaskState);
  const idFromTask = keys[0];
  const idFromTodoList = endTodoListState[0].id;

  expect(idFromTask).toBe(action.id);
  expect(idFromTodoList).toBe(action.id);
});

test('property with todoList should be deleted', () => {
  const startState: TasksStateType = {
    // prettier-ignore
    'todoListId1': [
                  { id: '1', title: 'HTML&CSS', isDone: true },
                  { id: '2', title: 'JS', isDone: true },
                  { id: '3', title: 'ReactJs', isDone: false },
                ],
    // prettier-ignore
    'todoListId2': [
                  { id: '1', title: 'Book', isDone: false },
                  { id: '2', title: 'Milk', isDone: true },
                  { id: '3', title: 'Tea', isDone: false },
                ],
  };

  const action = removeTodoListAC('todoListId2');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todoListId2']).toBeUndefined();
});
