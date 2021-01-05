import React from 'react'
import './FormInput.css'

export const FormInput = ({handleChange, ...otherProps}) => {
  return (
    <input onChange={handleChange} {...otherProps} />
  )
}

export const FormGroup = props => {
  return (
    <div>
      {props.children}
    </div>
  )
}
