import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material'; // Importer le composant Paper de MUI
import { getBlockchainMetrics } from '../api'; // Assurez-vous d'implémenter cette fonction dans vos appels API
import { BlockchainMetrics } from '../types'; // Assurez-vous d'exporter ce type depuis types/index.tsx
const BlockchainOverview: React.FC = () => {
  const [overview, setOverview] = useState< BlockchainMetrics | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      const data = await getBlockchainMetrics(); // Cette fonction doit récupérer les données de l'API
      setOverview(data);
    };

    fetchOverview();
  }, []);

  if (!overview) {
    return (
      <Paper elevation={3} sx={{ padding: '20px', border: '2px solid violet', borderRadius: '5px' }}> {/* Utiliser Paper avec une élévation de 3 pour le relief */}
        <h2>Loading...</h2>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: '20px', border: '2px solid violet', borderRadius: '5px' }}> {/* Utiliser Paper avec une élévation de 3 pour le relief */}
      <h2>Blockchain Overview</h2>
      <p>Total Blocks: {overview.blocks_number}</p>
      <p>Total Transactions: {overview.transactions_number}</p>
      <p>Total UTXOs: {overview.utxos_number}</p>
    </Paper>
  );
};

export default BlockchainOverview;
