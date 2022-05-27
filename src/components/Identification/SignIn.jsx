import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Alert, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import KataSercvice from '../../KataService'
import { authorize } from '../../redux/userSlice'

import ErrorMessage from './ErrorMessage'
import Input from './Input'
import classes from './Identification.module.scss'
import { emailOptions } from './useFormObjects'
import SubmitButton from './SubmitButton'

const SignIn = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const kata = new KataSercvice()

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setError,
    setFocus,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const { email, password } = data
      const user = {
        user: { email, password },
      }
      const login = await kata.userLogin(user)
      if (login.errors) {
        setError('server', { type: 'custom', message: login.errors['email or password'] })
        return
      }
      dispatch(authorize(login.user))
      document.cookie = `token=${login.user.token}; path=/; max-age=86400`
    } catch (error) {
      setServerError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const email = register('email', emailOptions)
  const password = register('password', {
    required: 'Field is required',
  })
  const emailError = errors?.email && <ErrorMessage message={errors.email.message} />
  const passwordError = errors?.password && <ErrorMessage message={errors.password.message} />
  const serverErrorMessage = errors?.server && <ErrorMessage message={`email or password ${errors.server.message}`} />

  if (loading) return <Spin tip="Loading..." />
  if (loggedIn) history.replace('/articles/1')
  if (serverError) return <Alert message={`${serverError}`} type="error" />

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>
        <span>Sign In</span>
      </div>

      <Input
        {...email}
        onError={emailError}
        onFocus={() => clearErrors('server')}
        onKeyDown={({ key }) => {
          if (key === 'Enter') setFocus('password')
        }}
      >
        Email address
      </Input>
      <Input type="password" {...password} onError={passwordError} onFocus={() => clearErrors('server')}>
        Password
      </Input>
      {serverErrorMessage}
      <div>
        <SubmitButton>Login</SubmitButton>
        <div className={classes.haveAcc}>
          <span>Don’t have an account? </span>
          <Link to="/sign-up/">Sign Up.</Link>
        </div>
      </div>
    </form>
  )
}

export default SignIn
