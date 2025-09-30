import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

type Props = {
  open: boolean;
  selectedPriority: string;
  onClose: () => void;
  onConfirm: () => void;
  onPriorityChange: (value: string) => void;
};

const PriorityDialog = ({
  open,
  selectedPriority,
  onClose,
  onConfirm,
  onPriorityChange,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            <FormControlLabel value="Low" control={<Radio />} label="Low" />
            <FormControlLabel
              value="Medium"
              control={<Radio />}
              label="Medium"
            />
            <FormControlLabel value="High" control={<Radio />} label="High" />
          </RadioGroup>
        </FormControl>
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

export default PriorityDialog;
