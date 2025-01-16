import { TasksStateType } from '../App';
import {
  addTaskAC,
  changeTaskStatusAC,
  removeTaskAC,
  tasksReducer,
} from './tasks-reducer';

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
