import React, { Component } from 'react'
import Button from '../../components/Form/Button/Button'

import './Registration.css'

class Registration extends Component {
  render() {
    return (
      <div className='registration'>
        <div className='registration-content'>
          <div className="registration-header">
            <h4>Registration</h4>
            <h4>Login</h4>
          </div>
          <div className="registration-body">
            <form action="">

            </form>
          </div>
          <div className="registration-footer">
            <Button>
              Sign In With Google
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Registration