<template>
  <v-sheet class="mt-2">
    <v-slide-group :show-arrows="false" :mobile="true" mobile-breakpoint="xs" center-active v-model="model">
      <v-slide-group-item v-for="[id, text, icon] in categoriasStore.categorias" v-slot="{ isSelected = true, toggle }">

        <v-btn :color="isSelected ? 'primary' : undefined" class="ma-2" rounded @click="$emit('someEvent', toggle, id)">
          {{ text }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCategoriasStore } from "../stores/categorias";

const categoriasStore = useCategoriasStore()
const model = ref(0)

onMounted(() => {
  model.value = categoriasStore.seleccionada;
})

</script>