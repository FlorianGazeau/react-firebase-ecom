import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth } from '../../Firebase/utils'
import Logo from '../../assets/logo.png'

import './Header.css'

function Header(props) {

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
                  <Link to='/account'>
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
  )
}

Header.defaultProps = {
  currentUser: null
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Header)