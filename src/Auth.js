import config from './config'
import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoAccessToken } from 'amazon-cognito-identity-js'

function login(email, password) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  })

  const user = CognitoUser({ Username: email, Pool: userPool })
  const authenticationDetails = new AuthenticationDetails({ Username: email, Password: password })

  return new Promise((res, rej) => {
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => res(),
      onFailure: err => reject(err)
    })
  })
}