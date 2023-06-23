# ChainSolver
## Hedera HashGraph Project Work 
ChainSolver App’s goal is to create a platform that connects workers and customers and guarantees a reliable, safe and efficient  payment method.


## Run this dapp locally
<p>Clone this repository in your terminal running</p>
<p>This command clones the pw-hedera repository into your desired directory.</p>

> git clone https://github.com/matteoalbanese/pw-hedera.git
 
 
### to install all dependences
> npm install 

### to start the server
> npm start


## How works?
You can apply to the app as a worker or a buyer, everyone inserts dates about his type of profile. The contact between the two types of figure happens through a post published by the worker, where he describes his kind of work (price, expiration date, delivery options) and the buyer can select what contract he wants to accept. 
Through the buttons is possible to call smart contract function e keeping track of the contract state. 



## Smart Contract details
The smart contract implements a purchase agreement between two figures: worker and buyer. 

When the contract is deployed the price variable is setted by worker input, and the worker address is setted to the wallet address which is deploying the contract. 

Buyer accepts the contract with “accept contract ”, he sends the price setted plus a deposit to guarantee his trust plus a fee to chainsolver to pay the service. In this call the buyer address is setted to the caller and the value sent is checked. The state changes in Locked. 

Worker sends the product as he wants, the buyer can now click the button “work received” to unlock his deposit and to get it back. Now the state is Released. 

In the final part Worker gets the payment by clicking the “get money” button. In this call worker gets back his deposit and the payment, the service fee is sent to chainsolver address.

The worker can destroy a smart contract at every moment in the Created state by using the “abort” button that transfers all the balance of the contract to the worker. The Chainsolver in this case doesn't get any money. 

