import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Alert, Spin } from 'antd'

import Input from '../Identification/Input'
import SubmitButton from '../Identification/SubmitButton'
import ErrorMessage from '../Identification/ErrorMessage'
import KataSercvice from '../../KataService'
import { toInitial, tagsFromServer } from '../../redux/tagsSlice'

import TagList from './TagList'
import classes from './UserArticles.module.scss'

const UserArticle = () => {
  const kata = new KataSercvice()
  const tags = useSelector((state) => state.tags.tags)
  const dispatch = useDispatch()
  const [article, setArticle] = useState({
    bodyText: '',
    titleText: '',
    descriptionText: '',
    username: '',
  })
  const { bodyText, titleText, descriptionText, username } = article
  const loggedIn = useSelector((state) => state.user.loggedIn)
  const { slug } = useParams()
  const history = useHistory()
  const match = useRouteMatch()
  const isEditing = match.path === '/article/:slug/edit'
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setFocus,
  } = useForm({
    mode: 'onChange',
  })
  const required = {
    required: 'Field is required',
  }
  const title = register('title', { required: 'Field is required', shouldFocus: true })
  const description = register('description', required)
  const text = register('text', required)

  const titleError = errors?.title && <ErrorMessage message={errors.title.message} />
  const descriptionError = errors?.description && <ErrorMessage message={errors.description.message} />
  const textError = errors?.text && <ErrorMessage message={errors.text.message} />
  const textareaClass = classNames([classes.textarea], { [classes.errorTextarea]: textError })

  const onSubmit = (data) => {
    setLoading(true)
    const tagList = tags.map((tag) => tag.value).filter((tag) => tag.length !== 0)
    const { title, text, description } = data
    const article = {
      article: {
        title,
        body: text,
        description,
        tagList,
      },
    }
    if (isEditing)
      kata
        .updateArticle(article, slug)
        .then(() => {
          history.replace(`/article/${slug}`)
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false))
    if (!isEditing) {
      kata
        .createArticle(article)
        .then(({ article }) => {
          reset()
          dispatch(toInitial())
          setLoading(false)
          history.replace(`/article/${article.slug}`)
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false))
    }
  }
  useEffect(() => {
    setLoading(true)
    if (!isEditing) {
      reset({ title: '', description: '', text: '' })
      dispatch(toInitial())
      setLoading(false)
      return
    }
    //  eslint-disable-next-line
    ;(async () => {
      try {
        const { article } = await kata.getArticle(slug)
        const {
          body,
          author: { username },
          description,
          tagList,
          title,
        } = article
        setArticle({ bodyText: body, username, descriptionText: description, titleText: title })
        dispatch(tagsFromServer({ tagList }))
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [isEditing])

  const currentUsername = useSelector((state) => state.user.username)
  if (!loggedIn) return <Redirect to="/sign-in" />
  if (loading) return <Spin tip="Loading..." />
  if (error) return <Alert message={`${error}`} type="error" />
  if (isEditing && username !== currentUsername)
    return <div className={classes.title}>You can&apos;t edit this article</div>

  return (
    <form className={classes.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <p className={classes.title}>{isEditing ? 'Edit article' : 'Create new article'}</p>
      <Input
        {...title}
        onError={titleError}
        defaultValue={titleText}
        onKeyDown={({ key }) => {
          if (key === 'Enter') setFocus('description')
        }}
      >
        Title
      </Input>
      <Input
        {...description}
        onError={descriptionError}
        defaultValue={descriptionText}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            setFocus('text')
          }
        }}
      >
        Short description
      </Input>
      <label>
        Text
        <textarea placeholder="Text" className={textareaClass} {...text} defaultValue={bodyText} />
        {textError}
      </label>
      <label className={classes.tags}>
        Tags
        <TagList />
      </label>
      <SubmitButton disabled={!isValid}>Send</SubmitButton>
    </form>
  )
}

export default UserArticle
