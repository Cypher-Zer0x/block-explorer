// src/components/BlockchainOverview.tsx
import React, { useEffect, useState } from 'react';
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
    return <div>Loading blockchain overview...</div>;
  }

  return (
    <div>
      <h2>Blockchain Overview</h2>
      <p>Total Blocks: {overview.totalBlocks}</p>
      <p>Total Transactions: {overview.totalTransactions}</p>
      {/* Ajoutez ici d'autres informations globales si nécessaire */}
    </div>
  );
};

export default BlockchainOverview;
