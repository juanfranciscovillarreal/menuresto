<template>
    <v-btn icon @click="modo = (modo === 'light' ? 'dark' : 'light')">
        <v-icon :icon="modo === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-icon>
    </v-btn>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
// Composables
import { useTheme } from 'vuetify'
// Stores
import { useAjustesStore } from "@/stores/ajustes";

const modo = ref('light')
// Composables
const theme = useTheme()
// Stores
const ajustesStore = useAjustesStore()

onMounted(async () => {
  modo.value = ajustesStore.modo;
})

watch(modo, (newValue, oldValue) => {
    ajustesStore.modo = newValue;
    theme.global.name.value = newValue;
})
</script>