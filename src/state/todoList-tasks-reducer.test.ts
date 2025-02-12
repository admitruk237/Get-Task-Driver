import { TasksStateType, TodoListType } from '../AppWithRedux';
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
                  {
                    id: '1', title: 'HTML&CSS',  
                    description: '',
                    status: true,
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
                    status: true,
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
                    status: false,
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
                    status: false,
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
                    status: true,
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
                    status: false,
                    priority: 0,
                    startDate: '',
                    deadline: '',
                    todoListId: '',
                    order: 0,
                    addedDate: ''
                  },
                ],
  };

  const action = removeTodoListAC('todoListId2');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todoListId2']).toBeUndefined();
});
