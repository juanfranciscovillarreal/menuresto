<template>
  <v-sheet class="mt-2 mb-2">

    <v-slide-group 
      :show-arrows="false" 
      :mobile="true" 
       mobile-breakpoint="xs"
       center-active 
       v-model="categoriasStore.index">

      <v-slide-group-item v-for="categoria in categoriasStore.categorias" 
                          v-slot="{ isSelected = true, toggle }">

        <v-btn :color="isSelected ? 'primary' : undefined" class="ma-2" rounded 
          @click="$emit('someEvent', toggle, categoria)">
          {{ categoria.nombre }}
        </v-btn>

      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCategoriasStore } from "../stores/categorias";

const categoriasStore = useCategoriasStore()


onMounted(() => {

})

</script>