import { useReducer, useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './components/TodoList/TodoList';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {
  AppBar,
  Container,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import {
  addTodoListAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodoListAC,
  todoListReducer,
} from './state/todoList-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

export type FilteredValuesType = 'All' | 'Active' | 'Completed';
export type TodoListType = {
  id: string;
  title: string;
  filter: FilteredValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const todoListId1 = v1();

  const todoListId2 = v1();

  const dispatch = useDispatch();

  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(
    (state) => state.todoList
  );

  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  let [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
    [todoListId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJs', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: false },
    ],
  });

  function addTask(title: string, todoListId: string) {
    dispatch(addTaskAC(todoListId, title));
  }

  function removeTask(id: string, todoListId: string) {
    dispatch(removeTaskAC(id, todoListId));
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todoListId: string
  ) {
    dispatch(changeTaskTitleAC(todoListId, taskId, newTitle));
  }

  function changeTaskStatus(
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) {
    dispatch(changeTaskStatusAC(todoListId, taskId, isDone));
  }

  function changeFilter(value: FilteredValuesType, todoListId: string) {
    dispatch(changeTodolistFilterAC(todoListId, value));
  }

  let removeTodoList = (todoListId: string) => {
    const action = removeTodoListAC(todoListId);
    dispatch(action);
  };

  const changeTodoListTitle = (todoListId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(todoListId, newTitle));
  };

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
  };

  return (
    <div className="App">
      <AppBar position="static" color={'secondary'}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={2}>
          {todoLists.map((tl) => {
            let taskForTodoList = tasks[tl.id];

            if (tl.filter === 'Completed') {
              taskForTodoList = taskForTodoList.filter(
                (t) => t.isDone === true
              );
            }

            if (tl.filter === 'Active') {
              taskForTodoList = taskForTodoList.filter(
                (t) => t.isDone === false
              );
            }
            return (
              <Grid key={tl.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    id={tl.id}
                    changeStatus={changeTaskStatus}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    title={tl.title}
                    tasks={taskForTodoList}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
