import { ISearchParam, ISearchResp, IPagination } from './common'

export interface IRepo {
  id: number,
  name: string,
  full_name: string,
  html_url: string,
  url: string,
  homepage: string,
  updated_at: string
}

export interface IState {
  list: IRepo[],
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

export {
  ISearchParam
}

export interface ISearchResp extends ISearchResp<IRepo> {

}
