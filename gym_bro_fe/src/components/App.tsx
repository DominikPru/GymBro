import React, {useState} from 'react'
import Sidebar from "./Sidebar"
import "./App.scss"
import NewWorkout from './NewWorkout'

type Props = {}

export default function App({}: Props) {
  const [selectedTab, setTab] = useState(0)
if (selectedTab == 0){
  return (
    <div className="containerr">
    <Sidebar selectedIndex={selectedTab} setIndex={setTab}/>
    <div className="jc">
    <h1>Home</h1>
    </div>
    </div>
  )
}
else if (selectedTab == 1){
  return (
    <div className="containerr">
    <Sidebar selectedIndex={selectedTab} setIndex={setTab}/>
    <div className="jc">
    <NewWorkout/>
    </div>
    </div>
  )
}

else{
  return (
    <div className="containerr">
    <Sidebar selectedIndex={selectedTab} setIndex={setTab}/>
    <div className="jc">
    <h1>History</h1>
    </div>
    </div>
  )
}


}