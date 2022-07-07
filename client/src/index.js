// react
import React from 'react'
import ReactDOM from 'react-dom'

// hooks
import { Provider } from 'react-redux'
import { createStore } from "redux"

// components
import App from './App'

// context
import { AuthProvider } from './context/AuthProvider'

// reducer of reducers (ROOT)
import { rootReducer } from './reducers'

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);