import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  Ref,
} from "react";
import "./ExPlanCard.scss";
import axios from "axios";
import MediaQuery from "react-responsive";
type Props = {
  name: string;
  exId: string;
  getUsersEx: any;
  index: number;
  handleOrderList: any;
  max: number;
  userId: string;
  setMessage: any;
};

export type exPlanCardRef = {
  submitPlan: () => void;
};

function ExPlanCard(
  {
    name,
    exId,
    getUsersEx,
    index,
    handleOrderList,
    max,
    userId,
    setMessage,
  }: Props,
  ref: Ref<exPlanCardRef>
) {
  useImperativeHandle(ref, () => ({
    submitPlan,
  }));

  useEffect(() => {
    getExData();
  }, []);

  useEffect(() => {
    getExData();
  }, [max]);

  const [order, setOrder] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  //Gets called on submit, adds all the user selected values into db
  function submitPlan() {
    axios
      .post("http://localhost:8888/update_exercise", {
        _id: exId,
        order: order,
        sets: sets,
        reps: reps,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChangeOrder = (event: { target: { value: any } }) => {
    handleOrderList(index, event.target.value);
    if (event.target.value > max) {
      setOrder(max);
    } else {
      setOrder(event.target.value);
    }
  };

  const handleChangeSets = (event: { target: { value: any } }) => {
    setSets(event.target.value);
  };

  const handleChangeReps = (event: { target: { value: any } }) => {
    setReps(event.target.value);
  };

  //removes an exercise from the database
  async function remEx() {
    axios
      .post("http://localhost:8888/rem_exercise", {
        _id: exId,
        UserId: userId,
      })
      .then((response) => {
        console.log(response);

        //getUsersEx refreshes the data shown after deletion
        getUsersEx();
      })
      .catch((error) => {
        console.log("Error occurred during axios request:", error);
      });
  }

  //gets the current data (Sets, Reps, Order) of this exercise, called on tab change (handleLoad)
  async function getExData() {
    axios
      .post("http://localhost:8888/get_exercise", {
        _id: exId,
      })
      .then((response) => {
        setOrder(response.data.order);
        setReps(response.data.reps);
        setSets(response.data.sets);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <MediaQuery minWidth={1}>
      <MediaQuery minWidth={768}>
        <div className="plan-card">
          <div className="name">{name}</div>
          <div className="input-container">
            <input
              value={order}
              name="reps"
              type="number"
              max={max}
              min={1}
              style={{ width: "94.32px" }}
              placeholder="Order"
              onChange={handleChangeOrder}
            />
          </div>
          <div className="input-container">
            <input
              value={sets}
              name="sets"
              type="number"
              placeholder="Sets"
              onChange={handleChangeSets}
            />
          </div>
          <div className="input-container">
            <input
              value={reps}
              name="reps"
              type="number"
              placeholder="Reps"
              onChange={handleChangeReps}
            />
          </div>
          <span className="remove" onClick={remEx}>
            X
          </span>
        </div>
      </MediaQuery>

      <MediaQuery maxWidth={767}>
        <div className="name">{name}</div>
        <div className="plan-card">
          <div className="input-container">
            <input
              value={order}
              name="reps"
              type="number"
              max={max}
              min={1}
              style={{ width: "70px" }}
              placeholder="Order"
              onChange={handleChangeOrder}
            />
          </div>
          <div className="input-container">
            <input
              value={sets}
              name="sets"
              type="number"
              style={{ width: "70px" }}
              placeholder="Sets"
              onChange={handleChangeSets}
            />
          </div>
          <div className="input-container">
            <input
              value={reps}
              name="reps"
              type="number"
              style={{ width: "70px" }}
              placeholder="Reps"
              onChange={handleChangeReps}
            />
          </div>
          <span className="remove" onClick={remEx}>
            X
          </span>
        </div>
      </MediaQuery>
    </MediaQuery>
  );
}

export default forwardRef(ExPlanCard);
