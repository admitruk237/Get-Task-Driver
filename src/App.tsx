import { useCallback, useEffect, useState } from 'react';
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
import Registration from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { setErrorAC, setErrorMessageDeleteAC } from './state/error-reducer';

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

  const error = useSelector<AppRootStateType, string | null>(
    (state) => state.error.error
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await todoListsApi.getTodoLists();
        dispatch(setTodoListsAC(response.data));
      } catch (error: any) {
        dispatch(setErrorAC(error.message));
        setTimeout(() => {
          dispatch(setErrorMessageDeleteAC(''));
        }, 3000);
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
        dispatch(setErrorAC(error.message));
        setTimeout(() => {
          dispatch(setErrorMessageDeleteAC(''));
        }, 3000);
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
        dispatch(setErrorAC(error.message));
        setTimeout(() => {
          dispatch(setErrorMessageDeleteAC(''));
        }, 3000);
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
        dispatch(setErrorAC(error.message));
        setTimeout(() => {
          dispatch(setErrorMessageDeleteAC(''));
        }, 3000);
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
        {error && (
          <motion.div
            initial={{ opacity: 0, right: '-300px', top: 60 }}
            animate={{ opacity: 1, right: '10px' }}
            transition={{ duration: 1 }}
            style={{ position: 'absolute', width: 300 }}
          >
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          </motion.div>
        )}
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
                <Reorder.Group
                  style={{
                    display: 'flex',
                    gap: '20px',
                    listStyle: 'none',
                    flexWrap: 'wrap',
                  }}
                  axis="x"
                  values={todoLists}
                  onReorder={(reorderedTodoLists) => {
                    // Ensure the reordered items maintain their order in the state
                    const updatedTodoLists = reorderedTodoLists.map(
                      (tl, index) => ({
                        ...tl,
                        order: index, // Update order based on the new index
                      })
                    );
                    dispatch(setTodoListsAC(updatedTodoLists)); // Update the state
                  }}
                >
                  <AnimatePresence>
                    {todoLists.map((tl) => {
                      return (
                        <Reorder.Item
                          key={tl.id}
                          value={tl}
                          style={{ flex: '0 0 30%' }}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1 }}
                          drag
                        >
                          <Paper
                            style={{
                              padding: '10px',
                              backgroundColor: '#fbfcfd',
                            }}
                          >
                            <TodoList
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
                        </Reorder.Item>
                      );
                    })}
                  </AnimatePresence>
                </Reorder.Group>
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
