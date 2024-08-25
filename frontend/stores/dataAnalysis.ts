import { defineStore } from 'pinia'
import api from '../server/app-api.ts'
import 台灣水庫分類 from '../content/台灣水庫列表.ts'

// twse
// https://openapi.twse.com.tw/#/

// 中央氣象署
// https://opendata.cwa.gov.tw/dist/opendata-swagger.html

export const useDataAnalysis = defineStore('dataAnalysis', {
  state: () => ({
    water: {
      isLoading: false,
      水庫即時水情: [
        {
          地區: '',
          水庫: [
            {
              名稱: '',
              縣市: '',
              資訊: {
                "baseAvailable": '',
                "id": '',
                "updateAt": '',
                "volumn": '',
                "percentage": 0,
                "daliyOverflow": '',
                "daliyInflow": '',
                "daliyNetflow": '',
                "name": '',
                昨日水量變化: 0,
                剩餘天數: 0
              },
            }
          ]
        }
      ]
    },
    颱風天放假公布資訊: {
      isLoading: false,
      颱風名稱: '',
      更新時間: '',
      資訊: [
        {
          地區: '',
          資訊: '',
        }
      ]
    },
    全球地震: {
      isLoading: false,
      data: [
        {
          地震時間: '',
          地震位置: '',
          "深度(公里)": '',
          經度: '',
          緯度: '',
          規模: '',
        }
      ]
    },
    台灣地震: {
      isLoading: false,
      data: [
        {
          "id": '',
          "地震時間": '',
          "經度":  '',
          "緯度":  '',
          "深度(公里)": '',
          "規模": '',
          "地震位置": '',
          "圖片":'',
        }
      ]
    }
  }),
  actions: {
    async getEarthQuackWorldInfo() {
      this.全球地震.isLoading = true
      await api.全球地震資訊().then((res: any) => {
        if (res.data.status == '1') {
          this.全球地震.data = res.data.content
        } else {
          console.log('取得全球地震資訊異常')
        }
        this.全球地震.isLoading = false

      }).catch((e) => {
        console.error('撈取 全球地震資訊異常')
      })
    },
    async 台灣地震資訊() {
      this.台灣地震.isLoading = true
      await api.台灣地震資訊().then((res): any => {
        if (res.data.status == '1') {
          this.台灣地震.data = res.data.content
        } else {
          console.log('爬取異常')
        }
        this.台灣地震.isLoading = false
      }).catch((e) => {
        console.error('撈取 台灣地震資訊 api 異常', e)
        this.台灣地震.isLoading = false
      })
    },
    async 台灣水庫即時水情() {
      this.water.isLoading = true
      await api.台灣水庫即時水情().then((res: any) => {
        const water = 台灣水庫分類.map((r: { 地區: string, 水庫: { 名稱: string, 縣市: string }[] }) => ({
          地區: r.地區,
          水庫: r.水庫.map((w: { 名稱: string, 縣市: string }) => {
            const info = res.data[0][w.名稱] || {}
            // 超過小數點第三位做調整
            const 取得小數點 = info.percentage.toString().split('.')[1]
            if (取得小數點 && 取得小數點.length > 2) {
              info.percentage = info.percentage.toFixed(1)
            }

            // 計算上升水量
            // 昨日水量＝當前水量(volumn)-淨流量
            const 昨日水量 = parseFloat(info.volumn.replace(/,/g, '')) - parseFloat(info.daliyNetflow)
            const 昨日水量變化百分比 = ((parseFloat(info.volumn.replace(/,/g, '')) - 昨日水量) / 昨日水量) * 100
            info.昨日水量變化 = 昨日水量變化百分比.toFixed(2)

            // 計算剩餘天數, 假設每日水量不變
            const currentVolumn = parseFloat(info.volumn.replace(/,/g, ''))
            info.剩餘天數 = Math.ceil(currentVolumn / Math.abs(info.daliyNetflow))
            return {
              ...w,
              資訊: info
            }
          })
        }))
        this.water.水庫即時水情 = water
        this.water.isLoading = false
      }).catch((e) => {
        console.log(e)
        console.log('台灣水庫即時水情資訊撈取異常')
      })
    },
    async 颱風天放假公布() {
      this.颱風天放假公布資訊.isLoading = true
      await api.颱風天放假公布().then((res: any) => {
        if (res.data.status == '1') {
          this.颱風天放假公布資訊 = res.data.content
        } else {
          console.log('颱風天放假公布撈取異常')
        }
        this.颱風天放假公布資訊.isLoading = false
      }).catch((e) => {
        console.log(e)
        console.log('颱風天放假公布資訊撈取異常')
      })
    }
  },
})
