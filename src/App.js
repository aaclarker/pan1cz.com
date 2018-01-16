import React from 'react'
import './App.css'
import LandingPage from './LandingPage.js'
import Navigation from './Navigation.js'
import Budget from './Budget'
import Login from './Login'
import { Switch, Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

class App extends React.Component {
  componentWillMount() {
    document.title = 'Pan1cz'
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/budget" component={Budget} />
        </Switch>
      </div>
    )
  }
}

// const app = new App()

export default App
