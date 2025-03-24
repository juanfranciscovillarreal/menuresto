<template>
  <ToolBar titulo="Categorías" ruta="/Administracion"></ToolBar>
    <v-card height="200">
      <v-toolbar>
        <v-toolbar-title text="Categoria"></v-toolbar-title>
  
        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-toolbar>
    </v-card>
  
    <v-sheet max-width="400" min-width="200">
      <v-slide-group show-arrows v-model="chip">
        <v-slide-group-item
          v-for="categoria in categorias"
          :key="categoria.id"
          v-slot="{ isSelected, toggle }"
        >
          <v-btn
            :color="isSelected ? 'primary' : undefined"
            class="ma-2"
            rounded
            @click="toggle"
          >
            {{ categoria.nombre }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field
        v-model="nombre"
        :rules="[required]"
        class="mb-2"
        label="Nombre"
        clearable
      ></v-text-field>
  
      <v-btn type="submit" color="primary" variant="elevated" block>
        Agregar
      </v-btn>
    </v-form>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { supabase } from '../lib/supabase'
  import { useCategoriasStore } from "../stores/categorias";
  
  const categoriaStore = useCategoriasStore();
  
  const form = ref(false);
  const nombre = ref('');
  const categorias = ref([]);
  const chip = ref(0);
  const rules = ref({
    required: (value) => !!value || 'Required.',
  });
  const bottomNav = ref(0);
  
  onMounted(() => {
    getCategorias();
  });
  
  function required(v) {
    return !!v || 'Requerido';
  }
  
  async function getCategorias() {
    let { data, error, status } = await supabase
      .from('Categoria')
      .select(`id, nombre`);
  
    if (error) {
      throw error;
    }
    categorias.value = data;
    //console.log(`Categorías obtenidas: ${JSON.stringify(data)}`);
  }
  
  async function insertCategoria() {
    const { data, error } = await supabase.from('Categoria').insert({
      nombre: nombre.value,
      user_id: '450da4e9-9fc4-4fa9-a13c-487a76e6a8c8',
    });
  
    if (error) {
      throw error;
    }
    console.log(`Categoría insertada: ${nombre.value}`);
  }
  
  async function onSubmit() {
    if (!form.value) return;
    try {
      await insertCategoria();
      await getCategorias();
      seleccionarCategoria();
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  
  function seleccionarCategoria() {
    var totalCategorias = categorias.value.length;
    chip.value = totalCategorias - 1;
    nombre.value = null;
  }
  </script>
  