import axios from 'axios'
import { ISearchParam } from '../types/user'

export function fetch(params: ISearchParam) {
  return axios.get('https://api.github.com/search/users', {params})
}
