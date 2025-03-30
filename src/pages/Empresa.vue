<template>
  <ToolBar titulo="Perfil" ruta="/Administracion" icono="mdi-content-save" @guardar="onSubmit"></ToolBar>

  <div class="d-flex align-center justify-space-around mt-2">
    <v-avatar size="100">
      <v-img :width="100" aspect-ratio="1/1" cover :src="getImage"></v-img>
    </v-avatar>
  </div>

  <div class="d-flex align-center justify-space-around position-relative" style="top: -1em; left: 3em;">
    <v-file-input accept="image/*" prepend-icon="mdi-camera" hide-input @change="onFilePicked">
    </v-file-input>
  </div>

  <v-container class="pt-0">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-row no-gutters>
        <!-- nombre -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.nombre" :rules="rules[required, rules.max50]" label="Nombre"
              variant="underlined" clearable prepend-icon="mdi-account-outline">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- descripcion -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.descripcion" :rules="[rules.max50]" label="Descripción"
              variant="underlined" clearable prepend-icon="mdi-information-variant-circle-outline">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- direccion -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.direccion" :rules="[rules.max50]" label="Dirección"
              variant="underlined" clearable prepend-icon="mdi-map-marker-outline">
            </v-text-field>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <!-- telefono -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.telefono" :rules="[rules.max50]" label="Teléfono"
              variant="underlined" clearable prepend-icon="mdi-phone-outline">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- celular -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.celular" :rules="[rules.max50]" label="Celular"
              variant="underlined" clearable prepend-icon="mdi-cellphone">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- web -->
        <v-col cols="12" md="4">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.web" :rules="[rules.max50]" label="Web" variant="underlined"
              clearable prepend-icon="mdi-web">
            </v-text-field>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <!-- email -->
        <v-col cols="12" md="12">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.email" :rules="[rules.max50]" label="Correo"
              variant="underlined" clearable prepend-icon="mdi-email-outline">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- wifi_usuario -->
        <v-col cols="12" md="6">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.wifi_usuario" :rules="[rules.max50]" label="Wifi usuario"
              variant="underlined" clearable prepend-icon="mdi-wifi">
            </v-text-field>
          </v-sheet>
        </v-col>

        <!-- wifi_clave -->
        <v-col cols="12" md="6">
          <v-sheet class="pl-2 pr-2">
            <v-text-field v-model="empresaStore.empresa.wifi_clave" :rules="[rules.max50]" label="Wifi clave"
              variant="underlined" clearable prepend-icon="mdi-lock-outline">
            </v-text-field>
          </v-sheet>
        </v-col>
      </v-row>
    </v-form>
  </v-container>

  <Dialog :show="dialogShow" :titulo="dialogTitulo" :mensaje="dialogMensaje" @dialogCerrar="dialogShow = false">
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabase'
import { useErrorHandler } from '@/composables/errorHandler'
import Dialog from '@/components/Dialog.vue';
import { useEmpresaStore } from "../stores/empresa";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const empresaStore = useEmpresaStore()
const form = ref(false);
const empresa = ref({});

const dialogShow = ref(false);
const dialogTitulo = ref('Empresa');
const dialogMensaje = ref('');

const rules = ref({
  required: (value) => !!value || 'Obligatorio',
  min8: (v) => v.length >= 8 || 'Min 8 caracteres',
  max20: value => value.length <= 20 || 'Max 20 caracteres',
  max50: value => (value == undefined || value.length <= 50) || 'Max 50 caracteres',
});

const imageUrl = ref('');
const image = ref('');
const preview = ref('');

const open = shallowRef(false)
    const fabPosition = shallowRef('absolute')
    const menuLocation = shallowRef('left center')
    const fabLocation = shallowRef('right bottom')
    const transition = shallowRef('slide-y-reverse-transition')

onMounted(() => {
  // getEmpresa();
});

const getImage = computed(() => {
  var logo = empresaStore.empresa.logo;
  return logo != '' && logo != null ? logo : preview.value;
})

async function onSubmit() {
  if (!form.value) return;
  await updateEmpresa();
  //await getEmpresa();
}

async function updateEmpresa() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user == null) {
      router.push('/');
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        nombre: empresaStore.empresa.nombre,
        descripcion: empresaStore.empresa.descripcion,
        direccion: empresaStore.empresa.direccion,
        telefono: empresaStore.empresa.telefono,
        celular: empresaStore.empresa.celular,
        web: empresaStore.empresa.web,
        email: empresaStore.empresa.email,
        wifi_usuario: empresaStore.empresa.wifi_usuario,
        wifi_clave: empresaStore.empresa.wifi_clave,
        logo: imageUrl.value != '' ? imageUrl.value : empresaStore.empresa.logo,
      })
      .eq('id', user.id);

    if (error) throw error

    dialogShow.value = true;
    dialogMensaje.value = 'Los datos se actualizaron correctamente';
  } catch (error) {
    console.log(`Error en updateEmpresa: ${useErrorHandler(error)}`);
  }
}

async function getEmpresa() {
  try {
    const { data, error } = await supabase.from('profiles').select().single();
    empresa.value = data;
    empresaStore.empresa = data;

    if (data.logo == '' || data.logo == null) {
      empresaStore.empresa.logo = empresaStore.defaultFoto;
    }
  } catch (error) {
    console.log(`Error en updateEmpresa: ${useErrorHandler(error)}`);
  }
}

function onFilePicked(event) {
  const files = event.target.files;
  let filename = files[0].name;
  const fileReader = new FileReader();
  fileReader.addEventListener('load', () => {
    imageUrl.value = fileReader.result;
    preview.value = fileReader.result;
    empresaStore.empresa.logo = preview.value;
  });
  fileReader.readAsDataURL(files[0]);
  image.value = files[0];
}
</script>