import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

type Props = {
  title: string;
  subTitle?: string;
};

const PageTitle = ({ title, subTitle }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 5 }}
    >
      <Typography
        sx={{ padding: '30px 0 20px 0' }}
        variant="h4"
        component="h1"
        align="center"
      >
        {title}
      </Typography>
      {subTitle && (
        <Typography sx={{ paddingTop: '20px' }} variant="body1" align="center">
          {subTitle}
        </Typography>
      )}
    </motion.div>
  );
};

export default PageTitle;
