
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.11;


contract PurchaseAgreement {

    address constant myAddress = 0x149017392F220B26A3e4d49aA664bC96EC9300F7;
    uint256 public value;

    address payable public worker;
    address payable public buyer;

    enum State {Created, Locked, Release, Inactive}
    State public state; //default is initialized with Created 

    //call once when the contract is deployed 
    constructor() payable {
        //msg is a global variable and sender is the one who deployed the contract 
        worker = payable (msg.sender);
        value = (msg.value*1000/1325);
    }

    //modifier is going call the revert function to revert the transaction if conditions are not met 
    
    ///  The function cannot be called at the current state.
    error InvalidState();
    ///  Only the buyer can call this function 
    error OnlyBuyer();
    ///  Only the seller can call this function 
    error OnlyWorker();

    modifier inState(State state_){
        if(state != state_){
            revert InvalidState();
        }
        _;
    }


    modifier onlyBuyer(){
        if(msg.sender != buyer){
            revert OnlyBuyer();
        }
        _;

    }

    
    
    modifier onlyWorker(){
        if(msg.sender != worker){
            revert OnlyWorker();
        }
        _;

    }
    
   /* function status() external view {
        state;
    }
    */
    //THE BUYER deve essere in grado di chiamarla da fuori lo smart contract "external"

    function confirmPurchase() external inState(State.Created) payable {
        
        require( msg.value >= (value*1325/1000), "Wrong input");
        buyer = payable (msg.sender);//in this case the sender is the buyer 
        state = State.Locked;
    }


    function confirmReceived() external onlyBuyer inState(State.Locked) {

        state = State.Release; //release funds

        buyer.transfer(value*3/10); //returning the deposit to the buyer 
    }


    function confirmPay() external onlyWorker inState(State.Release){

            state = State.Inactive;
            worker.transfer(value*23/10);
            payable(myAddress).transfer(address(this).balance);
    }


    function abort() external onlyWorker inState(State.Created){

        state = State.Inactive;

        worker.transfer(address(this).balance);
    }


}
  
