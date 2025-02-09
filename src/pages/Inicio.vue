<template>
  <!-- <v-container style="padding: 0px;"> -->
    <!-- <v-responsive class="align-centerfill-height mb-4" max-width="900"> -->
      <!-- Carousel -->
      <Carousel></Carousel>

      <!-- Bienvenidos -->
      <div class="text-center">
        <div class="text-h6 font-weight-bold mb-n1">Bienvenidos</div>

        <!-- <h1 class="text-h2 font-weight-light">Chapaleo</h1> -->
      </div>

      <div class="py-4"></div>

      <!-- Explorá nuestro menú -->
      <div class="text-center">
        <div class="text-h6 font-weight-light mb-n1">Explorá nuestro menú</div>
      </div>

      <div class="py-2"></div>

      <!-- Menú chips -->
      <v-container class="bg-surface-variant ">
        <v-chip-group column>
          <v-chip v-for="[id, text, icon] in categoriasStore.categorias" 
                         :key="id" 
                         @click="seleccionarMenu(id)">
            {{ text }}
          </v-chip>
        </v-chip-group>
      </v-container>

      <div class="py-4"></div>

      <!-- Nuestras Sugerencias -->
      <div class="text-center">
        <div class="text-h6 font-weight-bold mb-n1">Nuestras Sugerencias</div>
      </div>

      <div class="py-4"></div>

      <Sugerencias></Sugerencias>

      <!-- <v-row>
        <v-col md="6">
          <Sugerencia></Sugerencia>
        </v-col>

        <v-col md="6">
          <Sugerencia></Sugerencia>
        </v-col>
      </v-row> -->

    <!-- </v-responsive> -->
  <!-- </v-container> -->
</template>

<script setup>
import Carousel from '@/components/Carousel.vue';
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { useCategoriasStore } from "../stores/categorias";

const categoriasStore = useCategoriasStore()

const router = useRouter()

function seleccionarMenu(id){
  categoriasStore.seleccionada = id;
  router.push('/Menu');
}
</script>
