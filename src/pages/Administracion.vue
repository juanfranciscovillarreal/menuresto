<template>
  <v-app-bar color="primary" :absolute="false">
    <!-- Botón Menú Principal -->
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>

    <!-- Título App -->
    <v-toolbar-title></v-toolbar-title>

    <!-- Espacio -->
    <v-spacer></v-spacer>

    <!-- Menú Cuenta Usuario -->
    <Usuario :nombre="empresaStore.empresa.nombre" :email="usuarioStore.email">
    </Usuario>

  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <!-- Logo -->
    <v-card elevation="0" rounded="0" class="pa-2">
      <v-img aspect-ratio="16/9" :src="getImage()" cover>
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

      <!-- Cerrar sesión -->
      <v-list-item link @click="signOutSession()">
        <template v-slot:prepend>
          <v-icon icon="mdi-logout"></v-icon>
        </template>
        <v-list-item-title>Cerrar sesión</v-list-item-title>
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
    <FloatingButtons></FloatingButtons>
  </v-main>

</template>

<script setup>
import { ref, watch } from 'vue'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Components
import Usuario from "../components/Usuario.vue";
import FloatingButtons from '@/components/FloatingButtons.vue';

// Composables
import { useAuth } from '../composables/auth';
import { useErrorHandler } from '@/composables/errorHandler'

// Stores
import { useMenuStore } from "../stores/menu";
import { useUsuarioStore } from "../stores/usuario";
import { useEmpresaStore } from "../stores/empresa";
import { useAuthStore } from "../stores/auth";

// Assets
import imgUrl from '../assets/InteliCarta.png'

const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
const usuarioStore = useUsuarioStore()
const empresaStore = useEmpresaStore()
const drawer = ref(false)
const links = ref([
  ["Inicio", "mdi-home", "/Administracion"],
  ["Categorias", "mdi-format-list-text", "/Categoria"],
  ["Items", "mdi-order-bool-descending-variant", "/Item"],
  ["Menu", "mdi-silverware-variant", "/MenuAbm"],
  ["Divider", "", ""],
  ["Configuracion", "mdi-cog", "/Configuracion"],
])

const varios = ref([
  ["Acerca de InteliCarta...", "mdi-information", '/Acerca'],
])

// Stores
const authStore = useAuthStore();

// Composables
const { signOut } = useAuth();

onMounted(() => {
})

watch(drawer, (newValue, oldValue) => {
  drawer.value = newValue
})

function getImage() {
  if (empresaStore.empresa.logo == '') {
    empresaStore.empresa.logo = imgUrl;
  }

  return empresaStore.empresa.logo;
}

async function signOutSession() {
  try {
    authStore.setSession(null);
    signOut();

    router.push('/');

    if (error) throw error
  } catch (error) {
    console.log(`Error en signOut: ${useErrorHandler(error)}`);
  }
}

</script>