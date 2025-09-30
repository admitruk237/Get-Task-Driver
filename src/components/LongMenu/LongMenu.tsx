import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useLongMenu } from '../../hooks/useLongMenu';
import { DeadlineDialog, PriorityDialog } from './components';

type Props = {
  taskId: number;
  todoListId: string;
  priority: string;
  className?: string;
};

const LongMenu = ({ todoListId, taskId }: Props) => {
  const {
    anchorEl,
    openDialog,
    openPriorityDialog,
    selectedDeadline,
    selectedPriority,
    setSelectedDeadline,
    setSelectedPriority,
    handleMenuOpen,
    handleMenuClose,
    handlePriorityClick,
    handlePriorityClose,
    handlePriorityConfirm,
    handleDeadlineClick,
    handleDialogClose,
    handleDeadlineConfirm,
  } = useLongMenu(todoListId, taskId);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ position: 'absolute', top: '-2px', right: '-8px' }}>
        <IconButton onClick={handleMenuOpen} aria-label="More options">
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDeadlineClick}>Deadline</MenuItem>
          <MenuItem onClick={handlePriorityClick}>Priority</MenuItem>
        </Menu>

        <DeadlineDialog
          open={openDialog}
          selectedDeadline={selectedDeadline}
          onClose={handleDialogClose}
          onConfirm={handleDeadlineConfirm}
          onDeadlineChange={setSelectedDeadline}
        />

        <PriorityDialog
          open={openPriorityDialog}
          selectedPriority={selectedPriority}
          onClose={handlePriorityClose}
          onConfirm={handlePriorityConfirm}
          onPriorityChange={setSelectedPriority}
        />
      </div>
    </LocalizationProvider>
  );
};

export default LongMenu;
