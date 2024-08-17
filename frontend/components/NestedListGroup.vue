<template>
    <v-list-group v-if="item.isGroup" :value="item.name">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.name"></v-list-item>
      </template>
  
      <template v-for="(subItem, subIndex) in item.sublist" :key="subIndex">
        <nuxt-link v-if="!subItem.isGroup" :to="subItem.link">
          <v-list-item :prepend-icon="subItem.icon" :title="subItem.name"></v-list-item>
        </nuxt-link>
        <NestedListGroup v-else :item="subItem"/>
      </template>
    </v-list-group>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  
  const props = defineProps<{ item: any }>();
  </script>