<template>
    <v-card-text>
        <v-skeleton-loader type="card" v-if="useDataAnlysisStore.全球地震.isLoading"></v-skeleton-loader>
        <div v-else>
            <div id="map" style="height: 50vh"></div>
            <br />
            僅展示地震規模大於6之全球地震初步訊息 <br /><br />
        </div>

        <v-divider class="mb-5"></v-divider>
        <v-data-table :items="useDataAnlysisStore.全球地震.data" :loading="useDataAnlysisStore.全球地震.isLoading" hide-default-footer>
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <!-- 無資料 -->
            <template v-slot:no-data>
                <v-alert type="info">
                    目前沒有地震相關資訊
                </v-alert>
            </template>
            <!-- 自定義每行的內容顯示 -->
            <template v-slot:item="{ item }">
                <tr>
                    <td>{{ item.地震時間 }}</td>
                    <td>{{ item.經度 }}</td>
                    <td>{{ item.緯度 }}</td>
                    <td>{{ item["深度(公里)"] }}</td>
                    <td>{{ item.緯度 }}</td>
                    <td @click="clickHandlerPos(item)">{{ item.地震位置 }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-card-text>
</template>

<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
//import { getConfig } from '../../utils/config.ts';

//const { api_thunderforest_key } = getConfig()
const useDataAnlysisStore = useDataAnalysis()

let markers = ref<{[key: string]: L.Marker}>({})
let getPosition = ref<(location: any) => void | null | undefined>();

const 全球地震資訊 = async () => {
    await useDataAnlysisStore.getEarthQuackWorldInfo();
    import('leaflet').then(L => {

        // 初始化地圖
        const map = L.map("map", {renderer: L.canvas()});

        // 添加 Thunderforest 地圖圖層
        L.tileLayer(`https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=77e58df3130b4566b8f762f4cc16022b`, {
            attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
            minZoom: 2,
            maxZoom: 18
        }).addTo(map);

        // 收集所有標記的位置, 並初始化對象為空值
        const bounds = L.latLngBounds([]);

        useDataAnlysisStore.全球地震.data.forEach((item:any) => {
            const longitude = parseFloat(item.經度.replace('N', ''))
            const latitude = parseFloat(item.緯度.replace('E', ''))
            const popup = `
                <div>
                    <strong>地震時間:</strong> ${item.地震時間}<br>
                    <strong>地震位置:</strong> ${item.地震位置}<br>
                    <strong>深度(公里):</strong> ${item['深度(公里)']}<br>
                    <strong>經度:</strong> ${item.經度}<br>
                    <strong>緯度:</strong> ${item.緯度}<br>
                    <strong>規模:</strong> ${item.規模}<br>
                </div>
            `;

            // 添加標記到地圖
            const customIcon = L.divIcon({
                className: 'custom-div-icon',
                html: `<div class='icon-mark'></div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15], // 設定錨點
            })

            const marker = L.marker([latitude, longitude], {
                //icon: customIcon
            }).addTo(map)
                .bindTooltip(popup, {
                    permanent: false,
                    direction: 'top'
                })
                .bindPopup(popup);

            // 將標記的位置加入邊界計算
            bounds.extend([latitude, longitude]);

            // 儲存標記
            markers.value[item.地震位置] = marker
        });

        // 根據邊界調整地圖視圖
        map.fitBounds(bounds);

        // 處理點選連結標示網址資訊
        getPosition.value = (location: any) => {
            const marker = markers.value[location.地震位置];
            if (marker) {
                marker.openPopup();
                map.panTo(marker.getLatLng());
            } else {
                console.error('Marker not found:', location.地震位置);
            }
        }

    }).catch(err => console.error('Leaflet import failed:', err));
}
全球地震資訊()

const clickHandlerPos = (item: any) => {
    console.log(item)
    if (getPosition.value) {
        getPosition.value(item);
    }
};
</script>