import { Typography } from '@mui/material';
import { motion } from 'framer-motion';

type PageTitlePropsType = {
  title: string;
  subTitle?: string;
};

function PageTitle(props: PageTitlePropsType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Typography variant="h4" component="h1" align="center">
        {props.title}
      </Typography>
      {props.subTitle && (
        <Typography
          style={{ paddingTop: '20px' }}
          variant="body1"
          align="center"
        >
          {props.subTitle}
        </Typography>
      )}
    </motion.div>
  );
}

export default PageTitle;
