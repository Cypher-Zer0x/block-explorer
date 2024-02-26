import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6F4CFF', // Votre couleur personnalisée
    },
    // Si vous souhaitez également définir une couleur pour les liens ou d'autres éléments spécifiques, vous pouvez le faire ici.
  },
  components: {
    // Appliquer la couleur aux boutons
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white', // Définit la couleur du texte sur les boutons pour assurer une bonne lisibilité
        },
      },
    },
    // Appliquer la couleur aux liens
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#6F4CFF', // Utilisez la même couleur ou une autre selon vos besoins
          textDecoration: 'none', // Optionnel : pour enlever le soulignement
          '&:hover': {
            textDecoration: 'underline', // Optionnel : souligner au survol
          },
        },
      },
    },
  },
});
