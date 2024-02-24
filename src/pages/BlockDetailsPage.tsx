import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlockDetails } from '../api';
import { BlockDetails } from '../types'; // Importez le type BlockDetails

const BlockDetailsPage: React.FC = () => {
  const [block, setBlock] = useState<BlockDetails | null>(null);
  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs
  const { hash } = useParams<{ hash: string }>();

  useEffect(() => {
    if (hash) {
      const fetchBlockDetails = async () => {
        setError(null); // Réinitialiser l'état d'erreur
        try {
          const details = await getBlockDetails(hash);
          setBlock(details);
        } catch (error) {
          console.error(`Error fetching details for block ${hash}:`, error);
          setError('Failed to fetch block details'); // Définir l'état d'erreur
        }
      };

      fetchBlockDetails();
    } else {
      setError('Block hash is undefined'); // Définir l'état d'erreur si le hash est undefined
    }
  }, [hash]);

  if (error) return <div>Error: {error}</div>; // Afficher l'erreur si présente
  if (!block) return <div>Loading...</div>; // Afficher un message de chargement si les données ne sont pas encore chargées

  // Afficher les détails du bloc
  return (
    <div>
      <h1>Block Details</h1>
      <p>Hash: {block.hash}</p>
      <p>Number: {block.number}</p>
      <p>Timestamp: {new Date(block.timestamp * 1000).toLocaleString()}</p>
      <p>Miner: {block.miner}</p>
      <p>Nonce: {block.nonce}</p>
      <p>Transactions: {block.transactions.length}</p>
      <p>Gas Used: {block.gasUsed}</p>
      <p>Gas Limit: {block.gasLimit}</p>
    </div>
  );
};

export default BlockDetailsPage;
