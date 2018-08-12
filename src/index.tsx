/**
 * app entry
 * @author yoyoyohamapi
 * @ignore created 2018-08-12
 */
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './store'
import App from '@containers/app'

import 'antd/dist/antd.css'

const store = createStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)