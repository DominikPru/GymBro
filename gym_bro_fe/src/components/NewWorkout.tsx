import React from 'react'
import './NewWorkout.scss'
type Props = {}

function NewWorkout({}: Props) {
  return (
    <div>
    
    <div className="containerrr">
    <div className="jcc">
    <h1 className="title_add">Add a new exercise</h1>
    </div>
  <div className="searchInputWrapper">
    <input className="searchInput" type="text" placeholder='Search for an exercise and see what pops up'/>
    <i className="searchInputIcon fa fa-search" onClick={() => {console.log("Searching...")}}></i>
  </div>
</div>
</div>
   
  )
}

export default NewWorkout