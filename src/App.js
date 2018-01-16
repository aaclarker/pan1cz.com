import React from 'react'
import config from './config'
import './App.css'
import LandingPage from './LandingPage.js'
import Navigation from './Navigation.js'
import Budget from './Budget'
import Login from './Login'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CognitoUserPool } from 'amazon-cognito-identity-js'

const isAuthenticated = () => {
  let userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  })
  var cognitoUser = userPool.getCurrentUser()

  if (cognitoUser != null) {
    return cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err)
        return false
      }
      return session.isValid()
    })
  }

  return false
}

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
