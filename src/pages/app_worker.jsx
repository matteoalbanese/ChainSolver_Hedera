import React, { useState } from "react";
import MyGroup from "../components/MyGroup.jsx";
import walletConnectFcn from "../components/hedera/walletConnect.js";
import contractDeployFcn from "../components/hedera/contractDeploy.js";
import "../styles/App.css";
import abortContractFcn from "../components/hedera/SmartContract/abort.js";
import getStatus from "../components/hedera/SmartContract/status.js";
import payWorkerFcn from "../components/hedera/SmartContract/payWorker.js";



function Worker() {
	

	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [contractAddress, setContractAddress] = useState();
	
	const [connectText, setConnectText] = useState("🔌 Connect here...");
	const [contractText, setContractText] = useState();
	const [abortText, setAbortText]= useState();
	const [statusText, setStatusText] = useState();
	const [payWorkerText, setPayWorkerText] = useState();

	const [connectLink, setConnectLink] = useState("");
	const [contractLink, setContractLink] = useState();
	const [abortLink, setAbortLink]= useState();
	const [payWorkerLink,setPayWorkerLink] = useState();

	const[price, setPrice]= useState();


	async function connectWallet() {
		if (account !== undefined) {
			setConnectText(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();

			let newAccount = wData[0];
			let newProvider = wData[1];
			let newNetwork = wData[2];
			
			if (newAccount !== undefined) {
				setConnectText(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLink(`https://hashscan.io/${newNetwork}/account/${newAccount}`);

				//update the react state with the info 
				setWalletData(wData);
				setAccount(newAccount);
				setNetwork(newNetwork);
				localStorage.setItem("worker", 	newProvider);
				setContractText();
			}
		}
	}

	async function contractDeploy() {
		if (account === undefined) {
			setContractText("🛑 Connect a wallet first! 🛑");
		} else {
			if(Number(price) === 0 || price === undefined){
				console.warn("the price insert is not valid ")
				return;
			}
			const cAddress = await contractDeployFcn(walletData, Number(price)); //return the contract address

			if (cAddress === undefined) {
			} else {
				
				setContractAddress(cAddress);
				setContractText(`Contract ${cAddress} deployed ✅`);
				setContractLink(`https://hashscan.io/${network}/address/${cAddress}`);
			}
		}
	}

	async function abortExecute(){
		if(account === undefined){
			setConnectText("🛑 there is no wallet connected 🛑");
		}else if (contractAddress === undefined) {
			setAbortText("🛑 Deploy a contract first! 🛑");
		}else {
			const [txHash] = await abortContractFcn(walletData, contractAddress);

			if (txHash === undefined) {
				console.log("🛑 Error: abortExecute, transaction hash undefined 🛑");
			} else {
				setAbortText(`abort execution complete | Transaction hash: ${txHash} ✅`);
				setAbortLink(`https://hashscan.io/${network}/tx/${txHash}`);
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

	async function payWorkerEx(){
		if (contractAddress === undefined) {
			setPayWorkerText("🛑 Deploy a contract first! 🛑");
		}else {
			const [txHash] = await payWorkerFcn(walletData, contractAddress);

			if (txHash === undefined) {
				console.log("error: the payment has not been successful");
			} else {
				setPayWorkerText(`the payment to the worker has been successful | Transaction hash: ${txHash} ✅`);
				setPayWorkerLink(`https://hashscan.io/${network}/tx/${txHash}`);
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
		const  prezzo = (formJson.price);
		setPrice(prezzo);
		setContractText(` price of the work: ${prezzo};  total cost (price + fees + 30% deposit): ${prezzo*1325/1000}`);
		console.log(` price of the work: ${prezzo};  total cost (price + fees + 30% deposit): ${prezzo*1325/1000}`);
		
		}
	
	
		return (
		<form method="post" onSubmit={handleSubmit}>
			<label>
			set the price: <input name="price" defaultValue="10" />
			</label>
			<button type="reset">Reset </button>
			<button type="submit">Submit</button>
		</form>
			);
	}

	

	function MyForm1() {
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
			<button type="reset"> Reset </button>
			<button type="submit">Submit</button>
		  </form>
			);
	  }
	  

	return (
		<div className="App">
			<h1 className="header">Worker Interface</h1>
			<MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectText} link={connectLink} />
			<h2 className="header">Deploy a new contract</h2>
			
			<div>
				<MyForm />
				<MyGroup fcn={contractDeploy} buttonLabel={"Deploy Contract"} text={contractText} link={contractLink} />
			</div>
			<div>
				<h2 className="header">Interact with smart contract already deployed </h2>
				<MyForm1/>

			</div>

			<MyGroup fcn={retrieveStatus} buttonLabel={"status"} text={statusText} />
			
			<MyGroup fcn={payWorkerEx} buttonLabel={"get money"} text={payWorkerText} link={payWorkerLink}/>

			<MyGroup fcn={abortExecute} buttonLabel={"Abort the smart contract"} text={abortText} link={abortLink} />
			
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
export default Worker;
