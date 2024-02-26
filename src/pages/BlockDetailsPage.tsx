import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlockDetails } from '../api';
import { Block } from '../types'; // Importez le type BlockDetails

const BlockDetailsPage: React.FC = () => {
  const [block, setBlock] = useState<Block | null>(null);
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
      <p>Block number: {block.header.block_number}</p>
      <p>Merkle root: {block.header.merkle_root}</p>
      <p>Parent block: {block.header.parent_block}</p>
      <p>Timestamp: {block.header.timestamp}</p>
      <h2>Transactions</h2>
      <ul>
        {block.transactions.map((transaction) => (
          <li key={transaction.hash}>
            <Link to={`/transaction/${transaction.hash}`}>Tx: {transaction.hash}</Link>
            <p>Sender: {transaction.sender}</p>
            <p>Output: {transaction.output}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockDetailsPage;
