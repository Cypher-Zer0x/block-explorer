import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ListItemText, Typography, List, ListItem, Divider, Container, ListItemAvatar, Avatar, Paper, Box, Link } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Nouvelle icône pour les transactions
import { getTenLatestTransactions } from '../../api';
import { Transaction } from '../../types';

const TransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const latestTransactions = await getTenLatestTransactions();
      // Supposons que vos transactions sont déjà triées par timestamp ou par un autre critère pertinent
      setTransactions(latestTransactions);
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
                      display: 'block', // Ensure the link takes the full width for hover effect
                    }}>
                      {transaction.hash.substring(0, 50)}...
                    </Link>
                  }
                />
              </ListItem>
              {index < transactions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TransactionsList;