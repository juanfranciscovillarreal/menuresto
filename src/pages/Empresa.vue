<template>
  <!-- <ToolBar titulo="Empresa" ruta="/Administracion"></ToolBar> -->

  <v-toolbar color="primary">
    <template v-slot:prepend>
      <v-btn icon="mdi-arrow-left" @click="router.push('/Administracion')"></v-btn>
    </template>

    <v-toolbar-title>Empresa</v-toolbar-title>

    <template v-slot:extension>
      <v-tabs v-model="tabs" color="surface" grow>
        <v-tab :value="1">
          <v-icon icon="mdi-account-box"></v-icon>
        </v-tab>

        <v-tab :value="2">
          <v-icon icon="mdi-phone"></v-icon>
        </v-tab>

        <v-tab :value="3">
          <v-icon icon="mdi-web"></v-icon>
        </v-tab>

        <v-tab :value="4">
          <v-icon icon="mdi-wifi"></v-icon>
        </v-tab>

      </v-tabs>
    </template>
  </v-toolbar>

  <v-container>
    <v-form v-model="form" @submit.prevent="onSubmit">

      <v-tabs-window v-model="tabs">
        <v-tabs-window-item :value="1">
          <v-row no-gutters>
            <!-- nombre -->
            <v-col cols="12" md="4">
              <v-sheet class="pl-2 pr-2">
                <v-text-field v-model="empresaStore.empresa.nombre" :rules="[rules.required, rules.max50]"
                  label="Nombre" variant="underlined" clearable prepend-icon="mdi-account-outline">
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
        </v-tabs-window-item>

        <v-tabs-window-item :value="2">
          <v-row no-gutters>
            <!-- telefono -->
            <v-col cols="12" md="6">
              <v-sheet class="pl-2 pr-2">
                <v-text-field v-model="empresaStore.empresa.telefono" :rules="[rules.max50]" label="Teléfono"
                  variant="underlined" clearable prepend-icon="mdi-phone-outline">
                </v-text-field>
              </v-sheet>
            </v-col>

            <!-- celular -->
            <v-col cols="12" md="6">
              <v-sheet class="pl-2 pr-2">
                <v-text-field v-model="empresaStore.empresa.celular" :rules="[rules.max50]" label="Celular"
                  variant="underlined" clearable prepend-icon="mdi-cellphone">
                </v-text-field>
              </v-sheet>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <!-- horario -->
            <v-col cols="12" md="6">
              <v-table density="compact">
                <thead>
                  <tr>
                    <th class="text-left">
                      Día
                    </th>
                    <th class="text-left">
                      Horario
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in horarios" :key="item.name">
                    <td>{{ item.dia }}</td>
                    <td>{{ item.horario }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>

        </v-tabs-window-item>

        <v-tabs-window-item :value="3">
          <v-row no-gutters>
            <!-- email -->
            <v-col cols="12" md="6">
              <v-sheet class="pl-2 pr-2">
                <v-text-field v-model="empresaStore.empresa.email" :rules="[rules.max50]" label="Correo"
                  variant="underlined" clearable prepend-icon="mdi-email-outline">
                </v-text-field>
              </v-sheet>
            </v-col>

            <!-- web -->
            <v-col cols="12" md="6">
              <v-sheet class="pl-2 pr-2">
                <v-text-field v-model="empresaStore.empresa.web" :rules="[rules.max50]" label="Web" variant="underlined"
                  clearable prepend-icon="mdi-web">
                </v-text-field>
              </v-sheet>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <!-- facebook -->
            <v-col cols="12" md="4">
              <v-sheet class="pl-2 pr-2">
                <v-text-field v-model="empresaStore.empresa.facebook" :rules="[rules.max50]" label="Facebook"
                  variant="underlined" clearable prepend-icon="mdi-facebook">
                </v-text-field>
              </v-sheet>
            </v-col>

            <!-- instagram -->
            <v-col cols="12" md="4">
              <v-sheet class="pl-2 pr-2">
                <v-text-field v-model="empresaStore.empresa.wifi_clave" :rules="[rules.max50]" label="Instagram"
                  variant="underlined" clearable prepend-icon="mdi-instagram">
                </v-text-field>
              </v-sheet>
            </v-col>

            <!-- pinterest -->
            <v-col cols="12" md="4">
              <v-sheet class="pl-2 pr-2">
                <v-text-field v-model="empresaStore.empresa.wifi_clave" :rules="[rules.max50]" label="Pinterest"
                  variant="underlined" clearable prepend-icon="mdi-pinterest">
                </v-text-field>
              </v-sheet>
            </v-col>

          </v-row>
        </v-tabs-window-item>

        <v-tabs-window-item :value="4">
          <v-row no-gutters>
            <!-- wifi_usuario -->
            <v-col cols="12" md="6">
              <v-sheet class="pl-2 pr-2">
                <v-text-field v-model="empresaStore.empresa.wifi_usuario" :rules="[rules.max50]" label="Wifi usuario"
                  variant="underlined" clearable prepend-icon="mdi-account">
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
        </v-tabs-window-item>

      </v-tabs-window>

      <!-- aceptar -->
      <v-btn type="submit" block class="mt-4">Aceptar</v-btn>
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
import Avatar from '@/components/Avatar.vue';
import { useEmpresa } from '../composables/empresa';

const { updateEmpresa } = useEmpresa();
const router = useRouter()
const route = useRoute()

const empresaStore = useEmpresaStore()
const form = ref(false);
const dialogShow = ref(false);
const dialogTitulo = ref('Empresa');
const dialogMensaje = ref('');
const tabs = ref();

const rules = ref({
  required: (value) => !!value || 'Obligatorio',
  min8: (v) => v.length >= 8 || 'Min 8 caracteres',
  max20: value => value.length <= 20 || 'Max 20 caracteres',
  max50: value => (value == undefined || value.length <= 50) || 'Max 50 caracteres',
});

onMounted(() => {
});

const getImage = computed(() => {
  var logo = empresaStore.empresa.logo;
  return logo;
})

const horarios = ref([
  {
    dia: 'Lunes',
    horario: '19:00-02:00'
  },
  {
    dia: 'Martes',
    horario: ''
  },
  {
    dia: 'Miércoles',
    horario: ''
  },
  {
    dia: 'Jueves',
    horario: ''
  },
  {
    dia: 'Viernes',
    horario: ''
  },
  {
    dia: 'Sábado',
    horario: ''
  },
  {
    dia: 'Domingo',
    horario: ''
  },
],)
function updateAvatar(avatar) {
  empresaStore.empresa.logo = avatar;
}

async function onSubmit() {
  if (!form.value) {
    dialogShow.value = true;
    dialogMensaje.value = 'Verifique los datos ingresados';
    return;
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user == null) {
      //router.push('/');
      throw 'Error';
    }

    let empresa = {
      id: user.id,
      nombre: empresaStore.empresa.nombre,
      descripcion: empresaStore.empresa.descripcion,
      direccion: empresaStore.empresa.direccion,
      telefono: empresaStore.empresa.telefono,
      celular: empresaStore.empresa.celular,
      web: empresaStore.empresa.web,
      email: empresaStore.empresa.email,
      wifi_usuario: empresaStore.empresa.wifi_usuario,
      wifi_clave: empresaStore.empresa.wifi_clave,
      logo: empresaStore.empresa.logo,
    }
    await updateEmpresa(empresa);

    dialogShow.value = true;
    dialogMensaje.value = 'Los datos se actualizaron correctamente';
  } catch (error) {
    dialogShow.value = true;
    dialogMensaje.value = useErrorHandler(error);
  }
}
</script>