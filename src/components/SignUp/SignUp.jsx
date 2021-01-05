import React, { Component } from 'react'
import { auth } from '../../Firebase/utils'

import Form from '../Form/Form/Form'
import Button from '../Form/Button/Button'
import { FormInput } from '../Form/FormInput/FormInput'
import { Link } from 'react-router-dom'

const initialSate = {
  email: '',
  password: '',
  errors: ''
}

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialSate
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const {email, password} = this.state
    try {
      await auth.signInWithEmailAndPassword(email, password)

      this.setState({
        ...initialSate
      })
    } catch(err) {
      console.log(err)
    }
  }

  render () {

    const { email, password, errors } = this.state

    return (
      <>
      <Form onSubmit={this.handleSubmit}>
        <FormInput 
          type='email'
          name='email'
          value={email}
          placeholder='Your email'
          handleChange={this.handleChange}
        />
        <FormInput 
          type='password'
          name='password'
          value={password}
          placeholder='Your password'
          handleChange={this.handleChange}
        />
        <Button type='submit' className='btn'>
          Sign up
        </Button>
      </Form>
      <Link to='/account/recovery'>Forget Password ?</Link>
      </>
    )
  }
}

export default SignUp
