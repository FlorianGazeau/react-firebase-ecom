import React from 'react'
import {Link} from 'react-router-dom'

import ShopWomen from '../../assets/ShopWomen.jpg'
import ShopMen from '../../assets/shopMan.jpg'
import './Directory.css'

export default function Directory() {
  return (
        <div className='directory'>
          <div className='directory-item' style={{
            backgroundImage: `url(${ShopWomen})`
          }}>
            <Link to='/shop' className='btn btn-hero'>Shop womens</Link>
          </div>
        <div className='directory-item' style={{
          backgroundImage: `url(${ShopMen})`
        }}>
          <Link to='/shop' className='btn btn-hero'>Shop mens</Link>
        </div>
      </div>
  )
}
