import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Login from './components/Login';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

type Props = {}

export default function Index({}: Props) {
const [loggedIn, setLogged] = useState(false)
const [userId, setUserId] = useState("")
if (loggedIn){
  return(
    <React.StrictMode>
      <App userId={userId}/>
    </React.StrictMode>
  );
}
else{
  return(
    <React.StrictMode>
      <Login logedIn={setLogged} setUserId={setUserId}/>
    </React.StrictMode>
  );
}
}

root.render(<div><Index/></div>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
