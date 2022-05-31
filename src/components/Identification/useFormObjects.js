export const usernameOptions = {
  required: 'Field is required',
  minLength: {
    value: 3,
    message: 'Your username needs to be at least 3 characters.',
  },
  maxLength: {
    value: 20,
    message: 'Your username needs to be no more than 40 characters',
  },
}

export const emailOptions = {
  required: 'Field is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'invalid email address',
  },
}

export const passwordOptions = {
  required: 'Field is required',
  minLength: {
    value: 6,
    message: 'Your password needs to be at least 6 characters.',
  },
  maxLength: {
    value: 40,
    message: 'Your password needs to be no more than 40 characters',
  },
}

export const urlOptions = {
  pattern: {
    //  eslint-disable-next-line
    value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
    message: 'invalid url address',
  },
}

export const agreementOptions = {
  required: 'You need to accept the agreement',
}

export const editEmailOptions = {
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'invalid email address',
  },
}

export const editPasswordOptions = {
  minLength: {
    value: 6,
    message: 'Your password needs to be at least 6 characters.',
  },
  maxLength: {
    value: 40,
    message: 'Your password needs to be no more than 40 characters',
  },
}

// export const editUsernameOptions = {
//   minLength: {
//     value: 3,
//     message: 'Your username needs to be at least 3 characters.',
//   },
//   maxLength: {
//     value: 20,
//     message: 'Your username needs to be no more than 40 characters',
//   },
// }
