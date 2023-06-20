import abi from "../../../contracts/abi.js";
import { ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function getStatus(walletData,contractAddress) {

    console.log(`\n=======================================`);
    
    const provider = walletData[1];
    const signer = provider.getSigner();
    let value;

    
    try{

        const myContract = new ethers.Contract(contractAddress, abi, signer);
        
        const getStatusTx = await myContract.state.call();

        value = getStatusTx;

        await delay(500);
        
    }catch(getStatusError){
        console.log(`- ${getStatusError.message.toString()}`);
    }

    return [value];
}
export default getStatus;

