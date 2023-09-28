import React, { useState, useEffect } from 'react'
import "./Login.scss"
import axios from 'axios'

type Props = {logedIn: any}



export default function Login({logedIn}: Props) {
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    axios.post('http://localhost:8888/register', {
      name: "test"
    })
    .then((response) => {
      console.log(response.data);
        // Handle data
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  return (

    <div className={count == 1 ? "container right-panel-active" : "container"} id="container" >

    <div className="form sign_up">
      <form action="#">

        <h1 className="marginSet20">Create An Account</h1>
      
        <input type="text" placeholder="User Name"  />
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <button onClick={()=>{logedIn(true)}}>Create Account</button>
        
      </form>
    </div>

    <div className="form sign_in">
      <form action="#">
       
        <h1 className="marginSet20">Been Here Before?</h1>
        
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <span>Forgot your <span className="forgot">password?</span></span>
        <button onClick={()=>{logedIn(true)}}>Log in</button>
        
      </form>
    </div>
  
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-pannel overlay-left">
          <h1>Already have an account?</h1>
          <p>Please Log in</p>
          <button id="signIn" className="overBtn" onClick={() => setCount(0)}>Sign In</button>
        </div>
        <div className="overlay-pannel overlay-right">
          <h1>Create an Account</h1>
          <p>And Start Your Journey</p>
          <button id="signUp" className="overBtn" onClick={() => setCount(1)}>Sign Up</button>
        </div>
      </div>
    </div>
    
  </div>

  )
  }
