/**
 * repo actions
 * @author 消珥
 * @ignore created 2018-08-12
 */
import { ThunkAction } from 'redux-thunk'
import { AxiosError } from 'axios'
import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  POLLING_START,
  POLLING_STOP,
  CHANGE_PAGINATION,
  CHANGE_QUERY,
  CHANGE_SORT
} from '@constants/actionTypes/repo'
import { fetch } from '@apis/repo'
import { IState, ISearchParam, ISearchResp } from '../types/repo'
import { EOrder, IAction, IPagination } from '../types/common'

type ThunkResult = ThunkAction<void, any, undefined, IAction>

let pollingTimer: number = null

function fetchUsers(): ThunkResult {
  return (dispatch, getState) => {
    const delay = pollingTimer === null ? 0 : 15 * 1000
    pollingTimer = setTimeout(() => {
      dispatch({
        type: FETCH_START,
        payload: {}
      })
      const { repo }: { repo: IState } = getState()
      const { pagination, sort, query } = repo
      const param: ISearchParam = {
        q: `${query ? query + '+' : ''}language:javascript`,
        page: pagination.page,
        per_page: pagination.pageSize,
        sort,
        order: EOrder.Desc
      }
      fetch(param)
      .then((resp: ISearchResp) => {
        const { total_count, items } = resp.data
        dispatch({
          type: FETCH_SUCCESS,
          payload: {
            total: total_count,
            list: items
          }
        })
        dispatch(fetchUsers())
      })
      .catch((error: AxiosError) => {
        dispatch({
          type: FETCH_ERROR,
          payload: {
            error: error.response.statusText
          }
        })
      })
  }, delay)
}}

export function polling(): ThunkResult {
  return (dispatch) => {
    dispatch(stopPolling())
    dispatch({
      type: POLLING_START,
      payload: {}
    })
    dispatch(fetchUsers())
  }
}

export function stopPolling(): IAction {
  clearTimeout(pollingTimer)
  pollingTimer = null
  return {
    type: POLLING_STOP,
    payload: {}
  }
}

export function changePagination(pagination: IPagination): ThunkResult {
  return (dispatch) => {
    dispatch({
      type: CHANGE_PAGINATION,
      payload: {
        pagination
      }
    })
    dispatch(polling())
  }
}

export function changeQuery(query: string): ThunkResult {
  return (dispatch) => {
    dispatch({
      type: CHANGE_QUERY,
      payload: {
        query
      }
    })
    dispatch(polling())
  }
}

export function changeSort(sort: string): ThunkResult {
  return (dispatch) => {
    dispatch({
      type: CHANGE_SORT,
      payload: {
        sort
      }
    })
    dispatch(polling())
  }
}
