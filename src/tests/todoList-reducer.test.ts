import { v1 } from 'uuid';
import {
  addTodoListAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodoListAC,
  todoListReducer,
} from '../state/todoList-reducer';
import { FilteredValuesType, ResponseTypeTodo } from '../types/todo.interface';

test('corrrect todo-list should be removed', () => {
  const startState: Array<ResponseTypeTodo> = [
    {
      id: '1',
      filter: 'All',
      title: 'Todo title',
      createdAt: '2025-02-27T16:28:23.417Z',
      userId: '',
      tasks: [],
    },
    {
      id: '2',
      filter: 'All',
      title: 'Todo title 2',
      createdAt: '2025-02-27T16:28:23.417Z',
      userId: '',
      tasks: [],
    },
  ];

  const action = removeTodoListAC('1');
  const endState = todoListReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe('2');
});

test('correct todo-list should be added', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle: ResponseTypeTodo = {
    id: '1',
    filter: 'All',
    title: 'New TodoList Title',
    createdAt: '',
    userId: '',
    tasks: [],
  };

  const startState: Array<ResponseTypeTodo> = [
    {
      id: todoListId1,
      filter: 'All',
      title: 'Todo title 1',
      createdAt: '',
      userId: '',
      tasks: [],
    },
    {
      id: todoListId2,
      filter: 'All',
      title: 'Todo title 2',
      createdAt: '',
      userId: '',
      tasks: [],
    },
  ];

  const endState = todoListReducer(startState, addTodoListAC(newTodoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[endState.length - 1].title).toBe(newTodoListTitle.title);
  expect(endState[0].filter).toBe('All');
});

test('correct todo-list should change its name', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = 'New Todo List';

  const startState: Array<ResponseTypeTodo> = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'All',
      createdAt: '',
      userId: '',
      tasks: [],
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'All',
      createdAt: '',
      userId: '',
      tasks: [],
    },
  ];

  const endState = todoListReducer(
    startState,
    changeTodolistTitleAC(todoListId2, newTodoListTitle)
  );

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todoList should changed', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newFilter: FilteredValuesType = 'Completed';

  const startState: Array<ResponseTypeTodo> = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'All',
      createdAt: '',
      userId: '',
      tasks: [],
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'All',
      createdAt: '',
      userId: '',
      tasks: [],
    },
  ];

  const endState = todoListReducer(
    startState,
    changeTodolistFilterAC(todoListId2, newFilter)
  );

  expect(endState[0].filter).toBe('All');
  expect(endState[1].filter).toBe(newFilter);
});
