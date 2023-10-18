import React, {useState} from 'react'
import "./ExPlanCard.scss"
import axios from 'axios'
type Props = {name:string, exId:string, getUsersEx: any}

function ExPlanCard({name, exId, getUsersEx}: Props) {

const[order, setOrder] = useState("");
const[sets, setSets] = useState("");
const[reps, setReps] = useState("");

  const handleChangeOrder = (event: { target: { value: any } }) => {
    setOrder(event.target.value);
  };

  const handleChangeSets = (event: { target: { value: any } }) => {
    setSets(event.target.value);
  };

  const handleChangeReps = (event: { target: { value: any } }) => {
    setReps(event.target.value);
  };

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