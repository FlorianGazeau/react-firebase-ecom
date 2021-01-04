import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Logo from '../../assets/logo.png'

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <div className='nav'>
          <div className="logo">
            <Link to='/'>
              <img src={Logo} alt="Logo Trasher"/>
            </Link>
          </div>
          <ul className='menu'>
            <li>
              <Link to='/account/login'>
                <i className="far fa-user fa-lg" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
