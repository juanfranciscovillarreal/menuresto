<template>
  <v-app :theme="theme">
    <router-view />
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const theme = ref('light')
</script>
