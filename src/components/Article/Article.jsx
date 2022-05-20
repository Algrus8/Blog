import React from 'react'
import { Link } from 'react-router-dom'

import noLike from '../../assets/img/noLike.svg'

import classes from './Article.module.scss'

const Article = ({ info, children }) => {
  return (
    <article className={classes.aritcle}>
      <div className={classes.articleHeader}>
        <div>
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
  const { title, slug } = info
  return (
    <div className={classes.title}>
      <Link className={classes.titleText} to={`/article/${slug}`}>
        {title}
      </Link>
      <button>
        <img src={noLike} alt="Like Status" className={classes.likeStatus} />
      </button>
      <span>12</span>
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
  const { createdAt, author } = info
  const { image, username } = author
  return (
    <div className={classes.articleInfo}>
      <div className={classes.userInfo}>
        <p>{username}</p>
        <p>{calculateDate(createdAt)}</p>
      </div>
      <img src={image} alt="Avatar image" className={classes.userIcon} />
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
