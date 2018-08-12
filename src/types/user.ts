import { ISearchParam, ISearchResp, IPagination } from './common'

export interface IUser {
  login: string,
  id: number,
  avatar_url: string,
  url: string,
  html_url: string
}

export interface IState {
  list: IUser[],
  pagination: IPagination,
  sort: string,
  isSilentLoading: boolean,
  query: string,
  loading: {
    fetch: boolean
  },
  error: {
    fetch: any
  }
}

export interface ISearchParam extends ISearchParam {
  language: string
}

export interface ISearchResp extends ISearchResp<IUser> {}
