import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import Header from '../Header'
import SignIn from '../Identification/SignIn'
import EditProfile from '../Identification/EditProfile'
import UserArticles from '../userArticles'
import ArticleList from '../ArticleList'
import ArticleBody from '../ArticleBody'
import SignUp from '../Identification/SignUp'

import classes from './App.module.scss'

const App = () => {
  return (
    <>
      <Online>
        <Router>
          <Header />
          <Switch>
            <Route path="/articles/:page" exact component={ArticleList} />
            <Route path="/article/:slug" exact component={ArticleBody} />
            <Route path="/sign-up/" component={SignUp} />
            <Route path="/sign-in/" component={SignIn} />
            <Route path="/profile" component={EditProfile} />
            <Route path="/new-article" component={UserArticles} />
            <Route path="/article/:slug/edit" exact component={UserArticles} />
            <Route component={() => <h2 className={classes.title}>Nothing found</h2>} />
          </Switch>
        </Router>
      </Online>
      <Offline>
        <Alert message={'Please check your internet connection'} type="error" />
      </Offline>
    </>
  )
}

export default App
