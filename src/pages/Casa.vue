<template>
  <v-app-bar color="primary" :absolute="false">
    <!-- Botón Menú Principal -->
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="route.path != '/LeerQR'"></v-app-bar-nav-icon>

    <!-- Título App -->
    <v-btn v-if="route.path == '/LeerQR'" icon>
      <v-icon @click="router.push('/Pedido')">
        mdi-arrow-left
      </v-icon>
    </v-btn>

    <v-toolbar-title>{{getTitulo}}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="route.path == '/Pedido'" icon>
      <v-icon @click="generarQR()">mdi-share</v-icon>
    </v-btn>

    <v-btn v-if="route.path == '/Pedido'" icon>
      <v-icon @click="router.push('/LeerQR')">mdi-qrcode-scan</v-icon>
    </v-btn>

    <!-- Cerrar búsqueda-->
    <v-btn v-if="buscar == true && route.path == '/Menu'" icon>
      <v-icon @click="buscar = false">mdi-close</v-icon>
    </v-btn>

    <!-- Buscar -->
    <v-menu transition="slide-x-reverse-transition">
      <template v-slot:activator="{ props }">
        <!-- Texto a buscar -->
        <v-text-field v-if="buscar == true && route.path == '/Menu'" hide-details single-line placeholder="Buscar"
          append-inner-icon="mdi-magnify">
        </v-text-field>

        <!-- Botón Buscar -->
        <v-btn v-bind="props" v-if="buscar == false && route.path == '/Menu'" icon="mdi-magnify" variant="text"
          @click="buscar = true">
        </v-btn>

        <!-- Tema Claro/Oscuro -->
        <!-- <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" slim @click="onClick">
        </v-btn> -->
      </template>
    </v-menu>

    <!-- Menú Vertical -->
    <v-menu>
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

    </v-menu>

  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <!-- Logo -->
    <v-card rounded="0" class="pa-2">
      <v-img aspect-ratio="16/9" src="../assets/Suss.png" cover>
      </v-img>
    </v-card>

    <v-divider></v-divider>

    <!-- Links -->
    <v-list :lines="false" density="compact" nav>
      <v-list-item v-for="[text, icon, link] in links" :key="icon" :to="link" link>
        <template v-slot:prepend>
          <v-icon :icon="icon"></v-icon>
        </template>

        <v-list-item-title v-text="text"></v-list-item-title>

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
import { ref } from 'vue'
import VueQrcode from 'vue-qrcode';

// const theme = ref('light')
const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
const buscar = ref(false)
const verQR = ref(false)
const qrValue = ref('')

const drawer = ref(false)
const links = ref([
  ["Inicio", "mdi-home", "/Inicio"],
  ["Menu", "mdi-library", "/Menu"],
  ["Contacto", "mdi-map-marker", "/Contacto"],
  ["Wi-Fi", "mdi-wifi", "/WiFi"],
],)

const varios = ref([
  ["Acerca de InteliCarta...", "mdi-information", "/Acerca"],
],)

const items = ref([
  { text: 'Ajustes', icon: 'mdi-cog', path: '/Ajustes' },
])

onMounted(() => {
  router.push('Inicio');
})

watch(drawer, (newValue, oldValue) => {
  drawer.value = newValue
})

const getTitulo = computed(() => {
  return route.path != '/LeerQR' ? 'Menú' : 'Leer QR'
})

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function generarQR() {
  qrValue.value = JSON.stringify(menuStore.pedido.map(({ id, cantidad }) => ({ id, cantidad })));
  verQR.value = true;
}

</script>