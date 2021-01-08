import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Form from '../Form/Form/Form'
import Button from '../Form/Button/Button'
import { FormInput } from '../Form/FormInput/FormInput'
import { Link } from 'react-router-dom'
import { signInUser } from '../../redux/Users/user.actions'

const MapSate = ({ user }) => ({
  signInSuccess: user.signInSuccess
})

const Signin = () => {

  const dispatch = useDispatch()
  const { signInSuccess } = useSelector(MapSate)
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
  
  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(signInUser({ email, password}))
  }

  return (
    <>
      {error.length > 0 && <span>{error}</span>}
      <Form onSubmit={handleSubmit}>
        <FormInput 
          type='email'
          name='email'
          value={email}
          placeholder='Your email'
          handleChange={(e) => setEmail(e.target.value)}
        />
        <FormInput 
          type='password'
          name='password'
          value={password}
          placeholder='Your password'
          handleChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' className='btn'>
          Sign up
        </Button>
      </Form>
      <Link to='/account/recovery'>Forget Password ?</Link>
    </>
  )
}

export default Signin
