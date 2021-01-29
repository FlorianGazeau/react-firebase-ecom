import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { auth } from '../../Firebase/utils'
import Logo from '../../assets/logo.png'
import ShoppingBag from '../../assets/shopping-bag.svg'
import MenuIcon from '../../assets/menu.svg'
import Logout from '../../assets/logout.svg'
import Cart from '../Cart/Cart'

import './Header.css'
import Toolbar from '../Toolbar/Toolbar'
import { CheckAdminUser } from '../../utils/CheckAdminUser'

const MapState = ({user, cartData}) => ({
  currentUser: user.currentUser,
  cartQuantity: cartData.cartItems.length
})

function Header() {

  const { currentUser, cartQuantity } = useSelector(MapState)
  const [show, setShow] = useState(false);

function handleCart() {
  setShow(true)
  console.log('here')
}

  return (
    <>
    {currentUser && CheckAdminUser(currentUser) ? <Toolbar /> : ''}
    <header className="header">
      <div className="header__wrapper">
        <div className="header__nav header__nav--fill">
          <button className='nav__menu--icon'>
            <span className='hidden-fullscreen'>
              <img src={MenuIcon} alt="menu icon"/>
            </span>
          </button>
          <nav className='nav nav-left hidden-mobile'>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/shop'>Shop</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/faq'>FAQ</Link></li>
            </ul>
          </nav>
        </div>
        <div className="header__nav header__nav--logo">
          <nav className='nav nav-logo'>
            <div className='nav__logo-wrapper'>
              <img src={Logo} alt="logo trasher"/>
            </div>
          </nav>
        </div>
        <div className="header__nav header__nav--fill">
          <nav className='nav nav-right hidden-mobile'>
            <ul className='hidden-mobile'>
              {currentUser ? <li><Link to='/account/profil'>Account</Link></li> : <li><Link to='/account/login'>Account</Link></li> }
              <li onClick={handleCart}>Cart <span>({cartQuantity})</span></li>
              {currentUser && <li><a href="" onClick={() => auth.signOut()}>LOGOUT</a></li>}
            </ul>
          </nav>
          <nav className='nav nav-right hidden-fullscreen'>
            <ul>
              <li className='nav__flex'><img className='nav-icons' src={ShoppingBag} alt="Shopping-bag" onClick={() => {handleCart()}}/><span>({cartQuantity})</span></li>
              <li><img src={Logout} alt="Logout icon"/></li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
    <Cart onClose={() => setShow(false)} show={show} />
    </>
  )
}

Header.defaultProps = {
  currentUser: null
}

export default Header