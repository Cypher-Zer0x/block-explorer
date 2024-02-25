import React from 'react';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import BlockchainOverview from '../components/BlockchainOverview';
import BlocksList from '../components/BlockList/BlockList';
import TransactionsList from '../components/TransactionsList/TransactionList';

// Définir un composant de conteneur stylisé avec Emotion pour ajouter un espacement bas
const SpacedContainer = styled(Container)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: '10px', // Ajouter une marge de 10px en haut du conteneur
}));

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: '50px' }}> {/* Ajoutez une marge en bas */}
      <SpacedContainer>
        <BlockchainOverview />
      </SpacedContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BlocksList />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransactionsList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;