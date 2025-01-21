import './App.css';
import { TodoList, TaskType } from './components/TodoList/TodoList';
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
} from './state/todoList-reducer';

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
  const dispatch = useDispatch();

  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(
    (state) => state.todoList
  );

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
            return (
              <Grid key={tl.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    id={tl.id}
                    changeFilter={changeFilter}
                    title={tl.title}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
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
