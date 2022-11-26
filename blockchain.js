const SHA256 = require("sha256")

class Blockchain {
  constructor() {
    // chain => block of transactions added to the network
    // this.generateGenesisBlock() => generate the first block of the network which is genesis block
    this.chain = [this.createGenesisBlock()]
    // hold transactions that are not been added to a block
    this.pendingTransactions = []
  }

  createGenesisBlock() {
    return {
      index: 1,
      timestamp: Date.now(),
      transactions: [],
      nonce: 0,
      hash: "hash",
      previousBlockHash: "previousBlockHash",
    }
  }

  getLastBlock() {
    // to keep track of the previous block's hash.
    return this.chain[this.chain.length - 1]
  }

  generateHash(previousBlockHash, timestamp, pendingTransactions) {
    let hash = ""
    let nonce = 0

    // regenerate the hash until we got one that start with 000
    while (hash.substring(0, 3) !== "000") {
      nonce += 1

      let message =
        previousBlockHash +
        timestamp +
        JSON.stringify(pendingTransactions) +
        nonce

      hash = SHA256(message).toString()
    }

    return { hash, nonce }
  }

  createTransaction(amount, sender, recipient) {
    const transaction = { amount, sender, recipient }

    this.pendingTransactions.push(transaction)
  }

  createNewBlock() {
    const timestamp = Date.now()
    const transactions = this.pendingTransactions
    const previousBlockHash = this.getLastBlock().hash
    const generatedHash = this.generateHash(
      previousBlockHash,
      timestamp,
      transactions
    )

    const block = {
      index: this.chain.length + 1,
      timestamp: timestamp,
      transactions: transactions,
      nonce: generatedHash.nonce,
      hash: generatedHash.hash,
      previousBlockHash: previousBlockHash,
    }

    this.pendingTransactions = []
    this.chain.push(block)

    return block
  }
}

module.exports = Blockchain
