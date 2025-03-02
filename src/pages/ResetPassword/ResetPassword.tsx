import { Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { signUpSchema } from '../../validation/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './styles.module.css';

function ResetPassword() {
  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSignUpSubmit = (data: any) => {
    console.log('Sign-Up Data:', data);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <Typography variant="h4" component="h1" align="center">
          Reset password
        </Typography>
        <Typography
          style={{ paddingTop: '20px' }}
          variant="body1"
          align="center"
        >
          Please enter new password and confirm it.
        </Typography>
      </motion.div>
      <form
        className={style.container}
        onSubmit={handleSignUpSubmit(onSignUpSubmit)}
      >
        <TextField
          sx={{ width: 300 }}
          label="Password"
          variant="standard"
          {...registerSignUp('password')}
          error={!!signUpErrors.password}
          helperText={signUpErrors.password?.message?.toString()}
        />
        <TextField
          sx={{ width: 300 }}
          label="Confirm Password"
          variant="standard"
          {...registerSignUp('confirmPassword')}
          error={!!signUpErrors.confirmPassword}
          helperText={signUpErrors.confirmPassword?.message?.toString()}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          type="submit"
        >
          Send recovery link
        </Button>
      </form>
    </div>
  );
}

export default ResetPassword;
