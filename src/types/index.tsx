// Definition of the types used in the application
// Block
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

// Blockchain Metrics
export interface BlockchainMetrics {
  number_of_block: string;
  number_of_tx: string;
  number_of_utxo: string;
}

// Transaction
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

export enum TxType {
  UserDeposit = "UserDeposit",
  RingCT = "RingCT",
  Exit = "UserExit",
}

export interface BlockFromApi extends Omit<Block, "transactions"> {
  transactions: TxFromApi[];
}

export type TxFromApi = {
  [txType in TxType]: Transaction;
};
export type Transaction = UserDepositTx | RingCTx;

export function isUserDepositTx(transaction: Transaction): transaction is UserDepositTx {
  return (transaction as UserDepositTx).txId !== undefined;
}

export function isRingCTx(transaction: Transaction): transaction is RingCTx {
  return (transaction as RingCTx).inputs !== undefined;
}

// UTXO
export interface PaymentUTXO {
  version: string,          // hex version number of the transaction
  transaction_hash: string, // hash of the transaction where this UTXO was output, coinbase transactions have a hash of 0
  output_index: string,        // index number of the output in the transaction
  lic_key: string, // (compressed point) -> a one-time lic key generated for this transaction output
  unlock_time: string,
  amount: string, // encrypted amount + blinding factor, only the owner can decrypt it (if coinbase, the amount is clear and there is no blinding factor)
  currency: string, // currency -> TODO: find a way to encrypt it too
  commitment: string, // (compressed point) -> a cryptographic commitment to the amount, allows verification without revealing the amount
  rG: string,
  hash: string,
}


export interface ExitUTXO {
  transaction_hash: string, // hash of the transaction where this UTXO was output, coinbase transactions have a hash of 0
  output_index: string,        // index number of the output in the transaction
  lic_key: string, // (compressed point) -> a one-time lic key generated for this transaction output
  unlock_time: string,
  amount: string, // encrypted amount + blinding factor, only the owner can decrypt it (if coinbase, the amount is clear and there is no blinding factor)
  currency: string, // currency -> TODO: find a way to encrypt it too
  commitment: string, // (compressed point) -> a cryptographic commitment to the amount, allows verification without revealing the amount
  exitChain: string,  // the chain where the UTXO is exiting
  hash: string,       // hash of the UTXO
}

export interface CoinbaseUTXO {
  version: string,          // hex version number of the transaction
  transaction_hash: string, // hash of the transaction where this UTXO was output, coinbase transactions have a hash of 0
  output_index: string,        // index number of the output in the transaction
  lic_key: string, // (compressed point) -> a one-time lic key generated for this transaction output
  unlock_time: string,
  amount: string,     // coinbase amount is always clear
  currency: string, // todo: mask this too using the same method as the amount (xor concat(8bytesAmount, currencyId) and shared secret) -> How to prove the currency input = currency output ???
  commitment: string, // (compressed point) -> a cryptographic commitment to the amount, allows verification without revealing the amount
  rG: string,
  hash: string, // hash of the UTXO
}

export type UTXO = CoinbaseUTXO | ExitUTXO | PaymentUTXO;

export function isCoinbaseUTXO(utxo: UTXO): utxo is CoinbaseUTXO {
  return (utxo as CoinbaseUTXO).amount !== undefined && (utxo as CoinbaseUTXO).currency !== undefined && (utxo as any).exitChain === undefined;
}

export function isExitUTXO(utxo: UTXO): utxo is ExitUTXO {
  return (utxo as ExitUTXO).exitChain !== undefined;
}

export function isPaymentUTXO(utxo: UTXO): utxo is PaymentUTXO {
  return (utxo as PaymentUTXO).version !== undefined;
}
