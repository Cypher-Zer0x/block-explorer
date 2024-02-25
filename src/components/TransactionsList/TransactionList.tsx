import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLatestTransactions } from '../../api';
import { Transaction } from '../../types';
import { styled } from '@mui/system';

const StyledTransactionContainer = styled('div')({
  border: '1px solid #ccc',
  borderRadius: '5px',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
});

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
    <StyledTransactionContainer> 
      <h2>Latest Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.hash}>
            <Link to={`/transaction/${transaction.hash}`}>Tx {transaction.hash.substring(0, 10)}...</Link>
          </li>
        ))}
      </ul>
    </StyledTransactionContainer>
  );
};

export default TransactionsList;
