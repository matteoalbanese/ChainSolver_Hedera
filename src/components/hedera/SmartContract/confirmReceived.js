import abi from "../../../contracts/abi.js";
import { ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function confirmReceivedFcn(walletData, contractAddress){

    console.log(`\n=======================================`);

    const provider = walletData[1];

    const signer = provider.getSigner();

    let txHash;

    try{
        
        const myContract = new ethers.Contract(contractAddress, abi, signer);
        
        const confirmReceivedTx = await myContract.confirmReceived();
        const confirmReceivedRx = await confirmReceivedTx.wait();
        
        txHash = confirmReceivedRx.transactionHash;

        await delay(500);
        console.log(`work delivered`);
        console.log(`- Contract executed. Transaction hash: \n${txHash}`);

    }catch(confirmReceivedError){
        console.log(`${confirmReceivedError.message.toString()}`);
    }
}

export default confirmReceivedFcn;
