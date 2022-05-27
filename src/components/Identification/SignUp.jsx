import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Alert, Spin } from 'antd'

import KataSercvice from '../../KataService'

import Input from './Input'
import ErrorMessage from './ErrorMessage'
import classes from './Identification.module.scss'
import { usernameOptions, emailOptions, passwordOptions, agreementOptions } from './useFormObjects'
import SubmitButton from './SubmitButton'
const SignUp = () => {
  const kata = new KataSercvice()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)
  const history = useHistory()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    clearErrors,
    setError,
    setFocus,
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const { username, email, password } = data
      const user = {
        user: { username, email, password },
      }
      const { errors } = await kata.registerNewUser(user)
      if (errors) {
        errors.email && setError('emailServer', { type: 'custom', message: errors.email })
        errors.username && setError('userNameServer', { type: 'custom', message: errors.username })
        return
      }
      history.push('/sign-in')
    } catch (error) {
      setServerError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const userName = register('username', usernameOptions)
  const email = register('email', emailOptions)
  const password = register('password', passwordOptions)
  const agreement = register('agreement', agreementOptions)
  const repeatPassowrd = register('confirmPassword', {
    required: 'Field is required',
    validate: (value) => {
      if (watch('password') !== value) {
        return 'Your passwords do no match'
      }
    },
  })
  const repeatPassowrdError = errors?.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />
  const agreementError = errors?.agreement && <ErrorMessage message={errors.agreement.message} />
  const userNameError = errors?.username && <ErrorMessage message={errors.username.message} />
  const emailError = errors?.email && <ErrorMessage message={errors.email.message} />
  const passwordError = errors?.password && <ErrorMessage message={errors.password.message} />
  const emailServerError = errors?.emailServer && <ErrorMessage message={`email ${errors.emailServer.message}`} />
  const userNameServerError = errors?.userNameServer && (
    <ErrorMessage message={`username ${errors.userNameServer.message}`} />
  )

  if (loading) return <Spin tip="Loading..." />
  if (serverError) return <Alert message={`${serverError}`} type="error" />

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>
        <span>Create new account</span>
      </div>
      <Input
        {...userName}
        onError={userNameError || userNameServerError}
        onFocus={() => clearErrors('userNameServer')}
        onKeyDown={({ key }) => {
          if (key === 'Enter') setFocus('email')
        }}
      >
        Username
      </Input>
      <Input
        type="email"
        {...email}
        onError={emailError || emailServerError}
        onFocus={() => clearErrors('emailServer')}
        onKeyDown={({ key }) => {
          if (key === 'Enter') setFocus('password')
        }}
      >
        Email address
      </Input>
      <Input
        type="password"
        {...password}
        onError={passwordError}
        onKeyDown={({ key }) => {
          if (key === 'Enter') setFocus('confirmPassword')
        }}
      >
        Password
      </Input>
      <Input
        type="password"
        placeholder="Password"
        {...repeatPassowrd}
        onError={repeatPassowrdError}
        onKeyDown={({ key }) => {
          if (key === 'Enter') setFocus('agreement')
        }}
      >
        Repeat Password
      </Input>
      <label className={classes.agreement}>
        <input
          type="checkbox"
          {...agreement}
          onKeyDown={(event) => {
            const currentValue = getValues('agreement')
            if (currentValue && event.key === 'Enter') return
            if (event.key === 'Enter') {
              event.preventDefault()
              setValue('agreement', !currentValue, { shouldValidate: true })
            }
          }}
        />
        I agree to the processing of my personal information
      </label>
      {agreementError}

      <div>
        <SubmitButton title={isValid ? 'Create account' : 'You need to complete the form'} disabled={!isValid}>
          Create
        </SubmitButton>

        <div className={classes.haveAcc}>
          <span>Already have an account? </span>
          <Link to="/sign-in/">Sign In</Link>
        </div>
      </div>
    </form>
  )
}

export default SignUp
