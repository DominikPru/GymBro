import React, {useState} from 'react'
import "./ExPlanCard.scss"
import axios from 'axios'
type Props = {name:string, exId:string, getUsersEx: any, index: number, handleOrderList: any, max:number}

function ExPlanCard({name, exId, getUsersEx, index, handleOrderList, max}: Props) {

const[sets, setSets] = useState(0);
const[reps, setReps] = useState(0);

  const handleChangeOrder = (event: { target: { value: any } }) => {
    handleOrderList(index, event.target.value)
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
        <div className='name'>{name + " " + index}</div>
        <div className="input-container">
  <input name="reps" type="number" max={max} min={1} width={94.32} placeholder='Order' onChange={handleChangeOrder}/>
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