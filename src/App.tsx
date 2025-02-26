import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {
  Alert,
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
  setTodoListsAC,
} from './state/todoList-reducer';

import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import TestRequest from './components/TestRequest';
import { todoListsApi } from './api/todoListsApi';
import { TaskType } from './api/taskListApi';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { motion } from 'framer-motion';

export type FilteredValuesType = 'All' | 'Active' | 'Completed';
export type TodoListType = {
  id: string;
  title: string;
  filter: FilteredValuesType;
  addedDate: string;
  order: number;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await todoListsApi.getTodoLists();
        dispatch(setTodoListsAC(response.data));
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(
    (state) => state.todoList || []
  );

  const changeFilter = useCallback(
    (value: FilteredValuesType, todoListId: string) => {
      dispatch(changeTodolistFilterAC(todoListId, value));
    },
    [dispatch]
  );

  const removeTodoList = useCallback(
    async (todoListId: string) => {
      try {
        await todoListsApi.deleteTodoList(todoListId);
        setData((prevData: any[]) => {
          return prevData.filter((todo) => todo.id !== todoListId);
        });
      } catch (error: any) {
        setError(error.message);
        console.log(error);
      }
      const action = removeTodoListAC(todoListId);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodoListTitle = useCallback(
    async (todoListId: string, newTitle: string) => {
      try {
        await todoListsApi.updateTodoListTitle(todoListId, newTitle);
      } catch (error: any) {
        setError(error.message);
      }
      dispatch(changeTodolistTitleAC(todoListId, newTitle));
    },
    [dispatch]
  );

  const addTodoList = useCallback(
    async (title: string) => {
      try {
        const response = await todoListsApi.createTodoList(title);
        const newTodo = response.data;
        setData((prevData: any[]) => {
          const exists = prevData.some(
            (todo) => todo.id === newTodo.data.item.id
          );
          return exists ? prevData : [...prevData, newTodo];
        });
      } catch (error: any) {
        setError(error.message);
        console.log(error);
      }
      const action = addTodoListAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <BrowserRouter>
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
        {/*  <Alert severity="error">{error}</Alert> */}
        <Routes>
          <Route
            path="/"
            element={
              <Container fixed>
                <Grid
                  container
                  style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    alignItems: 'center',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2 }}
                  >
                    <Typography variant="h4" component="h1" align="center">
                      ADD NEW TODO LIST
                    </Typography>
                  </motion.div>
                  <AddItemForm
                    addItem={addTodoList}
                    style={{ marginBottom: '30px', width: '300px' }}
                  />
                </Grid>
                <Grid container spacing={2}>
                  {todoLists.map((tl) => {
                    return (
                      <Grid key={tl.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper style={{ padding: '10px' }}>
                          <TodoList
                            errorMessage={error}
                            setErrorMessage={setError}
                            id={tl.id}
                            changeFilter={changeFilter}
                            title={tl.title}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                            changeTodoListTitle={changeTodoListTitle}
                            addedDate={tl.addedDate}
                            order={tl.order}
                          />
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </Container>
            }
          />
          <Route path="/login" element={<Registration />} />
          <Route path="*" element={<div>404: PAGE NOT FOUND</div>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>

        {/*  <TestRequest /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
function setData(arg0: (prevData: any[]) => any[]) {
  throw new Error('Function not implemented.');
}
