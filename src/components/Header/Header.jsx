import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { auth } from '../../Firebase/utils'
import Logo from '../../assets/logo.png'

import './Header.css'
import Toolbar from '../Toolbar/Toolbar'
import { CheckAdminUser } from '../../utils/CheckAdminUser'

const MapState = ({user, cartData}) => ({
  currentUser: user.currentUser,
  cartQuantity: cartData.cartItems.length
})

function Header() {

  const { currentUser, cartQuantity } = useSelector(MapState)

  console.log(cartQuantity)

  return (
    <>
    {currentUser && CheckAdminUser(currentUser) ? <Toolbar /> : ''}
    <header className="header">
      <div className="wrap">
        <div className='nav'>
          <div className="logo">
            <Link to='/'>
              <img src={Logo} alt="Logo Trasher"/>
            </Link>
          </div>
          <div className=''>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/search'>Search</Link></li>
            </ul>
          </div>
          <ul className='menu'>
              <li>
                <Link to='/cart'>
                  <i class="fas fa-shopping-cart"></i>
                  <span>({cartQuantity})</span>
                </Link>
              </li>
            {(!currentUser && 
              <li>
                <Link to='/account/login'>
                  <i className="fas fa-user-circle fa-lg" />
                </Link>
              </li>
            )}
            {(currentUser && 
              <>
                <li>
                  <Link to='/account/profil'>
                    <i className="fas fa-user-circle fa-lg" />
                  </Link>
                </li>
                <li>
                  <i className="fas fa-sign-out-alt fa-lg" onClick={() => auth.signOut()}></i>
                </li>
              </>)}
          </ul>
        </div>
      </div>
    </header>
    </>
  )
}

Header.defaultProps = {
  currentUser: null
}

export default Header