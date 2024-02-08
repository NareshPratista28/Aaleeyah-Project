import React, { useEffect } from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { useState } from 'react'

const Popular = () => {
  const [popular_item, setPopular_item] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/popularitems')
    .then((response)=>response.json())
    .then((data)=>setPopular_item(data))
  })

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popular_item.slice(0,4).map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}/>
        })}
      </div>
    </div>
        
  )
}

export default Popular
