import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'

import KataSercvice from '../../KataService'
import { authorize } from '../../redux/userSlice'

import ErrorMessage from './ErrorMessage'
import Input from './Input'
import classes from './Identification.module.scss'

const SignIn = () => {
  const kata = new KataSercvice()
  const [loading, setLoading] = useState(false)

  const [serverError, setServerError] = useState(false)
  const dispatch = useDispatch()

  const { ['email or password']: emailOrPassword = null } = serverError
  const ServerErrorMessage = serverError && emailOrPassword && (
    <ErrorMessage message={`email or password ${emailOrPassword}`} />
  )

  const {
    register,
    formState: { errors },
    handleSubmit,
    // reset,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const { email, password } = data
    const user = JSON.stringify({
      user: { email, password },
    })
    const login = await kata.userLogin(user)
    setLoading(false)
    if (login.errors) {
      setServerError(login.errors)
      return
    }
    setServerError(false)
    dispatch(authorize(login.user))
    document.cookie = `token=${login.user.token}; path=/; max-age=86400`
    // reset()
  }

  const email = register('email', {
    required: 'Field is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'invalid email address',
    },
  })
  const emailError = errors?.email && <ErrorMessage message={errors.email.message} />

  const password = register('password', {
    required: 'Field is required',
  })
  const passwordError = errors?.password && <ErrorMessage message={errors.password.message} />

  if (loading) {
    return <Spin tip="Loading..." />
  }

  return (
    <form className={classes.signUp} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>
        <span>Sign In</span>
      </div>

      <Input type="email" {...email} onError={emailError}>
        Email address
      </Input>
      <Input type="password" {...password} onError={passwordError}>
        Password
      </Input>
      {ServerErrorMessage}
      <div>
        <button type="submit" className={classes.submit} title="Login">
          Login
        </button>
        <div className={classes.haveAcc}>
          <span>Don’t have an account? </span>
          <Link to="/sign-up/">Sign Up.</Link>
        </div>
      </div>
    </form>
  )
}

export default SignIn
