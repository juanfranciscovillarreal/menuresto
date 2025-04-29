<template>
  <v-app-bar color="primary" :absolute="false">
    <!-- Botón Menú Principal -->
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <!-- <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"
      v-if="route.path.includes('/Inicio') || route.path == `/${empresa}`">
    </v-app-bar-nav-icon> -->

    <!-- <v-btn v-if="route.path != `/${empresa}/Inicio` && route.path != `/${empresa}`" icon>
      <v-icon @click="router.push(`/${empresa}/Inicio`)">mdi-arrow-left</v-icon>
    </v-btn> -->

    <!-- Volver -->
    <!-- <v-btn v-if="route.path == `/${empresa}/LeerQR`" icon>
      <v-icon @click="router.push(`/${empresa}/Pedido`)">
        mdi-arrow-left
      </v-icon>
    </v-btn> -->

    <!-- Título App -->
    <v-toolbar-title>{{ empresa }}</v-toolbar-title>
    <!-- <v-toolbar-title>{{ getTitulo }}</v-toolbar-title> -->

    <!-- Tema -->
     <BtnTheme v-if="route.path.includes('/Inicio')"/>

    <!-- Espacio -->
    <!-- <v-spacer v-if="route.path == `/${empresa}/Menu`"></v-spacer> -->

    <!-- Generar QR -->
    <!-- <v-btn v-if="route.path == `/${empresa}/Pedido`" icon>
      <v-icon @click="generarQR()">mdi-share</v-icon>
    </v-btn> -->

    <!-- Leer QR -->
    <!-- <v-btn v-if="route.path == `/${empresa}/Pedido`" icon>
      <v-icon @click="router.push('/LeerQR')">mdi-qrcode-scan</v-icon>
    </v-btn> -->

    <!-- Buscar -->
    <Buscar />

    <!-- Expandir / Contraer -->
    <v-btn v-if="route.path.includes('/Menu')" icon>
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

        <!--vue-qrcode v-if="menuStore.pedido.length > 0" :value="qrValue" :width="300" type="image/png"
          :color="{ dark: '#000000ff' }" :margin="6" :scale="4" /-->
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
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

//import VueQrcode from 'vue-qrcode';
// Components
import BtnTheme from '@/components/BtnTheme.vue';
import Buscar from '@/components/Buscar.vue';
// Composables
import { useErrorHandler } from '@/composables/errorHandler'
import { useEmpresa } from '@/composables/empresa';
import { useCategoria } from '@/composables/categorias';
import { useMenu } from '@/composables/menu';
import { useAplicacion } from '@/composables/aplicacion';
import { useContacto } from '@/composables/contacto';
import { useHorario } from '@/composables/horario';
// Stores
import { useCategoriasStore } from "@/stores/categorias";
import { useMenuStore } from "@/stores/menu";
import { useEmpresaStore } from "@/stores/empresa";
import { useContactoStore } from "@/stores/contacto";
import { useHorarioStore } from "@/stores/horario";

// Composables
const { getEmpresaPorNombre } = useEmpresa();
const { getCategorias } = useCategoria();
const { getMenu } = useMenu();
const { getContacto } = useContacto();
const { getHorario } = useHorario();
const { nombreApp } = useAplicacion();

const router = useRouter()
const route = useRoute()
const verQR = ref(false)
const qrValue = ref('')
const drawer = ref(false)
const empresa = ref('')
const links = ref([])
const varios = ref([])

// Stores
const categoriasStore = useCategoriasStore()
const menuStore = useMenuStore()
const empresaStore = useEmpresaStore()
const contactoStore = useContactoStore()
const horarioStore = useHorarioStore()

onMounted(async () => {
  empresa.value = route.params.empresa;
  await getEmpresaPorNombreData();
  await getContactoData();
  await getHorarioData();
  await getCategoriasData();
  await getMenuData();
})

async function getEmpresaPorNombreData() {
  try {
    await getEmpresaPorNombre(empresa.value)
      .then((data) => {
        if (data) {
          empresaStore.empresa = data;
          let root = `/${nombreApp.value}/${empresa.value}`;
          links.value = [
            ["Inicio", "mdi-home", `${root}/Inicio`],
            ["Menu", "mdi-library", `${root}/Principal`],
            ["Contacto", "mdi-map-marker", `${root}/Contacto`],
            ["Reservas", "mdi-calendar-month", `${root}/Reserva`],
            ["Divider", "", ""],
            ["Ajustes", "mdi-cog", `${root}/Ajustes`],
            ["Wi-Fi", "mdi-wifi", `${root}/WiFi`],
          ]

          varios.value = [
            ["Acerca de InteliCarta...", "mdi-information", `${root}/Acerca`],
          ]

          router.push(`${root}/Inicio`);
        } else {
          router.push('/');
        }

      });
  } catch (error) {
    router.push('/PageNotFound');
    console.log(`Error en getEmpresa: ${useErrorHandler(error)}`);
  }
}

async function getCategoriasData() {
  // TODO: ver si se puede usar una vista parametrizada o procedimiento almacenado
  //       en lugar de consultar directamente la tabla
  await getCategorias(empresaStore.empresa.id)
    .then((data) => {
      data.unshift({
        id: 0,
        nombre: "Todos"
      });
      categoriasStore.categorias = data;
    });
}

async function getMenuData() {
  await getMenu(empresaStore.empresa.id)
    .then((data) => {
      if (menuStore.pedido.length == 0) {
        // Cargo el menú completo si no hay un pedido hecho
        menuStore.menuCompleto = data;
      }
    });
}

async function getContactoData() {
  await getContacto(empresaStore.empresa.id)
    .then((data) => {
      contactoStore.contactos = data;
    });
}

async function getHorarioData() {
  await getHorario(empresaStore.empresa.id)
    .then((data) => {
      horarioStore.horarios = data;
    });
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

function generarQR() {
  qrValue.value = JSON.stringify(menuStore.pedido.map(({ id, cantidad }) => ({ id, cantidad })));
  verQR.value = true;
}

</script>