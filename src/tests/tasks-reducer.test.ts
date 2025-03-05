import {
  addTaskAC,
  changeTaskDeadlineAC,
  changeTaskPriorityAC,
  changeTaskStatusAC,
  removeTaskAC,
} from '../state/tasksState/taskActionCreators';
import { tasksReducer } from '../state/tasksState/tasks-reducer';
import { TasksStateType } from '../types/todo.interface';

test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    todoListId1: [
      {
        id: 1,
        title: 'Tesk NOT important',
        description: 'Its not important task',
        completed: false,
        endDate: '2025-02-27T16:33:37.861Z',
        date: new Date('2025-02-27T16:33:37.861Z'),
        todoId: 'todoListId1',
        order: 0,
        userId: '1',
        priority: 'MEDIUM',
        status: 'PENDING',
      },
      {
        id: 2,
        title: 'Tesk NOT important',
        description: 'Its not important task',
        completed: false,
        endDate: '2025-02-27T16:33:37.861Z',
        date: new Date('2025-02-27T16:33:37.861Z'),
        todoId: 'todoListId2',
        order: 0,
        userId: '1',
        priority: 'MEDIUM',
        status: 'PENDING',
      },
    ],
  };

  const action = removeTaskAC(2, 'todoListId1');

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'].length).toBe(1);
  expect(endState['todoListId1'].every((t) => t.id !== 2)).toBeTruthy();
});

test('correct task should be added to the correct array', () => {
  const startState: TasksStateType = {
    todoListId1: [
      {
        id: 1,
        title: 'Tesk NOT important',
        description: 'Its not important task',
        completed: false,
        endDate: '2025-02-27T16:33:37.861Z',
        date: new Date('2025-02-27T16:33:37.861Z'),
        todoId: 'todoListId1',
        order: 0,
        userId: '1',
        priority: 'MEDIUM',
        status: 'PENDING',
      },
    ],
  };

  const newTask = {
    id: 2,
    title: 'React',
    description: 'Its not important task',
    completed: false,
    endDate: '2025-02-27T16:33:37.861Z',
    date: new Date('2025-02-27T16:33:37.861Z'),
    todoId: 'todoListId1',
    order: 0,
    userId: '1',
    priority: 'Low',
    status: 'PENDING',
  };

  const action = addTaskAC('todoListId1', newTask);
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'].length).toBe(2);
  expect(endState['todoListId1'][1].title).toBe('React');
});

test('status specified task should be changed', () => {
  const startState: TasksStateType = {
    todoListId1: [
      {
        id: 1,
        title: 'React',
        description: 'Its not important task',
        completed: false,
        endDate: '2025-02-27T16:33:37.861Z',
        date: new Date('2025-02-27T16:33:37.861Z'),
        todoId: 'todoListId1',
        order: 0,
        userId: '1',
        priority: 'Low',
        status: 'PENDING',
      },
    ],
  };

  const action = changeTaskStatusAC('todoListId1', 1, true);
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'][0].completed).toBe(true);
});

test('correct task priority should be changed', () => {
  const startState: TasksStateType = {
    todoListId1: [
      {
        id: 1,
        title: 'React',
        description: 'Its not important task',
        completed: false,
        endDate: '2025-02-27T16:33:37.861Z',
        date: new Date('2025-02-27T16:33:37.861Z'),
        todoId: 'todoListId1',
        order: 0,
        userId: '1',
        priority: 'Low',
        status: 'PENDING',
      },
    ],
  };

  const action = changeTaskPriorityAC('todoListId1', 1, 'High');
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'][0].priority).toBe('High');
});

test('correct task deadline should be changed', () => {
  const startState: TasksStateType = {
    todoListId1: [
      {
        id: 1,
        title: 'React',
        description: 'Its not important task',
        completed: false,
        endDate: '2025-02-27T16:33:37.861Z',
        date: new Date('2025-02-27T16:33:37.861Z'),
        todoId: 'todoListId1',
        order: 0,
        userId: '1',
        priority: 'Low',
        status: 'PENDING',
      },
    ],
  };

  const action = changeTaskDeadlineAC('todoListId1', 1, '2025-12-31');
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'][0].endDate).toBe('2025-12-31');
});
