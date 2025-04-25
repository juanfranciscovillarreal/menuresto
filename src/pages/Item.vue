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
                <v-text-field v-model="recordItem.descripcion" :rules="[rules.max50]" label="Descripción"
                  variant="underlined" clearable prepend-icon="mdi-text">
                </v-text-field>
              </v-col>

              <!-- precio -->
              <v-col cols="12" md="4">
                <v-text-field v-model="recordItem.precio" :rules="[rules.decimal]" label="Precio"
                  variant="underlined" clearable prepend-icon="mdi-currency-usd">
                </v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12" md="4">
                <v-select :items="categoriasStore.categorias" item-title="nombre" item-value="id"
                  v-model="recordItem.id_categoria" density="comfortable" label="Categoria" variant="underlined"
                  prepend-icon="mdi-format-list-text" :rules="[rules.required]">
                </v-select>
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
// Components
import Avatar from '@/components/Avatar.vue';
import Dialog from '@/components/Dialog.vue';
import ToolBar from '@/components/ToolBar.vue';
import Confirm from '@/components/Confirm.vue';
// Composables
import { useErrorHandler } from '@/composables/errorHandler';
import { useCategoria } from '@/composables/categorias';
import { useItem } from '@/composables/items';
import { useReglas } from "@/composables/reglas";
// Stores
import { useCategoriasStore } from "@/stores/categorias";
import { useItemsStore } from "@/stores/items";
// Assets
import imgUrl from '@/assets/image.png';

// Constants
const form = ref(false);
const formItem = ref(false);
const nombre = ref('');
const descripcion = ref('');
const categoria = ref();
const precio = ref();
const imageUrl = ref('');
const image = ref('');
const preview = ref('https://cdn.vuetifyjs.com/images/parallax/material.jpg');

const filter = ref('');
const listaItems = ref([]);
const recordItem = ref({
  id: '',
  nombre: '',
  descripcion: '',
  id_categoria: '0',
  foto: '',
  precio: '0',
});
const DEFAULT_RECORD_ITEM = ref({
  id: '',
  nombre: '',
  descripcion: '',
  id_categoria: '',
  foto: imgUrl,
  precio: '0',
});
const dialogItem = ref(false);
const isEditing = ref(false);
const dialogShow = ref(false);
const dialogMensaje = ref('');
const dialogTitulo = ref('');

const confirmarShow = ref(false);
const confirmarTitulo = ref('');
const confirmarMensaje = ref('');

// Composables
const { getCategorias } = useCategoria();
const { getItems, updateItem, insertItem, removeItem } = useItem();
const { rules } = useReglas();

// Stores
const categoriasStore = useCategoriasStore()
const itemsStore = useItemsStore()

onMounted(async () => {
  try {
    listaItems.value = itemsStore.items;
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
});

watch(() =>
  itemsStore.items,
  async (newData, oldData) => {
    listaItems.value = newData;
  },
  { deep: true }
);

function getDialogTitle(nombre) {
  return isEditing.value ? `Editar ${nombre}` : `Agregar ${nombre}`;
}

function updateAvatar(avatar) {
  recordItem.value.foto = avatar;
}

function listarItems() {
  listaItems.value = itemsStore.items;
}

function fitrarItems() {
  let filtro = filter.value.toLowerCase();
  listaItems.value = itemsStore.items;

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
  itemsStore.items = await getItems();
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
    itemsStore.items = await getItems();
    dialogItem.value = false;
  } catch (error) {
    dialogItem.value = false;
    throw error;
  }
}
</script>
