import { Action } from 'redux'

/**
 * common types
 * @author
 * @ignore created 2018-08-12
 */

export interface IAction extends Action {
  payload: any
}

export interface IPagination {
  total?: number,
  page?: number,
  pageSize?: number
}

export interface ISearchParam {
  q: string,
  page: number,
  per_page: number,
  sort: string,
  order: EOrder
}

export interface ISearchResp<T> {
  data: {
    total_count: number,
    items: T[]
  }
}

export enum EOrder {
  Desc = 'desc',
  Asc = 'asc'
}
