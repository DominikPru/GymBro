import React, { useState, useEffect, useRef} from "react";
import Sidebar from "./Sidebar";
import "./App.scss";
import NewWorkout from "./NewWorkout";
import ExCard from "./ExCard";
import axios from "axios";
import ExPlanCard, { exPlanCardRef } from "./ExPlanCard";
type Props = {userId:string};

export default function App({ userId }: Props) {
  const [selectedTab, setTab] = useState(0);
  const [exMessage, setMessage] = useState("");
  const [exResponse, setResponse] = useState([]);
  const [exPlanResponse, setExRespone] = useState([]);
  const [orderList, setOrderList] = useState([1, 2, 3, 4, 5, 6, 7, 8]); 
  const exPlanCardRefs = useRef<(exPlanCardRef | null)[]>([]);
  const handleChangeMessage = (event: { target: { value: any } }) => {
    setMessage(event.target.value);
  };

  //Gets all selected exercises of the current user
  function GetUsersEx(){
    axios.post('http://localhost:8888/get_all_exercise', {
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

  useEffect(() => {
    if (selectedTab === 2) {
      GetUsersEx()
    }
  }, [selectedTab]);

 //Home Tab
  if (selectedTab == 0) {
    return (
      <div className="containerr">
        <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
        <div className="jc">
          <h1>Home, Current user id: {userId}</h1>
        </div>
      </div>
    );

  //Add Exercises Tab
  } else if (selectedTab == 1) {

    //Calls the exercisedb to show 6 exercises that match the search string
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
      return <h1>error</h1>;
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

  //Exercise Plan Tab
  } else if (selectedTab == 2) {

    //Handles all user changes in the order of exercises, adds them to the OrderList
    const handleOrderList = (index: number, data: number) => {
      const newOrderList = [...orderList];
      newOrderList[index] = data;
      setOrderList(newOrderList)
    }
    
    //Checks if the order of exercises that the user selected is correct (ex. 1, 2, 3 is correct, 3, 3, 1 is not)
    function orderCorrect(){
      const noDups = new Set(orderList);
      return orderList.length == noDups.size;
    }

    //Called on submiting the whole plan
    function exPlanSubmit() {
      if (orderCorrect()){
        console.log("Order corect");
        exPlanCardRefs.current.forEach((ref) => {
          if (ref) {
            ref.submitPlan();
          }
        });
      }
      else{
        console.log("Order Incorect");
      }
    }


      return(
        <div className="containerr">
          <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
          <div className="jc">
          {exPlanResponse && exPlanResponse.length > 0 ? (
  exPlanResponse.map((data: any, index: number) => (
    <ExPlanCard
      key={index}
      name={data.name}
      exId={data._id}
      getUsersEx={GetUsersEx}
      index={index}
      handleOrderList={handleOrderList}
      max={exPlanResponse.length} 
      ref={(ref) => (exPlanCardRefs.current[index] = ref)}
    />
  ))
) : (
  <p>No Exercises selected</p>
)}
<div className="SubmitFooter">
<button className="button nomg dark_bg" onClick={exPlanSubmit}>Submit</button></div>
          </div>
        </div>
      );

    }
  
  //Equipment Tab
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

  //History Tab
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


