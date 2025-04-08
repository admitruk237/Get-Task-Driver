import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { signUpSchema } from '../../validation/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './styles.module.css';
import PageTitle from '../../components/PageTitle/PageTitle';

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
      <PageTitle title="Reset password" subTitle="Please enter new password." />
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
