import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }
  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    return (
      <div className="loginContainer">
        <div className="signIn-Container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="company-Logo"
          />
          <form className="form-container" onSubmit={this.onClickLogin}>
            <label htmlFor="username" className="labelElement">
              {' '}
              Username
            </label>
            <input
              type="text"
              id="username"
              className="inputElement"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="password" className="labelElement">
              {' '}
              Password
            </label>
            <input
              type="password"
              id="password"
              className="inputElement"
              onChange={this.onChangePassword}
              value={password}
            />
            <button className="loginBtn" type="submit">
              Login
            </button>
            {showErrorMsg && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
