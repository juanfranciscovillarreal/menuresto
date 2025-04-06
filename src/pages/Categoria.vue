<template>
  <v-card>
    <ToolBar titulo="Categorías" ruta="/Administracion" :nuevo="true" @verDialogo="add()"></ToolBar>

    <v-data-table :headers="headers" :hide-default-footer="true" :items="categorias">
      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-card title="Categoría">
          <template v-slot:text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field 
                  v-model="record.nombre" 
                  label="Nombre" 
                  variant="underlined" 
                  :rules="rules[rules.required, rules.max50]">
              </v-text-field>
              </v-col>
            </v-row>
          </template>

          <v-divider></v-divider>

          <v-card-actions class="bg-surface-light">
            <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>

            <v-spacer></v-spacer>

            <v-btn text="Aceptar" color="primary" @click="save"></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-card>

  <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
  </Dialog>
</template>

<script setup>
import { onMounted, ref, shallowRef } from 'vue';
import { supabase } from '../lib/supabase'
import { useCategoriasStore } from "../stores/categorias";
import ToolBar from '../components/ToolBar.vue';
import Dialog from '../components/Dialog.vue';
import { useErrorHandler } from '@/composables/errorHandler'

const categorias = ref([]);
const dialogShow = ref(false);
const dialogTitulo = ref('Categoría');
const dialogMensaje = ref('');

/* -------------------------------- */

const rules = ref({
  required: (value) => !!value || 'Obligatorio',
  min8: (v) => v.length >= 8 || 'Min 8 caracteres',
  max20: value => value.length <= 20 || 'Max 20 caracteres',
  max50: value => (value == undefined || value.length <= 50) || 'Max 50 caracteres',
});

const DEFAULT_RECORD = ref({
  id: '',
  nombre: '',
});
const record = ref({
  id: '',
  nombre: '',
});
const dialog = ref(false);
const isEditing = ref(false);
const headers = ref([
  { title: 'Nombre', key: 'nombre' },
  { title: '', key: 'actions', align: 'end', sortable: false },
]);

onMounted(() => {
  getCategorias();
});

async function onSubmit() {
  if (!form.value) return;
  await updateEmpresa();
  //await getEmpresa();
}

function add() {
  isEditing.value = false;
  record.value = { ...DEFAULT_RECORD.value };
  dialog.value = true;
}

function edit(id) {
  isEditing.value = true;
  const found = categorias.value.find((categoria) => categoria.id === id);
  record.value = { ...found };
  dialog.value = true;

  //console.log(`Categoría: ${record.value.id} - ${record.value.nombre}`);
}

async function remove(id) {
  try {
    const found = categorias.value.find((categoria) => categoria.id === id);
    record.value = { ...found };

    const response = await supabase
      .from('Categoria')
      .delete()
      .eq('id', record.value.id);

    if (response.error) throw response.error;

    await getCategorias();

    //console.log(`Categoría eliminada: ${record.value.id} - ${record.value.nombre}`);
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}

async function save() {
  try {
    if (isEditing.value) {
      await updateCategoria();
    } else {
      await insertCategoria();
    }
    await getCategorias();
    dialog.value = false;
  } catch (error) {
    dialog.value = false;
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}

async function getCategorias() {
  let { data, error, status } = await supabase
    .from('Categoria')
    .select(`id, nombre`);

  if (error) throw error;

  categorias.value = data;
  //console.log(`Categorías obtenidas: ${JSON.stringify(data)}`);
}

async function insertCategoria() {
  const { data, error } = await supabase.from('Categoria').insert({
    nombre: record.value.nombre,
  });

  if (error) throw error;
}

async function updateCategoria() {
  const { error } = await supabase
    .from('Categoria')
    .update({ nombre: record.value.nombre })
    .eq('id', record.value.id);

  if (error) {
    throw error;
  }
}
</script>