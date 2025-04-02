<template>
    <ToolBar titulo="Menu" ruta="/Administracion" icono="mdi-playlist-plus" @evento_click="addCategoria"></ToolBar>
    <!-- <ToolBar titulo="Categorías" ruta="/Administracion" :nuevo="true" @verDialogo="add()"></ToolBar> -->

    <v-data-table :headers="categoriasHeaders" :items="menu" item-value="id" show-expand hide-default-footer
        hide-default-header>
        <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand }">
            <div class="d-flex ga-2 justify-end">
                <v-icon color="medium-emphasis" icon="mdi-pencil" size="small"
                    @click="editCategoria(internalItem.value)"></v-icon>

                <v-icon color="medium-emphasis" icon="mdi-delete" size="small"
                    @click="removeCategoria(internalItem.value)"></v-icon>

                <v-icon color="medium-emphasis" icon="mdi-plus" size="small"
                    @click="addItem(internalItem.value)"></v-icon>

                <v-icon color="medium-emphasis" size="small" @click="toggleExpand(internalItem)">
                    {{ isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
            </div>
        </template>

        <template v-slot:expanded-row="{ columns, item }">
            <v-data-table :headers="itemsHeader" :items="item.Item" hide-default-footer hide-default-header
                class="ml-4">
                <template v-slot:item.actions="{ item }">
                    <div class="d-flex ga-2 justify-end">
                        <v-icon color="medium-emphasis" icon="mdi-pencil" size="small"
                            @click="editItem(item.id)"></v-icon>

                        <v-icon color="medium-emphasis" icon="mdi-delete" size="small"
                            @click="removeItem(item.id)"></v-icon>
                    </div>
                </template>
            </v-data-table>

        </template>
    </v-data-table>

    <!-- Diálogo Categoría -->
    <v-dialog v-model="dialogCategoria" max-width="500">
        <v-form v-model="formCategoria" @submit.prevent="onSubmitCategoria">
            <v-card title="Categoría">
                <template v-slot:text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="recordCategoria.nombre" label="Nombre" variant="underlined"
                                :rules="[rules.required, rules.max50]">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </template>

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
    <v-dialog v-model="dialogItem" max-width="500">
        <v-form v-model="formItem" @submit.prevent="onSubmitItem">
            <v-card title="Item">
                <template v-slot:text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="recordCategoria.nombre" label="Nombre" variant="underlined"
                                :rules="[rules.required, rules.max50]">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </template>

                <v-divider></v-divider>

                <v-card-actions class="bg-surface-light">
                    <v-btn text="Cancelar" variant="plain" @click="dialogItem = false"></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" text="Aceptar" color="primary"></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>

    <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
    </Dialog>

</template>

<script setup>
import { onMounted, ref, shallowRef } from 'vue';
import { useDate } from 'vuetify';
import { supabase } from '../lib/supabase'
// import { useCategoriaStore } from '../stores/categoria';
import ToolBar from '../components/ToolBar.vue';
import Dialog from '@/components/Dialog.vue';
import { useErrorHandler } from '@/composables/errorHandler'

const categorias = ref([]);
const items = ref([]);
const menu = ref([]);

const rules = ref({
    required: (value) => !!value || 'Obligatorio',
    min8: (v) => v.length >= 8 || 'Min 8 caracteres',
    max20: value => value.length <= 20 || 'Max 20 caracteres',
    max50: value => (value == undefined || value.length <= 50) || 'Max 50 caracteres',
});

const dialogShow = ref(false);
const dialogTitulo = ref('Empresa');
const dialogMensaje = ref('');

const formCategoria = ref(false);
/* -------------------------------- */

const adapter = useDate();
const DEFAULT_RECORD = ref({
    id: '',
    nombre: '',
});
const DEFAULT_RECORD_ITEM = ref({
    id: '',
    nombre: '',
});
const books = ref([]);
const recordCategoria = ref({
    id: '',
    nombre: '',
});

const recordItem = ref({
    id: '',
    nombre: '',
});

const dialogCategoria = ref(false);
const dialogItem = ref(false);
const isEditing = ref(false);
const categoriasHeaders = ref([
    { title: 'Categoría', key: 'nombre', class: 'my-header-style' },
    { title: '', key: 'actions', align: 'end', sortable: false, class: 'my-header-style' },
]);

const itemsHeader = ref([
    { title: 'Nombre', key: 'nombre' },
    { title: '', key: 'actions', align: 'end', sortable: false },
]);

onMounted(() => {
    getCategorias();
    getMenu();
});

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

function addItem() {
    isEditing.value = false;
    recordItem.value = { ...DEFAULT_RECORD_ITEM.value };
    dialogItem.value = true;
}

function editCategoria(id) {
    isEditing.value = true;
    const found = categorias.value.find((categoria) => categoria.id === id);
    recordCategoria.value = { ...found };
    dialogCategoria.value = true;

    //console.log(`Categoría: ${recordCategoria.value.id} - ${recordCategoria.value.nombre}`);
}

function editItem(id) {
    isEditing.value = true;
    // Buscar el item dentro de la categoría
    // const found = categorias.value.find((categoria) => categoria.id === id);
    // recordCategoria.value = { ...found };
    dialogCategoria.value = true;

    //console.log(`Categoría: ${recordCategoria.value.id} - ${recordCategoria.value.nombre}`);
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

        //console.log(`Categoría eliminada: ${recordCategoria.value.id} - ${recordCategoria.value.nombre}`);
    } catch (error) {
        dialogShow.value = true;
        dialogMensaje.value = useErrorHandler(error);
    }
}

async function removeItem(id) {
    try {
        // const found = categorias.value.find((categoria) => categoria.id === id);
        // recordCategoria.value = { ...found };

        // const response = await supabase
        //     .from('Categoria')
        //     .delete()
        //     .eq('id', recordCategoria.value.id);

        // if (response.error) throw response.error;

        // await getCategorias();
        // await getMenu();

        //console.log(`Categoría eliminada: ${recordCategoria.value.id} - ${recordCategoria.value.nombre}`);
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
       // await getItems();
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
    //console.log(`Categorías obtenidas: ${JSON.stringify(data)}`);
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

async function getItems() {
    let { data, error, status } = await supabase
        .from('Item')
        .select(`id, nombre, descripcion, foto`);
    // .eq('id', 1);
    // .single();

    items.value = data;
}

async function insertItem() {
    // const {
    //     data: { user },
    // } = await supabase.auth.getUser();

    const { error } = await supabase.from('Item').insert({
        nombre: recordItem.value.nombre,
        descripcion: recordItem.value.descripcion,
        id_categoria: recordItem.value.categoria,
        foto: recordItem.value.imageUrl,
        precio: recordItem.value.precio,
        // user_id: user.id,
    });

    if (error) throw error;

    // nombre.value = '';
    // descripcion.value = '';
    // categoria.value = '';
    // preview.value = null;
    // precio.value = '';
}

async function getMenu() {
    const { data, error } = await supabase
        .from('Categoria')
        .select(`id, nombre,
             Item (id, id_categoria, nombre, descripcion, precio, foto)`
        )

    if (error) throw error

    menu.value = data;

    // console.log(`Menu: ${JSON.stringify(data)}`);
}

async function getMenu_old() {
    let { data, error, status } = await supabase
        .from('Menu')
        .select(
            `
    Categoria (
      id,
      nombre,
        Item (
          id,
          nombre
        )
      )`
        )
        .eq('id', 3);
    //.single()

    menu.value = data;

    console.log(`Menu: ${JSON.stringify(data)}`);
}

</script>

<style lang="css" scoped>
.my-header-style {
    background-color: #666fff;
}
</style>