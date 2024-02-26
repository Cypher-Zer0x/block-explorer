import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Box, Grid, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getBlockchainMetrics } from '../api';
import { BlockchainMetrics } from '../types';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

type TransactionData = {
  hour: string;
  transactions: number;
};

const BlockchainOverview: React.FC = () => {
  const [overview, setOverview] = useState<BlockchainMetrics | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const metricsData = await getBlockchainMetrics();
        setOverview(metricsData);
        const dataExample: TransactionData[] = [
          { hour: '00:00', transactions: 120 },
          { hour: '01:00', transactions: 150 },
          // ... Autres données de transactions par heure
        ];
        setTransactionData(dataExample);
      } catch (error) {
        console.error("Failed to fetch blockchain metrics: ", error);
      }
    };

    fetchOverview();
  }, []);

  if (!overview) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ m: 4, borderRadius: '10px', bgcolor: 'grey.100', p: 3, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        <AssessmentIcon sx={{ verticalAlign: 'middle', fontSize: '2rem', mr: 1 }} />
        Zer0x Metrics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: '10px', bgcolor: 'common.white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '35vh' }}>
            <Typography variant="h6" align="center" gutterBottom>
              Blockchain Overview
            </Typography>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">Total Blocks: {overview.blocks_number}</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <SwapVertIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">Total Transactions: {overview.transactions_number}</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <AccountTreeIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">Total UTXOs: {overview.utxos_number}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: '10px', bgcolor: 'common.white', display: 'flex', alignItems: 'center', justifyContent: 'center', height:"35vh" }}>
          <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactionData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#8884d8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8884d8' }} />
                <Tooltip wrapperStyle={{ borderColor: 'white', boxShadow: '2px 2px 3px rgba(0,0,0,0.3)' }} />
                <Line type="monotone" dataKey="transactions" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlockchainOverview;
