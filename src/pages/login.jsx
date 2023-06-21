import React from 'react';
import '../styles/login.css';

function Login() {
    return (
      <div>
        <div className="background">
            <div className="shape2"></div>
            <div className="shape2"></div>
        </div>

        <div className="section2">
            
            <form>
                <h3>Connect your wallet</h3>
                <label for='username'>Username</label>
                <input type='text' placeholder='Enter your username'/>
                
                <label for='password'>Password</label>
                <input type='password' placeholder='Enter your password' />
                    
                <button>Log In</button>    
                </form> 

            <div className="registrati">
                <h4>Don't have a ChainSolver account?</h4>
                <a className="a" href="signup">Sign Up</a>
            </div>

        </div> 
      </div>
    )
}

export default Login;
