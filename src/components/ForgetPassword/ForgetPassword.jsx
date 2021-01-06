import React, { useState } from 'react';
import { auth } from '../../Firebase/utils';
import { withRouter } from 'react-router-dom'

import Button from '../Form/Button/Button';
import Form from '../Form/Form/Form';
import { FormInput } from '../Form/FormInput/FormInput';


const ForgetPassword = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState([]);

  const resetForm = () => {
    setEmail('')
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
  
    try {

      const config = {
        url: 'http://localhost:3000/account/login'
      }

      await auth.sendPasswordResetEmail(email, config)
      .then(() => {
        this.state.history.push('/')
      })
      .catch(() => {
        setError('Email not found. Please try again')
        resetForm()
      })

    } catch(err) {
      // console.log(err)
    }
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
