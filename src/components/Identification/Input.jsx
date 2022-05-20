import React from 'react'
import classNames from 'classnames'

import classes from './Identification.module.scss'

const Input = React.forwardRef(
  ({ type = 'text', children, placeholder = children, onError, serverError, ...restProps }, forwardedRef) => {
    const inputClass = classNames([classes.input], { [classes.errorInput]: onError || serverError })
    return (
      <label className={classes.inputWrapper}>
        {children}
        <input type={type} placeholder={placeholder} className={inputClass} ref={forwardedRef} {...restProps} />
        {onError}
        {serverError}
      </label>
    )
  }
)

export default Input
