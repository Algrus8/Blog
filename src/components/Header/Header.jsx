import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import DefaultAvatar from '../../assets/img/DefaultAvatar.png'
import { unauthorize } from '../../redux/userSlice'

import classes from './Header.module.scss'

const Header = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn)
  return (
    <header className={classes.header}>
      <Home />
      {loggedIn && <UserBlock />}
      {!loggedIn && <Authentication />}
    </header>
  )
}

const Home = () => (
  <Link to="/articles/1" className={classes.main}>
    Realworld Blog
  </Link>
)

const Authentication = () => (
  <>
    <Link to="/sign-in" className={classes.signIn}>
      Sign In
    </Link>
    <Link to="/sign-up" className={classes.signUp}>
      Sign Up
    </Link>
  </>
)

const UserBlock = () => {
  const history = useHistory()
  const username = useSelector((state) => state.user.username)
  const userAvatar = useSelector((state) => state.user.image)
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(unauthorize())
    document.cookie = 'token=; path=/; max-age=0'
    history.replace('/sign-in')
  }
  return (
    <>
      <Link to="/new-article" className={classes.createArticle}>
        Create article
      </Link>
      <Link to="/profile">
        <span className={classes.username}>{username}</span>
        <img src={userAvatar ? userAvatar : DefaultAvatar} alt="Avatar" className={classes.avatar} />
      </Link>
      <button className={classes.logout} onClick={logOut}>
        Log Out
      </button>
    </>
  )
}

export default Header
