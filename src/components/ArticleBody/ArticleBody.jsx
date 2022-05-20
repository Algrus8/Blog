import React from 'react'
import { withRouter, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { Spin, Alert } from 'antd'

import Article from '../Article/'
import KataSercvice from '../../KataService'
import useRequest from '../../hooks/useRequest'

import classes from './ArticleBody.module.scss'

const ArticleBody = () => {
  const { slug } = useParams()
  const kata = new KataSercvice()

  const getFullArticle = () => {
    return kata.getArticle(slug)
  }
  const [data, loading, error] = useRequest(getFullArticle)

  if (loading) return <Spin tip="Loading..." />
  if (error) return <Alert message={`${error}`} type="error" />
  if (!data) return
  const parsedMarkdown = marked.parse(data.article.body)
  return (
    <Article info={data.article}>
      <div className={classes.aritcleBody} dangerouslySetInnerHTML={{ __html: parsedMarkdown }} />
    </Article>
  )
}

export default withRouter(ArticleBody)
