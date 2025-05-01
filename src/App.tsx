import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import AddItemForm from './components/AddItemForm/AddItemForm';
import { Alert, Container, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Routes, Route } from 'react-router-dom';
import Registration from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { AnimatePresence, m, motion, Reorder } from 'framer-motion';
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
          <Route /* element={<ProtectedRoute redirectTo="/login" />} */>
            <Route
              path="/"
              element={
                <Container
                  maxWidth={false}
                  sx={{
                    paddingTop: '80px',
                    height: '100vh',
                  }}
                >
                  <Grid
                    container
                    style={{
                      padding: '0, 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 2 }}
                    >
                      <Typography
                        sx={{ padding: '5px 45px 0 0' }}
                        variant="h4"
                        component="h1"
                        align="center"
                      >
                        ADD NEW TODO LIST
                      </Typography>
                    </motion.div>
                    <AddItemForm addItem={addTodo} style={{ width: '300px' }} />
                  </Grid>
                  <div
                    className="columnsWraper"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '35px',
                      listStyle: 'none',
                      margin: 0,
                      padding: '30px 0 0 0',
                    }}
                  >
                    {todolists.map((tl) => {
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1 }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '100%',
                          }}
                          key={tl.id}
                        >
                          <Paper
                            style={{
                              backgroundColor:
                                mode === 'dark' ? '#303030' : '#f0f0f0',
                              width: '300px',
                              overflow: 'hidden',
                              wordBreak: 'break-word',
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
                        </motion.div>
                      );
                    })}
                  </div>
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
