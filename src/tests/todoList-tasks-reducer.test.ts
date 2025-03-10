import { TasksStateType, TodoListType } from '../App';
import { tasksReducer } from '../state/tasks-reducer';
import {
  addTodoListAC,
  removeTodoListAC,
  todoListReducer,
} from '../state/todoList-reducer';

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

  const action = removeTodoListAC('todoListId2');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todoListId2']).toBeUndefined();
});
