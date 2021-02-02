import React from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import RegisterScreen from './Screen/RegisterScreen';
import SignInScreen from './Screen/SignInScreen';
import UserDetails from './Screen/UserDetails';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="grid-container">
          <header className="row">
            <div>
              <Link className="brand" to="/">
                Home
            </Link>
            </div>
            <div>
              <Link className="brand" to="/register">
                Register
            </Link>
            </div>
          </header>

          <main>
            <Route path="/register" component={RegisterScreen} ></Route>
            <Route path="/profile" component={UserDetails} ></Route>
            <Route path="/" component={SignInScreen} exact></Route>
          </main>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;