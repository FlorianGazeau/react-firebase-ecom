import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'

import Button from '../Form/Button/Button';
import Form from '../Form/Form/Form';
import { FormInput } from '../Form/FormInput/FormInput';
import { resetPassword } from '../../redux/Users/user.actions';


const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
})

const ForgetPassword = () => {

  const dispatch = useDispatch()
  const {resetPasswordError, resetPasswordSuccess} = useSelector(mapState)
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [error, setError] = useState([])

  const resetForm = () => {
    setEmail('')
  }

  useEffect(() => {
    if(resetPasswordSuccess) {
      history.push('/')
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if(resetPasswordError) {
      setError(resetPasswordError)
      resetForm()
    }
  }, [resetPasswordError]);

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(resetPassword({email, error}))
  }

  return (
    <Form onSubmit={handleSubmit}>

      {error.length > 0 && 
      <ul>
        {error.map((e, i) => {
          return (
            <li key={i}>{e}</li>
          )
        })}
      </ul> }

      <FormInput 
        type='email'
        name='email'
        value={email}
        placeholder='Your Email'
        handleChange={(e) => setEmail(e.target.value)}
      />
      <Button className='btn' type='submit'>
        Reset Password
      </Button>
    </Form>
  )
}

export default withRouter(ForgetPassword);
