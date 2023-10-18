import React, {useState} from 'react'
import "./ExPlanCard.scss"
import axios from 'axios'
type Props = {name:string, exId:string, getUsersEx: any}

function ExPlanCard({name, exId, getUsersEx}: Props) {

const[order, setOrder] = useState(0);
const[sets, setSets] = useState(0);
const[reps, setReps] = useState(0);

  const handleChangeOrder = (event: { target: { value: any } }) => {
    setOrder(event.target.value);
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
      console.log(response.data);
      getUsersEx()
    })
    .catch((error) => {
      console.log(error);
    })
  }

  async function changePlan(){



  }

  return (
    <div className='plan-card'>
        <div className='name'>{name}</div>
        <div className="input-container">
  <input name="reps" type="number" placeholder='Order' onChange={handleChangeOrder}/>
</div>
    <div className="input-container">
  <input name="sets" type="number" placeholder='Sets' onChange={handleChangeSets}/>
</div>
<div className="input-container">
  <input name="reps" type="number" placeholder='Reps' onChange={handleChangeReps}/>
</div>
<span className='remove' onClick={remEx}>X</span>
</div>
  )
}

export default ExPlanCard