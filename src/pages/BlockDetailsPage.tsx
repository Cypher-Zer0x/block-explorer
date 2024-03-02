import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlockDetails } from '../api';
import { BlockFromApi } from '../types';
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
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { timeSince } from '../utils/Timestamp';
import { getState } from '../api';

const BlockDetailsPage: React.FC = () => {
  const [block, setBlock] = useState<BlockFromApi | null>(null);
  const [state, setState] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { hash } = useParams<{ hash: string }>();

  useEffect(() => {
    if (hash) {
      const fetchBlockDetails = async () => {
        setError(null);
        try {
          const details = await getBlockDetails(hash);
          setBlock(details);
        } catch (error) {
          console.error(`Error fetching details for block ${hash}:`, error);
          setError('Failed to fetch block details');
        }
      };

      const fetchState = async () => {
        try {
          const state = await getState();
          setState(state);
        } catch (error) {
          setState(null);
          console.error(`Error fetching state:`, error);
        }
      }

      fetchBlockDetails();
      fetchState();
    } else {
      setError('Block hash is undefined');
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

  if (!block) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          <LinkIcon sx={{ mr: 1, verticalAlign: 'center', color: "primary.main" }} /> Block Details
        </Typography>
        <Typography>
        <Chip
          label={state && state >= Number(block.header.block_number) ? "Committed" : "Waiting for commitment"}
          color={state && state >= Number(block.header.block_number) ? "success" : "error"}
          sx={{ ml: 1 }}
        />
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Hash</strong></TableCell>
                <TableCell align="left">{block.hash}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Block number</strong></TableCell>
                <TableCell align="left">{block.header.block_number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Merkle root</strong></TableCell>
                <TableCell align="left">{block.header.merkle_root}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Parent block</strong></TableCell>
                <TableCell align="left">
                  {block.header.parent_block !== "GENESIS" &&
                    <MuiLink component={RouterLink} to={`/block/${block.header.parent_block}`} color="primary" sx={{
                      ':hover': {
                        color: 'secondary.main',
                      },
                      display: 'block', // Assure que le lien prend toute la largeur pour l'effet de survol
                    }}>
                      {block.header.parent_block}
                    </MuiLink>
                  }
                  {block.header.parent_block === "GENESIS" &&
                    <p>GENESIS</p>
                  }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Timestamp</strong></TableCell>
                <TableCell align="left">{block.header.timestamp} | ({timeSince(block.header.timestamp)})</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
          <CompareArrowsIcon sx={{ mr: 1, color: 'primary.main' }} /> Transactions
        </Typography>
        {block && block.transactions.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="transactions table">
              <TableBody>
                {block.transactions.map((transaction, index) => {
                  // Déterminer le type de la transaction
                  const transactionType = transaction.UserDeposit ? "UserDeposit" : transaction.RingCT ? "RingCT" : "Unknown";
                  let transactionDetails: any;
                  let hash: string | null = null;

                  // Sélectionner les détails de la transaction et le hash en fonction du type
                  switch (transactionType) {
                    case "UserDeposit":
                      transactionDetails = transaction.UserDeposit;
                      hash = transactionDetails.hash;
                      break;
                    case "RingCT":
                      transactionDetails = transaction.RingCT;
                      hash = transactionDetails.hash;
                      break;
                    default:
                      // Gérer le cas inconnu ou ajouter d'autres types ici si nécessaire
                      break;
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        Transaction Type: {transactionType === "UserDeposit" ? "User Deposit" : transactionType === "RingCT" ? "Ring Confidential" : "Unknown"}
                      </TableCell>
                      <TableCell align="left">
                        {hash ? (
                          <MuiLink component={RouterLink} to={`/transaction/${hash}`} color="primary" sx={{
                            ':hover': {
                              color: 'secondary.main',
                            },
                            display: 'block',
                          }}>
                            {hash.substring(0, 50)}...
                          </MuiLink>
                        ) : 'Hash non disponible'}
                      </TableCell>
                      <TableCell align="left">
                        {transactionType === "UserDeposit" ?
                          `TxID: ${transactionDetails.txId}` :
                          transactionType === "RingCT" ?
                            `Inputs: ${transactionDetails.inputs.length}, Outputs: ${transactionDetails.outputs.length}` :
                            'N/A'
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>

            </Table>
          </TableContainer>
        ) : (
          <Typography>This block does not include any transactions.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default BlockDetailsPage;

