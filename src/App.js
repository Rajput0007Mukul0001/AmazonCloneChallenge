import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import './Header.css'
import Home from './Home';
import Login from './Login';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Checkout from './Checkout';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import Orders from './Orders';
// import axios from './axios';


// who is signed ka track rkhne ke liye we will use a listner here 
// useEffect ki  help se 


// fuck isme ek sath do elment ni aah rahe hai bc nested routing use kro ya ek or file banao isme main page naam se BC fuck this new version of ROUTER
//we can use {(<> and tags  then </> here this will work  fine here)}


const promise = loadStripe('pk_test_51NXg5tSDysHtItdlEFP0y4oN1RDQvGYpizlOJLLwS7jrDLSQIvFdg6NCgpr33yoEYqvblD4pRD5QKYhMaLUeRMWx00j2GwnTsv');

function App() {
  
  const [{},dispatch]=useStateValue();

  useEffect(()=>{
// will only run once when the app component loads 
//jaise hi authentication state change ho koi or loggin kre ya account bnae isme 

auth.onAuthStateChanged(authUser=>{
  console.log("THIS USER IS ===> ",authUser);

// or ye sb hota hai datalayer jo connect hai firebase se usme 

if(authUser){
  //the user jsut loggedin / the was logged in 
  dispatch({
    type:'SET_USER',
    user:authUser
  }) 
}
else{
  //the user is logged out //toh is sbke liye reduceer me jaake user bnao ek varible null se initialise krke initialState me 
  dispatch({
    type:'SET_USER',
    user:null
  })
}

})
  },[])

  return (

    //router use krenge or login wagera hoga toh usi hissab se conditions form krenge hum isme 
    <Router>
    <div className="app">

      <Routes> 
    
{/* <Route path="/"> <Header/>  <Home/> </Route>    this representations is supported only the earlier version of the router in reactdom */}
    

<Route path="/"
 element={(<>
 <Header/> <Home/>  
 </>)}/>

{/* checkout page ke create a route here */}

<Route path='/checkout'
element={(<><Header/> <Checkout/></>)}/>

<Route path='/payment'
element={(<><Header/> 
<Elements stripe={promise}>
<Payment/>
</Elements>
 

</>)}/>

{/* <Route path='/payments/create'
element={
  <>
  <Header/>
  </>
}
/> */}
{/* ye chalega per ye response serveer se ana hai bc  */}


<Route path='/login'
element={(<>
{/* <h1>Login Page</h1> */}
<Login/>
</>)}/>


<Route path='/orders'
element={(<>
{/* <h1>Login Page</h1> */}
<Header/>
<Orders/>
</>)}/>


</Routes>

    </div>
    </Router>

  );
}

export default App;

// C:\Users\hp\AppData\Roaming\npm
