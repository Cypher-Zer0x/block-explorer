import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlockDetails } from '../api';
import { Block } from '../types';
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
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link'; 
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'; 
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const timeSince = (timestamp: string) => {
  const timeElapsedInSeconds = (Date.now() - Number(timestamp)) / 1000; 
    if (timeElapsedInSeconds >= 3600) {
      const hours = Math.floor(timeElapsedInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (timeElapsedInSeconds >= 60) {
      const minutes = Math.floor(timeElapsedInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `${Math.floor(timeElapsedInSeconds)} seconds ago`;
    }
  };

const BlockDetailsPage: React.FC = () => {
  const [block, setBlock] = useState<Block | null>(null);
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

      fetchBlockDetails();
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
          <LinkIcon sx={{ mr: 1, verticalAlign: 'center' }} /> Block Details
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
                <MuiLink component={RouterLink} to={`/block/${block.header.parent_block}`} color="primary" sx={{
                    ':hover': {
                      color: 'secondary.main',
                    },
                    display: 'block', // Assure que le lien prend toute la largeur pour l'effet de survol
                  }}>
                    {block.header.parent_block}
                  </MuiLink>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Timestamp</strong></TableCell>
                <TableCell align="left">{block.header.timestamp}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row"><strong>Timestamp</strong></TableCell>
                <TableCell align="left">{block.header.timestamp} | ({timeSince(block.header.timestamp)})</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
          <CompareArrowsIcon sx={{ mr: 1 }} /> Transactions
        </Typography>
        {block.transactions.length > 0 ? (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="transactions table">
            <TableBody>
              {block.transactions.map((transaction) => (
                <TableRow key={transaction.hash}>
                  <TableCell component="th" scope="row">
                    <MuiLink component={RouterLink} to={`/transaction/${transaction.hash}`} color="primary" sx={{
                      ':hover': {
                        color: 'secondary.main',
                      },
                      display: 'block', // Assure que le lien prend toute la largeur pour l'effet de survol
                    }}>
                      {transaction.hash}
                    </MuiLink>
                  </TableCell>
                </TableRow>
              ))}
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

