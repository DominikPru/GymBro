import React from "react";
import "./ExerciseDisplay.scss";

type Props = {
  url: string;
  name: string;
  sets: any;
  reps: any;
  nxtEx: any;
  prvEx: any;
};

function ExerciseDisplay({ url, name, sets, reps, nxtEx, prvEx }: Props) {
  return (
    <div className="displayContainer">
      <img src={url} alt="" width={400} className="imgEx" />
      <br></br>
      <h3>{name}</h3>
      <h4>
        Sets: {sets}, Reps: {reps}
      </h4>
      <br></br>
      <div className="containerDiv">
        <button onClick={prvEx} className="dark_bg button">
          Prev
        </button>
        <button onClick={nxtEx} className="dark_bg button">
          Next
        </button>
      </div>
    </div>
  );
}

export default ExerciseDisplay;
