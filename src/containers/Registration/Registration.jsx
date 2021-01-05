import React, { useState } from 'react'
import Button from '../../components/Form/Button/Button'
import SignIn from '../../components/SignIn/SignIn'
import SignUp from '../../components/SignUp/SignUp'
import { signInWithGoogle } from '../../Firebase/utils'
import './Registration.css'


const Registration = props => {

  const [toggle, setToggle] = useState('signin')

  // handleSubmit= async e => {
  //   e.preventDefault()
  // }

  return (
    <div className='registration'>
      <div className='registration-content'>
        <div className="registration-header">
          <h4 onClick={() => setToggle('signin')}>Registration</h4>
          <h4 onClick={() => setToggle('signup')}>Login</h4>
        </div>
        <div className="registration-body">
          {toggle === 'signin' ? <SignIn /> : <SignUp />}
        </div>
        <div className="registration-footer">
          <Button onClick={signInWithGoogle} className='btn'>
            Sign In With Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Registration