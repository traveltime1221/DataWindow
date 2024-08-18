<template>
  <v-navigation-drawer v-model="drawer" :rail="props.rail" permanent>
    <v-list density="compact" nav>
      <template v-for="(item, index) in sidebarData" :key="index">
        <!-- 單個項目 -->
        <nuxt-link v-if="!item.isGroup" :to="item.link">
          <v-list-item :prepend-icon="item.icon" :title="item.name"></v-list-item>
        </nuxt-link>

        <!-- 分組項目 -->
        <v-list-group v-if="item.isGroup" :value="item.name">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.name"></v-list-item>
          </template>
          <!--第三層-->
          <template v-for="(subItem, subIndex) in item.sublist" :key="subIndex">
            <nuxt-link v-if="!subItem.isGroup" :to="subItem.link">
              <v-list-item :prepend-icon="subItem.icon" :title="subItem.name"></v-list-item>
            </nuxt-link>
            <NestedListGroup v-else :item="subItem"/>
          </template>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const props = defineProps<{ rail: boolean }>();
const drawer = ref(true)

// sidebar
const sidebarData = [
  { 
    isGroup: false,
    name: '首頁',
    icon: 'mdi-home-city',
    link: '/Home',
  },
  { 
    isGroup: false,
    name: '股票',
    icon: 'mdi-magnify',
    link: '/SearchStock',
  },
  {
    isGroup: true,
    name: '氣候數據',
    icon: 'mdi-earth',
    sublist: [
      { name: '台灣颱風地震水庫資訊', icon: 'mdi-terrain', link: '/Taiwan/TyphoonEarthquakeInfo', isGroup: false },
      { name: '全球', icon: 'mdi-tsunami', link: '/World/EarthquakeInfo', isGroup: false },
      // { name: '全球地震', icon: 'mdi-tsunami', link: '/World/EarthquakeInfo' },
      // {
      //   isGroup: true,
      //   name: '全球地震',
      //   icon: 'mdi-tsunami',
      //   sublist: [
      //     { name: '全球地震', icon: 'mdi-account-multiple-outline', link: '/World/EarthquakeInfo' },
      //     { name: 'Sub Settings', icon: 'mdi-cog-outline', link: '/' },
      //   ]
      // }
    ],
  },
  // {
  //   isGroup: true,
  //   name: 'Actions',
  //   icon: 'mdi-playlist-plus',
  //   sublist: [
  //     { name: 'Create', icon: 'mdi-plus-outline', link: '/' },
  //     { name: 'Read', icon: 'mdi-file-outline', link: '/' },
  //     { name: 'Update', icon: 'mdi-update', link: '/' },
  //     { name: 'Delete', icon: 'mdi-delete', link: '/' },
  //   ],
  // }
];




const open = ref(['Users'])

const admins = [
  ['Management', 'mdi-account-multiple-outline'],
  ['Settings', 'mdi-cog-outline'],
]
const cruds = [
  ['Create', 'mdi-plus-outline'],
  ['Read', 'mdi-file-outline'],
  ['Update', 'mdi-update'],
  ['Delete', 'mdi-delete'],
]



</script>

<style lang="scss" scoped>
.v-list {
  a {
    text-decoration: none;
    font-size: 13px;
    .v-list-item {
      color: white;
    }
  }
}

.v-list-group__items {
  .v-list-item {
    padding-left: 50px !important;
  }
}
</style>

<style>
.v-list-item__prepend > .v-icon ~ .v-list-item__spacer {
  width: 20px;
}
</style>
