export interface Block {
    hash: string;
    header: {
      block_number: string;
      merkle_root: string;
      parent_block: string;
      timestamp: string;
    }
    transactions: Transaction[]; // Liste des transactions dans ce bloc
  }
  
export interface Transaction {
  sender: string;
  output: string;
  hash: string;
}

export interface BlockchainMetrics {
  blocks_number: string;
  transactions_number: string;
  utxos_number: string;
}

  