import React, { useState, useEffect } from 'react'
import "./Login.scss"
import axios from 'axios'

type Props = {logedIn: any}

export default function Login({logedIn}: Props) {
  //stateHooks for register
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleChangeName = (event: { target: { value: any; }; }) => {
    setUserName(event.target.value);
  };
  const handleChangeEmail = (event: { target: { value: any; }; }) => {
    setUserEmail(event.target.value);
  };
  const handleChangePass = (event: { target: { value: any; }; }) => {
    setUserPassword(event.target.value);
  };
  //end of register StateHooks

  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")

  //register the user, happenes after button click
async function register(){
  axios.post('http://localhost:8888/register', {
    Name: userName,
    Email: userEmail,
    Pass: userPassword
  })
  .then((response) => {
    console.log(response.data);
    setMessage(response.data)
  })
  .catch((error) => {
    console.log(error);
  })
}

async function login(){
  axios.post('http://localhost:8888/login', {
    Email: userEmail,
    Pass: userPassword
  })
  .then((response) => {
    console.log(response.data);
    if (response.data == "Auth Valid"){
      logedIn(true)
    }
    setMessage(response.data)
    
  })
  .catch((error) => {
    console.log(error);
  })
}
  
  return (

    <div>
      <div className="messageText">{message}</div>
    <div className={count == 1 ? "container right-panel-active" : "container"} id="container" >

    <div className="form sign_up">
      <form onSubmit={e => e.preventDefault()}>

        <h1 className="marginSet20">Create An Account</h1>
      
        <input type="text" onChange={handleChangeName} placeholder="User Name"  />
        <input type="email" onChange={handleChangeEmail} placeholder="Email"/>
        <input type="password" onChange={handleChangePass} placeholder="Password"/>
        <button onClick={()=>{register()}}>Create Account</button>
        
      </form>
    </div>

    <div className="form sign_in">
      <form onSubmit={e => e.preventDefault()}>
       
        <h1 className="marginSet20">Been Here Before?</h1>
        
        <input type="email" onChange={handleChangeEmail} placeholder="Email"/>
        <input type="password" onChange={handleChangePass} placeholder="Password"/>
        <span>Forgot your <span className="forgot">password?</span></span>
        <button onClick={()=>{login()}}>Log in</button>
        
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
</div>
  )
  }
