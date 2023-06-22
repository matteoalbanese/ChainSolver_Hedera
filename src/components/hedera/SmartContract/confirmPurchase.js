import abi from "../../../contracts/abi.js";
import { ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function confirmPurchaseFcn(walletData, contractAddress, price){

    console.log(`\n=======================================`);

    const provider = walletData[1];

    const signer = provider.getSigner();

    let txHash;

    try{
        
        const myContract = new ethers.Contract(contractAddress, abi, signer);
        
        const confirmPurchaseTx = await myContract.confirmPurchase( {value: ethers.utils.parseEther(price.toString())});
        const confirmPurchaseRx = await confirmPurchaseTx.wait();
        
        txHash = confirmPurchaseRx.transactionHash;

        await delay(500);
        
        console.log("payment confirmed");
        console.log(`transaction hash: \n${txHash}`);

    }catch(confirmPurchaseError){
        console.log(`${confirmPurchaseError.message.toString()}`);
    }

    return txHash;
}

export default confirmPurchaseFcn;
