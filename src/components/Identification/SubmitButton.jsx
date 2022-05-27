import classes from './Identification.module.scss'

const SubmitButton = ({ children, title = children, disabled = false }) => (
  <button type="submit" className={classes.submit} title={title} disabled={disabled}>
    {children}
  </button>
)
export default SubmitButton
