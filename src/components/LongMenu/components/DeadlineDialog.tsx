import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';

type Props = {
  open: boolean;
  selectedDeadline: Dayjs | null;
  onClose: () => void;
  onConfirm: () => void;
  onDeadlineChange: (newValue: Dayjs | null) => void;
};

const DeadlineDialog = ({
  open,
  selectedDeadline,
  onClose,
  onConfirm,
  onDeadlineChange,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          onChange={onDeadlineChange}
          slotProps={{
            textField: {
              margin: 'normal',
              fullWidth: true,
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeadlineDialog;
