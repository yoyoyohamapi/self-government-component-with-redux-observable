/**
 * root reducer
 * @author yoyoyohamapi
 * @ignore created 2018-08-12
 */
import { combineReducers } from 'redux'
import user from './user'
import repo from './repo'

export default combineReducers({
  user,
  repo
})
