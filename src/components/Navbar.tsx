import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface NavbarProps {
  logo: string; // URL ou chemin vers le logo
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  let logoStyles;
  if (isMobile) {
    // Styles pour les petits écrans
    logoStyles = {
      maxWidth: '15vw', // Taille maximale plus petite sur mobile
      maxHeight: '8vh', // Limite inférieure pour que le logo ne soit pas trop petit
      marginRight: '2vh',
      marginLeft: '1vh',
      marginTop: '2vh',
      marginBottom: '2vh',
      borderRadius: '50%', 
      
    };
  } else {
    // Styles pour les écrans plus grands
    logoStyles = {
      maxWidth: '20vw',
      maxHeight: '10vh',
      marginRight: '5vh',
      marginLeft: '2vh',
      marginTop: '4vh',
      marginBottom: '4vh',
      borderRadius: '50%', 
    };
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(18, 18, 18, 0.2)' }}> 
      <Toolbar>
        <img 
          src={logo} 
          alt="Cypher Zer0x" 
          style={logoStyles}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
