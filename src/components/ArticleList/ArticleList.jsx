import React from 'react'
import classes from './ArticleList.module.scss'
import KataSercvice from '../../KataService'
import Article from '../Article'
import { useState, useEffect } from 'react'
import { Pagination } from 'antd'

const ArticleList = () => {
  const [articles, setArticles] = useState([])
  const [articlesCount, setArticlesCount] = useState(0)
  const [page, setPage] = useState(1)
  const kata = new KataSercvice()

  useEffect(() => {
    const createArticles = async () => {
      const { articles, articlesCount } = await kata.getGlobalArticles(5 * page - 5)
      const newArticles = articles.map((article) => <Article info={article} key={article.slug} />)
      setArticles(newArticles)
      setArticlesCount(articlesCount)
    }
    createArticles()
  }, [page])

  return (
    <div>
      {articles}
      <Pagination
        className={classes.pagination}
        current={page}
        total={articlesCount}
        onChange={(page) => setPage(page)}
        showSizeChanger={false}
        pageSize="5"
      />
    </div>
  )
}

export default ArticleList
