import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { auth, handleUserProfile } from './Firebase/utils'

// Pages
import Header from "./components/Header/Header";
import Homepage from "./containers/Homepage/Homepage";
import Registration from "./containers/Registration/Registration";
import { Component } from 'react';

const initialState = {
  currentUser: null
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState
    }
  }

  authListener = null
  componentDidMount() {
    this.authLister = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      this.setState({
        ...initialState
      })
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser} = this.state
    return (
      <Router>
        <Header currentUser={currentUser} />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/account/login'>
            {currentUser ? <Redirect to ='/'></Redirect> : <Registration />}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
