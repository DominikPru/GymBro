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
        </a>
      </div>
      <div onClick={() => {setIndex(1)}} className={selectedIndex == 1 ? "menu-item active" : "menu-item"}>
        <a>
          <i className="menu-icon fa fa-plus"></i>
        </a>
      </div>
      <div onClick={() => {setIndex(2)}} className={selectedIndex == 2 ? "menu-item active" : "menu-item"}>
        <a>
          <i className="menu-icon fa fa-calendar"></i>
        </a>
      </div>
      <div onClick={() => {setIndex(3)}} className={selectedIndex == 3 ? "menu-item active" : "menu-item"}>
        <a>
          <i className="menu-icon fa fa-dumbbell"></i>
        </a>
      </div>
      <div onClick={() => {setIndex(4)}} className={selectedIndex == 4 ? "menu-item active" : "menu-item"}>
        <a>
          <i className="menu-icon fa fa-clock-rotate-left"></i>
        </a>
      </div>

    </div>
  </div>
  </div>
  )
}

export default Sidebar