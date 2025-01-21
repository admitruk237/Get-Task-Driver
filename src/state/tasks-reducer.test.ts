import { TasksStateType } from '../AppWithRedux';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './tasks-reducer';
import { addTodoListAC } from './todoList-reducer';

test('correct task should be deleted from  correct array', () => {
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
      { id: '2', title: 'Milk', isDone: false },
      { id: '3', title: 'Tea', isDone: false },
    ],
  };

  const action = removeTaskAC('2', 'todoListId2');
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'].length).toBe(3);
  expect(endState['todoListId2'].length).toBe(2);
  expect(endState['todoListId2'].every((t) => t.id != '2')).toBeTruthy();
});

test('correct task should be added to the correct array', () => {
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
        { id: '2', title: 'Milk', isDone: false },
        { id: '3', title: 'Tea', isDone: false },
      ],
  };

  const newTaskTitle = 'juice';

  const action = addTaskAC('todoListId2', newTaskTitle);
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'].length).toBe(3);
  expect(endState['todoListId2'].length).toBe(4);
  expect(endState['todoListId2'][0].id).toBeDefined;
  expect(endState['todoListId2'][0].title).toBe(newTaskTitle);
  expect(endState['todoListId2'][0].isDone).toBe(false);
});

test('status specified task should be changed', () => {
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

  const action = changeTaskStatusAC('todoListId1', '2', false);
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'][1].isDone).toBe(false);
  expect(endState['todoListId2'][1].isDone).toBe(true);
});

test('correct task from  correct array should change its name', () => {
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
  const newTaskTitle = 'Pyton';
  const action = changeTaskTitleAC('todoListId1', '3', newTaskTitle);
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'][2].title).toBe(newTaskTitle);
  expect(endState['todoListId2'][2].title).toBe('Tea');
});

test('new array should be added when todo-list was added', () => {
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
  const action = addTodoListAC('new Todo list');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != 'todoListId1' && k != 'todoListId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});
