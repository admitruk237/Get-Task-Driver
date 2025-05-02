import { Button } from '@mui/material';
import PageTitle from '../../components/PageTitle/PageTitle';

function NotFound() {
  return (
    <div
      className="pageStyle"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
      }}
    >
      <PageTitle
        title="PAGE NOT FOUND"
        subTitle="We can not find the page you were loking for "
      />
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
          width: '300px',
          margin: '0 auto',
        }}
        type="submit"
      >
        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
          Go to Home
        </a>
      </Button>
    </div>
  );
}

export default NotFound;
