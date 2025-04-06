<template>
  <ToolBar titulo="Menú" ruta="/Administracion" icono="mdi-playlist-plus" @evento_click="addCategoria" color="#9ACA3C">
  </ToolBar>

  <v-data-table :headers="categoriasHeaders" :items="menu" item-value="id" show-expand hide-default-footer
    hide-default-header :loading="loadingMenu">

    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <!-- Categorías -->
    <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand }">
      <div class="d-flex ga-2 justify-end">
        <v-icon color="medium-emphasis" icon="mdi-pencil" size="small"
          @click="editCategoria(internalItem.value)"></v-icon>

        <v-icon color="medium-emphasis" icon="mdi-delete" size="small"
          @click="removeCategoria(internalItem.value)"></v-icon>

        <v-icon color="medium-emphasis" icon="mdi-plus" size="small" @click="addItem(internalItem.value)"></v-icon>

        <!-- <v-icon color="medium-emphasis" size="small" @click="toggleExpand(internalItem)">
          {{ isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </v-icon> -->

        <v-btn :icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'" color="medium-emphasis"
          density="comfortable" size="small" variant="outlined" @click="toggleExpand(internalItem)">
        </v-btn>

      </div>
    </template>

    <!-- Items -->
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length" class="pl-2">
          <v-table density="compact">
            <tbody>
              <tr v-for="item in item.Item" :key="item.name">
                <td>{{ item.nombre }}</td>
                <td>{{ item.precio }}</td>
                <td>
                  <div class="d-flex ga-2 justify-end">
                    <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="editItem(item)"></v-icon>

                    <v-icon color="medium-emphasis" icon="mdi-delete" size="small"
                      @click="removeItem(item.id)"></v-icon>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </td>
      </tr>
    </template>
  </v-data-table>

  <!-- Diálogo Categoría -->
  <v-dialog v-model="dialogCategoria" transition="dialog-bottom-transition" max-width="800">
    <v-form v-model="formCategoria" @submit.prevent="onSubmitCategoria">
      <v-card>
        <v-card-title class="bg-surface-light">
          {{ getDialogTitle('Categoría') }}
        </v-card-title>

        <v-card-text>
          <!-- nombre -->
          <v-row no-gutters>
            <!-- nombre -->
            <v-col cols="12" md="6">
              <v-text-field v-model="recordCategoria.nombre" :rules="[rules.required, rules.max50]" label="Nombre"
                variant="underlined" clearable prepend-icon="mdi-tag-text">
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="bg-surface-light">
          <v-btn text="Cancelar" variant="plain" @click="dialogCategoria = false"></v-btn>
          <v-spacer></v-spacer>
          <v-btn type="submit" text="Aceptar" color="primary"></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

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
</template>

<script setup>
import { onMounted, ref, shallowRef } from 'vue';
import { useDate } from 'vuetify';
import { supabase } from '../lib/supabase'
import { useEmpresaStore } from "../stores/empresa";
import { useErrorHandler } from '../composables/errorHandler';
import Dialog from '../components/Dialog.vue';
import ToolBar from '../components/ToolBar.vue';
import imgUrl from '../assets/image.png'

const empresaStore = useEmpresaStore()
const categorias = ref([]);
const items = ref([]);
const menu = ref([]);
const loadingMenu = ref(false)

const rules = ref({
  required: (value) => !!value || 'Obligatorio',
  min8: (v) => v.length >= 8 || 'Min 8 caracteres',
  mayor0: (v) => v.length > 0 || 'Sólo números positivos',
  max20: (value) => value.length <= 20 || 'Max 20 caracteres',
  max50: (value) =>
    (value == undefined || value.length <= 50) || 'Max 50 caracteres',
});

const dialogShow = ref(false);
const dialogTitulo = ref('Empresa');
const dialogMensaje = ref('');
const formCategoria = ref(false);
const formItem = ref(false);
const adapter = useDate();
const DEFAULT_RECORD = ref({
  id: '',
  nombre: '',
});
const DEFAULT_RECORD_ITEM = ref({
  id: '',
  nombre: '',
  descripcion: '',
  id_categoria: 0,
  foto: imgUrl,
  precio: '',
});
const books = ref([]);
const recordCategoria = ref({
  id: '',
  nombre: '',
});

const recordItem = ref({
  id: '',
  nombre: '',
  descripcion: '',
  id_categoria: 0,
  foto: '',
  precio: '',
});

const dialogCategoria = ref(false);
const dialogItem = ref(false);
const isEditing = ref(false);
const categoriasHeaders = ref([
  { title: 'Categoría', key: 'nombre' },
  {
    title: '',
    key: 'actions',
    align: 'end',
    sortable: false,
    class: 'my-header-style',
  },
]);

onMounted(() => {
  getCategorias();
  getMenu();
});

function updateAvatar(avatar) {
  recordItem.value.imageUrl = avatar;
}

function getDialogTitle(nombre) {
  return isEditing.value ? `Editar ${nombre}` : `Agregar ${nombre}`;
}

async function onSubmitCategoria() {
  if (!formCategoria.value) return;

  try {
    await saveCategoria();
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
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

function addCategoria() {
  isEditing.value = false;
  recordCategoria.value = { ...DEFAULT_RECORD.value };
  dialogCategoria.value = true;
}

function addItem(id_categoria) {
  isEditing.value = false;
  recordItem.value = { ...DEFAULT_RECORD_ITEM.value };
  recordItem.value.id_categoria = id_categoria;
  dialogItem.value = true;
}

function editCategoria(id) {
  isEditing.value = true;
  const found = categorias.value.find((categoria) => categoria.id === id);
  recordCategoria.value = { ...found };
  dialogCategoria.value = true;
}

function editItem(item) {
  isEditing.value = true;
  if (item.foto == '' || item.foto == null) {
    item.foto = imgUrl;
  }
  recordItem.value = { ...item };
  dialogItem.value = true;
}

async function removeCategoria(id) {
  try {
    const found = categorias.value.find((categoria) => categoria.id === id);
    recordCategoria.value = { ...found };

    const response = await supabase
      .from('Categoria')
      .delete()
      .eq('id', recordCategoria.value.id);

    if (response.error) throw response.error;

    await getCategorias();
    await getMenu();
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}

async function removeItem(id) {
  try {
    const response = await supabase.from('Item').delete().eq('id', id);

    if (response.error) throw response.error;

    await getCategorias();
    await getMenu();
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}

async function saveCategoria() {
  try {
    if (isEditing.value) {
      await updateCategoria();
    } else {
      await insertCategoria();
    }
    await getCategorias();
    await getMenu();
    dialogCategoria.value = false;
  } catch (error) {
    dialogCategoria.value = false;
    throw error;
  }
}

async function saveItem() {
  try {
    if (isEditing.value) {
      await updateItem();
    } else {
      await insertItem();
    }
    await getMenu();
    dialogItem.value = false;
  } catch (error) {
    dialogItem.value = false;
    throw error;
  }
}

async function getCategorias() {
  let { data, error, status } = await supabase
    .from('Categoria')
    .select(`id, nombre`);

  if (error) throw error;

  categorias.value = data;
}

async function insertCategoria() {
  const { data, error } = await supabase.from('Categoria').insert({
    nombre: recordCategoria.value.nombre,
  });

  if (error) throw error;
}

async function updateCategoria() {
  const { error } = await supabase
    .from('Categoria')
    .update({ nombre: recordCategoria.value.nombre })
    .eq('id', recordCategoria.value.id);

  if (error) throw error;
}

async function insertItem() {
  // const {
  //     data: { user },
  // } = await supabase.auth.getUser();

  let record = {
    nombre: recordItem.value.nombre,
    descripcion: recordItem.value.descripcion,
    id_categoria: recordItem.value.id_categoria,
    foto: recordItem.value.imageUrl,
    precio: recordItem.value.precio,
  };

  const { error } = await supabase.from('Item').insert(record);

  if (error) throw error;
}

async function updateItem() {
  let record = {
    nombre: recordItem.value.nombre,
    descripcion: recordItem.value.descripcion,
    id_categoria: recordItem.value.id_categoria,
    foto: recordItem.value.imageUrl,
    precio: recordItem.value.precio,
  };

  const { error } = await supabase
    .from('Item')
    .update(record)
    .eq('id', recordItem.value.id);

  if (error) throw error;
}

async function getMenu() {
  loadingMenu.value = true;

  const { data, error } = await supabase.from('Categoria').select(`id, nombre,
           Item (id, id_categoria, nombre, descripcion, precio, foto)`);
           
  loadingMenu.value = false;

  if (error) throw error;

  menu.value = data;
}
</script>