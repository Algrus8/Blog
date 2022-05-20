import React, { useState, useEffect } from 'react'
import { Pagination, Spin, Alert } from 'antd'
import { withRouter, useHistory, useParams } from 'react-router-dom'

import KataSercvice from '../../KataService'
import Article from '../Article/'

import classes from './ArticleList.module.scss'

const ArticleList = () => {
  const { page } = useParams()
  const history = useHistory()

  const [articles, setArticles] = useState([])
  const [articlesCount, setArticlesCount] = useState(0)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const kata = new KataSercvice()
  useEffect(() => {
    const createArticles = async () => {
      try {
        const { articles, articlesCount } = await kata.getGlobalArticles(5 * page - 5)
        const newArticles = articles.map((article) => <Article info={article} key={article.slug} />)
        setArticles(newArticles)
        setArticlesCount(articlesCount)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    createArticles()
  }, [page])

  if (loading) {
    return <Spin tip="Loading..." />
  }

  if (error) {
    return <Alert message={error} type="error" />
  }

  return (
    <div>
      {articles}
      <Pagination
        className={classes.pagination}
        current={parseInt(page)}
        total={articlesCount}
        onChange={(page) => history.replace(`${page}`)}
        showSizeChanger={false}
        pageSize="5"
      />
    </div>
  )
}

export default withRouter(ArticleList)
