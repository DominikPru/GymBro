import React, {useState, useEffect} from 'react'
import "./ExPlanCard.scss"
import axios from 'axios'
type Props = {name:string, exId:string, getUsersEx: any, index: number, handleOrderList: any, max:number}

function ExPlanCard({name, exId, getUsersEx, index, handleOrderList, max}: Props) {

useEffect(() => {
  getExData()
  //console.log("loading...")
}, [])

const[order, setOrder] = useState(0);
const[sets, setSets] = useState(0);
const[reps, setReps] = useState(0);

  const handleChangeOrder = (event: { target: { value: any } }) => {
    handleOrderList(index, event.target.value)
    setOrder(event.target.value)
  };

  const handleChangeSets = (event: { target: { value: any } }) => {
    setSets(event.target.value);
  };

  const handleChangeReps = (event: { target: { value: any } }) => {
    setReps(event.target.value);
  };

  //removes an exercise from the database
  async function remEx(){
    axios.post('http://localhost:8888/rem_exercise', {
    _id: exId,
    }
    )
    .then((response) => {
      //getUsersEx refreshes the data shown after deletion
      getUsersEx()
    })
    .catch((error) => {
      console.log(error);
    })
  }

  //gets the current data (Sets, Reps, Order) of this exercise, called on tab change (handleLoad)
  async function getExData(){
    axios.post('http://localhost:8888/get_exercise', {
      _id: exId,
      }
      )
      .then((response) => {
        setOrder(response.data.order)
        setReps(response.data.reps)
        setSets(response.data.sets)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //Gets called on submit, adds all the user selected values into db
  async function changePlan(){

  }

  return (
    <div className='plan-card'>
        <div className='name'>{name + " " + index}</div>
        <div className="input-container">
  <input value={order} name="reps" type="number" max={max} min={1} style={{width:"94.32px"}} placeholder='Order' onChange={handleChangeOrder}/>
</div>
    <div className="input-container">
  <input value={sets} name="sets" type="number" placeholder='Sets' onChange={handleChangeSets}/>
</div>
<div className="input-container">
  <input value={reps} name="reps" type="number" placeholder='Reps' onChange={handleChangeReps}/>
</div>
<span className='remove' onClick={remEx}>X</span>
</div>
  )
}

export default ExPlanCard