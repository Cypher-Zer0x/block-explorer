# Getting Started with Cypher Zer0x - Block Explorer

You can Monitor Zer0x chain by visiting (explorer.zer0x.xyz)[https://explorer.zer0x.xyz/].  
The app interact with Zer0x nodes using API REST calls.
You can use the API here : [api.zer0x.xyz](https://api.zer0x.xyz/)  

# Available API routes :  
## Metrics Endpoints

### /metrics
- *Method:* GET
- *Description:* Fetches blockchain metrics.
- *Usage:* Used to get an overview of the blockchain's current metrics.

## Transaction (TX) Endpoints

### /mempool
- *Method:* GET
- *Description:* Retrieves data about the current state of the mempool.
- *Usage:* Useful for understanding the pending transactions waiting to be confirmed.

### /utxo/set
- *Method:* GET
- *Description:* Fetches the set of UTXOs.
- *Usage:* Enables querying of unspent transaction outputs, essential for transaction processing and wallet balance calculations.

### /utxo/hash/:hash
- *Method:* GET
- *Description:* Retrieves UTXO data by its hash.
- *Parameters:*
  - hash: The hash of the UTXO.
- *Usage:* Used for looking up specific UTXO details by hash.

### /transaction/all
- *Method:* GET
- *Description:* Fetches data for all transactions.
- *Note:* Consider adding a range mechanism to improve efficiency.
- *Usage:* Allows retrieval of comprehensive transaction data, which may become inefficient without a range mechanism.

### /transaction/hash/:tx_hash
- *Method:* GET
- *Description:* Retrieves transaction data by its hash.
- *Parameters:*
  - tx_hash: The hash of the transaction.
- *Usage:* Useful for querying specific transactions directly.

### /transaction/number
- *Method:* GET
- *Description:* Fetches the number of transactions.
- *Usage:* Provides a count of all transactions processed.

### /transaction/latest-ten
- *Method:* GET
- *Description:* Retrieves the latest ten transactions.
- *Usage:* Offers a quick overview of the most recent transactions.

## Block Endpoints

### /block/all
- *Method:* GET
- *Description:* Fetches data for all blocks.
- *Note:* Consider adding a range mechanism to improve efficiency.
- *Usage:* Enables retrieval of all block data, which may become slow and inefficient without a range mechanism.

### /block/hash/:block_hash
- *Method:* GET
- *Description:* Retrieves block data by its hash.
- *Parameters:*
  - block_hash: The hash of the block.
- *Usage:* Allows for querying specific blocks directly.

### /block/number/:block_number
- *Method:* GET
- *Description:* Fetches block data by block number.
- *Parameters:*
  - block_number: The number of the block.
- *Usage:* Useful for retrieving blocks based on their height in the blockchain.

### /block/range/:rangeData
- *Method:* GET
- *Description:* Retrieves a range of blocks.
- *Parameters:*
  - rangeData: Specifies the range of blocks to retrieve.
- *Usage:* Facilitates the retrieval of blocks within a specific range.

### /block/latest
- *Method:* GET
- *Description:* Fetches the latest block data.
- *Usage:* Provides data on the most recently mined or produced block.

### /block/latest-ten
- *Method:* GET
- *Description:* Retrieves the latest ten blocks.
- *Usage:* Offers a snapshot of the ten most recent blocks.

### /block/total-number
- *Method:* GET
- *Description:* Fetches the total number of blocks.
- *Usage:* Gives the total count of blocks in the blockchain.

## User Operation Endpoints

### /ringct
- *Method:* POST
- *Description:* Handles RingCT (Ring Confidential Transactions) operations.
- *Usage:* Enables users to perform RingCT transactions, enhancing privacy by concealing the amount transferred.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.