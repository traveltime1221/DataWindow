<template>
    <div>
        <div class="position-relative search-stock">
            <!--color="success"
            disabled
            loading-->
            <!---http://localhost:3001/stocks/quote?symbol=AAPL--->
            <v-text-field label="搜尋台股美股名稱" v-model="code" @keyup.enter="getStock(code, '1721832641732')"></v-text-field>
            <v-card class="search-list mx-auto">
                <v-list :items="items" item-title="name" item-value="id"></v-list>
            </v-card>
        </div>
        <v-divider class="mb-5"></v-divider>

        <!-- 結果 -->
        <div class="position-relative">
            <v-card class="position-relative">
                <v-card-item>
                    <v-card-title>
                        復華台灣科技優息
                        00929
                        ETF
                    </v-card-title>
                </v-card-item>

                <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <v-sheet class="ma-2 pa-2">
                                <div class="text-red">
                                    19.82 漲0.14 (0.71%)
                                </div>
                                <small>收盤 | 2024/07/23 13:30 更新</small>
                                <!-- <div class="text-green">
                                    19.82 跌0.14 (0.71%)
                                </div> -->
                            </v-sheet>
                        </v-col>
                        <v-col cols="4" md="2">
                            <v-sheet class="ma-2 pa-2 text-center">
                                <div class="text-white">
                                    155,537
                                </div>
                                <small>成交量</small>
                            </v-sheet>
                        </v-col>
                        <v-col cols="4" md="2">
                            <v-sheet class="ma-2 pa-2 text-center">
                                <div class="text-white">
                                    -
                                </div>
                                <small>本益比</small>
                            </v-sheet>
                        </v-col>
                        <v-col cols="4" md="2">
                            <v-sheet class="ma-2 pa-2 text-center">
                                <div class="text-red">
                                    連4跌→漲 (0.71%)
                                </div>
                                <small>連漲連跌</small>
                            </v-sheet>
                        </v-col>
                    </v-row>

                <v-card-text>

                </v-card-text>
            </v-card>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStock } from '@/stores/stock'
const stockStore = useStock()
const code = ref('')

const getStock = async(code: string, timer: string) => {
    await stockStore.getStock(code, timer)
    console.log(stockStore.data)
}

const items = [
    {
        id: 1,
        no: '00929',
        name: '股票Ａ'
    },
    {
        id: 2,
        no: '00878',
        name: '股票B'
    }
]
</script>

<style lang="scss" scoped>
.search-list {
    position: absolute;
    width: 100%;
    top: 60px;
    z-index: 1;
    display: none;
}
</style>