import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Buyer from './pages/app_buyer';
import Worker from './pages/app_worker';
import Navbar from './pages/Navbar';
import Login from './pages/login';
import Signup from './pages/signup';
import SignupFreelancer from './pages/signupFreelancer';
import SignupClient from './pages/signupClient';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
      <Routes>
          
          <Route exact path='/app_buyer' element={<Buyer/>}>
          </Route>
          
          <Route exact path='/app_worker' element={<Worker/>}>
          </Route>

          <Route exact path='/login' element={<Login/>}>
          </Route>

          <Route exact path='/signup' element={<Signup/>}>
          </Route>

          <Route exact path='/signupFreelancer' element={<SignupFreelancer/>}>
          </Route>

          <Route exact path='/signupClient' element={<SignupClient/>}>
          </Route>
         
      </Routes>
      </div>

      
     
    </BrowserRouter>
  );
}

export default App;
