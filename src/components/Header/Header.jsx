import React from 'react'
import classes from './Header.module.scss'

const Header = () => {
  return (
    <header className={classes.header}>
      <button className={classes.main}>Realworld Blog</button>
      <button className={classes.signIn}>Sign In</button>
      <button className={classes.signUp}>Sign Up</button>
    </header>
  )
}

export default Header
