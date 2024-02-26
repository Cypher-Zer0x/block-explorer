import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionDetails } from '../api';
import { Transaction, isUserDepositTx, isRingCTx } from '../types';
import {
  CircularProgress,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

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
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" color="error" gutterBottom>
            <ErrorOutlineIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Error
          </Typography>
          <Typography>{error}</Typography>
        </Paper>
      </Container>
    );
  }

  if (!transaction) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Préparer le contenu en fonction du type de transaction
  const transactionDetailsContent = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="transaction details">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row"><strong>Hash</strong></TableCell>
            <TableCell>{transaction.hash}</TableCell>
          </TableRow>
          {isUserDepositTx(transaction) && (
            <>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Transaction ID</strong></TableCell>
                <TableCell>{transaction.txId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Output/UTXO</strong></TableCell>
                <TableCell>
                  <MuiLink component={RouterLink} to={`/utxoDetails/${transaction.output}`} sx={{ marginRight: 2 }}>
                    {transaction.output}
                  </MuiLink>
                </TableCell>
              </TableRow>
            </>
          )}
          {isRingCTx(transaction) && (
            <>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Inputs</strong></TableCell>
                <TableCell>{transaction.inputs.join(', ')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Outputs/UTXOs</strong></TableCell>
                <TableCell>
                  {transaction.outputs.map((output, index) => (
                    <React.Fragment key={index}>
                      <MuiLink component={RouterLink} to={`/utxoDetails/${output}`} sx={{ marginRight: 2 }}>
                        {output}
                      </MuiLink>
                      {index < transaction.outputs.length - 1 ? ', ' : ''}
                    </React.Fragment>
                  ))}
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          <SwapHorizIcon sx={{ mr: 1, verticalAlign: 'bottom', color: 'primary.main' }} /> Transaction Details
        </Typography>
        {transactionDetailsContent}
      </Paper>
    </Container>
  );
};

export default TransactionDetailsPage;
