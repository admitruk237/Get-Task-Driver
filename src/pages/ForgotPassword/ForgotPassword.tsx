import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { signUpSchema } from '../../validation/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './styles.module.css';
import PageTitle from '../../components/PageTitle/PageTitle';

function ForgotPassword() {
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
    <div className="pageStyle">
      <PageTitle
        title="Password recovery"
        subTitle="Please enter your user name and we will send you a password recovery
          link to your email."
      />
      <form
        className={style.container}
        onSubmit={handleSignUpSubmit(onSignUpSubmit)}
      >
        <TextField
          sx={{ width: 300 }}
          label="Username"
          variant="standard"
          {...registerSignUp('userName')}
          error={!!signUpErrors.userName}
          helperText={signUpErrors.userName?.message?.toString()}
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

export default ForgotPassword;
