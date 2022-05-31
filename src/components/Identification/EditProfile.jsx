import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Alert, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import KataSercvice from '../../KataService'
import { authorize } from '../../redux/userSlice'

import Input from './Input'
import ErrorMessage from './ErrorMessage'
import classes from './Identification.module.scss'
import { usernameOptions, editEmailOptions, editPasswordOptions, urlOptions } from './useFormObjects'
import SubmitButton from './SubmitButton'

const EditProfile = () => {
  const kata = new KataSercvice()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)
  const loggedIn = useSelector((state) => state.user.loggedIn)

  const dispatch = useDispatch()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    clearErrors,
    setError,
    reset,
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const { username, email, password, avatar } = data
      const user = { user: {} }
      if (userName) user.user.username = username
      if (email) user.user.email = email
      if (password) user.user.password = password
      if (avatar) user.user.image = avatar
      const response = await kata.userUpdate(user)
      if (response.errors) {
        response.errors.email && setError('emailServer', { type: 'custom', message: response.errors.email })
        response.errors.username && setError('userNameServer', { type: 'custom', message: response.errors.username })
        return
      }
      dispatch(authorize(response.user))
      reset()
    } catch (error) {
      setServerError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const userName = register('username', usernameOptions)
  const email = register('email', editEmailOptions)
  const password = register('password', editPasswordOptions)
  const avatar = register('avatar', urlOptions)

  const userNameError = errors?.username && <ErrorMessage message={errors.username.message} />
  const emailError = errors?.email && <ErrorMessage message={errors.email.message} />
  const passwordError = errors?.password && <ErrorMessage message={errors.password.message} />
  const avatarError = errors?.avatar && <ErrorMessage message={errors.avatar.message} />
  const emailServerErrorMessage = errors?.emailServer && (
    <ErrorMessage message={`email ${errors.emailServer.message}`} />
  )
  const userNameServerErrorMessage = errors?.userNameServer && (
    <ErrorMessage message={`username ${errors.userNameServer.message}`} />
  )

  if (!loggedIn) return <Redirect to="/sign-in" />
  if (loading) return <Spin tip="Loading..." />
  if (serverError) return <Alert message={`${serverError}`} type="error" />

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>
        <span>Edit Profile</span>
      </div>
      <Input
        {...userName}
        onError={userNameError || userNameServerErrorMessage}
        onFocus={() => clearErrors('userNameServer')}
      >
        Username
      </Input>
      <Input
        type="email"
        {...email}
        onError={emailError || emailServerErrorMessage}
        onFocus={() => clearErrors('emailServer')}
      >
        Email address
      </Input>
      <Input type="password" {...password} onError={passwordError}>
        New passowrd
      </Input>
      <Input placeholder="Avatar image" {...avatar} onError={avatarError}>
        Avatar image (url)
      </Input>
      <div>
        <SubmitButton disabled={!isValid} title={isValid ? 'Save' : 'Username field is required'}>
          Save
        </SubmitButton>
      </div>
    </form>
  )
}

export default EditProfile
