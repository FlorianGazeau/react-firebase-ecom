import userTypes from './user.types'
import { auth, handleUserProfile } from '../../Firebase/utils'

export const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
})

export const signInUser = ({ email, password }) => async dispatch => {
    
  try {
    await auth.signInWithEmailAndPassword(email, password)
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true
    })
  } catch(err) {
    // setError(err.message)
  }
}

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
  try {
    if (password !== confirmPassword) {
      const err = "Password don't match"
      dispatch({
        type: userTypes.SIGN_UP_ERROR,
        payload: err
      })
    }
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    console.log('herrreeee')
    await handleUserProfile(user, { displayName})

    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true
    })

  } catch(err) {
    // console.log(err)
  }
}

export const resetPassword = ({ email }) => async dispatch => {
  const config = {
    url: 'http://localhost:3000/account/login'
  }
  
  try {

    await auth.sendPasswordResetEmail(email, config)
    .then(() => {
      dispatch({
        type: userTypes.RESET_PASSWORD_SUCCESS,
        payload: true
      })
    })
    .catch(() => {
      const err = ['Email not found. Please try again']
      dispatch({
        type: userTypes.RESET_PASSWORD_ERROR,
        payload: err
      })

    })

  } catch(err) {
    // console.log(err)
  }
}