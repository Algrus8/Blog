import React from 'react'
import classes from './Article.module.scss'
import noLike from '../../assets/img/noLike.svg'
import { Link } from 'react-router-dom'

const Article = ({ info }) => {
  return (
    <article className={classes.aritcle}>
      <Content info={info} />
      <UserInfo info={info} />
    </article>
  )
}

const Content = ({ info }) => {
  const { body, title, tagList, slug } = info
  return (
    <div className={classes.content}>
      <div className={classes.title}>
        <Link className={classes.titleText} to={slug}>
          {title}
        </Link>
        <button>
          <img src={noLike} alt="Like Status" className={classes.likeStatus} />
        </button>
        <span>12</span>
      </div>
      <div className={classes.tags}>
        <Tags tagList={tagList} />
      </div>
      <div className={classes.articleText}>
        <p>{body}</p>
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
      <img src={image} alt="User icon" className={classes.userIcon} />
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
  if (tagList) return tagList.map((tag) => <button>{tag}</button>)
}

export default Article
