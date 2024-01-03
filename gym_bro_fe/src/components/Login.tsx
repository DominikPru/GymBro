import React, { useState, useEffect } from "react";
import "./Login.scss";
import axios from "axios";
import MediaQuery from "react-responsive";

type Props = { logedIn: any; setUserId: any };

export default function Login({ logedIn, setUserId }: Props) {
  //stateHooks for register
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleChangeName = (event: { target: { value: any } }) => {
    setUserName(event.target.value);
  };
  const handleChangeEmail = (event: { target: { value: any } }) => {
    setUserEmail(event.target.value);
  };
  const handleChangePass = (event: { target: { value: any } }) => {
    setUserPassword(event.target.value);
  };

  useEffect(() => {
    axios
      .post("http://localhost:8888/handshake", {})
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //end of register StateHooks
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(
  );

  //register the user, happenes after button click
  async function register() {
    axios
      .post("http://localhost:8888/register", {
        Name: userName,
        Email: userEmail,
        Pass: userPassword,
      })
      .then((response) => {
        console.log(response.data);
        setMessage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function login() {
    axios
      .post("http://localhost:8888/login", {
        Email: userEmail,
        Pass: userPassword,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.includes("Auth Valid")) {
          setUserId(response.data.split(";")[1]);
          logedIn(true);
        }
        setMessage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <MediaQuery minWidth={768}>
        <div>
          <div className="messageText">{message}</div>
          <div
            className={
              count == 1 ? "container right-panel-active" : "container"
            }
            id="container"
          >
            <div className="form sign_up">
              <form onSubmit={(e) => e.preventDefault()}>
                <h1 className="marginSet20">Create An Account</h1>

                <input
                  type="text"
                  onChange={handleChangeName}
                  placeholder="User Name"
                />
                <input
                  type="email"
                  onChange={handleChangeEmail}
                  placeholder="Email"
                />
                <input
                  type="password"
                  onChange={handleChangePass}
                  placeholder="Password"
                />
                <button
                  onClick={() => {
                    register();
                  }}
                >
                  Create Account
                </button>
              </form>
            </div>

            <div className="form sign_in">
              <form onSubmit={(e) => e.preventDefault()}>
                <h1 className="marginSet20">Been Here Before?</h1>

                <input
                  type="email"
                  onChange={handleChangeEmail}
                  placeholder="Email"
                />
                <input
                  type="password"
                  onChange={handleChangePass}
                  placeholder="Password"
                />
                <button
                  onClick={() => {
                    login();
                  }}
                >
                  Log in
                </button>
              </form>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-pannel overlay-left">
                  <h1>Already have an account?</h1>
                  <p>Please Log in</p>
                  <button
                    id="signIn"
                    className="overBtn"
                    onClick={() => setCount(0)}
                  >
                    Sign In
                  </button>
                </div>
                <div className="overlay-pannel overlay-right">
                  <h1>Create an Account</h1>
                  <p>And Start Your Journey</p>
                  <button
                    id="signUp"
                    className="overBtn"
                    onClick={() => setCount(1)}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        {count == 0 && (
          <div>
            <div className="messageTextM">{message}</div>
            <div className="jcn">
              <div className="mobileContainer">
                <form onSubmit={(e) => e.preventDefault()}>
                  <h1 className="marginSet20">Been Here Before?</h1>

                  <input
                    type="email"
                    onChange={handleChangeEmail}
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    onChange={handleChangePass}
                    placeholder="Password"
                  />
                  <span onClick={() => setCount(1)}>Create a new account</span>
                  <button
                    onClick={() => {
                      login();
                    }}
                  >
                    Log in
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {count == 1 && (
          <div>
            <div className="messageTextM">{message}</div>
            <div className="jcn">
              <div className="mobileContainer">
                <form onSubmit={(e) => e.preventDefault()}>
                  <h1 className="marginSet20">Create An Account</h1>

                  <input
                    type="text"
                    onChange={handleChangeName}
                    placeholder="User Name"
                  />
                  <input
                    type="email"
                    onChange={handleChangeEmail}
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    onChange={handleChangePass}
                    placeholder="Password"
                  />
                  <span onClick={() => setCount(0)}>Already registered?</span>
                  <button
                    onClick={() => {
                      register();
                    }}
                  >
                    Create Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </MediaQuery>
    </div>
  );
}
