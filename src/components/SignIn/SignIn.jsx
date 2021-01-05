import React, { Component } from 'react'

import { auth, handleUserProfile } from '../../Firebase/utils'

import Form from '../Form/Form/Form'
import {FormInput} from '../Form/FormInput/FormInput'
import Button from '../Form/Button/Button'


const initialSate = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: ''
}

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...initialSate
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { displayName, email, password, confirmPassword, errors} = this.state

    if (password !== confirmPassword) {
      const err = ['Password Don\'t match']
      this.setState({
        errors: err
      })
      return
    }

    try {

      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      await handleUserProfile(user, { displayName})

      this.setState({
        ...initialSate
      })

    } catch(err) {
      console.log(err)
    }
  }

  render () {

    const { displayName, email, password, confirmPassword, errors } = this.state

    return (
      <Form action="" onSubmit={this.handleSubmit}>

        {errors.length > 0 && 
          <ul>
            {errors.map((err, index) => {
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
          handleChange={this.handleChange}
        />
        <FormInput
          type='email'
          name="email" 
          value={email}
          placeholder="Your Email"
          className="input form-field"
          required
          handleChange={this.handleChange}
        />
        <FormInput
          type='password'
          name="password" 
          value={password}
          placeholder="Your Password"
          className="input form-field"
          required
          onChange={this.handleChange}
        />
        <FormInput
          type='password'
          name="confirmPassword" 
          value={confirmPassword}
          placeholder="Confirm your password"
          className="input form-field"
          required
          onChange={this.handleChange}
        />
        <Button className='btn' type='submit'>
          Sign In
        </Button>
      </Form>
    )
  }
}

export default SignIn
