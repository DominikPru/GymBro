import React, {useState} from 'react'
import Sidebar from "./Sidebar"
import "./App.scss"

type Props = {}

export default function App({}: Props) {
  const [selectedTab, setTab] = useState(0)
if (selectedTab == 0){
  return (
    <div className="containerr">
    <Sidebar selectedIndex={selectedTab} setIndex={setTab}/>
    <h1>Home</h1>
    </div>
  )
}
else if (selectedTab == 1){
  return (
    <div className="containerr">
    <Sidebar selectedIndex={selectedTab} setIndex={setTab}/>
    <h1>Workout</h1>
    </div>
  )
}

else{
  return (
    <div className="containerr">
    <Sidebar selectedIndex={selectedTab} setIndex={setTab}/>
    <h1>History</h1>
    </div>
  )
}


}