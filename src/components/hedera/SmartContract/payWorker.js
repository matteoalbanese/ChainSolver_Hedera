import abi from "../../../contracts/abi.js";
import { ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function payWorkerFcn(walletData, contractAddress){

    console.log(`\n=======================================`);

    const provider = walletData[1];

    const signer = provider.getSigner();

    let txHash;

    try{
        
        
        const myContract = new ethers.Contract(contractAddress, abi, signer);
        
        const payWorkerTx = await myContract.confirmPay();

        const payWorkerRx = await payWorkerTx.wait();
        
        txHash = payWorkerRx.transactionHash;

        await delay(500);
        console.log(`the worker was payed correctly`);
        console.log(`- Contract executed. Transaction hash: \n${txHash}`);



    }catch(payWorkerError){
        console.log(`${payWorkerError.message.toString()}`);
    }

    return txHash;
}

export default payWorkerFcn;