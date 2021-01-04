import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from "./components/Header/Header";
import Homepage from "./containers/Homepage/Homepage";
import Registration from "./containers/Registration/Registration";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/account/login' component={Registration} />
      </Switch>
    </Router>
  );
}

export default App;
