import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Header from './components/Header/Header';
import { useTodoList } from './hooks/useTodoLists';
import NotFound from './pages/NotFound/NotFound';
import { useColorMode } from './components/ColorModeContext/ColorModeContext';
import { ErrorAlert } from './components/UI';
import { HomePage } from './components/App';
import { Box } from '@mui/material';

export const App = () => {
  const {
    todolists,
    error,
    addTodo,
    changeTodolistFilter,
    removeTodoList,
    changeTodolistTitle,
  } = useTodoList();

  const { mode } = useColorMode();

  return (
    <Box
      sx={{
        backgroundColor: mode === 'dark' ? '#303030' : '#f0f0f0',
        minHeight: '100vh',
      }}
    >
      <div className="App">
        <Header />
        {error && <ErrorAlert message={error} />}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                todolists={todolists}
                addTodo={addTodo}
                changeTodolistFilter={changeTodolistFilter}
                removeTodoList={removeTodoList}
                changeTodolistTitle={changeTodolistTitle}
              />
            }
          />
          <Route path="/login" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Box>
  );
};
