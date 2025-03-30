<template>
  <v-card>
    <ToolBar titulo="Categorías" ruta="/Administracion" :nuevo="true" @verDialogo="dialog = !dialog"></ToolBar>

    <v-sheet border rounded>
      <v-data-table :headers="headers" :hide-default-footer="books.length < 11" :items="books">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon>
              Categorías
            </v-toolbar-title>

            <v-btn class="me-2" prepend-icon="mdi-plus" rounded="lg" text="Agregar" border @click="add"></v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.title="{ value }">
          <v-chip :text="value" border="thin opacity-25" prepend-icon="mdi-book" label>
            <template v-slot:prepend>
              <v-icon color="medium-emphasis"></v-icon>
            </template>
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex ga-2 justify-end">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

            <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
          </div>
        </template>

        <template v-slot:no-data>
          <v-btn prepend-icon="mdi-backup-restore" rounded="lg" text="Reset data" variant="text" border
            @click="reset"></v-btn>
        </template>
      </v-data-table>
    </v-sheet>

    <v-dialog v-model="dialog" max-width="500">
      <v-card :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
        :title="`${isEditing ? 'Editar' : 'Agregar'}`">
        <template v-slot:text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="record.title" label="Title"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="record.author" label="Author"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select v-model="record.genre" :items="['Fiction', 'Dystopian', 'Non-Fiction', 'Sci-Fi']"
                label="Genre"></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-number-input v-model="record.year" :max="adapter.getYear(adapter.date())" :min="1"
                label="Year"></v-number-input>
            </v-col>

            <v-col cols="12" md="6">
              <v-number-input v-model="record.pages" :min="1" label="Pages"></v-number-input>
            </v-col>
          </v-row>
        </template>

        <v-divider></v-divider>

        <v-card-actions class="bg-surface-light">
          <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

          <v-spacer></v-spacer>

          <v-btn text="Save" @click="save"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- <v-sheet max-width="400" min-width="200">
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
    </v-sheet> -->

    <!-- <v-list lines="two">
      <v-list-subheader title="Folders" inset></v-list-subheader>

      <v-list-item v-for="item in items" :key="item.title" link>
        <template v-slot:prepend>
          <v-avatar :class="[item.iconClass]" :icon="item.icon"></v-avatar>
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>

        <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-list-item-action>
            <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-subheader title="Files" inset></v-list-subheader>

      <v-list-item v-for="item in items2" :key="item.title" link>
        <template v-slot:prepend>
          <v-avatar :class="[item.iconClass]" :icon="item.icon"></v-avatar>
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>

        <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-list-item-action>
            <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list> -->

    <!-- <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-text>
          <v-text-field label="Categoría" variant="underlined"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" @click="dialog = false">
            Cancelar
          </v-btn>

          <v-btn color="primary" variant="text" @click="dialog = false">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

  </v-card>
</template>

<script>
  import { onMounted, ref, shallowRef } from 'vue'
  import { useDate } from 'vuetify'

  export default {
    data () {
      const adapter = useDate()
      return {
        adapter,
        DEFAULT_RECORD: { title: '', author: '', genre: '', year: adapter.getYear(adapter.date()), pages: 1 },
        books: [],
        record: { title: '', author: '', genre: '', year: adapter.getYear(adapter.date()), pages: 1 },
        dialog: false,
        isEditing: false,
        headers: [
          { title: 'Author', key: 'author' },
          { title: 'Actions', key: 'actions', align: 'end', sortable: false },
        ],
      }
    },
    mounted () {
      this.reset()
    },
    methods: {
      add () {
        this.isEditing = false
        this.record = { ...this.DEFAULT_RECORD }
        this.dialog = true
      },
      edit (id) {
        this.isEditing = true
        const found = this.books.find(book => book.id === id)
        this.record = { ...found }
        this.dialog = true
      },
      remove (id) {
        const index = this.books.findIndex(book => book.id === id)
        this.books.splice(index, 1)
      },
      save () {
        if (this.isEditing) {
          const index = this.books.findIndex(book => book.id === this.record.id)
          this.books[index] = { ...this.record }
        } else {
          this.record.id = this.books.length + 1
          this.books.push({ ...this.record })
        }
        this.dialog = false
      },
      reset () {
        this.dialog = false
        this.record = { ...this.DEFAULT_RECORD }
        this.books = [
          { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, pages: 281 },
          { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, pages: 328 },
          { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, pages: 180 },
          { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Non-Fiction', year: 2011, pages: 443 },
          { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', year: 1965, pages: 412 },
        ]
      },
    },
  }

  // import { ref, onMounted } from 'vue';
// import { supabase } from '../lib/supabase'
// import { useCategoriasStore } from "../stores/categorias";

// const categoriaStore = useCategoriasStore();
// const categorias = ref(['Todos']);
// const dialog = ref(false)

</script>

<!-- <template>
  <ToolBar titulo="Categorías" ruta="/Administracion"></ToolBar>
  
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
  </template> -->

<script setup>
/*
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
   // user_id: '450da4e9-9fc4-4fa9-a13c-487a76e6a8c8',
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
  */
</script>