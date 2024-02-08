import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Item = (props) => {
  const {formatPrice} = React.useContext(ShopContext);
  const handleScroll = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  const price = formatPrice(Number(props.new_price));
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}><img onClick={handleScroll} src={props.image} alt="" /></Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
            Rp {price}
        </div>
      </div>
    </div>
  )
}

export default Item
