import Web3 from 'web3'
const w3 = new Web3(window.ethereum);
const prov = w3;

export default {
  prov,
  contract(abi, addr){
    const contract = new w3.eth.Contract(abi,addr);
    return contract;
  },
  async gasPrice(){
    let gasPrice; 
   return gasPrice = await w3.eth.getGasPrice();
  },
  /*
  async gasLimit(){
    const block = await w3.eth.getBlock("latest");
    let gasLimit = block.gasLimit
    let txLength =   block.transactions.length
    return parseInt(gasLimit/txLength)
  },
  */ 
  async gasEstimate(from , to, data){
    const gasEstimate = await prov.eth.estimateGas({
        from: from,
        to: to,
        data: Web3.utils.fromAscii(data.toString())
    });
    return gasEstimate.toString();
  }
}

