const Web3 = require("web3");
const web3 = new Web3("https://cloudflare-eth.com");
const account = web3.eth.accounts.privateKeyToAccount("");
const ABI = [];
const ADDRESS = "";
const contract = new Web3.eth.contract(ABI, ADDRESS);
const receiver = "";

async function send(web3, account, transaction) {
    const address = account.address;
    const options = {
        to: transaction._parent_address,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({ from: address }),
        gasPrice: await web3.eth.getGasPrice()
    }
    const signed = await web3.eth.accounts.signTransaction(options, account.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    return receipt;
}

const transaction = contract.methods.safeMint(receiver);
send(web3, account, transaction);