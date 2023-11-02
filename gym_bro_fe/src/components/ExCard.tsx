import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExCard.scss";

type Props = { name: string; url: string; userId: string };

function ExCard({ name, url, userId }: Props) {
  const [cardClass, changeClass] = useState("card");

  //Checks if this exercise has already been selected by the user
  useEffect(() => {
    axios
      .post("http://localhost:8888/check_exercise", {
        Name: name,
        UserId: userId,
        Url: url,
      })
      .then((response) => {
        if (response.data == "Selected") {
          changeClass("card is-checked");
        } else {
          changeClass("card");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //Inserts the selected exercise into the databse and adds a class to show the user the exercise has been succesfuly selected
  async function insertEx() {
    changeClass("card is-checked");
    if (cardClass == "card") {
      axios
        .post("http://localhost:8888/new_exercise", {
          Name: name,
          UserId: userId,
          Url: url,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <div className={cardClass}>
      <div
        className="card__image"
        id="card-1"
        onClick={() => {
          insertEx();
        }}
      >
        <div className="image-overlay"></div>
        <img src={url} alt="" />
      </div>
      <div className="card__actions"></div>
      <div className="card__description">
        <span className="line_long">{name}</span>
        <br />
        <br />
      </div>
    </div>
  );
}

export default ExCard;
