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
import { createStructuredSelector} from 'reselect'
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors'
import Cross from '../../assets/cancel.svg'

const MapState = ({user}) => ({
  currentUser: user.currentUser
})

const MapSateSelect = createStructuredSelector({
  quantity: selectCartItemsCount
})

function Header() {

  const { currentUser} = useSelector(MapState)
  const { quantity} = useSelector(MapSateSelect)
  const [show, setShow] = useState(false);
  const [sidebar, setSidebar] = useState(false)

  function handleCart() {
    setShow(true)
  }

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
    {currentUser && CheckAdminUser(currentUser) ? <Toolbar /> : ''}
    <header className="header">
      <div className="header__wrapper">
        <div className="header__nav header__nav--fill">
          <button className='nav__menu--icon' onClick={showSidebar}>
            <span className='hidden-fullscreen'>
              <img className='menuIcon' src={MenuIcon} alt="menu icon"/>
            </span>
          </button>
          <div className={sidebar ? 'sidenav active' : 'sidenav'}>
            <div className='sidenav-header'>
              <img className='menuIcon' src={Cross} alt="cross icon" onClick={() => setSidebar(false)}/>
            </div>
            <ul onClick={() => setSidebar(false)} className='sidenav-content'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/shop'>Shop</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/faq'>FAQ</Link></li>
            </ul>
          </div>
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
              <li onClick={handleCart}>Cart <span>({quantity})</span></li>
              {currentUser && <li><Link onClick={() => auth.signOut()}>LOGOUT</Link></li>}
            </ul>
          </nav>
          <nav className='nav nav-right hidden-fullscreen'>
            <ul>
              <li className='nav__flex'><img className='nav-icons' src={ShoppingBag} alt="Shopping-bag" onClick={() => {handleCart()}}/><span>({quantity})</span></li>
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