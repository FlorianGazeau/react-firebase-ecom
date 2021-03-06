import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Form from '../../components/Form/Form/Form'
import {FormInput} from '../../components/Form/FormInput/FormInput'
import Button from '../../components/Form/Button/Button'
import {signUpUser } from '../../redux/Users/user.actions'


const MapStore = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
})

const Signup = () => {

  const dispatch = useDispatch()
  const {signUpSuccess, signUpError} = useSelector(MapStore)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState([])

  const resetForm = () => {
    setDisplayName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  useEffect(() => {
    if (signUpSuccess) {
      resetForm()
    }
  }, [signUpSuccess]);

  useEffect(() => {
    if (signUpError) {
      setError(signUpError)
    }
  }, [signUpError])

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(signUpUser({ displayName, email, password }))
  }

  return (
    <>
    <p>Please fill in the information below:</p>
    <Form action="" onSubmit={handleSubmit}>
      {error.length > 0 && <p className='error'>{error}</p>}

      <FormInput
        type='text'
        name="displayName" 
        value={displayName}
        placeholder="Full Name"
        required
        handleChange={(e) => setDisplayName(e.target.value)}
        className='form-input input form-field'
      />
      <FormInput
        type='email'
        name="email" 
        value={email}
        placeholder="Your Email"
        required
        handleChange={(e) => setEmail(e.target.value)}
        className='form-input input form-field'
      />
      <FormInput
        type='password'
        name="password" 
        value={password}
        placeholder="Your Password"
        required
        handleChange={(e) => setPassword(e.target.value)}
        className='form-input input form-field'
      />
      <FormInput
        type='password'
        name="confirmPassword" 
        value={confirmPassword}
        placeholder="Confirm your password"
        required
        handleChange={(e) => setConfirmPassword(e.target.value)}
        className='form-input input form-field'
      />
      <Button className='btn btn-submit' type='submit'>
        Sign In
      </Button>
    </Form>
    </>
  )
}

export default Signup

