import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Logo from '../../assets/logo.png'
import { auth } from '../../Firebase/utils'

export default function Header(props) {

  const {currentUser} = props
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
                <i className="fas fa-user-circle fa-lg" />
              </Link>
            </li>
            {(currentUser && 
              <li>
                <i class="fas fa-sign-out-alt fa-lg" onClick={() => auth.signOut()}></i>
              </li>)}
          </ul>
        </div>
      </div>
    </header>
  )
}

Header.defaultProps = {
  currentUser: null
}
