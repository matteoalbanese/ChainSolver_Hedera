import React, { useState } from "react";
import MyGroup from "../components/MyGroup.jsx";
import walletConnectFcn from "../components/hedera/walletConnect.js";

import getPrice from "../components/hedera/SmartContract/getPrice.js";
import confirmPurchaseFcn from "../components/hedera/SmartContract/confirmPurchase.js";
import "../styles/App.css";
import getStatus from "../components/hedera/SmartContract/status.js";
import confirmReceivedFcn from "../components/hedera/SmartContract/confirmReceived.js";



function Buyer() {
	
	
	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [contractAddress, setContractAddress] = useState();
	

	const [connectText, setConnectText] = useState("🔌 Connect here...");
	const [priceText, setPriceText] = useState();
	const [confirmPurchaseText, setConfirmPurchaseText]= useState();
	const [confirmReceivedText, setConfirmReceivedText]= useState();
	const [statusText, setStatusText] = useState();

	const [connectLink, setConnectLink] = useState("");
	const [confirmPurchaseLink, setConfirmPurchaseLink]= useState();
	const [confirmReceivedLink, setConfirmReceivedLink]= useState();
	

	const[price, setPrice]= useState();


	async function connectWallet() {
		if (account !== undefined) {
			setConnectText(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();

			let newAccount = wData[0];
			let newNetwork = wData[2];
			if (newAccount !== undefined) {
				setConnectText(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLink(`https://hashscan.io/${newNetwork}/account/${newAccount}`);

				//update the react state with the info 
				setWalletData(wData);
				setAccount(newAccount);
				setNetwork(newNetwork);
			}
		}
	}

	
	
	async function retrievePrice(){
		
		if(account === undefined){
			setConnectText("🛑 there is no wallet connected 🛑");
		}else if (contractAddress === undefined)
		{
			setPriceText("🛑 there is no contract deployed 🛑");
		}else{
			setPriceText();
			const prezzo = await getPrice(walletData, contractAddress);
			
			setPrice(prezzo*1325/1000);
			setPriceText(`price of the work: ${prezzo} total cost (price + fees + 30% deposit): ${prezzo*1325/1000}`)
			
		}
		
	}
	async function confirmPurchaseEx(){
		if(account === undefined){
			setConnectText("🛑 there is no wallet connected 🛑");
		}else if (contractAddress === undefined){
			setConfirmPurchaseText("🛑 there is no contract deployed 🛑");
		}else {
			
			const [txHash] = await confirmPurchaseFcn(walletData, contractAddress, price);

			if (txHash === undefined) {
				console.log("🛑 Error: confirmPurchaseEx, transaction hash undefined 🛑");
			} else {
				setConfirmPurchaseText(`Payment confirmed | Transaction hash: ${txHash} ✅`);
				setConfirmPurchaseLink(`https://hashscan.io/${network}/tx/${txHash}`);
			}

		}
	}
	
	async function confirmReceivedEx(){
		if(account === undefined){
			setConnectText("🛑 there is no wallet connected 🛑");
		}else if (price === undefined){
			setConfirmReceivedText("🛑 you didn't see the price! 🛑")
		}
		if (contractAddress === undefined){
			setConfirmReceivedText("🛑 there is no contract deployed 🛑");
		}else{
			const [txHash] = await confirmReceivedFcn(walletData, contractAddress);

			if (txHash === undefined) {
				console.log("🛑 Error: confirmReceivedEx, transaction hash undefined 🛑");
			} else {
				setConfirmReceivedText(`Lavoro consegnato | Transaction hash: ${txHash} ✅`);
				setConfirmReceivedLink(`https://hashscan.io/${network}/tx/${txHash}`);
			}
		}
	}

	
	
	async function retrieveStatus(){
		if(account === undefined){
			setConnectText("🛑 there is no wallet connected 🛑");
		}else if (contractAddress === undefined){
			setStatusText("🛑 there is no contract deployed 🛑");
		}else{
			const stato = await getStatus(walletData, contractAddress);
			console.log(`${stato}`);
			
			
			if (`${stato}` === `0`) {
				setStatusText(`contract state is: Created ✅`);
			} else if (`${stato}` === `1`) {
				setStatusText(`contract state is: Locked ✅`);
			}else if (`${stato}` === `2`) {
					setStatusText(`contract state is: Released ✅`);
			}else if (`${stato}` === `3`) {
				setStatusText(`contract state is: Inactive ✅`);
			}else{
				setStatusText("🛑 Error: retrieveStatus, contract or contract state not valid 🛑");
			}
		}
	}


function MyForm() {
	function handleSubmit(e) {
	  // Prevent the browser from reloading the page
	  e.preventDefault();
	
	  // Read the form data
	  const form = e.target;
	  const formData = new FormData(form);
	  // Or you can work with it as a plain object:
	  const formJson = Object.fromEntries(formData.entries());
	  setContractAddress(formJson.address);
	  console.log(`Address : ${formJson.address}`);
	  
	}
	
	function handleReset(){
		setContractAddress();
		console.log("contract address resetted ")
	}
   
  
	return (
	  <form method="post" onSubmit={handleSubmit} onReset={handleReset}>
		<label>
		  Insert smart contract Address : <input name="address" defaultValue="" />
		</label>
		<button type="reset">Double click to Reset </button>
		<button type="submit">Submit</button>
	  </form>
		);
  }
  

	return (
		<div className="App">

			
			<h1 className="header">Buyer interface</h1>
			
			<MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectText} link={connectLink} />
			
			<div>
				<MyForm />
			</div>
			
			<MyGroup fcn={retrievePrice} buttonLabel={"click here to see the price"}  text={priceText} />
			
			<MyGroup fcn={confirmPurchaseEx} buttonLabel={"Accept contract "} text={confirmPurchaseText} link={confirmPurchaseLink} />

			<MyGroup fcn={confirmReceivedEx} buttonLabel={"work received"} text={confirmReceivedText} link={confirmReceivedLink} />
			
			<MyGroup fcn={retrieveStatus} buttonLabel={"click here to see the status"} text={statusText} />


			<div className="logo">
				<div className="symbol">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
						<path d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0" className="circle"></path>
						<path d="M28.13 28.65h-2.54v-5.4H14.41v5.4h-2.54V11.14h2.54v5.27h11.18v-5.27h2.54zm-13.6-7.42h11.18v-2.79H14.53z" className="h"></path>
					</svg>
				</div>
				<span>Hedera</span>
			</div>


		</div>
	);
}
export default Buyer;
