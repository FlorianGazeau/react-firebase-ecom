import React, { useState } from 'react'
import { auth } from '../../Firebase/utils'

import Form from '../Form/Form/Form'
import Button from '../Form/Button/Button'
import { FormInput } from '../Form/FormInput/FormInput'
import { Link } from 'react-router-dom'

const SignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  
  const resetForm = () => {
    setEmail('')
    setPassword('')
    setError([])
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await auth.signInWithEmailAndPassword(email, password)
      resetForm()
    } catch(err) {
      setError(err.message)
    }
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

export default SignUp
