import React from 'react'
import './Header.css'
import Logo from '../../assets/logo.png'

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img src={Logo} alt="Logo Trasher"/>
        </div>
      </div>
    </header>
  )
}
