import axios from 'axios';
import { Block, Transaction, BlockchainMetrics, UserDepositTx, RingCTx, CoinbaseUTXO, ExitUTXO, PaymentUTXO, UTXO, TxFromApi, BlockFromApi } from '../types'; // Mise à jour des importations pour les nouveaux types

const API_ENDPOINT = 'https://api.zer0x.xyz'; // Utilisez l'URL réelle de votre API

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

export const getBlockDetails = async (hash: string): Promise<BlockFromApi |null> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/block/hash/${hash}`);
    const blockData : BlockFromApi = response.data;
    console.log("rawout api:\n", JSON.stringify(response.data));
    return {
      hash: blockData.hash,
      header: {
        block_number: blockData.header.block_number,
        merkle_root: blockData.header.merkle_root,
        parent_block: blockData.header.parent_block,
        timestamp: blockData.header.timestamp,
      },
      transactions: blockData.transactions,
    } satisfies BlockFromApi;
  } catch (error) {
    console.error(`Error fetching block details for hash ${hash}:`, error);
    return null;
  }
};

// TRANSACTION
// Utilitaire pour parser les transactions en fonction de leur type
const parseTransactionData = (data: any): Transaction => {
  // Si la transaction contient un champ spécifique à UserDepositTx
  console.log(data);
  console.log(data.UserDeposit);
  if (data.UserDeposit) {
    const userDepositTx: UserDepositTx = {
      txId: data.UserDeposit.txId,
      output: data.UserDeposit.output,
      hash: data.UserDeposit.hash,
    };
    return userDepositTx;
  }
  // Si la transaction contient un champ spécifique à RingCTx
  else if (data.RingCTx) {
    const ringCTx: RingCTx = {
      inputs: data.RingCTx.inputs,
      outputs: data.RingCTx.outputs,
      hash: data.RingCTx.hash,
    };
    return ringCTx;
  }
  // Lever une exception si le type de transaction n'est pas reconnu
  throw new Error('Unrecognized transaction type');
};

// Fonction pour récupérer les dix dernières transactions
export const getTenLatestTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/transaction/latest-ten`);
    const transactionsData = response.data;
    return transactionsData.map(parseTransactionData);
  } catch (error) {
    console.error('Error fetching ten latest transactions:', error);
    return [];
  }
};

// Fonction pour récupérer les détails d'une transaction spécifique
export const getTransactionDetails = async (hash: string): Promise<Transaction| null> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/transaction/hash/${hash}`);
    const transactionData = response.data;
    return parseTransactionData(transactionData);
  } catch (error) {
    console.error(`Error fetching transaction details for hash ${hash}:`, error);
    return null;
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


// UTXO

// Utilitaire pour parser les UTXO en fonction de leur type

export const parseUTXOData = (data: any): UTXO => {
  if (data.Coinbase) {
    console.log(data.Coinbase);
    const coinbaseUTXO: CoinbaseUTXO = {
      version: data.Coinbase.version,
      transaction_hash: data.Coinbase.transaction_hash,
      output_index: data.Coinbase.output_index,
      lic_key: data.Coinbase.lic_key,
      unlock_time: data.Coinbase.unlock_time,
      amount: data.Coinbase.amount,
      currency: data.Coinbase.currency,
      commitment: data.Coinbase.commitment,
      rG: data.Coinbase.rG,
      hash: data.Coinbase.hash,
    };
    console.log(coinbaseUTXO);
    return coinbaseUTXO;
  } else if (data.Exit) {
    const exitUTXO: ExitUTXO = {
      transaction_hash: data.Exit.transaction_hash,
      output_index: data.Exit.output_index,
      lic_key: data.Exit.lic_key,
      unlock_time: data.Exit.unlock_time,
      amount: data.Exit.amount,
      currency: data.Exit.currency,
      commitment: data.Exit.commitment,
      exitChain: data.Exit.exitChain,
      hash: data.Exit.hash,
    };
    return exitUTXO;
  } else if (data.Payment) {
    const paymentUTXO: PaymentUTXO = {
      version: data.Payment.version,
      transaction_hash: data.Payment.transaction_hash,
      output_index: data.Payment.output_index,
      lic_key: data.Payment.lic_key,
      unlock_time: data.Payment.unlock_time,
      amount: data.Payment.amount,
      currency: data.Payment.currency,
      commitment: data.Payment.commitment,
      rG: data.Payment.rG,
      hash: data.Payment.hash,
    };
    return paymentUTXO;
  }
  throw new Error('Unrecognized UTXO type');
}

// Fonction pour récupérer les détails d'une UTXO spécifique
export const getUTXODetails = async (hash: string): Promise<UTXO | null > => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/utxo/hash/${hash}`);
    const transactionData = response.data;
    return parseUTXOData(transactionData);
  } catch (error) {
    console.error(`Error fetching utxo details for hash ${hash}:`, error);
    return null;
  }
};