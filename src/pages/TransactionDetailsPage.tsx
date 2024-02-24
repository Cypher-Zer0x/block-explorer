// src/pages/TransactionDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionDetails } from '../api';
import { TransactionDetails } from '../types'; // Assurez-vous d'importer le type TransactionDetails

const TransactionDetailsPage: React.FC = () => {
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { hash } = useParams<{ hash: string }>();

  useEffect(() => {
    if (hash) {
      const fetchTransactionDetails = async () => {
        setError(null);
        try {
          const details = await getTransactionDetails(hash);
          setTransaction(details);
        } catch (error) {
          console.error(`Error fetching details for transaction ${hash}:`, error);
          setError('Failed to fetch transaction details');
        }
      };

      fetchTransactionDetails();
    } else {
      setError('Transaction hash is undefined');
    }
  }, [hash]);

  if (error) return <div>Error: {error}</div>;
  if (!transaction) return <div>Loading...</div>;

  return (
    <div>
      <h1>Transaction Details</h1>
      <p>Hash: {transaction.hash}</p>
      <p>Block Number: {transaction.blockNumber}</p>
      <p>From: {transaction.from}</p>
      <p>To: {transaction.to}</p>
      <p>Value: {transaction.value} ETH</p> {/* Assurez-vous de convertir la valeur si nécessaire */}
      <p>Gas: {transaction.gas}</p>
      <p>Gas Price: {transaction.gasPrice} Gwei</p> {/* Convertissez si nécessaire */}
      <p>Nonce: {transaction.nonce}</p>
      <p>Status: {transaction.status}</p>
      {/* Ajoutez d'autres détails que vous souhaitez afficher */}
    </div>
  );
};

export default TransactionDetailsPage;