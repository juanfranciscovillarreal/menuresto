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
</template>

<script setup>
import Carousel from '@/components/Carousel.vue';
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import { useCategoriasStore } from "../stores/categorias";
import { useMenuStore } from "../stores/menu";
import { useEmpresaStore } from "../stores/empresa";
import { supabase } from '../lib/supabase'

const categoriasStore = useCategoriasStore()
const menuStore = useMenuStore()
const empresaStore = useEmpresaStore()
const router = useRouter()

onMounted(() => {
  getCategorias();
  getMenu();
})

async function getCategorias() {
  const { data, error } = await supabase
    .from('Categoria')
    .select('id, nombre');

  if (error){
    console.log(`Error en getCategorias: ${error}`);
    throw error;
  }

  data.unshift({
    id: 0,
    nombre: "Todos"
  });
  categoriasStore.categorias = data;
}

async function getMenu() {
  const { data, error } = await supabase
    .from('Categoria')
    .select(`id, nombre,
             Item (id, id_categoria, nombre, descripcion, precio, foto)`
    )

  if (error) {
    console.log(`Error en getMenu: ${error}`);
    throw error;
  }

  if (menuStore.pedido.length == 0) {
    // Cargo el menú completo si no hay un pedido hecho
    menuStore.menuCompleto = data;
  }

}

function seleccionar(categoria, index) {
  categoriasStore.seleccionada = categoria;
  categoriasStore.index = index;
  router.push(`/${empresaStore.empresa.nombre}/Menu`);
}
</script>
