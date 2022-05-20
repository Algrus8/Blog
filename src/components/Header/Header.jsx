import { Link } from 'react-router-dom'
import React from 'react'

import classes from './Header.module.scss'

const Header = () => {
  const token = localStorage.getItem('token')
  if (token) {
    console.log('123')
  }

  return (
    <header className={classes.header}>
      <Link to="/articles/1" className={classes.main}>
        Realworld Blog
      </Link>
      <Link to="/sign-in" className={classes.signIn}>
        Sign In
      </Link>
      <Link to="/sign-up" className={classes.signUp}>
        Sign Up
      </Link>
    </header>
  )
}

export default Header
