<template>

    <v-card elevation="0" rounded="0">
      <ToolBar titulo="Categorías" ruta="/Administracion" :nuevo="true" @verDialogo="add()"></ToolBar>

      <v-row no-gutters>
        <v-col cols="12">
          <!-- Buscar -->
          <v-text-field v-model="filter" @keyup="filtrar" prepend-inner-icon="mdi-magnify" label="Buscar" single-line
            hide-details clearable @click:clear="listar">
          </v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" lg="6" md="6" sm="12">
          <v-list lines="two">
            <v-list-item v-for="item in listaItems" :key="item.id" :title="item.nombre">
              <template v-slot:append>
                <div class="d-flex ga-2 justify-end">
                  <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item)"></v-icon>

                  <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item)"></v-icon>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>


  <!-- Diálogo  -->
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="800">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-card>
          <v-card-title class="bg-surface-light">
            {{ getDialogTitle('') }}
          </v-card-title>

          <v-card-text>
            <v-row no-gutters>
              <!-- nombre -->
              <v-col cols="12" md="6">
                <v-text-field v-model="record.nombre" :rules="[rules.required, rules.max50]" label="Nombre"
                  variant="underlined" clearable prepend-icon="mdi-tag-text">
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="bg-surface-light">
            <v-btn text="Cancelar" variant="plain" @click="dialog = false"></v-btn>
            <v-spacer></v-spacer>
            <v-btn type="submit" text="Aceptar" color="primary"></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>

  <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
  </Dialog>

  <Confirm :show="confirmarShow" :titulo="confirmarTitulo" :mensaje="confirmarMensaje"
    @confirmarCerrar="confirmarShow = false" @confirmarAceptar="confirmarAceptar">
  </Confirm>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useCategoria } from '../composables/categorias';
import Dialog from '../components/Dialog.vue';
import ToolBar from '../components/ToolBar.vue';
import Confirm from '../components/Confirm.vue';
import { useErrorHandler } from '../composables/errorHandler';

const form = ref(false);
const nombre = ref('');
const items = ref([]);
const rules = ref({
  required: (value) => !!value || 'Obligatorio',
  min8: (v) => v.length >= 8 || 'Min 8 caracteres',
  mayor0: (v) => v.length > 0 || 'Sólo números positivos',
  max20: (value) => value.length <= 20 || 'Max 20 caracteres',
  max50: (value) =>
    value == undefined || value.length <= 50 || 'Max 50 caracteres',
});

const filter = ref('');
const listaItems = ref([]);
const record = ref({
  id: '',
  nombre: '',
});
const DEFAULT_RECORD = ref({
  id: '',
  nombre: '',
});
const dialog = ref(false);
const isEditing = ref(false);
const dialogShow = ref(false);
const dialogMensaje = ref('');
const dialogTitulo = ref('');
const confirmarShow = ref(false);
const confirmarTitulo = ref('');
const confirmarMensaje = ref('');

const { getCategorias, updateCategoria, insertCategoria, removeCategoria } =
  useCategoria();

onMounted(async () => {
  items.value = await getCategorias();
});

watch(
  items,
  async (newItems, oldItems) => {
    listaItems.value = newItems;
  },
  { deep: true }
);

function getDialogTitle(nombre) {
  return isEditing.value ? `Editar ${nombre}` : `Agregar ${nombre}`;
}

function listar() {
  listaItems.value = items.value;
}

function filtrar() {
  let filtro = filter.value.toLowerCase();
  listaItems.value = items.value;

  let itemsFiltrados = listaItems.value.filter((item) =>
    item.nombre.toLowerCase().includes(filtro)
  );

  if (filtro != '') listaItems.value = itemsFiltrados;
}

async function remove(item) {
  record.value = { ...item };
  confirmarMensaje.value = `¿Elimina la Categoría ${item.nombre}?`;
  confirmarTitulo.value = 'Eliminar';
  confirmarShow.value = true;
}

async function confirmarAceptar() {
  try {
    confirmarShow.value = false;
    await removeCategoria(record.value.id);
    items.value = await get();
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}

function add() {
  isEditing.value = false;
  record.value = { ...DEFAULT_RECORD.value };
  dialog.value = true;
}

function edit(item) {
  isEditing.value = true;
  record.value = { ...item };
  dialog.value = true;
}

async function onSubmit() {
  if (!form.value) return;

  try {
    await save();
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}

async function save() {
  try {
    if (isEditing.value) {
      await updateCategoria(record);
    } else {
      let newItem = {
        nombre: record.value.nombre,
      };
      await insertCategoria(newItem);
    }
    items.value = await getCategorias();
    dialog.value = false;
  } catch (error) {
    dialog.value = false;
    throw error;
  }
}
</script>