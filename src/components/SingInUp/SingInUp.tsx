import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema, signUpSchema } from '../../validation/validationSchemas';

import style from './styles.module.css';

function SignInUp() {
  const [value, setValue] = React.useState('signUp');

  const {
    register: registerSignIn,
    handleSubmit: handleSignInSubmit,
    formState: { errors: signInErrors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onSignInSubmit = (data: any) => {
    console.log('Sign-In Data:', data);
  };

  const onSignUpSubmit = (data: any) => {
    console.log('Sign-Up Data:', data);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="Sign In and Sign Up tabs"
      >
        <Tab
          sx={{ width: '50%', color: 'black' }}
          value="signUp"
          label="Sign Up"
        />
        <Tab
          sx={{ width: '50%', color: 'black' }}
          value="signIn"
          label="Sign In"
        />
      </Tabs>

      {/* Форма входу */}
      <motion.div
        initial={{ maxHeight: 0, opacity: 0 }}
        animate={
          value === 'signIn'
            ? { maxHeight: 500, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <form
          className={style.formContainer}
          onSubmit={handleSignInSubmit(onSignInSubmit)}
        >
          <TextField
            sx={{ width: 300 }}
            label="Username"
            variant="standard"
            {...registerSignIn('username')}
            error={!!signInErrors.username}
            helperText={signInErrors.username?.message?.toString()}
          />
          <TextField
            sx={{ width: 300 }}
            label="Password"
            type="password"
            variant="standard"
            {...registerSignIn('password')}
            error={!!signInErrors.password}
            helperText={signInErrors.password?.message?.toString()}
          />
          <a className={style.forgotPassword} href="">
            Forgot password?
          </a>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            type="submit"
          >
            Sign-In
          </Button>
        </form>
      </motion.div>

      {/* Форма реєстрації */}
      <motion.div
        initial={{ maxHeight: 0, opacity: 0 }}
        animate={
          value === 'signUp'
            ? { maxHeight: 700, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <form
          className={style.formContainer}
          onSubmit={handleSignUpSubmit(onSignUpSubmit)}
        >
          <TextField
            sx={{ width: 300 }}
            label="Email"
            variant="standard"
            {...registerSignUp('email')}
            error={!!signUpErrors.email}
            helperText={signUpErrors.email?.message?.toString()}
          />
          <TextField
            sx={{ width: 300 }}
            label="Username"
            variant="standard"
            {...registerSignUp('username')}
            error={!!signUpErrors.username}
            helperText={signUpErrors.username?.message?.toString()}
          />
          <TextField
            sx={{ width: 300 }}
            label="Password"
            type="password"
            variant="standard"
            {...registerSignUp('password')}
            error={!!signUpErrors.password}
            helperText={signUpErrors.password?.message?.toString()}
          />
          <TextField
            sx={{ width: 300 }}
            label="Confirm Password"
            type="password"
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
            Sign-Up
          </Button>
        </form>
      </motion.div>
    </Box>
  );
}

export default SignInUp;
