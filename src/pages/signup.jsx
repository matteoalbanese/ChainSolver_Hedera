import React from 'react';
import '../styles/signup.css';

function Signup() {
    return (
      <div>
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>

        <div className="section">
            
        <form name='signup' method='post' enctype="multipart/form-data" autocomplete="off">
            <h3>Join as a client or freelancer </h3>
            <div id="client">
                <input type='checkbox' name='client' value="1" id="client" />
                <label for='client'>I'm a client, hiring for a project</label>
            </div>

            <div id="freelancer">
                <input type='checkbox' name='freelancer' value="1" id="freelancer" />
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
