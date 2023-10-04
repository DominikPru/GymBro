import React from 'react'
import './ExCard.scss'

type Props = {name: string, targets:string, url:string}

function ExCard({name, targets, url}: Props) {
  return (
    <div className="card">
      
      <div className="card__image" id="card-1">
        <div className="image-overlay">
        </div>
        <img src={url} alt="" />
      </div>
      <div className="card__actions">

      </div>
      <div className="card__description">
        <span className="line _long">{name}</span><br/><br/>
        
      </div>
      
    </div>
    
  )
}

export default ExCard