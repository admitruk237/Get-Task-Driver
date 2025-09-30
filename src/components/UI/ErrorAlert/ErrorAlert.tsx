import { Alert } from '@mui/material';
import { motion } from 'framer-motion';

type Props = {
  message: string;
};

const ErrorAlert = ({ message }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, right: '-300px', top: 60 }}
      animate={{ opacity: 1, right: '10px' }}
      transition={{ duration: 1 }}
      style={{ position: 'absolute', width: 300 }}
    >
      <Alert variant="outlined" severity="error">
        {message}
      </Alert>
    </motion.div>
  );
};

export default ErrorAlert;
