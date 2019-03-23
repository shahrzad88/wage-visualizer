import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import httpClient from './httpClient'
import NavBar from './NavBar'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import WageMap from './views/WageMap'
import Home from './views/Home'
import './css/styles.css'

class App extends React.Component {
	state = { 
    currentUser: httpClient.getCurrentUser(),
    data: [["MB", 75], ["SK", 43], ["AB", 50], ["BC", 88], ["NU", 21],
      ["NT", 43], ["YT", 21], ["ON", 19], ["QC", 60], ["NB", 4], ["NS", 44],
      ["NF", 38], ["PE", 67]]
  }

	onLoginSuccess(user) {
		this.setState({ currentUser: httpClient.getCurrentUser() })
	}

	logOut() {
		httpClient.logOut()
		this.setState({ currentUser: null })
	}
	
	render() {
		const { currentUser } = this.state
		return (
			<div className='App container'>

				<NavBar currentUser={currentUser} />

				<Switch>

					<Route path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/logout" render={(props) => {
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />

					{/* the sign up component takes an 'onSignUpSuccess' prop which will perform the same thing as onLoginSuccess: set the state to contain the currentUser */}
					<Route path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/wagemap" render={() => {
						return currentUser
							? <WageMap data={this.state.data}/>
							: <Redirect to="/login" />
					}} />

					<Route path="/" component={Home} />

				</Switch>
			</div>
		)
	}
}

export default App