import React from 'react'
import "./exPlanCard.scss"
import axios from 'axios'
type Props = {name:string, exId:string, getUsersEx: any}

function exPlanCard({name, exId, getUsersEx}: Props) {
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
  <input name="reps" type="number" placeholder='Order' />
</div>
    <div className="input-container">
  <input name="sets" type="number" placeholder='Sets' />
</div>
<div className="input-container">
  <input name="reps" type="number" placeholder='Reps' />
</div>
<span className='remove' onClick={remEx}>X</span>
</div>
  )
}

export default exPlanCard