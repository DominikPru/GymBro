import React from 'react'
import "./exPlanCard.scss"
type Props = {name:string, exId:string}

function exPlanCard({name, exId}: Props) {
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
</div>
  )
}

export default exPlanCard