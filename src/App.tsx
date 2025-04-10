import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import AddItemForm from './components/AddItemForm/AddItemForm';
import { Alert, Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Routes, Route } from 'react-router-dom';
import Registration from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header/Header';
import { useTodoList } from './hooks/useTodoLists';
import NotFound from './pages/NotFound/NotFound';
import { useColorMode } from './components/ColorModeContext/ColorModeContext';

export function App() {
  const {
    todolists,
    error,
    addTodo,
    changeTodolistFilter,
    removeTodoList,
    changeTodolistTitle,
  } = useTodoList();

  const { mode } = useColorMode();

  const appStyle = {
    backgroundColor: mode === 'dark' ? '#303030' : '#f0f0f0',
    minHeight: '100vh',
  };

  return (
    <div style={appStyle}>
      <div className="App">
        <Header />
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
          <Route element={<ProtectedRoute redirectTo="/login" />}>
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
                      addItem={addTodo}
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
                    values={todolists}
                    onReorder={(reorderedTodoLists) => {}}
                  >
                    <AnimatePresence>
                      {todolists.map((tl) => {
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
                                changeFilter={changeTodolistFilter}
                                title={tl.title}
                                filter={tl.filter}
                                removeTodoList={removeTodoList}
                                changeTodoListTitle={changeTodolistTitle}
                                addedDate={tl.createdAt}
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
          </Route>
          <Route path="/login" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </div>
  );
}
