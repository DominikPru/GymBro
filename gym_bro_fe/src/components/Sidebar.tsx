import React, { useState } from 'react'
import "./Sidebar.scss"
import mainLogo from'../logo.png';

type Props = {selectedIndex: number, setIndex: any}
function Sidebar({selectedIndex, setIndex}: Props) {
  return (
    <div>
  <div id="particles-js"></div>
  <div className="sidebar">
    <div className="profile">
      <div className="profile-img">
        <img src={mainLogo} alt=""/>
      </div>
    </div>
    <div className="main-menu">
      <div onClick={() => {setIndex(0)}} className={selectedIndex == 0 ? "menu-item active" : "menu-item"}>
        <a>
          <i className="menu-icon fa fa-home"></i>
          <p className="menu-text">Home</p>
        </a>
      </div>
      <div onClick={() => {setIndex(1)}} className={selectedIndex == 1 ? "menu-item active" : "menu-item"}>
        <a>
          <i className="menu-icon fa fa-dumbbell"></i>
          <p className="menu-text">Search</p>
        </a>
      </div>
      <div onClick={() => {setIndex(2)}} className={selectedIndex == 2 ? "menu-item active" : "menu-item"}>
        <a>
          <i className="menu-icon fa fa-clock-rotate-left"></i>
          <p className="menu-text">Tags</p>
        </a>
      </div>

    </div>
  </div>
  </div>
  )
}

export default Sidebar