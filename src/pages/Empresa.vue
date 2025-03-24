<template>
  <ToolBar titulo="Empresa" ruta="/Administracion"></ToolBar>

  <div class="d-flex align-center justify-space-around mt-2">
    <v-avatar size="150">
      <v-img :width="100" aspect-ratio="1/1" cover :src="preview"></v-img>
    </v-avatar>
  </div>
  <v-file-input accept="image/*" prepend-icon="mdi-camera" hide-input @change="onFilePicked">
  </v-file-input>

  <div class="d-flex align-center justify-space-around">
    <v-card variant="text">
      <v-card-item>
        <v-card-title class="text-center">
          {{ nombre }}
        </v-card-title>

        <v-card-subtitle class="text-center">
          {{ descripcion }}
        </v-card-subtitle>
      </v-card-item>

    </v-card>
  </div>

  <v-sheet rounded min-width="360">
    <v-card class="mx-auto px-6 py-8" max-width="400">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field v-model="nombre" :rules="[required]" class="mb-2" label="Nombre" clearable>
        </v-text-field>

        <v-text-field v-model="descripcion" :rules="[required]" class="mb-2" label="Descripción" clearable>
        </v-text-field>

        <v-select :items="categorias" item-title="nombre" item-value="id" v-model="categoria" density="comfortable"
          label="Categoria">
        </v-select>

        <v-text-field v-model="precio" :rules="[required]" class="mb-2" label="Precio" clearable>
        </v-text-field>

        <br />

        <v-btn :disabled="!form" color="success" type="submit" variant="elevated" block>
          Agregar
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabase'
import { useErrorHandler } from '@/composables/errorHandler'
import Dialog from '@/components/Dialog.vue';
import { useEmpresaStore } from "../stores/empresa";

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
  // getEmpresa();
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

function onSubmit() {
  if (!form.value) return;
  updateEmpresa();
}

async function updateEmpresa() {
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