// DeadlineIcon.tsx
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs, { Dayjs } from 'dayjs';

interface DeadlineIconProps {
  deadline: Dayjs;
}

const DeadlineIcon: React.FC<DeadlineIconProps> = ({ deadline }) => {
  const getDeadlineColor = () => {
    const now = dayjs();
    const diffHours = deadline.diff(now, 'hour');
    if (diffHours >= 24) return 'green';
    if (diffHours >= 5) return 'orange'; // або 'yellow', залежно від ваших уподобань
    return 'red';
  };

  return (
    <Tooltip title={`Deadline: ${deadline.format('YYYY-MM-DD HH:mm')}`}>
      <IconButton>
        <AccessTimeIcon style={{ color: getDeadlineColor() }} />
      </IconButton>
    </Tooltip>
  );
};

export default DeadlineIcon;
