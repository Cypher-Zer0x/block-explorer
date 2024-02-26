import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionDetails } from '../api';
import { Transaction } from '../types';
import { CircularProgress, Container, Typography, Paper } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Icône pour les transactions
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Icône pour l'erreur

const TransactionDetailsPage: React.FC = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { hash } = useParams<{ hash: string }>();

  useEffect(() => {
    if (hash) {
      const fetchTransactionDetails = async () => {
        setError(null);
        try {
          const details = await getTransactionDetails(hash);
          setTransaction(details);
        } catch (error) {
          console.error(`Error fetching details for transaction ${hash}:`, error);
          setError('Failed to fetch transaction details');
        }
      };

      fetchTransactionDetails();
    } else {
      setError('Transaction hash is undefined');
    }
  }, [hash]);

  if (error) {
    return (
      <Container>
        <Paper elevation={1} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" color="error" gutterBottom>
            <ErrorOutlineIcon /> Error
          </Typography>
          <Typography>{error}</Typography>
        </Paper>
      </Container>
    );
  }

  if (!transaction) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Paper elevation={1} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          <SwapHorizIcon /> Transaction Details
        </Typography>
        <Typography variant="body1">Hash: {transaction.hash}</Typography>
        <Typography variant="body1">Sender: {transaction.sender}</Typography>
        <Typography variant="body1">Output: {transaction.output}</Typography>
      </Paper>
    </Container>
  );
};

export default TransactionDetailsPage;