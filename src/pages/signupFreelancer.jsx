import React from 'react';
import '../styles/signupFreelancer.css';

function SignupFreelancer() {
    return (
      <div>
        <div className="background">
            <div className="shape1"></div>
            <div className="shape1"></div>
            <div className="shape1"></div>
        </div>

        <div className="section">
            
        <form name='signup' action="app_worker" method='get' enctype="multipart/form-data" autocomplete="off">
        <h3>Sign Up to find work you love</h3>

        <div className="firstname">
        <label for="firstname">First Name</label>
        <input type="text" placeholder="First Name" id="firstname"/> 
        <span> Devi inserire il tuo nome </span>
        </div>

        <div className="lastname">
        <label for="lastname">Last Name</label>
        <input type="text" placeholder="Last Name" id="lastname"/>
        <span> Devi inserire il tuo cognome </span>
        </div>

        <div className="username">
        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username"/> 
        <span> Nome utente non disponibile </span>
        </div>

        <div className="email">
        <label for="email">Email</label>
        <input type="text" placeholder="Email" id="email"/>
        <span> Indirizzo email non valida </span>
        </div>

        <div className="password">
        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password"/> 
        <span> Inserisci almeno 8 caratteri </span>
        </div>

        <div className="confirm_password">
        <label for="confirm_password">Confirm Password</label>
        <input type="text" placeholder="Confirm Password" id="confirm_password"/>
        <span> Le password non corrispondono </span>
        </div>

        <div id="allow">
        <input type='checkbox' name='allow' value="1" id="allow" />
        <label for='allow'>Accetto i termini e condizioni d'uso di ChainSolver.</label>
        </div>

        <div className="submit">
            <input type='submit' value="Create my account" id="submit"/>
        </div>

     </form>

     <div id="registrati">
        <h4>Here to hire talent?</h4>
        <a className="a" href="signupClient">Join as a client</a>
     </div>

        </div> 
      </div>
    )
}

export default SignupFreelancer;