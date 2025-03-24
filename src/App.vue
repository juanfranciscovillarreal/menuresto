<template>
  <v-app :theme="theme">
    <router-view />
  </v-app>
</template>

<script setup>

const theme = ref('light')
</script>
