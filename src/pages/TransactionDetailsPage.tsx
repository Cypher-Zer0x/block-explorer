// src/pages/TransactionDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionDetails } from '../api';
import { Transaction } from '../types'; // Assurez-vous d'importer le type TransactionDetails

const TransactionDetailsPage: React.FC = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
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
      <p>Sender: {transaction.sender}</p>
      <p>Output: {transaction.output}</p>
    </div>
  );
};

export default TransactionDetailsPage;