import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlockDetails } from '../api';
import { Block } from '../types';
import { CircularProgress, Container, Typography, List, ListItem, ListItemText, Link as MuiLink, Paper } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block'; // Icône pour le bloc
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'; // Icône pour les transactions
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Icône pour l'erreur

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

  if (!block) {
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
          <BlockIcon /> Block Details
        </Typography>
        <Typography variant="body1">Hash: {block.hash}</Typography>
        <Typography variant="body1">Block number: {block.header.block_number}</Typography>
        <Typography variant="body1">Merkle root: {block.header.merkle_root}</Typography>
        <Typography variant="body1">Parent block: {block.header.parent_block}</Typography>
        <Typography variant="body1">Timestamp: {block.header.timestamp}</Typography>
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          <CompareArrowsIcon /> Transactions
        </Typography>
        <List>
          {block.transactions.map((transaction) => (
            <ListItem key={transaction.hash}>
              <ListItemText
                primary={<MuiLink component={Link} to={`/transaction/${transaction.hash}`}>Tx: {transaction.hash}</MuiLink>}
                secondary={`Sender: ${transaction.sender} - Output: ${transaction.output}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default BlockDetailsPage;