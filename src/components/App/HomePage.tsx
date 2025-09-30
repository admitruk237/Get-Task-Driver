import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddItemForm from '../AddItemForm/AddItemForm';
import PageTitle from '../PageTitle/PageTitle';
import TodoListsGrid from './TodoListsGrid';
import {
  FilteredValuesType,
  ResponseTypeTodo,
} from '../../types/todo.interface';

type Props = {
  todolists: ResponseTypeTodo[];
  addTodo: (title: string) => void;
  changeTodolistFilter: (value: FilteredValuesType, todoListId: string) => void;
  removeTodoList: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

const HomePage = ({
  todolists,
  addTodo,
  changeTodolistFilter,
  removeTodoList,
  changeTodolistTitle,
}: Props) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        paddingTop: '80px',
        height: '100vh',
      }}
    >
      <Grid
        container
        sx={{
          padding: '0, 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PageTitle title="ADD NEW TODO LIST" />
        <AddItemForm addItem={addTodo} style={{ width: '300px' }} />
      </Grid>

      <TodoListsGrid
        todolists={todolists}
        changeTodolistFilter={changeTodolistFilter}
        removeTodoList={removeTodoList}
        changeTodolistTitle={changeTodolistTitle}
      />
    </Container>
  );
};

export default HomePage;
