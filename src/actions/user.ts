import {
  CHANGE_PAGINATION,
  CHANGE_SORT,
  CHANGE_QUERY,
  POLLING_STOP,
  LISTEN_POLLING_START,
  SEARCH
} from '@constants/actionTypes/user'
import { IPagination, IAction } from '../types/common'

export function polling(): IAction {
  return {
    type: LISTEN_POLLING_START,
    payload: {}
  }
}

export function stopPolling(): IAction {
  return {
    type: POLLING_STOP,
    payload: {}
  }
}

export function search(): IAction {
  return {
    type: SEARCH,
    payload: {}
  }
}

export function changePagination(pagination: IPagination): IAction {
  return {
    type: CHANGE_PAGINATION,
    payload: {
      pagination
    }
  }
}

export function changeQuery(query: string): IAction {
  return {
    type: CHANGE_QUERY,
    payload: {
      query
    }
  }
}

export function changeSort(sort: string): IAction {
  return {
    type: CHANGE_SORT,
    payload: {
      sort
    }
  }
}
