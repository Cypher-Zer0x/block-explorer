import axios from 'axios';
import { Block, Transaction, BlockchainMetrics } from '../types'; // Mise à jour des importations pour les nouveaux types

const API_ENDPOINT = 'http://176.146.201.74:3000'; // Utilisez l'URL réelle de votre API

// BLOCK
export const getLatestBlock = async (): Promise<Block> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/block/latest`);
    const blockData = response.data;
    return {
      hash: blockData.hash,
      header: {
        block_number: blockData.header.block_number,
        merkle_root: blockData.header.merkle_root,
        parent_block: blockData.header.parent_block,
        timestamp: blockData.header.timestamp,
      },
      transactions: blockData.transactions, // Supposons que chaque transaction correspond déjà au type Transaction
    };
  } catch (error) {
    console.error('Error fetching latest block:', error);
    return {
      hash: 'error',
      header: {
        block_number: '',
        merkle_root: '',
        parent_block: '',
        timestamp: '',
      },
      transactions: [],
    };
  }
};

export const getTenLatestBlocks = async (): Promise<Block[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/block/latest-ten`);
    return response.data.map((blockData: any): Block => ({
      hash: blockData.hash,
      header: {
        block_number: blockData.header.block_number,
        merkle_root: blockData.header.merkle_root,
        parent_block: blockData.header.parent_block,
        timestamp: blockData.header.timestamp,
      },
      transactions: blockData.transactions, // Supposons que l'API renvoie les transactions conformément au nouveau type
    }));
  } catch (error) {
    console.error('Error fetching ten latest blocks:', error);
    return [];
  }
};

export const getBlockDetails = async (hash: string): Promise<Block> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/block/hash/${hash}`);
    const blockData = response.data;
    return {
      hash: blockData.hash,
      header: {
        block_number: blockData.header.block_number,
        merkle_root: blockData.header.merkle_root,
        parent_block: blockData.header.parent_block,
        timestamp: blockData.header.timestamp,
      },
      transactions: blockData.transactions,
    };
  } catch (error) {
    console.error(`Error fetching block details for hash ${hash}:`, error);
    return {
      hash: 'error',
      header: {
        block_number: '',
        merkle_root: '',
        parent_block: '',
        timestamp: '',
      },
      transactions: [],
    };
  }
};

// TRANSACTION
export const getLatestTransaction = async (): Promise<Transaction> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/transaction/latest`);
    const transactionData = response.data;
    return {
      sender: transactionData.sender,
      output: transactionData.output,
      hash: transactionData.hash,
    };
  } catch (error) {
    console.error('Error fetching latest transaction:', error);
    return {
      sender: 'error',
      output: 'error',
      hash: 'error',
    };
  }
};

export const getTenLatestTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/transaction/latests`);
    return response.data.map((transactionData: any): Transaction => ({
      sender: transactionData.sender,
      output: transactionData.output,
      hash: transactionData.hash,
    }));
  } catch (error) {
    console.error('Error fetching ten latest transactions:', error);
    return [];
  }
};

export const getTransactionDetails = async (hash: string): Promise<Transaction> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/transaction/hash/${hash}`);
    const transactionData = response.data;
    return {
      sender: transactionData.sender,
      output: transactionData.output,
      hash: transactionData.hash,
    };
  } catch (error) {
    console.error(`Error fetching transaction details for hash ${hash}:`, error);
    return {
      sender: 'error',
      output: 'error',
      hash: 'error',
    };
  }
};

// METRICS
export const getBlockchainMetrics = async (): Promise<BlockchainMetrics> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/metrics`);
    return {
      number_of_block: response.data.number_of_block,
      number_of_tx: response.data.number_of_tx,
      number_of_utxo: response.data.number_of_utxo,
    }
  } catch (error) {
    console.error('Error fetching blockchain metrics:', error);
    return {
      number_of_block: "0",
      number_of_tx: "0",
      number_of_utxo: "0",
    };
  }
};