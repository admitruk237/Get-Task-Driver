import { Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../validation/validationSchemas';
import { useDispatch } from 'react-redux';
import { signUpApi } from '../../api/signUpApi';
import { Dispatch, SetStateAction } from 'react';

type SignUpType = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

type SignUpPropsType = {
  setTab: Dispatch<SetStateAction<string>>;
  value: string;
};

function SignUp(props: SignUpPropsType) {
  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm<SignUpType>({
    resolver: yupResolver(signUpSchema),
  });

  const dispatch = useDispatch();

  const onSignUpSubmit = async (data: SignUpType) => {
    try {
      const response = await signUpApi(data);
      console.log('✅ Реєстрація успішна!', response);

      props.setTab('signIn'); // Перемикаємо на вкладку входу
    } catch (error) {
      console.error('❌ Помилка реєстрації:', error);
    }
    props.setTab('signIn');
  };

  return (
    <motion.div
      initial={{ maxHeight: 0, opacity: 0 }}
      animate={
        props.value === 'signUp'
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
        className="formContainer"
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
          {...registerSignUp('userName')}
          error={!!signUpErrors.userName}
          helperText={signUpErrors.userName?.message?.toString()}
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
  );
}

export default SignUp;
