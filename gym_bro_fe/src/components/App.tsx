import React, { useState, useEffect, useRef, useReducer } from "react";
import Sidebar from "./Sidebar";
import "./App.scss";
import NewWorkout from "./NewWorkout";
import ExCard from "./ExCard";
import axios from "axios";
import ExPlanCard, { exPlanCardRef } from "./ExPlanCard";
import ExerciseDisplay from "./ExerciseDisplay";
type Props = { userId: string };

export default function App({ userId }: Props) {
  const [selectedTab, setTab] = useState(0);
  const [exSearch, setSearch] = useState("");
  const [exResponse, setResponse] = useState([]);
  const [exPlanResponse, setExResponse] = useState([]);
  const [exResponseSorted, setExResponseSorted] = useState<any>([]);
  const [orderList, setOrderList] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [currentExx, setCurrentExx] = useState(0);
  const [errMessage, setErrMessage] = useState("");
  const [errMessageS, setErrMessageS] = useState("");
  const [exLoaded, setExLoaded] = useState(false);
  const exPlanCardRefs = useRef<(exPlanCardRef | null)[]>([]);
  const handleChangeSearch = (event: { target: { value: any } }) => {
    setSearch(event.target.value);
  };

  //Gets all selected exercises of the current user
  async function GetUsersEx() {
    try {
      const response = await axios.get(
        "http://localhost:8888/get_all_exercise",{
        params: {
          UserId: userId,
        }}
      );

      const responseData = response.data;
      setExResponse(responseData);
      const sortedResponse = [...responseData];
      sortedResponse.sort(function (a, b) {
        return parseFloat(a.order) - parseFloat(b.order);
      });
      console.log("Sorted: " + sortedResponse[currentExx].order);
      console.log("Current ex: " + currentExx);
      setCurrentExx(0);
      setExResponseSorted(sortedResponse);
      setExLoaded(true);

      sortedResponse.forEach((e) => {
        if (e.order == 0) {
          setExLoaded(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (selectedTab === 3 || selectedTab === 1) {
      GetUsersEx();
    }
  }, [selectedTab]);

  //Info Tab
  if (selectedTab == 0) {
    return (
      <div className="containerr">
        <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
        <div className="jc">
          <i className="menu-icon fa fa-play mgbtm"></i>
          Go through the exercises in your plan, see the correct form as a gif
          and check your sets / reps.
          <br></br>
          <br></br>
          <i className="menu-icon fa fa-plus mgbtm"></i>
          Add new exercises to your plan using the search bar.
          <br></br>
          <br></br>
          <i className="menu-icon fa fa-calendar mgbtm"></i>
          Change your exercise plan, edit the ammount of sets / reps you do per
          exercise, change your exercise order, remove exercises from your plan.
          <br></br>
          <br></br>
          <i className="menu-icon fa fa-dumbbell mgbtm"></i>
          Add your equipment, will be checked when looking for new exercises
          (todo)
          <br></br>
          <br></br>
          <i className="menu-icon fa fa-clock-rotate-left mgbtm"></i>
          Check your exercise history (todo)
        </div>
      </div>
    );
  }

  function nxtEx() {
    console.log("next");
    if (currentExx <= exResponseSorted.length - 2)
      setCurrentExx(currentExx + 1);
  }

  function prvEx() {
    if (currentExx >= 1) setCurrentExx(currentExx - 1);
  }

  //Home Tab
  if (selectedTab == 1) {
    if (exLoaded) {
      if (exResponseSorted[currentExx]?.url) {
        return (
          <div className="containerr">
            <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
            <div className="jc">
              <h3>
                Current Exercise: {currentExx + 1}/{exResponseSorted.length}
              </h3>
              <ExerciseDisplay
                url={exResponseSorted[currentExx]?.url}
                name={exResponseSorted[currentExx]?.name}
                sets={exResponseSorted[currentExx]?.sets}
                reps={exResponseSorted[currentExx]?.reps}
                nxtEx={nxtEx}
                prvEx={prvEx}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className="containerr">
            <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
            <div className="jc">
              No Exercises Selected, to start, search for an exercise in the
              "Add Exercise" tab.
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="containerr">
          <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
          <div className="jc">
            Exercise order contains zeros or no exercises selected
          </div>
        </div>
      );
    }

    //Add Exercises Tab
  } else if (selectedTab == 2) {
    //Calls the exercisedb to show 6 exercises that match the search string
    async function getExercices() {
      const options = {
        method: "GET",
        url:
          "https://exercisedb.p.rapidapi.com/exercises/name/" +
          exSearch.toLowerCase(),
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
        if (response.data < 1) {
          setErrMessageS("No exercises found");
          console.log("No Ex Found");
        }
      } catch (error) {
        console.error(error);
      }
      console.log(exSearch);
      return <h1>error</h1>;
    }

    return (
      <div className="containerr">
        <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
        <div className="jc">
          <div className="containerrr">
            <NewWorkout
              getExercices={getExercices}
              handleChangeMessage={handleChangeSearch}
            />
            <div className="exContainer">
              {exResponse && exResponse.length > 0 ? (
                exResponse.map((data: any, index: number) => (
                  <ExCard
                    key={index}
                    name={data.name}
                    url={data.gifUrl}
                    userId={userId}
                  />
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <p>{errMessageS}</p>
                </div>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    );

    //Exercise Plan Tab
  } else if (selectedTab == 3) {
    //Handles all user changes in the order of exercises, adds them to the OrderList
    const handleOrderList = (index: number, data: any) => {
      const newOrderList = [...orderList];
      newOrderList[index] = parseInt(data);
      setOrderList(newOrderList);
    };

    //Checks if the order of exercises that the user selected is correct (ex. 1, 2, 3 is correct, 3, 3, 1 is not)
    function orderCorrect() {
      const noDups = new Set(orderList);
      return orderList.length == noDups.size;
    }

    //Called on submiting the whole plan
    function exPlanSubmit() {
      console.log(orderList);
      if (orderCorrect()) {
        console.log("Order correct");
        exPlanCardRefs.current.forEach((ref) => {
          if (ref) {
            ref.submitPlan();
          }
        });
        setErrMessage("Submit Succesfull");
        setExLoaded(false);
      } else {
        console.log("Order Incorrect");
        setErrMessage(
          "Order Incorrect, Please Remove any Duplicates and Try Again"
        );
      }
    }

    return (
      <div className="containerr">
        <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
        <div className="jc">
          {exPlanResponse && exPlanResponse.length > 0 ? (
            <h5 className="input_title">
              <span className="mgr30">Order</span>{" "}
              <span className="mgr30">Sets</span>{" "}
              <span className="mgr30">Reps</span>
            </h5>
          ) : (
            <div></div>
          )}
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
                userId={userId}
                setMessage={setErrMessage}
              />
            ))
          ) : (
            <p>No Exercises selected</p>
          )}
          <h5>{errMessage}</h5>
          <div className="SubmitFooter">
            <button className="button nomg dark_bg" onClick={exPlanSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  //Equipment Tab
  else if (selectedTab == 4) {
    return (
      <div className="containerr">
        <Sidebar selectedIndex={selectedTab} setIndex={setTab} />
        <div className="jc">
          <h1>Equipment</h1>
          <h5>todo</h5>
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
          <h5>todo</h5>
        </div>
      </div>
    );
  }
}
