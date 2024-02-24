import axios from 'axios';
import { Block, Transaction, BlockDetails, TransactionDetails } from '../types'; // Assurez-vous d'avoir ces types définis

const API_ENDPOINT = 'https://votre-blockchain-api.com';

export const getLatestBlocks = async (): Promise<Block[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/blocks/latest`);
    // Assurez-vous que cela renvoie un tableau de `Block[]`
    // Vous pourriez avoir besoin de mapper ou d'ajuster les données si leur structure ne correspond pas exactement
    // à votre type `Block`
    return response.data.map((blockData: any): Block => ({
      hash: blockData.hash,
      number: blockData.number,
      timestamp: blockData.timestamp,
      transactions: blockData.transactions,
      miner: blockData.miner,
      nonce: blockData.nonce,
    }));
  } catch (error) {
    console.error('Error fetching latest blocks:', error);
    return []; // Renvoyez un tableau vide ou gérez l'erreur comme il convient
  }
};
export const getLatestTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/transactions/latest`);
    return response.data; // Assurez-vous que cela renvoie un Transaction[]
  } catch (error) {
    console.error('Error fetching latest transactions:', error);
    return []; // Renvoyez un tableau vide ou gérez l'erreur comme il convient
  }
};

export const getBlockDetails = async (blockHash: string): Promise<BlockDetails> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/blocks/${blockHash}`);
    return response.data; // Assurez-vous que cela renvoie un BlockDetails
  } catch (error) {
    console.error(`Error fetching details for block ${blockHash}:`, error);
    throw error; // Vous pouvez relancer l'erreur ou renvoyer null et gérer cela dans votre composant
  }
};

export const getTransactionDetails = async (txHash: string): Promise<TransactionDetails> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/transactions/${txHash}`);
    return response.data; // Assurez-vous que cela renvoie un TransactionDetails
  } catch (error) {
    console.error(`Error fetching details for transaction ${txHash}:`, error);
    throw error; // Même gestion que pour getBlockDetails
  }
};

export const getBlockchainOverview = async () => {
  try {
    // Remplacez '/path-to-overview' par le chemin réel de votre API pour obtenir les infos globales
    const response = await axios.get(`${API_ENDPOINT}/path-to-overview`);
    return response.data; // Suppose que l'API renvoie directement l'objet d'aperçu souhaité
  } catch (error) {
    console.error('Error fetching blockchain overview:', error);
    throw new Error('Failed to fetch blockchain overview');
  }
};
