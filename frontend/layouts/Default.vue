<template>
  <v-app>
    <ApplicationBar @rail="toggleRail"/>
    <v-card>
      <SideBar :rail="rail"/>
      <v-layout>
        <v-main :class="{'active': rail}">
          <NuxtPage/>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script lang="ts" setup>
let rail = ref(false);
const toggleRail = (newRailValue: boolean) => rail.value = newRailValue;
</script>

<style lang="scss" scoped>
.v-main {
  margin-top: 65px;
  min-height: 250px;
  flex:none;
  width: calc(100% - 256px);
  margin-left: 256px;
  padding: 20px 25px;
  &.active {
    width: calc(100% - 55px);
    margin-left: 55px;
  }
}
</style>
