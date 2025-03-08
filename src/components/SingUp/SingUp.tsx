import { Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../validation/validationSchemas';
import { useDispatch } from 'react-redux';
import { signUpApi } from '../../api/signUpApi';
import { Dispatch, SetStateAction, useState } from 'react';
import { setErrorAC, setErrorMessageDeleteAC } from '../../state/error-reducer';

type SignUpType = {
  email: string;
  userName: string;
  password: string;
};

type SignUpPropsType = {
  setTab: Dispatch<SetStateAction<string>>;
  value: string;
};

function SignUp(props: SignUpPropsType) {
  const [isloading, setIsLoading] = useState<boolean>(false);

  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm<SignUpType>({
    resolver: yupResolver(signUpSchema),
  });

  const dispatch = useDispatch();

  const onSignUpSubmit = async (data: SignUpType) => {
    setIsLoading(true);
    try {
      const response = await signUpApi(data);
      props.setTab('signIn');
    } catch (error: any) {
      dispatch(setErrorAC(error.response.data.message || 'Error'));
      setTimeout(() => {
        dispatch(setErrorMessageDeleteAC(''));
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };
  const Spinner = FaSpinner as React.ElementType;
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
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          type="submit"
        >
          {isloading ? (
            <>
              <span>Loading...</span>
              <Spinner className="spiner" />
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
      </form>
    </motion.div>
  );
}

export default SignUp;
