import { Link, withRouter, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Spin } from 'antd'

import KataSercvice from '../../KataService'

import Input from './Input'
import ErrorMessage from './ErrorMessage'
import classes from './Identification.module.scss'

const SignUp = () => {
  const kata = new KataSercvice()
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { email: emailServerError = null, username: userNameServerError = null } = serverError
  const history = useHistory()

  const emailServerErrorMessage = serverError && emailServerError && (
    <ErrorMessage message={`email ${emailServerError}`} />
  )
  const userNameServerErrorMessage = serverError && userNameServerError && (
    <ErrorMessage message={`username ${userNameServerError}`} />
  )

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    // reset,
    watch,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const { username, email, password } = data
    const user = JSON.stringify({
      user: { username, email, password },
    })
    const result = await kata.registerNewUser(user)
    setLoading(false)
    if (result.errors) {
      setServerError(result.errors)
      return
    }
    setServerError(false)
    history.push('/sign-in')
    // reset()
  }

  const userName = register('username', {
    required: 'Field is required',
    minLength: {
      value: 3,
      message: 'Your username needs to be at least 3 characters.',
    },
    maxLength: {
      value: 20,
      message: 'Your username needs to be no more than 40 characters',
    },
  })
  const userNameError = errors?.username && <ErrorMessage message={errors.username.message} />

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
    minLength: {
      value: 6,
      message: 'Your password needs to be at least 6 characters.',
    },
    maxLength: {
      value: 40,
      message: 'Your password needs to be no more than 40 characters',
    },
  })
  const passwordError = errors?.password && <ErrorMessage message={errors.password.message} />

  const repeatPassowrd = register('confirmPassword', {
    required: 'Field is required',
    validate: (value) => {
      if (watch('password') !== value) {
        return 'Your passwords do no match'
      }
    },
  })
  const repeatPassowrdError = errors?.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />

  const agreement = register('agreement', {
    required: 'You need to accept the agreement',
  })
  const agreementError = errors?.agreement && <ErrorMessage message={errors.agreement.message} />

  if (loading) {
    return <Spin tip="Loading..." />
  }

  return (
    <form className={classes.signUp} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>
        <span>Create new account</span>
      </div>
      <Input {...userName} onError={userNameError} serverError={userNameServerErrorMessage}>
        Username
      </Input>
      <Input type="email" {...email} onError={emailError} serverError={emailServerErrorMessage}>
        Email address
      </Input>
      <Input type="password" {...password} onError={passwordError}>
        Password
      </Input>
      <Input type="password" placeholder="Password" {...repeatPassowrd} onError={repeatPassowrdError}>
        Repeat Password
      </Input>
      <label className={classes.agreement}>
        <input type="checkbox" {...agreement} />I agree to the processing of my personal information
      </label>
      {agreementError}

      <div>
        <button
          type="submit"
          className={classes.submit}
          disabled={!isValid}
          title={isValid ? 'Create account' : 'You must complete the form'}
        >
          Create
        </button>
        <div className={classes.haveAcc}>
          <span>Already have an account? </span>
          <Link to="/sign-in/">Sign In</Link>
        </div>
      </div>
    </form>
  )
}

export default withRouter(SignUp)
