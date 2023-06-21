import React, { useState } from "react";
import MyGroup from "../components/MyGroup.jsx";
import walletConnectFcn from "../components/hedera/walletConnect.js";
import contractDeployFcn from "../components/hedera/contractDeploy.js";
import "../styles/App.css";
import abortContractFcn from "../components/hedera/SmartContract/abort.js";
import getStatus from "../components/hedera/SmartContract/status.js";
import payWorkerFcn from "../components/hedera/SmartContract/payWorker.js";
import logo from "../assets/logo.png";
import chat from "../assets/chat.png";


function Worker() {
	
	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [contractAddress, setContractAddress] = useState();
	
	const [errorText, setErrorText] = useState();
	const [connectText, setConnectText] = useState("🔌 Connect here...");
	const [contractText, setContractText] = useState();
	const [abortText, setAbortText]= useState();
	const [statusText, setStatusText] = useState();
	const [payWorkerText, setPayWorkerText] = useState();
	const [formText, setFormText] = useState();
	const [form1Text, setForm1Text] = useState();


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
			setErrorText("🛑 there is no wallet connected 🛑");
		}else if (contractAddress === undefined) {
			setAbortText("🛑 Deploy a contract first! 🛑");
		}else {
			const txHash = await abortContractFcn(walletData, contractAddress);

			if (txHash === undefined) {
				setAbortText("🛑 Error: abortExecute, transaction hash undefined 🛑");
			} else {
				setAbortText(`abort execution complete | Transaction hash: ${txHash} ✅`);
				setAbortLink(`https://hashscan.io/${network}/tx/${txHash}`);
			}
		}
	}
	
	async function retrieveStatus(){
		if(account === undefined){
			setErrorText("🛑 there is no wallet connected 🛑");
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
		if(account === undefined){
			setErrorText("🛑 there is no wallet connected 🛑");
		}else if (contractAddress === undefined) {
			setPayWorkerText("🛑 Deploy a contract first! 🛑");
		}else {
			const txHash = await payWorkerFcn(walletData, contractAddress);

			if (txHash === undefined) {
				setPayWorkerText("🛑 error: the payment has not been successful 🛑");
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
		setPrice(prezzo*1325/1000);
		setFormText(` price of the work: ${prezzo} Hbar;  total cost (price + fees + 30% deposit): ${prezzo*1325/1000} Hbar`);
		console.log(` price of the work: ${prezzo};  total cost (price + fees + 30% deposit): ${prezzo*1325/1000}`);
		
		}
		
		function handleReset(){
	
			setFormText(` price resetted `);
			console.log("price resetted")
		}
	
	
		return (
		<form method="post" onSubmit={handleSubmit} onReset={handleReset}>
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
		  setForm1Text(`Address : ${formJson.address}`);
		  
		}
		
		function handleReset(){
			setContractAddress();
			setForm1Text("contract address resetted ")
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
			<div className="logo">
				<div className="symbol">
					<img className="log" src={logo} alt="logo"></img>
				</div>
				<span>ChainSolver</span>
			</div>
			<h1 className="header">Worker Interface</h1>
			<MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} text={connectText} link={connectLink} />
			<h2 className="header">Deploy a new contract</h2>
			
			<div>
				<p className="sub-text">{formText}</p>
				<MyForm />
				<MyGroup fcn={contractDeploy} buttonLabel={"Deploy Contract"} text={contractText} link={contractLink} />
			</div>
			<div>
				<h2 className="header">Interact with smart contract already deployed </h2>
				<p className="sub-text">{form1Text}</p>
				<MyForm1/>

			</div>
			<p className="sub-text">{errorText}</p>

			<MyGroup fcn={payWorkerEx} buttonLabel={"get money"} text={payWorkerText} link={payWorkerLink}/>
			
			<MyGroup fcn={retrieveStatus} buttonLabel={"status"} text={statusText} />

			<MyGroup fcn={abortExecute} buttonLabel={"Abort the smart contract"} text={abortText} link={abortLink} />

			<div>
			    <img className="chat" src={chat}></img>
                        </div>
		</div>
	);
}
export default Worker;
