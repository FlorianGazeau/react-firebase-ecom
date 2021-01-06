import { Component } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { setCurrentUser } from './redux/Users/user.actions'

// Firebase
import { auth, handleUserProfile } from './Firebase/utils'

// Components
import Header from "./components/Header/Header";

// Pages
import Homepage from "./pages/Homepage/Homepage";
import Authentification from "./pages/Authentification/Authentification";
import Recovery from './pages/Recovery/Recovery';

class App extends Component {

  authListener = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.authLister = auth.onAuthStateChanged(async userAuth => {
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
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser} = this.props
    console.log(currentUser)
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/account/login'>
            {currentUser ? <Redirect to ='/'></Redirect> : <Authentification />}
          </Route>
          <Route path='/account/recovery' component={Recovery} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
