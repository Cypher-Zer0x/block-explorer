import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  ListItemText,
  Typography,
  List,
  ListItem,
  Divider,
  Container,
  ListItemAvatar,
  Avatar,
  Paper,
  Box,
  Link,
  CircularProgress, // Import pour la roue de chargement
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Nouvelle icône pour les transactions
import { getTenLatestTransactions } from '../../api';
import { Transaction, isUserDepositTx, isRingCTx } from '../../types';

const TransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de chargement

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true); // Active l'indicateur de chargement avant de lancer la requête
      const latestTransactions = await getTenLatestTransactions();
      console.log("latestTransactions: ", latestTransactions);  
      setTransactions(latestTransactions);
      setIsLoading(false); // Désactive l'indicateur de chargement après avoir reçu les données
    };

    fetchTransactions();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        ':hover': {
          boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.2)',
        },
      }}>
        <Box sx={{ bgcolor: 'common.white', px: 3, py: 2 }}>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
            Latest Transactions
          </Typography>
        </Box>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <List disablePadding>
            {transactions.map((transaction, index) => (
              <React.Fragment key={transaction.hash}>
                <ListItem sx={{
                  bgcolor: index % 2 ? 'grey.100' : 'common.white',
                  ':hover': {
                    bgcolor: 'action.hover',
                  },
                  transition: 'background-color 0.3s',
                }}>
                  <ListItemAvatar>
                    <Avatar>
                      <SwapHorizIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link component={RouterLink} to={`/transaction/${transaction.hash}`} color="primary" sx={{
                        ':hover': {
                          color: 'secondary.main',
                        },
                        display: 'block',
                      }}>
                        Transaction Hash: {transaction.hash.substring(0, 50)}...
                      </Link>
                    }
                    secondary={
                      isUserDepositTx(transaction) ?
                      `User Deposit Transaction: ${transaction.txId.substring(0, 50)}...` :
                      isRingCTx(transaction) ?
                      `Ring Confidential Transaction with ${transaction.inputs.length} inputs and ${transaction.outputs.length} outputs` :
                      "Unknown Transaction Type"
                    }
                  />
                </ListItem>
                {index < transactions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default TransactionsList;
