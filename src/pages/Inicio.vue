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
      <v-chip v-for="(categoria, index) in categoriasStore.categorias" :key="index"
        @click="seleccionar(categoria, index)">
        {{ categoria.nombre }}
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

  <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
// Components
import Carousel from '@/components/Carousel.vue';
import Sugerencias from '@/components/Sugerencias.vue';
import Dialog from '@/components/Dialog.vue';
// Composables
import { useErrorHandler } from '@/composables/errorHandler'
// Stores
import { useCategoriasStore } from "../stores/categorias";
import { useEmpresaStore } from "../stores/empresa";

const router = useRouter()
const dialogShow = ref(false);
const dialogTitulo = ref('');
const dialogMensaje = ref('');
// Stores
const categoriasStore = useCategoriasStore()
const empresaStore = useEmpresaStore()

onMounted(async () => {

})


function seleccionar(categoria, index) {
  categoriasStore.seleccionada = categoria;
  categoriasStore.index = index;
  router.push(`/${empresaStore.empresa.nombre}/Menu`);
}
</script>
