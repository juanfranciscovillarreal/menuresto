<template>
  <ToolBar titulo="Empresa" ruta="/Administracion"></ToolBar>

  <div class="d-flex align-center justify-space-around mt-2">
    <v-avatar size="100">
      <v-img :width="100" aspect-ratio="1/1" cover :src="preview"></v-img>
    </v-avatar>
  </div>

  <div class="d-flex align-center justify-space-around">
    <v-file-input accept="image/*" prepend-icon="mdi-camera" hide-input @change="onFilePicked">
    </v-file-input>
  </div>

  <!-- <div class="d-flex align-center justify-space-around">
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
  </div> -->

  <v-container>
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-row no-gutters>
        <!-- nombre -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="nombre" :rules="[required]" label="Nombre" clearable>
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- descripcion -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="descripcion" :rules="[required]" label="Descripción" clearable>
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- direccion -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="direccion" :rules="[required]" label="Dirección" clearable>
            </v-text-field>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <!-- telefono -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="telefono" :rules="[required]" label="Teléfono" clearable>
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- celular -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="celular" :rules="[required]" label="Celular" clearable>
            </v-text-field>
          </v-sheet>
        </v-col>

        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="web" :rules="[required]" label="Web" clearable>
            </v-text-field>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <!-- email -->
        <v-col cols="12" md="12">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="email" :rules="[required]" label="Correo" clearable>
            </v-text-field>
          </v-sheet>
        </v-col>
      </v-row>

      <br />

      <v-btn :disabled="!form" color="success" type="submit" variant="elevated" block>
        Agregar
      </v-btn>
    </v-form>
  </v-container>

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