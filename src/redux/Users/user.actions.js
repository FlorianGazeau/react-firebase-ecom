import userTypes from './user.types'
import { auth, handleUserProfile } from '../../Firebase/utils'

export const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
})

export const signInUser = ({ email, password }) => async dispatch => {
    
  try {
    await auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true
      })
    })
    .catch((err) => {
      dispatch({
        type: userTypes.SIGN_IN_ERROR,
        payload: err.message
      })
    })
  } catch(err) {

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

    if (password.length < 7) {
      const err = "Password is to short"
      dispatch({
        type: userTypes.SIGN_UP_ERROR,
        payload: err
      })
    }
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    await handleUserProfile(user, { displayName})

    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true
    })

  } catch(err) {

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