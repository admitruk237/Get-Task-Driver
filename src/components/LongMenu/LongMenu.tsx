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

export default function DeadlineMenu() {
  // Стан для керування відкриттям меню та діалогового вікна
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  // Збереження обраного дедлайну (тип Dayjs або null)
  const [selectedDeadline, setSelectedDeadline] = useState<Dayjs | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          <MenuItem onClick={handleMenuClose}>Priority</MenuItem>
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
      </div>
    </LocalizationProvider>
  );
}
