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
  
// export interface Transaction {
//   sender: string;
//   output: string;
//   hash: string;
// }

export interface BlockchainMetrics {
  number_of_block: string;
  number_of_tx: string;
  number_of_utxo: string;
}

export interface UserDepositTx {
  txId: string;
  output: string;
  hash: string;
}

export interface RingCTx {
  inputs: string[];
  outputs: string[];
  hash: string;
}

export type Transaction = UserDepositTx | RingCTx;

export function isUserDepositTx(transaction: Transaction): transaction is UserDepositTx {
  return (transaction as UserDepositTx).txId !== undefined;
}

export function isRingCTx(transaction: Transaction): transaction is RingCTx {
  return (transaction as RingCTx).inputs !== undefined;
}