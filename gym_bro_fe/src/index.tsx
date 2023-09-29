import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Login';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

type Props = {}

export default function Index({}: Props) {
const [loggedIn, setLogged] = useState(false)

if (loggedIn){
  return(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
else{
  return(
    <React.StrictMode>
      <Login logedIn={setLogged}/>
    </React.StrictMode>
  );
}
}

root.render(<div><Index/></div>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
