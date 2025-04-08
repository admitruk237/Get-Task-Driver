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
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { useLondMenu } from '../../hooks/useLongMeny';
type LongMenuPropsType = {
  taskId: number;
  todoListId: string;
  priority: string;
};

export default function LongMenu(props: LongMenuPropsType) {
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
  } = useLondMenu(props.todoListId, props.taskId);

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
              top: '10%',
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
              top: '10%',
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
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="Medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="High"
                  control={<Radio />}
                  label="High"
                />
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
