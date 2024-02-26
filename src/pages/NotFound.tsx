import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h2" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Sorry, this page does not exist.
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#6F4CFF', '&:hover': { backgroundColor: '#5e43cc' } }}
        onClick={() => navigate('/')}>        
        Back to Home Page
      </Button>
    </Container>
  );
};

export default NotFound;
