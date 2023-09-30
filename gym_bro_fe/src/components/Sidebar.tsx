import React from 'react'
import "./Sidebar.scss"
import mainLogo from'../logo.png';

type Props = {}
function Sidebar({}: Props) {
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
      <div className="menu-item">
        <a href="">
          <i className="menu-icon fa fa-home"></i>
          <p className="menu-text">Home</p>
        </a>
      </div>
      <div className="menu-item">
        <a href="">
          <i className="menu-icon fa fa-search"></i>
          <p className="menu-text">Search</p>
        </a>
      </div>
      <div className="menu-item">
        <a href="">
          <i className="menu-icon fa fa-tag"></i>
          <p className="menu-text">Tags</p>
        </a>
      </div>

    </div>
  </div>
  </div>
  )
}

export default Sidebar