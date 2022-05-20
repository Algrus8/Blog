import classes from './Identification.module.scss'

const ErrorMessage = ({ message }) => {
  return (
    <div className={classes.error}>
      <p>{message}</p>
    </div>
  )
}
export default ErrorMessage
