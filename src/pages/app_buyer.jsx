import React, { useState } from "react";
import MyGroup from "../components/MyGroup.jsx";




import walletConnectFcn from "../components/hedera/walletConnect.js";
import getPrice from "../components/hedera/SmartContract/getPrice.js";
import confirmPurchaseFcn from "../components/hedera/SmartContract/confirmPurchase.js";
import getStatus from "../components/hedera/SmartContract/status.js";
import confirmReceivedFcn from "../components/hedera/SmartContract/confirmReceived.js";

import "../styles/App.css";
import logo from "../assets/logo.png";
import chat from "../assets/chat.png";
function Buyer() {


	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [contractAddress, setContractAddress] = useState();
	const [price, setPrice]= useState();
	
	const [errorText, setErrorText] = useState();
	const [connectText, setConnectText] = useState();
	const [formText, setFormText] = useState();
	const [priceText, setPriceText] = useState();
	const [confirmPurchaseText, setConfirmPurchaseText]= useState();
	const [confirmReceivedText, setConfirmReceivedText]= useState();
	const [statusText, setStatusText] = useState();

	


	const [connectLink, setConnectLink] = useState("");
	const [confirmPurchaseLink, setConfirmPurchaseLink]= useState();
	const [confirmReceivedLink, setConfirmReceivedLink]= useState();
	


	async function connectWallet() {
		if (account !== undefined) {
			setConnectText(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();
			setErrorText();
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
			setErrorText("🛑 there is no wallet connected 🛑");
		}else if (contractAddress === undefined){
			setErrorText("🛑 there is no contract deployed 🛑");
		}else if(!(contractAddress.toString().startsWith("0x")) || contractAddress.toString().length !== 42 ){
			setPriceText();
			setErrorText("🛑 contract not valid 🛑");
		}else{
			setErrorText();
			setPriceText();
			const prezzo = await getPrice(walletData, contractAddress);
			
			setPrice(prezzo*1325/1000);
			setPriceText(`price of the work: ${prezzo} Hbar; total cost (price + fees + 30% deposit): ${prezzo*1325/1000} Hbar`)
			
		}
		
	}
	async function confirmPurchaseEx(){
		if(account === undefined){
			setErrorText("🛑 there is no wallet connected 🛑");
		}else if (contractAddress === undefined){
			setErrorText("🛑 there is no contract deployed 🛑");
		}else if(!(contractAddress.toString().startsWith("0x")) || contractAddress.toString().length !== 42 ){
			setErrorText("🛑 contract not valid 🛑");
			setPriceText();
		}else if (price === undefined){
			setConfirmPurchaseText("🛑 you didn't see the price! 🛑")
		}else{
			setErrorText();
			const txHash = await confirmPurchaseFcn(walletData, contractAddress, price);

			if (txHash === undefined) {
				setConfirmPurchaseText("🛑 Error: confirmPurchaseEx, transaction hash undefined 🛑");
			} else {
				setConfirmPurchaseText(`Payment confirmed | Transaction hash: ${txHash} ✅`);
				setConfirmPurchaseLink(`https://hashscan.io/${network}/tx/${txHash}`);
			}

		}
	}
	
	async function confirmReceivedEx(){
		if(account === undefined){
			setErrorText("🛑 there is no wallet connected 🛑");
		}else if (contractAddress === undefined){
			setErrorText("🛑 there is no contract deployed 🛑");
		}else if(!(contractAddress.toString().startsWith("0x")) || contractAddress.toString().length !== 42 ){
			setErrorText("🛑 contract not valid 🛑");
			setPriceText();
		  }else{
			setErrorText();
			const txHash = await confirmReceivedFcn(walletData, contractAddress);

			if (txHash === undefined) {
				setConfirmReceivedText("🛑 Error: confirmReceivedEx, transaction hash undefined 🛑");
			} else {
				setConfirmReceivedText(`Work received | Transaction hash: ${txHash} ✅`);
				setConfirmReceivedLink(`https://hashscan.io/${network}/tx/${txHash}`);
			}
		}
	}

	
	
	async function retrieveStatus(){
		if(account === undefined){
			setErrorText("🛑 there is no wallet connected 🛑");
		}else if (contractAddress === undefined){
			setErrorText("🛑 there is no contract deployed 🛑");
		}else if(!(contractAddress.toString().startsWith("0x")) || contractAddress.toString().length !== 42){
			setErrorText("🛑 contract not valid 🛑");
			setPriceText();
		  }else{
			setErrorText();
			setStatusText();
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
	
	  e.preventDefault();
	
	  const form = e.target;
	  const formData = new FormData(form);
	 
	  const formJson = Object.fromEntries(formData.entries());
	  setContractAddress(formJson.address);
	  const contractAddress = formJson.address;
	  if(!(contractAddress.toString().startsWith("0x")) || contractAddress.toString().length !== 42 ){
		setFormText("🛑 contract not valid 🛑");
		setPriceText();
		}
		else setFormText(`Address : ${formJson.address}`);
	
	  
	}
	
	function handleReset(){
		setContractAddress();
		setFormText("contract address resetted ")
	}
   
  
	return (
	  <form className="form" method="post" onSubmit={handleSubmit} onReset={handleReset}>
		<label>
		  Insert smart contract Address : <input name="address" defaultValue="" />
		</label>
		<button className="button" type="reset"> Reset </button>
		<button className="button" type="submit">Submit</button>
	  </form>
		);
  }

	
	return (
		<div>

		<div className="App">

		<div className="logo">
				<div className="symbol">
				   <img className="log" src={logo} alt="logo"></img>
				</div>
				<span>ChainSolver</span>
			</div>

			<h1 className="header">Buyer Interface</h1>
			
			<MyGroup fcn={connectWallet} buttonLabel={"Connect wallet"} text={connectText} link={connectLink}/>

			<div>
				<p className="sub-text">{formText}</p>
				<MyForm />
				<p className="sub-text">{errorText}</p>
			</div>

			<MyGroup fcn={retrievePrice} buttonLabel={"click here to see the price"}  text={priceText} />
			
			<MyGroup fcn={confirmPurchaseEx} buttonLabel={"Accept contract "} text={confirmPurchaseText} link={confirmPurchaseLink} />

			<MyGroup fcn={confirmReceivedEx} buttonLabel={"work received"} text={confirmReceivedText} link={confirmReceivedLink} />
			
			<MyGroup fcn={retrieveStatus} buttonLabel={"click here to see the status"} text={statusText} />

            <div>
				<img className="chat" src={chat} alt="chat"></img>
            </div>

			
		</div>
	</div>
	);
}
export default Buyer;
