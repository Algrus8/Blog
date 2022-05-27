import React from 'react'
import classNames from 'classnames'

import classes from './Identification.module.scss'

const Input = React.forwardRef(
  (
    { type = 'text', children, placeholder = children, onError, defaultValue = '', onKeyDown = () => {}, ...restProps },
    forwardedRef
  ) => {
    const inputClass = classNames([classes.input], { [classes.errorInput]: onError })
    return (
      <label className={classes.inputWrapper}>
        {children}
        <input
          type={type}
          placeholder={placeholder}
          className={inputClass}
          ref={forwardedRef}
          {...restProps}
          defaultValue={defaultValue}
          onKeyDown={onKeyDown}
        />
        {onError}
      </label>
    )
  }
)
Input.displayName = 'Input'

export default Input
