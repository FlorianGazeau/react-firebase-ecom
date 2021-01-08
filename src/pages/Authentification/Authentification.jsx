import React, { useState } from 'react'
import Button from '../../components/Form/Button/Button'
import SignIn from '../../components/Signin/Signin'
import SignUp from '../../components/Signup/Signup'
import { signInWithGoogle } from '../../Firebase/utils'
import './Authentification.css'


const Authentification = props => {

  const [toggle, setToggle] = useState('signin')

  return (
    <div className='registration'>
      <div className='registration-content'>
        <div className="registration-header">
          <h4 onClick={() => setToggle('signup')}>Registration</h4>
          <h4 onClick={() => setToggle('signin')}>Login</h4>
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

export default Authentification