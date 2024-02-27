import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUTXODetails } from '../api'; // Assurez-vous que cette fonction est correctement définie dans vos services API.
import { CoinbaseUTXO, PaymentUTXO, UTXO, isCoinbaseUTXO, isExitUTXO, isPaymentUTXO } from '../types'; // Importez vos interfaces et fonctions de type checking ici.
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
  Chip,
} from '@mui/material';
import Convert from '../utils/Convert'; // Importez votre fonction de conversion ici.

const UTXODetailsPage: React.FC = () => {
  const [utxo, setUTXO] = useState<UTXO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { hash } = useParams<{ hash: string }>();

  useEffect(() => {
    if(hash){
        setLoading(true);
        getUTXODetails(hash)
        .then(details => {
        setUTXO(details);
        setError(null);
      })
      .catch(error => {
        console.error(`Error fetching details for UTXO ${hash}:`, error);
        setError('Failed to fetch UTXO details');
      })
      .finally(() => setLoading(false));
    }
    else{
        setLoading(false);
        setError('UTXO hash not found');
    }
    
  }, [hash]);

  const renderUTXOTypeSpecificDetails = (utxo: UTXO) => {
    if (isCoinbaseUTXO(utxo)) {
      return (
        <>
          <TableRow>
            <TableCell component="th" scope="row"><strong>Version</strong></TableCell>
            <TableCell>{utxo.version}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row"><strong>Amount</strong></TableCell>
            <TableCell>{`${Convert(utxo.amount)} ${utxo.currency}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row"><strong>rG</strong></TableCell>
            <TableCell>{utxo.rG}</TableCell>
          </TableRow>
        </>
      );
    } else if (isExitUTXO(utxo)) {
      return (
        <>
          <TableRow>
            <TableCell component="th" scope="row"><strong>Exit Chain</strong></TableCell>
            <TableCell>{utxo.exitChain}</TableCell>
          </TableRow>
        </>
      );
    } else if (isPaymentUTXO(utxo)) {
      return (
        <>
          <TableRow>
            <TableCell component="th" scope="row"><strong>Version</strong></TableCell>
            <TableCell>{(utxo as PaymentUTXO).version}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row"><strong>Amount</strong></TableCell>
            <TableCell>{`${Convert((utxo as PaymentUTXO).amount)} ${(utxo as CoinbaseUTXO).currency}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row"><strong>rG</strong></TableCell>
            <TableCell>{(utxo as PaymentUTXO).rG}</TableCell>
          </TableRow>
        </>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !utxo) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error
          </Typography>
          <Typography>{error || 'UTXO details could not be loaded'}</Typography>
        </Paper>
      </Container>
    );
  }

  const utxoTypeLabel = isCoinbaseUTXO(utxo) ? "Coinbase UTXO" : isExitUTXO(utxo) ? "Exit UTXO" : isPaymentUTXO(utxo) ? "Payment UTXO" : "Unknown Type";

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          UTXO Details
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="utxo details">
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Chip label={utxoTypeLabel} color="primary" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>UTXO Hash</strong></TableCell>
                <TableCell>{utxo.hash}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Transaction Hash</strong></TableCell>
                <TableCell>{utxo.transaction_hash}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Output Index</strong></TableCell>
                <TableCell>{utxo.output_index}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Lic Key</strong></TableCell>
                <TableCell>{utxo.lic_key}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Unlock Time</strong></TableCell>
                <TableCell>{utxo.unlock_time}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Commitment</strong></TableCell>
                <TableCell>{utxo.commitment}</TableCell>
              </TableRow>
              {renderUTXOTypeSpecificDetails(utxo)}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default UTXODetailsPage;