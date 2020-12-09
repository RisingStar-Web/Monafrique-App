import axios from 'axios'
import authHeader from './auth-header'
import { GET_PRODUCTS_API_URL } from '../constants/api'
export function getProducts() {
  return axios
    .get(GET_PRODUCTS_API_URL, { headers: authHeader() })
    .then((res) => res.data)
}
