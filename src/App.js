import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { setCurrentUser } from './redux/Users/user.actions'

// hoc

import WithAuth from './hoc/WithAuth'

// Firebase
import { auth, handleUserProfile } from './Firebase/utils'

// Components
import Header from "./components/Header/Header";

// Pages
import Homepage from "./pages/Homepage/Homepage";
import Authentification from "./pages/Authentification/Authentification";
import Recovery from './pages/Recovery/Recovery';
import Admin from './pages/Admin/Admin';
import { CheckAdminUser } from './utils/CheckAdminUser';
import Search from './pages/Search/Search';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import WorkInProgress from './components/WorkInProgress/WorkInProgress';

const App = props => {
  const { setCurrentUser, currentUser } = props

  useEffect(() => {

    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth)
    })

    return() => {
      authListener()
    }
  }, [setCurrentUser])

  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/faq' component={WorkInProgress} />
        <Route path='/about' component={WorkInProgress} />
        <Route exact path='/' component={Homepage} />
        <Route exact path='/shop' component={Search} />
        <Route path='/product/:productID' component={ProductDetails} />
        <Route path='/account/login'>
          {currentUser ? <Redirect to ='/'></Redirect> : <Authentification />}
        </Route>
        <Route path='/account/recovery' component={Recovery} />
        <Route path='/admin'>
          {currentUser && CheckAdminUser(currentUser) ? <Admin /> : <Redirect to='/'></Redirect>}
        </Route>
        <WithAuth>
          <Route path='/account/profil' component={WorkInProgress} />
        </WithAuth>
      </Switch>
    </Router>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
