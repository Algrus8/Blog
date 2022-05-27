import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { addTag, deleteTag, inputValueChange } from '../../redux/tagsSlice'

import classes from './UserArticles.module.scss'

const TagList = () => {
  const dispatch = useDispatch()
  const tags = useSelector((state) => state.tags.tags)
  const deleteButtonClass = classNames([classes.tagButton], [classes.delete])
  const addButtonClass = classNames([classes.tagButton], [classes.add])
  const input = useRef()
  useEffect(() => {
    if (input.current && tags.length !== 1) input.current.focus()
  }, [tags])

  return tags.map(({ id, value }, index) => {
    const last = tags.length === index + 1 ? true : false

    return (
      <div className={classes.tag} key={id}>
        <input
          ref={input}
          placeholder="Tag"
          className={classes.input}
          value={value}
          onChange={(event) => dispatch(inputValueChange({ id, value: event.target.value }))}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              dispatch(addTag())
            }
          }}
        />
        <button
          className={deleteButtonClass}
          onClick={(event) => {
            event.preventDefault()
            dispatch(deleteTag({ id }))
          }}
        >
          Delete
        </button>
        {last && (
          <button
            className={addButtonClass}
            onClick={(event) => {
              event.preventDefault()
              dispatch(addTag())
            }}
          >
            Add tag
          </button>
        )}
      </div>
    )
  })
}

export default TagList
