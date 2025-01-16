<template>
  <v-sheet class="mx-auto" max-width="600">
    <v-slide-group :show-arrows="false" :mobile="true" mobile-breakpoint="xs">
      <v-slide-group-item v-for="[text, icon, link]  in categorias" v-slot="{ isSelected, toggle }">
        <v-btn :color="isSelected ? 'primary' : undefined" class="ma-2" rounded @click="toggle">
          {{ text }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const categorias = ref([
  ["Entradas", "mdi-account-school", "/HelloWorld"],
  ["Tablas", "mdi-numeric-10-box-outline", "/calificaciones"],
  ["Platos principales", "mdi-account-box", "/contactos"],
  ["Pastas", "mdi-chair-school", "/cursos"],
  ["Pizzas", "mdi-human-male-board", "/docentes"],
  ["Sandwiches", "mdi-calendar", "/eventos"],
  ["Ensaladas", "mdi-account-plus", "/asistencias"],
  ["Niños", "mdi-account-minus", "/inasistencias"],
  ["Postres", "mdi-email", "/notificaciones"],
  ["Café", "mdi-account-alert", "/sanciones"],
  ["Bebidas", "mdi-trending-up", "/trayectorias"],
  ["Cervezas", "mdi-trending-up", "/trayectorias"],
  ["Vinos", "mdi-trending-up", "/trayectorias"],
],)
function increment() {
  count.value++
}
</script>