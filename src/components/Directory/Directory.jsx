import React from 'react'
import ShopWomen from '../../assets/ShopWomen.jpg'
import ShopMen from '../../assets/shopMan.jpg'
import './Directory.css'

export default function Directory() {
  return (
        <div className='directory'>
          <div className='directory-item' style={{
            backgroundImage: `url(${ShopWomen})`
          }}>
            <a className='btn btn-hero' href="">SHOP WOMENS</a>
          </div>
        <div className='directory-item' style={{
          backgroundImage: `url(${ShopMen})`
        }}>
          <a className='btn btn-hero' href="">SHOP MENS</a>
        </div>
      </div>
  )
}
