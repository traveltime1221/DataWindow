<template>
    <v-container id="goto-container-example">
        <v-card>
            <v-tabs v-model="tab" align-tabs="center" bg-color="deep-purple-accent-4" stacked>
                <v-tab value="tab-1">
                    <v-icon icon="mdi-heart"></v-icon>
                    放假公布
                </v-tab>

                <v-tab value="tab-2">
                    <v-icon icon="mdi-water-alert"></v-icon>
                    水庫水情
                </v-tab>

                <v-tab value="tab-3">
                    <v-icon icon="mdi-landslide-outline"></v-icon>
                    地震新訊
                </v-tab>

            </v-tabs>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="tab-1">
                    <v-card>
                        <v-card-text>
                            <v-row>
                                <v-col class="mb-5" cols="12" lg="6">
                                    <div class="info mb-5">
                                        颱風名稱：{{useDataAnlysisStore.颱風天放假公布資訊.颱風名稱}}<br/>
                                        更新時間：{{useDataAnlysisStore.颱風天放假公布資訊.更新時間}}
                                    </div>
                                </v-col>
                                <v-col class="mb-5" cols="12" lg="6">
                                    <iframe src="https://wifi.cwa.gov.tw/v2/redirect.html?lang=zh-tw" width="100%" height="100%" title="風場預報"></iframe>
                                </v-col>
                            </v-row>
                            <v-divider class="mb-5"></v-divider>
                            <v-data-table :items="useDataAnlysisStore.颱風天放假公布資訊.資訊" :loading="useDataAnlysisStore.颱風天放假公布資訊.isLoading" hide-default-footer>
                                <template v-slot:loading>
                                    <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                                </template>
                                <!-- 無資料 -->
                                <template v-slot:no-data>
                                    <v-alert type="info">
                                    目前沒有颱風天放假公布資訊
                                    </v-alert>
                                </template>
                                <!-- 自定義每行的內容顯示 -->
                                <template v-slot:item="{ item }">
                                <tr>
                                    <td>{{ item.地區 }}</td>
                                    <td v-html="item.資訊"></td>
                                </tr>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="tab-2">
                    <v-card>
                        <v-card-text v-if="useDataAnlysisStore.water.isLoading">
                            資料載入中
                        </v-card-text>
                        <v-card-text v-else>
                            <div class="info mb-5">
                                <div>資料來源：<a href="http://www.wra.gov.tw/" target="_blank">經濟部水利署</a></div>
                                <div>即時水情資料係自記儀器自動產生，未經人工完整檢驗，僅提供參考。</div>
                                <div>根據<a href="http://fhy.wra.gov.tw/ReservoirPage_2011/StorageCapacity.aspx"
                                        target="_blank">水利署網頁</a>公布，各項水庫資料由各水庫管理單位在每日輸入，更新時間不一致。（部分水庫星期六、日之資料則在星期一統一輸入）
                                </div>
                                <div class="text-red">預測剩餘天數 = 即時有效蓄水量/昨日下降蓄水量。因降雨、用水量隨時間變化，預測結果僅提供參考。</div>
                            </div>

                            <v-btn class="mb-5 mr-1" variant="tonal" v-for="(a, index) in useDataAnlysisStore.water.水庫即時水情"
                                @click="handleClick(a.地區)">
                                {{ a.地區 }}
                            </v-btn>

                            <div v-for="(a, index) in useDataAnlysisStore.water.水庫即時水情" :key="index">
                                <v-divider class="mb-5"></v-divider>
                                <h2 class="mb-5" :class="a.地區" :data-id="index" :id="index == 1 ? 'example' : ''">{{
                                    a.地區 }}</h2>
                                <v-row class="mb-5">
                                    <v-col class="mb-5" cols="12" sm="6" md="4" lg="3" v-for="(b, bindex) in a.水庫"
                                        :key="bindex">
                                        <v-sheet>
                                            <h3 class="text-center mb-5">{{ b.名稱 }}({{ b.縣市 }})</h3>
                                            <div class="reservoir-wrap text-center mx-auto mb-5"
                                                :class="b.資訊.percentage > 60 ? 'normal' : (b.資訊.percentage > 30 ? 'warning' : 'danger')">
                                                <div class="reservoir">
                                                    <div class="wave" :style="`height:${b.資訊.percentage}%`"></div>
                                                    <div class="reservoir-percentage">
                                                        <b>{{ b.資訊.percentage }}%</b>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="reservoir-info text-white">
                                                <div>有效蓄水量：{{ b.資訊.volumn }} 萬立方公尺</div>
                                                <div>
                                                    昨日水量上升：
                                                    <span v-if="b.資訊.昨日水量變化 > 0" class="text-blue">
                                                        {{ b.資訊.昨日水量變化 }}%
                                                    </span>
                                                    <span v-else-if="b.資訊.昨日水量變化 <= 0" class="text-red">
                                                        {{ b.資訊.昨日水量變化 }}%
                                                    </span>
                                                    <span v-else="b.資訊.昨日水量變化<=0">
                                                        待更新
                                                    </span>
                                                </div>
                                                <div>
                                                    剩餘天數：
                                                    <span v-if="b.資訊.剩餘天數 > 0">
                                                        {{ b.資訊.剩餘天數 }}天
                                                    </span>
                                                    <span v-else>
                                                        待更新
                                                    </span>
                                                </div>
                                                <div>更新時間：{{ b.資訊.updateAt }}</div>
                                            </div>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="tab-3">
                    <v-card>
                        <v-card-text> 
                            page - 3
                            <div class="taiwan-map">
                                <div class="taiwan"></div>
                                <div id="tooltip" class="tooltip"
                                 style="position: absolute;
                                    background: #fff;
                                    border: 1px solid #ccc;
                                    padding: 5px;
                                    display: none;"
                                ></div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-tabs-window-item>

            </v-tabs-window>
        </v-card>
    </v-container>
