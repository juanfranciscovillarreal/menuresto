<template>
  <v-app-bar color="primary" :absolute="false">
    <!-- Botón Menú Principal -->
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"
      v-if="route.path.includes('/Inicio') || route.path == `/${empresa}`">
    </v-app-bar-nav-icon>

    <v-btn v-if="route.path != `/${empresa}/Inicio` && route.path != `/${empresa}`" icon>
      <v-icon @click="router.push(`/${empresa}/Inicio`)">mdi-arrow-left</v-icon>
    </v-btn>

    <!-- Volver -->
    <v-btn v-if="route.path == `/${empresa}/LeerQR`" icon>
      <v-icon @click="router.push(`/${empresa}/Pedido`)">
        mdi-arrow-left
      </v-icon>
    </v-btn>

    <!-- Título App -->
    <!-- <v-toolbar-title>{{ getTitulo }}</v-toolbar-title> -->
    <v-toolbar-title>Intelicarta</v-toolbar-title>

    <!-- Espacio -->
    <v-spacer v-if="route.path == `/${empresa}/Menu`"></v-spacer>

    <!-- Generar QR -->
    <v-btn v-if="route.path == `/${empresa}/Pedido`" icon>
      <v-icon @click="generarQR()">mdi-share</v-icon>
    </v-btn>

    <!-- Leer QR -->
    <v-btn v-if="route.path == `/${empresa}/Pedido`" icon>
      <v-icon @click="router.push('/LeerQR')">mdi-qrcode-scan</v-icon>
    </v-btn>

    <!-- Buscar -->
    <Buscar />

    <!-- Expandir / Contraer -->
    <v-btn v-if="route.path == `/${empresa}/Menu`" icon>
      <v-icon @click="menuStore.expandirContraerMenu()">
        {{ menuStore.expandir.length > 0 ? 'mdi-minus-box-multiple-outline' : 'mdi-expand-all' }}
      </v-icon>
    </v-btn>

    <!-- Menú Vertical -->
    <!-- <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
      </template>

<v-list density="compact">
  <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" @click="router.push(item.path);">
    <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

    <v-list-item-title v-text="item.text"></v-list-item-title>
  </v-list-item>
</v-list>

</v-menu> -->

  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <!-- Logo -->
    <v-card rounded="0" class="pa-2">
      <v-img aspect-ratio="16/9" :src="getImage" cover>
      </v-img>
    </v-card>

    <v-divider></v-divider>

    <!-- Links -->
    <v-list :lines="false" density="compact" nav>
      <v-list-item v-for="[text, icon, link] in links" :key="icon" :to="link" link>
        <template v-slot:prepend v-if="text != 'Divider'">
          <v-icon :icon="icon"></v-icon>
        </template>

        <v-list-item-title v-text="text" v-if="text != 'Divider'"></v-list-item-title>

        <v-divider v-if="text == 'Divider'"></v-divider>

      </v-list-item>
    </v-list>
    <!-- Fin Links -->

    <template v-slot:append>
      <v-divider></v-divider>
      <!-- Varios -->
      <v-list :lines="false" density="compact" nav>
        <v-list-item v-for="[text, icon, link] in varios" :key="icon" :to="link" link>
          <template v-slot:prepend>
            <v-icon :icon="icon"></v-icon>
          </template>
          <v-list-item-title v-text="text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </template>

  </v-navigation-drawer>

  <v-main>
    <router-view />
  </v-main>

  <div class="text-center pa-4">
    <v-dialog v-model="verQR" width="auto" color="error">
      <v-card max-width="400" class="text-center">

        <v-card-title v-if="menuStore.pedido.length > 0" class="bg-green-lighten-2">
          Comparta su pedido
        </v-card-title>

        <v-card-title v-else class="bg-red-lighten-2">
          Pedido vacío
        </v-card-title>

        <vue-qrcode v-if="menuStore.pedido.length > 0" :value="qrValue" :width="300" type="image/png"
          :color="{ dark: '#000000ff' }" :margin="6" :scale="4" />
        <v-card-text v-else="menuStore.pedido.length = 0">
          Seleccione algún item del menú
        </v-card-text>
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Cerrar" @click="verQR = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>

</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMenuStore } from "../stores/menu";
import { useEmpresaStore } from "../stores/empresa";
import { ref, watch } from 'vue'
import VueQrcode from 'vue-qrcode';
import Buscar from '../components/Buscar.vue';
import { supabase } from '../lib/supabase'
import { useErrorHandler } from '@/composables/errorHandler'

// const theme = ref('light')
const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
const empresaStore = useEmpresaStore()
const verQR = ref(false)
const qrValue = ref('')
const drawer = ref(false)
const empresa = ref('')
const links = ref([])
const varios = ref([])
const items = ref([])

onMounted(() => {
  console.log(`Empresa: ${route.params.empresa}`);
  empresa.value = route.params.empresa;
  getEmpresa();
})

async function getEmpresa() {
  try {
    const { data, error } = await supabase
      .from('Empresa')
      .select('id, nombre')
      .eq('nombre', empresa.value)
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      empresaStore.empresa = data;
      links.value = [
        ["Inicio", "mdi-home", "/" + empresa.value + "/Inicio"],
        ["Menu", "mdi-library", "/" + empresa.value + "/Menu"],
        ["Contacto", "mdi-map-marker", "/" + empresa.value + "/Contacto"],
        ["Reservas", "mdi-calendar-month", "/" + empresa.value + "/Reserva"],
        ["Divider", "", ""],
        ["Ajustes", "mdi-cog", "/" + empresa.value + "/Ajustes"],
        ["Wi-Fi", "mdi-wifi", "/" + empresa.value + "/WiFi"],
      ]

      varios.value = [
        ["Acerca de InteliCarta...", "mdi-information", `/${empresa.value}/Acerca`],
      ]

      // items.value = [
      //   { text: 'Ajustes', icon: 'mdi-cog', path: `/${empresa.value}/Ajustes` },
      // ]

      router.replace(`/${data.nombre}/Inicio`);
    } else {
      router.push('/');
    }
  } catch (error) {
    router.push('/PageNotFound');
    console.log(`Error en getEmpresa: ${useErrorHandler(error)}`);
  }
}

watch(drawer, (newValue, oldValue) => {
  drawer.value = newValue
})

const getImage = computed(() => {
  
  return empresaStore.empresa.logo != '' ? empresaStore.empresa.logo : '@/assets/Empresa.png';
})

const getTitulo = computed(() => {
  //console.log(`Ruta: ${route.path}`);
  var view = route.path.replace('/' + route.params.empresa + '/', '');
  var titulo = '';

  switch (view) {
    case `/${route.params.empresa}`:
      titulo = route.params.empresa
      break;

    case 'Inicio':
      titulo = empresa.value;
      break;

    case 'Menu':
      titulo = 'Menú';
      break;

    case 'Contacto':
      titulo = 'Contacto';
      break;

    case 'Ajustes':
      titulo = 'Ajustes';
      break;

    case 'WiFi':
      titulo = 'Wi-Fi';
      break;

    case 'Acerca':
      titulo = 'Acerca de Intelicarta';
      break;

    case 'Reserva':
      titulo = 'Reservas';
      break;

    default:
      titulo = 'Menú';
      break;
  }
  return titulo;
})

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function generarQR() {
  qrValue.value = JSON.stringify(menuStore.pedido.map(({ id, cantidad }) => ({ id, cantidad })));
  verQR.value = true;
}

</script>