import React, { useState } from 'react'

import { auth, handleUserProfile } from '../../Firebase/utils'

import Form from '../Form/Form/Form'
import {FormInput} from '../Form/FormInput/FormInput'
import Button from '../Form/Button/Button'

const SignIn = () => {

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
    setError([])
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (password !== confirmPassword) {
      return setError("Password don't match")
    }

    try {

      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      await handleUserProfile(user, { displayName})

      resetForm()
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Form action="" onSubmit={handleSubmit}>

      {error.length > 0 && 
        <ul>
          {error.map((err, index) => {
            return (
              <li key={index}>{err}</li>
            )
          })}
        </ul>
      }

      <FormInput
        type='text'
        name="displayName" 
        value={displayName}
        placeholder="Full Name"
        className="input form-field"
        required
        handleChange={(e) => setDisplayName(e.target.value)}
      />
      <FormInput
        type='email'
        name="email" 
        value={email}
        placeholder="Your Email"
        className="input form-field"
        required
        handleChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        type='password'
        name="password" 
        value={password}
        placeholder="Your Password"
        className="input form-field"
        required
        handleChange={(e) => setPassword(e.target.value)}
      />
      <FormInput
        type='password'
        name="confirmPassword" 
        value={confirmPassword}
        placeholder="Confirm your password"
        className="input form-field"
        required
        handleChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button className='btn' type='submit'>
        Sign In
      </Button>
    </Form>
  )
}

export default SignIn
