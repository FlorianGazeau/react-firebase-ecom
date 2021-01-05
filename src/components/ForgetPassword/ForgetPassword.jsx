import React, { Component } from 'react';
import { auth } from '../../Firebase/utils';
import { withRouter } from 'react-router-dom'

import Button from '../Form/Button/Button';
import Form from '../Form/Form/Form';
import { FormInput } from '../Form/FormInput/FormInput';

const initialState = {
  email: '', 
  errors: []
}

class ForgetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    
    
    try {
      const { email, err } = this.state

      const config = {
        url: 'http://localhost:3000/account/login'
      }

      await auth.sendPasswordResetEmail(email, config)
      .then(() => {
        this.state.history.push('/')
      })
      .catch(() => {
        const err = ['Email not found. Please try again']
        this.setState({
          errors: err
        })
      })

    } catch(err) {
      // console.log(err)
    }
  }

  render () {

    const {email, errors } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>

        {errors.length > 0 && 
        <ul>
          {errors.map((e, i) => {
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
          handleChange={this.handleChange}
        />
        <Button className='btn' type='submit'>
          Reset Password
        </Button>
      </Form>
    );
  }
}

export default withRouter(ForgetPassword);
