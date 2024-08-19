import axios from 'axios'
import { getConfig } from '../utils/config';

const defAPIHosts = 'http://localhost:3001'


// 預設
function postJson (path: string, params: any) {
  const promise = axios({
    method: 'post',
    url: defAPIHosts + path,
    headers: { 'Content-Type': 'application/json' },
    data: params,
    withCredentials: true
  })
  return promise
}

function get (path: any) {
  const { api_dev } = getConfig()
    const promise = axios({
      method: 'get',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      baseURL: `${api_dev}${path}`
    })
    return promise
}

// 用數據看台灣
function get_twse (path: string) {
  const { api_twse } = getConfig()
  const promise = axios({
    method: 'get',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    baseURL: `${api_twse}${path}`
  })
  return promise
}


export default {
  全球地震資訊: () => get(`/earthquake-world-info/data`),
  颱風天放假公布: () => get(`/typhoon-day-info/data`),
  台灣水庫即時水情: () => get_twse(`/waters/latest`),
  stock: {
    查詢個股資訊: (code: string, timer: string) => get(`/rwd/zh/api/codeQuery?query=${code}&_=${timer}`)
    //getStock: (data: string) => get(`/stocks/quote?symbol=${data}`),
  },
  Omp: {
    getStores: (data: any) => postJson('/fackData/stores.json', data)
  },
  Login: {
    // generateQppUrl: data => postJson('/api/Token/GenerateQppUrl', data),
    // checkQppLogin: data => postJson('/api/Token/CheckQppLogin', data),
    // getTokenStatus: data => postJson('/api/Token/TokenStatus', data),
    // getCheckQppUid: data => postJson('/api/Token/checkQppUid', data)
  },
  User: {
    // getUserInfo: data => qppPost(`/Qpp_CloudStorageClient.php?v=${new Date().getTime()}`, data),
    // getUserImageLatestTime: data => qppPost(`/Qpp_CloudStorageClient.php?v=${new Date().getTime()}`, data),
    // getUserImage: data => qppGcpGet(data),
    // getUserMbKeyByUid: data => postJson('/api/Token/GetMbkeyByUid', data),
    // getUser: data => postJson('/api/User/UserGet', data)
  }
}
