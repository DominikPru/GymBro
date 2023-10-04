import React, {useState} from 'react'
import './NewWorkout.scss'
type Props = {getExercices: any, handleChangeMessage: any}

function NewWorkout({getExercices, handleChangeMessage}: Props) {
 
  return (
    <div className='newWrapper'>
    <div className="jcc">
    <h1 className="title_add">Add a new exercise</h1>
    </div>
    <div className='fullWidth'>
  <div className="searchInputWrapper">
  <form className='reset' onChange={(e) => {handleChangeMessage(e)}} onSubmit={(e) => {e.preventDefault(); console.log("Searching..."); getExercices()}}>
    <input className="searchInput" type="text" placeholder='Search for an exercise and see what pops up'/>
    <i className="searchInputIcon fa fa-search" onClick={() => {console.log("Searching..."); getExercices()}}></i>
    <input type="submit" hidden/>
    </form>
  </div>
</div>
</div>
   
  )
}

export default NewWorkout