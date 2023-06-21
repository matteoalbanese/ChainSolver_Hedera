import React from 'react';
import '../styles/signup.css';

function Signup() {


    const handleClient=(data)=>{
        document.querySelector('#freelancer').classList.remove('verde');
        document.querySelector('#freelancer input').checked = false;
        document.querySelector('#client').classList.add('verde');
        document.querySelector('button').classList.add('vbottone');
        document.querySelector('button').textContent="Join as a Client";
        document.querySelector('#bottone').href="signupClient";
    }

    const handleFreelancer=(data)=>{
        document.querySelector('#client').classList.remove('verde');
        document.querySelector('#client input').checked=false;
        document.querySelector('#freelancer').classList.add('verde');
        document.querySelector('button').classList.add('vbottone');
        document.querySelector('button').textContent="Apply as a Freelancer";
        document.querySelector('#bottone').href="signupFreelancer";
    }


    

    return (
      <div>
        <div className="background">
            <div className="shape2"></div>
            <div className="shape2"></div>
        </div>

        <div className="section1">
            
        <form name='signup' method='post' enctype="multipart/form-data" autocomplete="off">
            <h3>Join as a client or freelancer </h3>
            <div id="client">
                <input type='checkbox' name='client' value="client" id="client" onChange={()=>handleClient("client")}/>
                <label for='client'>I'm a client, hiring for a project</label>
            </div>

            <div id="freelancer">
                <input type='checkbox' name='freelancer' value="freelancer" id="freelancer" onChange={()=>handleFreelancer("freelancer")}/>
                <label for='freelancer'>I'm a freelancer, looking for a work</label>
            </div>
        </form>
        
        <a id="bottone"><button>Create Account</button></a>

        <div id="login">
        <h4>Already have an account?</h4>
        <a id="log" href="login">Log In</a>
        
        </div>

        </div> 
      </div>
    )
}

export default Signup;