<template>
  <ToolBar titulo="Items" ruta="/Administracion"></ToolBar>

    <v-row>
      <v-col lg="6" md="6" sm="12">
        <v-list lines="two">
          <v-list-subheader inset>Items</v-list-subheader>
  
          <v-list-item
            v-for="item in items"
            :key="item.id"
            :subtitle="item.descripcion"
            :title="item.nombre"
          >
            <template v-slot:prepend>
              <v-avatar size="36px">
                <v-img alt="Avatar" :src="item.foto"></v-img>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
  
      <v-col lg="6" md="6" sm="12">
        <v-sheet rounded min-width="300">
          <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="form" @submit.prevent="onSubmit">
              <v-text-field
                v-model="nombre"
                :rules="[required]"
                class="mb-2"
                label="Nombre"
                clearable
              ></v-text-field>
  
              <v-text-field
                v-model="descripcion"
                :rules="[required]"
                class="mb-2"
                label="Descripción"
                clearable
              ></v-text-field>
  
              <v-select
                :items="categorias"
                item-title="nombre"
                item-value="id"
                v-model="categoria"
                density="comfortable"
                label="Categoria"
              ></v-select>
  
              <v-text-field
                v-model="precio"
                :rules="[required]"
                class="mb-2"
                label="Precio"
                clearable
              ></v-text-field>
  
              <v-file-input
                accept="image/*"
                label="File input"
                @change="onFilePicked"
              ></v-file-input>
  
              <v-img :width="100" aspect-ratio="1/1" cover :src="preview"></v-img>
  
              <br />
  
              <v-btn
                :disabled="!form"
                color="success"
                type="submit"
                variant="elevated"
                block
              >
                Agregar
              </v-btn>
            </v-form>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { supabase } from '../lib/supabase'
  
  const form = ref(false);
  const nombre = ref('');
  const descripcion = ref('');
  const categorias = ref([]);
  const categoria = ref();
  const precio = ref();
  const items = ref([]);
  const rules = ref({
    required: (value) => !!value || 'Required.',
    min: (v) => v.length >= 8 || 'Min 8 characters',
  });
  const imageUrl = ref('');
  const image = ref('');
  const preview = ref('https://cdn.vuetifyjs.com/images/parallax/material.jpg');
  
  onMounted(() => {
    getCategorias();
    getItems();
  });
  
  defineProps({
    msg: String,
  });
  
  function required(v) {
    return !!v || 'Requerido';
  }
  
  async function getCategorias() {
    let { data, error, status } = await supabase
      .from('Categoria')
      .select(`id, nombre`);
  
    categorias.value = data;
  }
  
  async function getItems() {
    let { data, error, status } = await supabase
      .from('Item')
      .select(`id, nombre, descripcion, foto`);
    // .eq('id', 1);
    // .single();
  
    items.value = data;
  }
  
  function onSubmit() {
    if (!form.value) return;
    insertItem();
  }
  
  async function insertItem() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    const { error } = await supabase.from('Item').insert({
      nombre: nombre.value,
      descripcion: descripcion.value,
      id_categoria: categoria.value,
      foto: imageUrl.value,
      precio: precio.value,
      user_id: user.id,
    });
  
    if (error) {
      console.log(`Error: ${JSON.stringify(error)}`);
      return;
    }
  
    nombre.value = '';
    descripcion.value = '';
    categoria.value = '';
    preview.value = null;
    precio.value = '';
  
    getItems();
  }
  
  function onFilePicked(event) {
    const files = event.target.files;
    let filename = files[0].name;
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      imageUrl.value = fileReader.result;
      preview.value = fileReader.result;
    });
    fileReader.readAsDataURL(files[0]);
    image.value = files[0];
  }
  </script>
  