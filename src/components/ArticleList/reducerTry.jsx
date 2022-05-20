import React, { useState, useEffect, useReducer } from 'react'
import { Pagination } from 'antd'
import { withRouter, useHistory, useParams } from 'react-router-dom'

import KataSercvice from '../../KataService'
import Article from '../Article'

import classes from './ArticleList.module.scss'

const ArticleList = () => {
  const { page } = useParams()
  const history = useHistory()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { articles, articlesCount } = state

  const onArticlesCount = (count) => dispatch({ type: 'ARTICLES_COUNT', payload: count })
  const onArticles = (articles) => dispatch({ type: 'ARTICLES', payload: articles })
  const onLoad = () => dispatch({ type: 'LOAD' })
  const onError = (message) => dispatch({ type: 'ERROR', payload: articles })

  const kata = new KataSercvice()
  useEffect(() => {
    const createArticles = async () => {
      try {
        const { articles, articlesCount } = await kata.getGlobalArticles(5 * page - 5)
        const newArticles = articles.map((article) => <Article info={article} key={article.slug} />)
        onArticles(newArticles)
        onArticlesCount(articlesCount)
      } catch (error) {
        onError(error.message)
      }
    }
    createArticles()
  }, [page])

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

const reducer = (state, action) => {
  switch (action.type) {
    case 'ARTICLES_COUNT':
      return { ...state, articlesCount: action.payload }
    case 'ARTICLES':
      return { ...state, articles: action.payload }
    case 'LOAD':
  }
}

const initialState = { articles: [], articlesCount: 0, loading: true, error: false }

export default withRouter(ArticleList)
