import React from 'react'
import ForgetPassword from '../../components/ForgetPassword/ForgetPassword'

const Recovery = props => {
  return (
    <div className='recovery'>
      <div className="recovery-content">
        <div className="recovery-header">
          <h4>Reset Password</h4>
        </div>
        <div className="recovery-body">
          <ForgetPassword />
        </div>
        <div className="recovery-footer">

        </div>
      </div>

    </div>
  )
}

export default Recovery
