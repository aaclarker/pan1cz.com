import config from './config'
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Col, Checkbox, Button } from 'react-bootstrap'
import './Login.css'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
      mustResetPassword: false
    }

    this.userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this)
    this.handlePasswordValidationState = this.handlePasswordValidationState.bind(this)
    this.setSession = this.setSession.bind(this)
  }

  // Sets user details in localStorage
  setSession(authResult) {
    Object.keys(authResult).forEach(key => {
      localStorage.setItem(key, authResult[key])
    })
  }

  handleLoginSubmit(event) {
    event.preventDefault()

    this.user = new CognitoUser({ Username: this.state.username, Pool: this.userPool })
    const authenticationDetails = new AuthenticationDetails({
      Username: this.state.username,
      Password: this.state.password
    })

    // TODO: Figure out promise stuff
    return new Promise((resolve, reject) => {
      this.user.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          return resolve(this.setSession(result))
        },
        onFailure: function(err) {
          // User authentication was not successful
          // TODO: Handle incorrect login error
          alert(err)
          return reject(err)
        },
        mfaRequired: function(codeDeliveryDetails) {
          // MFA is required to complete user authentication.
          // Get the code from user and call
          //   user.sendMFACode(mfaCode, this)
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          delete userAttributes.email_verified
          this.setState({ userAttributes: userAttributes })

          // Get these details and call
          this.setState({ mustResetPassword: true })
        }
      })
    })
  }

  handlePasswordSubmit(event) {
    if (this.state.newPassword === this.state.confirmPassword) {
      this.user.completeNewPasswordChallenge(this.state.newPassword, this.state.userAttributes, {
        onSuccess: result => {
          // User authentication was successful
          this.setState({ mustResetPassword: false })
          return
        },
        onFailure: function(err) {
          // User authentication was not successful
          alert(err)
          return
        }
      })
      // })
    } else {
      // TODO: Better password validation
      alert('Passwords do not match')
    }
  }

  handlePasswordValidationState() {
    if (this.state.newPassword !== this.state.confirmPassword) return 'error'
    return null
  }

  render() {
    const newPasswordForm = (
      <div className="loginForm">
        <Form horizontal onSubmit={this.handlePasswordSubmit}>
          <FormGroup controlId="formHorizontalNewPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Password"
                value={this.state.newPassword}
                onChange={e => {
                  this.setState({ newPassword: e.target.value })
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalConfirmPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Confirm Password"
                validationState={this.handlePasswordValidationState()}
                value={this.state.confirmPassword}
                onChange={e => {
                  this.setState({ confirmPassword: e.target.value })
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Set Password</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )

    const loginForm = (
      <div className="loginForm">
        <Form horizontal onSubmit={this.handleLoginSubmit}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl
                type="email"
                placeholder="Email"
                value={this.state.username}
                onChange={e => {
                  this.setState({ username: e.target.value })
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => {
                  this.setState({ password: e.target.value })
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )

    return this.state.mustResetPassword ? newPasswordForm : loginForm
  }
}

export default Login
