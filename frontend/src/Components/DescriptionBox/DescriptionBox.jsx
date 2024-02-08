import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (120)</div>
      </div>
      <div className="descriptionbox-description">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui perferendis alias veniam quam libero odio delectus ratione incidunt aut quo distinctio repellat non expedita, temporibus explicabo beatae maiores eveniet nihil?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, cumque facere voluptate ad repellat id facilis, eaque et nam quas dolorem molestiae. Dicta accusamus repellat maiores modi in ipsa vel.</p>
      </div>
    </div>
  )
}

export default DescriptionBox
