import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Icon from './Icon'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import useStyles from './styles'

import Input from './Input'

import { signin, signup } from '../../actions/auth'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function Auth() {
  const classes = useStyles(initialState)

  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleShowPassword = () =>
    setShowPassword(() => setShowPassword(!showPassword))

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignup) {
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignup(!isSignup)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj
    //?. will not throw an error if we cannot access the profileObj
    //?. will return undefined if we cannot access the data
    const token = res?.tokenId

    try {
      dispatch({ type: 'AUTH', data: { result, token } })

      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log('Google Login was unsuccessful')
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.Paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? 'Sign up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId="803316181086-jlhis7ap7ntd7spn5272pt8iadmmkcv1.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
