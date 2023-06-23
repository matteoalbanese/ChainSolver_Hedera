import React from 'react';
import '../styles/signupClient.css';

function SignupClient() {
    return (
      <div>
        <div className="background">
            <div className="shape1"></div>
            <div className="shape1"></div>
            <div className="shape1"></div>
        </div>

        <div className="section">
            
        <form name='signup' action="app_buyer" method='get' enctype="multipart/form-data" autocomplete="off">
        <h3>Sign Up to hire talent</h3>

        <div className="firstname">
        <label for="firstname">First Name</label>
        <input type="text" placeholder="First Name" id="firstname"/> 
        </div>

        <div className="lastname">
        <label for="lastname">Last Name</label>
        <input type="text" placeholder="Last Name" id="lastname"/>
        </div>

        <div className="username">
        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username"/> 
        </div>

        <div className="email">
        <label for="email">Email</label>
        <input type="text" placeholder="Email" id="email"/>
        </div>

        <div className="password">
        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password"/> 
        </div>

        <div className="confirm_password">
        <label for="confirm_password">Confirm Password</label>
        <input type="text" placeholder="Confirm Password" id="confirm_password"/>
        </div>

        <div id="allow">
        <input type='checkbox' name='allow' value="1" id="allow" />
        <label for='allow'>Agree to Terms and Conditions</label>
        </div>

        <div className="submit">
            <input type='submit' value="Create my account" id="submit"/>
        </div>

     </form>

     <div id="registrati">
        <h4>Looking for a work?</h4>
        <a className="a" href="signupFreelancer">Join as talent</a>
     </div>

        </div> 
      </div>
    )
}

export default SignupClient;
