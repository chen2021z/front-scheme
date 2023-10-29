import axios from "axios";

const service = axios.create({
  baseURL: 'https://api.imooc-front.lgdsunday.club/api',
  timeout: 5000
})

export default service