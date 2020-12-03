import React, { useEffect, useState } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  console.log("private",rest)
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  console.log("public",rest)
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} setTokens={rest.setTokens} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  )
}

function App() {
  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [tokens, setTokens] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (tokens) {
      setAuthenticated(true)
      localStorage.setItem('token', tokens);
      setLoading(false)
    } else {
      setAuthenticated(false)
      setLoading(false)
    }
  }, [tokens])

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/">
          {authenticated ? <Redirect to="/dashboard" /> : <Login setTokens={setTokens} />}
        </Route>
        <PrivateRoute
          path="/dashboard"
          authenticated={authenticated}
          setTokens={setTokens}
          component={Dashboard}
        />
        <PublicRoute
          path="/login"
          authenticated={authenticated}
          setTokens={setTokens}
          component={Login}
        />
      </Switch>
    </Router>
  )
}

export default App
