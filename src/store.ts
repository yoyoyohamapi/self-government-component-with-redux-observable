import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import createHistory from 'history/createHashHistory'
import rootReducer from './reducers'
import rootEpic from './epics'

import 'antd/dist/antd.css'

const history = createHistory()

const epicMiddleware = createEpicMiddleware()

const middleware = applyMiddleware(
  epicMiddleware, thunkMiddleware, routerMiddleware(history)
)

export default function() {
  const store = createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(middleware)
  )

  epicMiddleware.run(rootEpic)
  return store
}
