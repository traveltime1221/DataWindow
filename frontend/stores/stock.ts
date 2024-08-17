import { defineStore } from 'pinia'
import api from '../server/app-api'

// twse
// https://openapi.twse.com.tw/#/


// 分析 twse 股票資訊
// https://hackmd.io/@aaronlife/python-ex-stock-by-api?utm_source=preview-mode&utm_medium=rec



export const useStock = defineStore('stock', {
  state: () => ({
    data: {}
  }),
  actions: {
    async getStock(code: string, timer: string) {
      await api.stock.查詢個股資訊(code, timer).then((res:any) => {
        console.log(res)
        this.data = res.data
        console.log(this.data)
      }).catch((e) => {
        console.log(e)
      })
    },
  },
})
