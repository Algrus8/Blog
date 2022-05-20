import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from '../Header'
import ArticleListPage from '../../pages/ArticleListPage'
import NotFoundPage from '../../pages/NotFoundPage'
import ArticlePage from '../../pages/ArticlePage'
import SignUpPage from '../../pages/SignUpPage'
import SignIn from '../Identification/SignIn'
const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/articles/:page" exact component={ArticleListPage} />
        <Route path="/article/:slug" component={ArticlePage} />
        <Route path="/sign-up/" component={SignUpPage} />
        <Route path="/sign-in/" component={SignIn} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default App
