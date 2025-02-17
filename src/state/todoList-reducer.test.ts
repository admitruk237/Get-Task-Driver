import {
  addTodoListAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodoListAC,
  todoListReducer,
} from './todoList-reducer';
import { v1 } from 'uuid';
import { FilteredValuesType, TodoListType } from '../App';

test('correct todo-list should be removed', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const startState: Array<TodoListType> = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'All',
      addedDate: '12.05.24',
      order: 0,
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'All',
      addedDate: '11.9.24',
      order: 1,
    },
  ];

  const endState = todoListReducer(startState, removeTodoListAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test('correct todo-list should be added', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = 'New Todo List';

  const startState: Array<TodoListType> = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'All',
      addedDate: '23.12.24',
      order: 0,
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'All',
      addedDate: '23.12.26',
      order: 1,
    },
  ];

  const endState = todoListReducer(startState, addTodoListAC(newTodoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodoListTitle);
  expect(endState[0].filter).toBe('All');
});

test('correct todo-list should change its name', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = 'New Todo List';

  const startState: Array<TodoListType> = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'All',
      addedDate: '23.12.24',
      order: 0,
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'All',
      addedDate: '23.12.27',
      order: 1,
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

  const startState: Array<TodoListType> = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'All',
      addedDate: '23.12.24',
      order: 0,
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'All',
      addedDate: '23.12.27',
      order: 1,
    },
  ];

  const endState = todoListReducer(
    startState,
    changeTodolistFilterAC(todoListId2, newFilter)
  );

  expect(endState[0].filter).toBe('All');
  expect(endState[1].filter).toBe(newFilter);
});
