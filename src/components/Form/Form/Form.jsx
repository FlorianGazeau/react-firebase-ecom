import React from 'react'
import './Form.css'

const Form = ({ children, ...otherProps }) => {
  return (
    <form {...otherProps}>
      {children}
    </form>
  )
}

export default Form
