import abi from "../../../contracts/abi.js";
import { ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function abortContractFcn(walletData, contractAddress){

    console.log(`\n=======================================`);

    const provider = walletData[1];
    const signer = provider.getSigner();

    let txHash;
    
    try{

        console.log("siamo nel try abort ");
        const myContract = new ethers.Contract(contractAddress, abi, signer);
        
        const abortTx = await myContract.abort();
        const abortRx = await abortTx.wait();
        
        txHash = abortRx.transactionHash;

        await delay(500);
        console.log(`abort execution complete`);
        console.log(`- Contract executed. Transaction hash: \n${txHash}`);

    }catch(abortError){
        console.log(`- ${abortError.message.toString()}`);
    }

    return txHash;
}
export default abortContractFcn;
