import config from './config'
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'

const userPool = new CognitoUserPool({
  UserPoolId: config.cognito.USER_POOL_ID,
  ClientId: config.cognito.APP_CLIENT_ID
})

function login(email, password) {
  const user = new CognitoUser({ Username: email, Pool: userPool })
  const authenticationDetails = new AuthenticationDetails({ Username: email, Password: password })

  return new Promise((resolve, reject) => {
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(),
      onFailure: err => reject(err)
    })
  })
}

function isAuthenticated() {
  var cognitoUser = userPool.getCurrentUser()

  if (cognitoUser != null) {
    return cognitoUser.getSession(function(err, session) {
      if (err) {
        alert(err)
      }
      console.log('isAuthenticated:', session.isValid())
      return session.isValid() || false
    })
  }

  return false
}

function logout() {
  let cognitoUser = userPool.getCurrentUser()
  cognitoUser.signOut()
}

export { login, isAuthenticated, logout }
