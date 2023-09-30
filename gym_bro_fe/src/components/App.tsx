import React from 'react'
import Sidebar from "./Sidebar"
import "./App.scss"

type Props = {}

export default function App({}: Props) {
  return (
    <div className="containerr">
    <Sidebar/>
    </div>
  )
}