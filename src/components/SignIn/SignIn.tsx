import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { signInSchema } from '../../validation/validationSchemas';
import { motion } from 'framer-motion';
import { Button, TextField } from '@mui/material';
import style from './styles.module.css';
import { FaSpinner } from 'react-icons/fa';
import { useState } from 'react';
import { setErrorAC, setErrorMessageDeleteAC } from '../../state/error-reducer';
import { useDispatch } from 'react-redux';
import { userApi } from '../../api/userApi';
import { AppDispatch } from '../../state/store';
import { useNavigate } from 'react-router-dom';
import { fetchTodoList } from '../../servies/todoListService';
import { setTodoListsAC } from '../../state/todoList-reducer';

type SignInType = {
  userName: string;
  password: string;
};

type SignInPropsType = {
  value: string;
};

function SignIn(props: SignInPropsType) {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register: registerSignIn,
    handleSubmit: handleSignInSubmit,
    formState: { errors: signInErrors },
  } = useForm<SignInType>({
    resolver: yupResolver(signInSchema),
  });

  const navigate = useNavigate();

  const onSignInSubmit = async (data: SignInType) => {
    setIsLoading(true);
    try {
      const response = await userApi.signInApi(data);
      localStorage.setItem('accessToken', response.accessToken);
      console.log(
        'accessToken after setItem:',
        localStorage.getItem('accessToken')
      );
      navigate('/');
      const todoLists = await fetchTodoList();
      dispatch(setTodoListsAC(todoLists));
    } catch (error: any) {
      dispatch(setErrorAC(error.response.data.error));
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
        props.value === 'signIn'
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
        className="formContainer"
        onSubmit={handleSignInSubmit(onSignInSubmit)}
      >
        <TextField
          sx={{ width: 300 }}
          label="Username"
          variant="standard"
          {...registerSignIn('userName')}
          error={!!signInErrors.userName}
          helperText={signInErrors.userName?.message?.toString()}
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
          {isloading ? (
            <>
              <span>Loading...</span>
              <Spinner className="spiner" />
            </>
          ) : (
            'Sign-In'
          )}
        </Button>
      </form>
    </motion.div>
  );
}

export default SignIn;
