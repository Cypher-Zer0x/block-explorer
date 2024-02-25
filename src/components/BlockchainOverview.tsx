import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material'; // Importer le composant Paper de MUI
import { getBlockchainOverview } from '../api'; // Assurez-vous d'implémenter cette fonction dans vos appels API

const BlockchainOverview: React.FC = () => {
  const [overview, setOverview] = useState<{ totalBlocks: number; totalTransactions: number; } | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      const data = await getBlockchainOverview(); // Cette fonction doit récupérer les données de l'API
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
      <p>Total Blocks: {overview.totalBlocks}</p>
      <p>Total Transactions: {overview.totalTransactions}</p>
      {/* Ajoutez ici d'autres informations globales si nécessaire */}
    </Paper>
  );
};

export default BlockchainOverview;
