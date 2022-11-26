const Blockchain = require("./blockchain")

let bitcoin = new Blockchain()

bitcoin.createTransaction("989", "sender", "recipient")
bitcoin.createTransaction("728", "sender", "recipient")
bitcoin.createTransaction("900", "sender", "recipient")

bitcoin.createNewBlock()
console.log("############### Blockchain ########")
console.log(bitcoin)
console.log("############### Last block transactions ########")
console.log("Last block transactions ==> ",bitcoin.getLastBlock().transactions)

