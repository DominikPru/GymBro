import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./App.scss";
import NewWorkout from "./NewWorkout";
import ExCard from "./ExCard";
import axios from "axios";
import ExPlanCard from "./ExPlanCard";
type Props = {userId:string};

export default function App({ userId }: Props) {
  const [selectedTab, setTab] = useState(0);
  const [exMessage, setMessage] = useState("");
  const [exResponse, setResponse] = useState([]);
  const [exPlanResponse, setExRespone] = useState([]);

  const handleChangeMessage = (event: { target: { value: any } }) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
  GetUsersEx();
  }, []);
  

  function GetUsersEx(){
    axios.post('http://localhost:8888/get_exercise', {
      UserId: userId,
    })
    .then((response) => {
      console.log(response.data);
      setExRespone(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  
  }


  if (selectedTab == 0) {
    return (
      <div className="containerr">
        <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
        <div className="jc">
          <h1>Home, Current user id: {userId}</h1>
        </div>
      </div>
    );
  } else if (selectedTab == 1) {
    async function getExercices() {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises/name/" + exMessage.toLowerCase(),
        params: { limit: "6" },
        headers: {
          "X-RapidAPI-Key":
            "5922f5d3a1msh0d30dc06f8cd8b0p19cea7jsndd947047cbdc",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setResponse(response.data);
      } catch (error) {
        console.error(error);
      }
      console.log(exMessage);
      return <h1>test</h1>;
    }

    return (
      <div>
        <div className="containerr">
          <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
          <div className="jc">
            <div className="containerrr">
              <NewWorkout
                getExercices={getExercices}
                handleChangeMessage={handleChangeMessage}
              />
              <div className="exContainer">
              {exResponse ? (
  exResponse.map((data: any, index: number) => (
    <ExCard
      key={index}
      name={data.name}
      url={data.gifUrl}
      userId={userId}
    />
  ))
) : (
  <p>Exercises will show up here</p>
)} </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (selectedTab == 2) {

    
      return(
        <div className="containerr">
          <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
          <div className="jc">
            {exPlanResponse ? (exPlanResponse.map((data: any, index: number) => (
  <ExPlanCard
    key={index}
    name={data.name}
    exId={data._id}
    getUsersEx={GetUsersEx}
  />
)) 
) : (
  <p>No Exercises selected</p>
)} 
<div className="SubmitFooter">
<button className="button nomg dark_bg">Submit</button></div>
          </div>
        </div>
      );

    }
      
  else if (selectedTab == 3) {
    return (
      <div className="containerr">
        <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
        <div className="jc">
          <h1>Equipment</h1>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="containerr">
        <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
        <div className="jc">
          <h1>History</h1>
        </div>
      </div>
    );
  }
}


