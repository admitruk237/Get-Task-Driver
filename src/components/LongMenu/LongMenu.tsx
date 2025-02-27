import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import {
  changeTaskDeadlineAC,
  changeTaskPriorityAC,
} from '../../state/tasks-reducer';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

type LongMenuPropsType = {
  taskId: string;
  todoListId: string;
  priority: number;
};

export default function LongMenu(props: LongMenuPropsType) {
  // Стан для керування відкриттям меню та діалогового вікна
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPriorityDialog, setOpenPriorityDialog] = useState(false);

  const [selectedDeadline, setSelectedDeadline] = useState<Dayjs | null>(null);

  const [selectedPriority, setSelectedPriority] = useState<string>('1');

  const dispatch = useDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePriorityClick = () => {
    setOpenPriorityDialog(true);
    handleMenuClose();
  };

  const handlePriorityClose = () => {
    setOpenPriorityDialog(false);
  };

  const handlePriorityConfirm = () => {
    setOpenPriorityDialog(false);
    dispatch(
      changeTaskPriorityAC(
        props.todoListId,
        props.taskId,
        Number(selectedPriority)
      )
    );
  };

  // При кліку на пункт «Deadline» відкриваємо модальне вікно
  const handleDeadlineClick = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Підтвердження вибору дати
  const handleDeadlineConfirm = () => {
    setOpenDialog(false);
    dispatch(
      changeTaskDeadlineAC(
        props.todoListId,
        props.taskId,
        selectedDeadline?.format('YYYY-MM-DD HH:mm') || ''
      )
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <IconButton onClick={handleMenuOpen}>
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

        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          sx={{
            '& .MuiDialog-paper': {
              position: 'absolute',
              top: '10%', // Встановлює відступ від верху екрану
            },
          }}
        >
          <DialogTitle>Change date</DialogTitle>
          <DialogContent>
            <DateTimePicker
              label="Deadline"
              value={selectedDeadline}
              onChange={(newValue) => setSelectedDeadline(newValue)}
              slotProps={{
                textField: {
                  margin: 'normal',
                  fullWidth: true,
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDeadlineConfirm} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openPriorityDialog}
          onClose={handlePriorityClose}
          sx={{
            '& .MuiDialog-paper': {
              position: 'absolute',
              top: '10%', // Встановлює відступ від верху екрану
              width: '300px',
            },
          }}
        >
          <DialogTitle>Change priority</DialogTitle>
          <DialogContent>
            <FormControl>
              <FormLabel>Priority</FormLabel>
              <RadioGroup
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <FormControlLabel value="0" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel value="2" control={<Radio />} label="High" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePriorityClose}>Cancel</Button>
            <Button onClick={handlePriorityConfirm} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
}
