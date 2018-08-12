/**
 * user reducer
 * @author yoyoyohamapi
 * @ignore created 2018-08-12
 */
import { IState } from '../types/user'
import { IAction } from '../types/common'
import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  CHANGE_PAGINATION,
  CHANGE_QUERY,
  CHANGE_SORT,
  POLLING_START,
  SEARCH
} from '@constants/actionTypes/user'

const initialState: IState = {
  list: [],
  pagination: {
    total: 0,
    page: 1,
    pageSize: 10
  },
  sort: 'followers',
  isSilentLoading: false,
  query: '',
  loading: {
    fetch: false
  },
  error: {
    fetch: null
  }
}

export default function reducer(state = initialState, action: IAction): IState {
  const { type, payload } = action
  switch (type) {
    case SEARCH: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: 1
        }
      }
    }
    case POLLING_START: {
      return {
        ...state,
        isSilentLoading: false
      }
    }
    case FETCH_START: {
      return {
        ...state,
        loading: {
          fetch: true
        },
        error: {
          fetch: null
        }
      }
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        list: payload.list,
        isSilentLoading: true,
        pagination: {
          ...state.pagination,
          total: payload.total
        },
        loading: {
          fetch: false
        },
        error: {
          fetch: null
        }
      }
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: {
          fetch: false
        },
        error: {
          fetch: payload.error
        }
      }
    }
    case CHANGE_PAGINATION: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...payload.pagination
        }
      }
    }
    case CHANGE_QUERY: {
      return {
        ...state,
        query: payload.query,
        pagination: {
          ...state.pagination,
          page: 1
        }
      }
    }
    case CHANGE_SORT: {
      return {
        ...state,
        sort: payload.sort,
        pagination: {
          ...state.pagination,
          page: 1
        }
      }
    }
    default: {
      return state
    }
  }
}
