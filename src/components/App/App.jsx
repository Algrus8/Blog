import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import classes from './App.module.scss'
import Header from '../Header'
import ArticleListPage from '../../pages/ArticleListPage'
import NotFoundPage from '../../pages/NotFoundPage'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/list" component={ArticleListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default App
