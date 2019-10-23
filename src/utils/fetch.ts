import axios from 'axios'
const fetch = axios.create({
  baseURL: 'http://localhost:8080'
})
export { fetch }
