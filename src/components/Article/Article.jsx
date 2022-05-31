import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import { Alert, Popconfirm, Spin } from 'antd'

import noLikeImg from '../../assets/img/noLike.svg'
import likeImg from '../../assets/img/like.svg'
import KataSercvice from '../../KataService'

import classes from './Article.module.scss'

const Article = ({ info, children }) => {
  return (
    <article className={classes.aritcle}>
      <div className={classes.articleHeader}>
        <div className={classes.contentContainer}>
          <Title info={info} />
          <Content info={info} />
        </div>
        <UserInfo info={info} />
      </div>
      {children}
    </article>
  )
}

const Title = ({ info }) => {
  const { title, slug, favoritesCount, favorited } = info
  const [like, setLike] = useState(favorited)
  const [count, setCount] = useState(favoritesCount)
  const [error, setError] = useState(false)
  const [fetching, setFetching] = useState(false)
  const loggedIn = useSelector((state) => state.user.loggedIn)
  const kata = new KataSercvice()
  const likeStatus = () => {
    if (fetching || !loggedIn) return
    setFetching(true)

    if (like) {
      kata
        .unLikeArticle(slug)
        .then(({ article: { favorited, favoritesCount } }) => {
          setLike(favorited)
          setCount(favoritesCount)
        })
        .catch((error) => setError(error.message))
        .finally(() => setFetching(false))
    }
    if (!like)
      kata
        .likeArticle(slug)
        .then(({ article: { favorited, favoritesCount } }) => {
          setLike(favorited)
          setCount(favoritesCount)
        })
        .catch((error) => setError(error.message))
        .finally(() => setFetching(false))
  }

  return (
    <div className={classes.title}>
      <Link className={classes.titleText} to={`/article/${slug}`}>
        {title}
      </Link>
      {error ? (
        <Alert message={`${error}`} type="error" />
      ) : (
        <button onClick={likeStatus}>
          <img src={like ? likeImg : noLikeImg} alt="Like Status" className={classes.likeStatus} />
          {count}
        </button>
      )}
    </div>
  )
}

const Content = ({ info }) => {
  const { description, tagList } = info
  return (
    <div className={classes.content}>
      <div className={classes.tags}>
        <Tags tagList={tagList} />
      </div>
      <div className={classes.articleText}>
        <p>{description}</p>
      </div>
    </div>
  )
}

const UserInfo = ({ info }) => {
  const kata = new KataSercvice()
  const { createdAt, author, slug } = info
  const { image, username } = author
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const currentUsername = useSelector((state) => state.user.username)
  const match = useRouteMatch()
  const history = useHistory()
  const inBody = match.path === '/article/:slug'
  const deleteArticle = () => {
    setLoading(true)
    kata
      .deleteArticle(slug)
      .then(() => history.replace('/articles/1'))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }

  const articleButtons = (
    <div className={classes.buttonsContainer}>
      <Popconfirm
        title="Are you sure to delete this article?"
        placement="right"
        onConfirm={deleteArticle}
        okText="Yes"
        cancelText="No"
      >
        <button className={classes.deleteButton}>Delete</button>
      </Popconfirm>
      <Link to={`/article/${slug}/edit`} className={classes.editButton}>
        Edit
      </Link>
    </div>
  )

  if (loading) return <Spin tip="Loading..." />
  if (error) return <Alert message={`${error}`} type="error" />

  return (
    <div className={classes.userInfoContainer}>
      <div className={classes.articleInfo}>
        <div className={classes.userInfo}>
          <p>{username}</p>
          <p>{calculateDate(createdAt)}</p>
        </div>
        <img src={image} alt="Avatar image" className={classes.userIcon} />
      </div>
      {inBody && username === currentUsername && articleButtons}
    </div>
  )
}

const calculateDate = (date) => {
  return new Date(date).toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  })
}

const Tags = ({ tagList }) => {
  if (tagList) return tagList.map((tag, index) => <button key={index}>{tag}</button>)
}

Article.defaultProps = {
  info: {
    body: '',
    title: '',
    tagList: [],
    slug: '',
    createdAt: '',
    author: { image: '', username: '' },
  },
}

export default Article
