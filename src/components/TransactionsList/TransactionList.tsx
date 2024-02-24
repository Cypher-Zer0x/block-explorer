// src/components/TransactionsList/TransactionsList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLatestTransactions } from '../../api';
import { Transaction } from '../../types'; // Assurez-vous d'importer le type Transaction

const TransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const latestTransactions = await getLatestTransactions();
      setTransactions(latestTransactions);
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Latest Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.hash}>
            <Link to={`/transaction/${transaction.hash}`}>Tx {transaction.hash.substring(0, 10)}...</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;