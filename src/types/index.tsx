export interface Block {
    hash: string;
    number: number;
    timestamp: number; // Unix timestamp
    transactions: Transaction[]; // Liste des transactions dans ce bloc
    miner: string; // L'adresse du mineur qui a miné le bloc
    nonce: string; // Un scalaire utilisé lors du minage
  }
  
  export interface Transaction {
    hash: string;
    blockHash: string; // Le hash du bloc contenant cette transaction
    blockNumber: number; // Le numéro du bloc contenant cette transaction
    from: string; // Adresse de l'expéditeur
    to: string; // Adresse du destinataire
    value: string; // Valeur transférée dans la transaction, probablement en wei
    gas: number; // Gaz fourni pour la transaction
    gasPrice: string; // Prix du gaz en wei
    nonce: number; // Nonce de l'expéditeur
  }
  
  export interface BlockDetails extends Block {
    size: number; // La taille du bloc en octets
    gasLimit: number; // Limite de gaz pour ce bloc
    gasUsed: number; // Gaz utilisé pour toutes les transactions dans le bloc
    transactionCount: number; // Nombre de transactions dans le bloc
  }
  
  export interface TransactionDetails extends Transaction {
    input: string; // Données d'entrée de la transaction
    status: 'success' | 'fail' | 'pending'; // Statut de la transaction
    transactionIndex: number; // Index de la transaction dans le bloc
  }
  