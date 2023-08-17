import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import { auth } from "./firebase";

// use history jo hai depricate ho gya toh bs hum log isme 
//navigate use krenge bs isme se 

import { useNavigate } from 'react-router-dom';



function Login() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState();
    // const history = useHistory();

    const history = useNavigate();

    const signIn = e =>{
        // default refresh hone se prevent krne ke liye use kr rahe hai bs hum isko 
        e.preventDefault();

        // now firabase login come to play here 
        auth
        .signInWithEmailAndPassword(email,password)
        .then(auth => {
            history('/')
        })
        .catch(error =>alert(error.message))
    }


        const register=e=>{
            e.preventDefault();
            //do some firebase register here now 
            // auth method ko call krenge or fir usme auth ka object pass krenge agar sb sahi toh ok warna catch krenge usko fir
            auth.createUserWithEmailAndPassword(email,password)
            .then((auth)=>{ 
                // it created an email and password account here
                console.log(auth);
// iss acount ko match krke direct navigate krte hai 
                if(auth){
                    history('/')
                }                    

            })
            .catch(error=>alert(error.message))
        }

    return (
        <div className='login'> 
            <Link to={'/'}>
            <img 
            className='login__logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='amazon logo'/>
            </Link>

            <div className='login__container'>
             <h2>Sign In</h2> 

            <form>
                <h5>E-mail</h5>
                {/* or onchange per hum event use kr skte hai isme  */}
                {/* jo target me hai uski value hi set krdenge email me hum log bs isme */}
                <input type='text' value={email} onChange={e=>setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>

            <button className='login__signInButton' type='submit' onClick={signIn}>Sign In</button>

            </form> 
            <p>
                By signing-in you agree to Amazon's Clone (CLONE Lol)
                conditions of use & sale. please see out privacy Notice,
                our cookies policy and out Interst-Based Ads
            </p>

            <button className='login__registerButton' type='submit' onClick={register}>Create Your Amazon Account</button>

            </div>

        </div>
    );
}

export default Login;

// hey@gmail.com
// hey007