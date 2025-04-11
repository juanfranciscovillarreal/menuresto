<template>
  <v-card elevation="0" rounded="0">
    <ToolBar titulo="Items" ruta="/Administracion" :nuevo="true" @verDialogo="addItem()"></ToolBar>

    <v-row no-gutters>
      <v-col cols="12">
        <!-- Buscar -->
        <v-text-field v-model="filter" @keyup="fitrarItems" prepend-inner-icon="mdi-magnify" label="Buscar" single-line
          hide-details clearable @click:clear="listarItems">
        </v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col lg="6" md="6" sm="12">
        <v-list lines="two">
          <v-list-item v-for="item in listaItems" :key="item.id" :subtitle="item.descripcion" :title="item.nombre">
            <template v-slot:prepend>
              <v-avatar size="36px">
                <v-img alt="Avatar" :src="item.foto"></v-img>
              </v-avatar>
            </template>

            <template v-slot:append>
              <div class="d-flex ga-2 justify-end">
                <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editItem(item)"></v-icon>

                <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item)"></v-icon>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-card>

  <!-- Diálogo Item -->
  <div class="text-center pa-4">
    <v-dialog v-model="dialogItem" transition="dialog-bottom-transition" max-width="800">
      <v-form v-model="formItem" @submit.prevent="onSubmitItem">
        <v-card>
          <v-card-title class="bg-surface-light">
            {{ getDialogTitle('Item') }}
          </v-card-title>

          <v-card-text>
            <!-- Avatar -->
            <v-row no-gutters>
              <v-col cols="12">
                <Avatar :avatar="recordItem.foto" @onUpdateAvatar="updateAvatar"></Avatar>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <!-- nombre -->
              <v-col cols="12" md="4">
                <v-text-field v-model="recordItem.nombre" :rules="[rules.required, rules.max50]" label="Nombre"
                  variant="underlined" clearable prepend-icon="mdi-tag-text">
                </v-text-field>
              </v-col>

              <!-- descripcion -->
              <v-col cols="12" md="4">
                <v-text-field v-model="recordItem.descripcion" :rules="[rules.required, rules.max50]"
                  label="Descripción" variant="underlined" clearable prepend-icon="mdi-text">
                </v-text-field>
              </v-col>

              <!-- precio -->
              <v-col cols="12" md="4">
                <v-text-field v-model="recordItem.precio" :rules="[rules.required]" label="Precio" variant="underlined"
                  clearable prepend-icon="mdi-currency-usd">
                </v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12" md="4">
                <v-select :items="categorias" item-title="nombre" item-value="id" v-model="recordItem.id_categoria"
                  density="comfortable" label="Categoria"></v-select>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="bg-surface-light">
            <v-btn text="Cancelar" variant="plain" @click="dialogItem = false"></v-btn>
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
// import { supabase } from '../lib/supabase'
//import { supabase } from '../supabaseClient';
import { useCategoria } from '../composables/categorias';
import { useItem } from '../composables/items';
import imgUrl from '../assets/image.png';
import Avatar from '../components/Avatar.vue';
import Dialog from '../components/Dialog.vue';
import ToolBar from '../components/ToolBar.vue';
import Confirm from '../components/Confirm.vue';
import { useErrorHandler } from '../composables/errorHandler';

const form = ref(false);
const formItem = ref(false);
const nombre = ref('');
const descripcion = ref('');
const categorias = ref([]);
const categoria = ref();
const precio = ref();
const items = ref([]);
const rules = ref({
  required: (value) => !!value || 'Obligatorio',
  min8: (v) => v.length >= 8 || 'Min 8 caracteres',
  mayor0: (v) => v.length > 0 || 'Sólo números positivos',
  max20: (value) => value.length <= 20 || 'Max 20 caracteres',
  max50: (value) =>
    value == undefined || value.length <= 50 || 'Max 50 caracteres',
});
const imageUrl = ref('');
const image = ref('');
const preview = ref('https://cdn.vuetifyjs.com/images/parallax/material.jpg');

const filter = ref('');
const listaItems = ref([]);
const recordItem = ref({
  id: '',
  nombre: '',
  descripcion: '',
  id_categoria: 0,
  foto: '',
  precio: '',
});
const DEFAULT_RECORD_ITEM = ref({
  id: '',
  nombre: '',
  descripcion: '',
  id_categoria: 0,
  foto: imgUrl,
  precio: '',
});
const dialogItem = ref(false);
const isEditing = ref(false);
const dialogShow = ref(false);
const dialogMensaje = ref('');
const dialogTitulo = ref('');

const confirmarShow = ref(false);
const confirmarTitulo = ref('');
const confirmarMensaje = ref('');

const { getCategorias } = useCategoria();
const { getItems, updateItem, insertItem, removeItem } = useItem();

onMounted(async () => {
  try {
    categorias.value = await getCategorias();
    items.value = await getItems();
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
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

function updateAvatar(avatar) {
  recordItem.value.imageUrl = avatar;
}

function listarItems() {
  listaItems.value = items.value;
}

function fitrarItems() {
  let filtro = filter.value.toLowerCase();
  listaItems.value = items.value;

  let itemsFiltrados = listaItems.value.filter((item) =>
    item.nombre.toLowerCase().includes(filtro)
  );

  if (filtro != '') listaItems.value = itemsFiltrados;
}

async function remove(item) {
  recordItem.value = { ...item };
  confirmarMensaje.value = `¿Elimina el item ${item.nombre}?`;
  confirmarTitulo.value = 'Item';
  confirmarShow.value = true;
}

async function confirmarAceptar() {
  confirmarShow.value = false;
  await removeItem(recordItem.value.id);
  items.value = await getItems();
}

function addItem() {
  isEditing.value = false;
  recordItem.value = { ...DEFAULT_RECORD_ITEM.value };
  dialogItem.value = true;
}

function editItem(item) {
  isEditing.value = true;
  if (item.foto == '' || item.foto == null) {
    item.foto = imgUrl;
  }
  recordItem.value = { ...item };
  dialogItem.value = true;
}

async function onSubmitItem() {
  if (!formItem.value) return;

  try {
    await saveItem();
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}

async function saveItem() {
  try {
    if (isEditing.value) {
      await updateItem(recordItem);
    } else {
      let newitem = {
        nombre: recordItem.value.nombre,
        descripcion: recordItem.value.descripcion,
        id_categoria: recordItem.value.id_categoria,
        foto: recordItem.value.foto,
        precio: recordItem.value.precio,
      };
      await insertItem(newitem);
    }
    items.value = await getItems();
    dialogItem.value = false;
  } catch (error) {
    dialogItem.value = false;
    throw error;
  }
}
</script>
