import { Button } from '@mui/material';
import { FilteredValuesType } from '../../../types/todo.interface';

type Props = {
  currentFilter: FilteredValuesType;
  onAllClick: () => void;
  onActiveClick: () => void;
  onCompletedClick: () => void;
};

const FilterButtons = ({
  currentFilter,
  onAllClick,
  onActiveClick,
  onCompletedClick,
}: Props) => {
  return (
    <div style={{ padding: '10px' }}>
      <Button
        color="primary"
        variant={currentFilter === 'All' ? 'contained' : 'text'}
        onClick={onAllClick}
      >
        All
      </Button>
      <Button
        color="primary"
        variant={currentFilter === 'Active' ? 'contained' : 'text'}
        onClick={onActiveClick}
      >
        Active
      </Button>
      <Button
        color="secondary"
        variant={currentFilter === 'Completed' ? 'contained' : 'text'}
        onClick={onCompletedClick}
      >
        Completed
      </Button>
    </div>
  );
};

export default FilterButtons;
