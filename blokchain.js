//Mini blockchain
//Blockchain:-  https://www.youtube.com/watch?v=zVqczFZr124 
//Proof of work:- https://www.youtube.com/watch?v=HneatE69814 

const SHA256 = require('crypto-js/sha256')


class Block
{
    constructor (index, timestamp, data, previousHash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash()
    {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();

    }

}

class Blockchain
{
    constructor()
    {

        this.chain = [this.createGenesisBlock()];

    }
    createGenesisBlock()
    {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length - 1 ];

    }

    addBlock(newBlock)
    {
        newBlock.previousHash = this.getLatestBlock().hash;
        
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let mdCoin = new Blockchain();
mdCoin.addBlock(new Block(1, "10/07/2017", { amount: 4}));
mdCoin.addBlock(new Block(2, "11/07/2017", { amount: 10}));

console.log(JSON.stringify(mdCoin, null, 4));