</template>

<script lang="ts" setup>
import * as d3 from 'd3';
import * as topojson from "topojson-client";
import { useGoTo } from 'vuetify'

interface Topology {
    type: string;
    arcs: number[][];
    transform: {
        scale: [number, number];
        translate: [number, number];
    };
    objects: {
        COUNTY_MOI_1130718: {
            type: string;
            geometries: Geometry[];
        };
    };
}

interface Geometry {
    arcs: number[][][];
    type: string;
    properties: {
        COUNTYID: string;
        COUNTYCODE: string;
        COUNTYNAME: string;
        COUNTYENG: string;
    };
}

const tab = ref(null)
const goTo = useGoTo()
const useDataAnlysisStore = useDataAnalysis()

// ssr 渲染
// const { data, pending, error } = await useAsyncData('typhoonEarthquakeInfo', async () => {
//     // 撈取資料
//     const getWaterData = async () => await useDataAnlysisStore.台灣水庫即時水情()
//     getWaterData()
// }).catch((error) => {
//     console.log('SSR')
// })

const getWaterData = async () => await useDataAnlysisStore.台灣水庫即時水情()
getWaterData()
const 取得颱風天放假資訊 = async () => await useDataAnlysisStore.颱風天放假公布()
取得颱風天放假資訊()


//捲軸抵達位置
const handleClick = (name: string) => {
    const header = document.querySelector('.v-toolbar__content')?.clientHeight
    goTo('.' + name, {
        duration: 300,
        easing: 'linear',
        offset: -(Number(header) + 20),
    })
}

const drawer = () => {
    d3.select('.taiwan').html('')

    // 選取 dom 元素
    const svg = d3.select(".taiwan").append("svg");
    if (!svg) return

    // 響應式
    // tip: svg.node()有可能為 null, 因此使用非斷言
    const width = svg.node()!.clientWidth
    const height = svg.node()!.clientHeight
    console.log(width)
    svg.attr('viewBox', `0 0 ${width}${height}`)

    // 設置地圖投影
    // 解釋：使用墨卡托投影, 設定中心點(可參考 google map )、大小、居中
    const projection = d3.geoMercator().center([121, 24]).scale(2000).translate([width/2, height/2])
    // 生成 svg 路徑
    const path = d3.geoPath().projection(projection)

    // 取得格式資料
    d3.json('/taiwan-topup.json').then((data: unknown) => {
        console.log('應取得台灣相關json檔案資料')

        if (data && typeof data === 'object' && 'objects' in data) {
            const taiwan = data as any;
            if (taiwan.objects.COUNTY_MOI_1130718) {
                const counties = topojson.feature(taiwan as any, taiwan.objects.COUNTY_MOI_1130718 as any) as any;

                svg.selectAll('path').data(counties.features).enter().append('path').attr('d', (d: any) => path(d)).attr('fill', '#ccc').attr('stroke', '#333').on('mouseover', function(event, d: any) {
                    d3.select(this).attr("fill", "#ffcc00");
                    d3.select(".tooltip")
                    .style("display", "block")
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 28}px`)
                    .html(`<strong>${d.properties.COUNTYNAME}</strong>`);
                }).on('mouseout', function() {
                    d3.select(this).attr("fill", "#cccccc");
                })
            }
        }
    }).catch((e) => console.error('取得地圖異常'))
}

// 渲染 d3
onMounted(() => {
    //drawer()
    watch(tab, (newTab) => {
        if (newTab === 'tab-3') nextTick(() => drawer())
    })
})
</script>

<style lang="scss" scoped>
.custom-div-icon {
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.icon-mark {
    background-color: red;
    border: 1px solid white;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    position: relative;
    &:before {
        content: '';
        width: 14px;
        height: 14px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: 8px;
        left: 8px;
    }
}

.reservoir-wrap {
    width: 100%;
    max-width: 250px;
    height: 250px;
    border-radius: 50%;
    background: white;
    position: relative;
    overflow: hidden;

    .reservoir {
        border: 8px solid white;
        width: 100%;
        height: 100%;
        padding: 10px;
        overflow: hidden;
        border-radius: 50%;
        position: absolute;

        .wave {
            width: 300px;
            height: 150px;
            position: absolute;
            background: rgb(23, 139, 202);

            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            // top: 50%;
            // left: -35%;
            // margin-left: 0px;
            // margin-top: 0px;
            // border-radius: 35%;
            // background: blue;
            // animation: wave 15s infinite linear;
        }

        .reservoir-percentage {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 50px;
            transform: translate(-50%, -50%);
        }
    }

    &.normal {
        border: 10px solid rgb(23, 139, 202);

        .wave {
            background: rgb(23, 139, 202);
        }

        .reservoir-percentage {
            color: rgb(164, 219, 248);
        }
    }

    &.warning {
        border: 10px solid rgb(255, 160, 119);

        .wave {
            background: rgba(245, 151, 111, 0.48);
        }

        .reservoir-percentage {
            color: rgb(255, 160, 119);
        }
    }

    &.danger {
        border: 10px solid rgb(255, 119, 119);

        .wave {
            background: rgb(255, 119, 119, 0.5);
        }

        .reservoir-percentage {
            color: rgb(255, 68, 68);
        }
    }
}

.reservoir-info {
    max-width: 250px;
    margin: 0 auto;

    @media (max-width: 767px) {
        max-width: 100%;
    }
}

@keyframes wave {
    from {
        transform: rotate(0deg);
    }

    from {
        transform: rotate(360deg);
    }
}
</style>