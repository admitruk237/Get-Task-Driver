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
        {
          id: '1', title: 'HTML&CSS', 
          description: '',
          status: 1,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
        {
          id: '2', title: 'JS', 
          description: '',
          status: 1,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
        {
          id: '3', title: 'ReactJs',
          description: '',
          status: 0,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
      ],
    // prettier-ignore
    'todoListId2': [
        {
          id: '1', title: 'Book', 
          description: '',
          status: 0,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
        {
          id: '2', title: 'Milk', 
          description: '',
          status: 1,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
        {
          id: '3', title: 'Tea', 
          description: '',
          status: 0,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
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
        {
          id: '1', title: 'HTML&CSS', 
          description: '',
          status: 1,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
        {
          id: '2', title: 'JS', 
          description: '',
          status: 1,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
        {
          id: '3', title: 'ReactJs',
          description: '',
          status: 0,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
      ],
    // prettier-ignore
    'todoListId2': [
        {
          id: '1', title: 'Book', 
          description: '',
          status: 0,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
        {
          id: '2', title: 'Milk', 
          description: '',
          status: 0,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
        {
          id: '3', title: 'Tea', 
          description: '',
          status: 0,
          priority: 0,
          startDate: '',
          deadline: '',
          todoListId: '',
          order: 0,
          addedDate: ''
        },
      ],
  };

  const newTask = {
    id: '4',
    title: 'Coffee',
    description: '',
    status: 0,
    priority: 0,
    startDate: '',
    deadline: '',
    todoListId: '',
    order: 0,
    addedDate: '',
  };

  const action = addTaskAC('todoListId2', newTask);
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'].length).toBe(3);
  expect(endState['todoListId2'].length).toBe(4);
  expect(endState['todoListId2'][0].id).toBeDefined();
  expect(endState['todoListId2'][0].title).toBe(newTask.title);
  expect(endState['todoListId2'][0].status).toBe(0);
});

test('status specified task should be changed', () => {
  const startState: TasksStateType = {
    // prettier-ignore
    'todoListId1': [
          {
            id: '1', title: 'HTML&CSS', 
            description: '',
            status: 1,
            priority: 0,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0,
            addedDate: ''
          },
          {
            id: '2', title: 'JS', 
            description: '',
            status: 1,
            priority: 0,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0,
            addedDate: ''
          },
          {
            id: '3', title: 'ReactJs',
            description: '',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0,
            addedDate: ''
          },
        ],
    // prettier-ignore
    'todoListId2': [
          {
            id: '1', title: 'Book', 
            description: '',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0,
            addedDate: ''
          },
          {
            id: '2', title: 'Milk', 
            description: '',
            status: 1,
            priority: 0,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0,
            addedDate: ''
          },
          {
            id: '3', title: 'Tea', 
            description: '',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0,
            addedDate: ''
          },
        ],
  };

  const action = changeTaskStatusAC('todoListId1', '2', 0);
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'][2].status).toBe(0);
  expect(endState['todoListId2'][1].status).toBe(1);
});

test('correct task from  correct array should change its name', () => {
  const startState: TasksStateType = {
    // prettier-ignore
    'todoListId1': [
            {
              id: '1', title: 'HTML&CSS', 
              description: '',
              status: 1,
              priority: 0,
              startDate: '',
              deadline: '',
              todoListId: '',
              order: 0,
              addedDate: ''
            },
            {
              id: '2', title: 'JS',
              description: '',
              status: 1,
              priority: 0,
              startDate: '',
              deadline: '',
              todoListId: '',
              order: 0,
              addedDate: ''
            },
            {
              id: '3', title: 'ReactJs', 
              description: '',
              status: 0,
              priority: 0,
              startDate: '',
              deadline: '',
              todoListId: '',
              order: 0,
              addedDate: ''
            },
          ],
    // prettier-ignore
    'todoListId2': [
            {
              id: '1', title: 'Book', 
              description: '',
              status: 0,
              priority: 0,
              startDate: '',
              deadline: '',
              todoListId: '',
              order: 0,
              addedDate: ''
            },
            {
              id: '2', title: 'Milk', 
              description: '',
              status: 1,
              priority: 0,
              startDate: '',
              deadline: '',
              todoListId: '',
              order: 0,
              addedDate: ''
            },
            {
              id: '3', title: 'Tea',
              description: '',
              status: 0,
              priority: 0,
              startDate: '',
              deadline: '',
              todoListId: '',
              order: 0,
              addedDate: ''
            },
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
              {
                id: '1', title: 'HTML&CSS', 
                description: '',
                status: 1,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
              },
              {
                id: '2', title: 'JS', 
                description: '',
                status: 1,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
              },
              {
                id: '3', title: 'ReactJs', 
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
              },
            ],
    // prettier-ignore
    'todoListId2': [
              {
                id: '1', title: 'Book', 
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
              },
              {
                id: '2', title: 'Milk', 
                description: '',
                status: 1,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
              },
              {
                id: '3', title: 'Tea', 
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
              },
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
