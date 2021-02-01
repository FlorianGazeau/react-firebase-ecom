import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Form from '../../components/Form/Form/Form'
import Button from '../../components/Form/Button/Button'
import { FormInput } from '../../components/Form/FormInput/FormInput'
import { Link } from 'react-router-dom'
import { signInUser } from '../../redux/Users/user.actions'

const MapSate = ({ user }) => ({
  signInSuccess: user.signInSuccess,
  signInError: user.signInError
})

const Signin = () => {

  const dispatch = useDispatch()
  const { signInError, signInSuccess } = useSelector(MapSate)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  
  const resetForm = () => {
    setEmail('')
    setPassword('')
    setError([])
  }
  
  useEffect(() => {
    if (signInSuccess) {
      resetForm()
    }
  }, [signInSuccess]);

  useEffect(() => {
    console.log('here')
    if (signInError) {
      console.log(signInError)
      setError(signInError)
    }
  }, [signInError])
  
  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(signInUser({ email, password}))
  }

  return (
    <>
      <p>Please enter your e-mail and password:</p>
      {error.length > 0 && <p className='error'>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <FormInput 
          type='email'
          name='email'
          value={email}
          placeholder='Your email'
          handleChange={(e) => setEmail(e.target.value)}
          className='form-input'
          required
        />
        <FormInput 
          type='password'
          name='password'
          value={password}
          placeholder='Your password'
          handleChange={(e) => setPassword(e.target.value)}
          className='form-input'
          required
        />
        <Button type='submit' className='btn btn-submit'>
          Sign up
        </Button>
      </Form>
      <Link to='/account/recovery'>Forget Password ?</Link>
    </>
  )
}

export default Signin
