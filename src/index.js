import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.scss'
import App from './components/App'
import { store } from './redux'
import { authorize } from './redux/userSlice'
import KataSercvice from './KataService'
;(async () => {
  const kata = new KataSercvice()
  const token = document.cookie.replace('token=', '')
  const root = ReactDOM.createRoot(document.getElementById('root'))
  if (token) {
    const { user } = await kata.getUser(token)
    store.dispatch(authorize(user))
  }

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})()
