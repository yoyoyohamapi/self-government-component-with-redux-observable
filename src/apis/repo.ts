import axios from 'axios'
import { ISearchParam } from '../types/repo'

export function fetch(params: ISearchParam) {
  return axios.get('https://api.github.com/search/repositories', {params})
}
