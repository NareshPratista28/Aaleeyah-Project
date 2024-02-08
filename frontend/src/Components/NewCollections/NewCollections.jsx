import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext';

const NewCollections = () => {
  
  const {formatPrice} = React.useContext(ShopContext);
  const [new_collection, setNew_collections] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collections(data))
  },[])
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={formatPrice(item.new_price)}/>
        })}
      </div>
    </div>
  )
}

export default NewCollections
