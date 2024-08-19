// 水庫即時水情
export interface ReservoirInfo {
    baseAvailable: string;
    id: string;
    updateAt: string;
    volumn: string;
    percentage: number;
    daliyOverflow: string;
    daliyInflow: string;
    daliyNetflow: string;
    name: string;
    昨日水量變化: number;
    剩餘天數: number;
}

export interface Reservoir {
    名稱: string;
    縣市: string;
    資訊: ReservoirInfo;
}

export interface Region {
    地區: string;
    水庫: Reservoir[];
}
  
export interface RealTimeReservoirData {
    水庫即時水情: Region[];
    isLoading: boolean;
}

// 颱風天放假公布資訊
interface TyphoonItem {
    地區: string;
    資訊: string;
}

export interface TyphoonDataItem {
    isLoading: boolean;
    颱風名稱: string;
    更新時間: string;
    資訊: TyphoonItem[];
}


// 台灣颱風地震水庫資訊資料
export interface TyphoonEarthquakeData {
    waterData: Region | any;
    typhoonData: TyphoonDataItem | any;
}

