<template>
    <v-app-bar :elevation="2">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="emit('rail', rail = !rail);"
            ></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>Application Bar</v-app-bar-title>
        <template v-slot:append>
            <v-switch
                :model-value="true"
                color="primary"
                label="on"
            ></v-switch>
            <v-btn icon="mdi-heart"></v-btn>
            <v-btn icon="mdi-account"></v-btn>
            <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>
</template>

<script lang="ts" setup>
const rail = ref(false);
const emit = defineEmits(['rail']);
const theme = ref(false)
</script>