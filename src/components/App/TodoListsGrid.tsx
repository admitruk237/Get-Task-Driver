import {
  FilteredValuesType,
  ResponseTypeTodo,
} from '../../types/todo.interface';
import { AnimatedCard } from '../UI';
import { TodoList } from '../TodoList/TodoList';
import { Box } from '@mui/material';

type Props = {
  todolists: ResponseTypeTodo[];
  changeTodolistFilter: (value: FilteredValuesType, todoListId: string) => void;
  removeTodoList: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

const TodoListsGrid = ({
  todolists,
  changeTodolistFilter,
  removeTodoList,
  changeTodolistTitle,
}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '35px',
        listStyle: 'none',
        margin: 0,
        padding: '30px 0 0 0',
      }}
    >
      {todolists.map((tl) => (
        <AnimatedCard key={tl.id}>
          <TodoList
            id={tl.id}
            changeFilter={changeTodolistFilter}
            title={tl.title}
            filter={tl.filter}
            removeTodoList={removeTodoList}
            changeTodoListTitle={changeTodolistTitle}
            addedDate={tl.createdAt}
          />
        </AnimatedCard>
      ))}
    </Box>
  );
};

export default TodoListsGrid;
