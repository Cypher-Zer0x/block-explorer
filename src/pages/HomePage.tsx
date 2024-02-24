import React from 'react';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import BlockchainOverview from '../components/BlockchainOverview';
import BlocksList from '../components/BlockList/BlockList';
import TransactionsList from '../components/TransactionsList/TransactionList';
import SearchBar from '../components/SearchBar/SearchBar';

// Définir un composant de conteneur stylisé avec Emotion pour ajouter un espacement bas
const SpacedContainer = styled(Container)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const HomePage: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    console.log('Search term:', searchTerm);
  };

  return (
    <Container maxWidth="lg">
      <SearchBar onSearch={handleSearch} />
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
