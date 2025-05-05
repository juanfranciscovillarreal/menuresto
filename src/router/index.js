/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
// import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: setupLayouts(routes),
// })

// // Workaround for https://github.com/vitejs/vite/issues/11804
// router.onError((err, to) => {
//   if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
//     if (!localStorage.getItem('vuetify:dynamic-reload')) {
//       console.log('Reloading page to fix dynamic import error')
//       localStorage.setItem('vuetify:dynamic-reload', 'true')
//       location.assign(to.fullPath)
//     } else {
//       console.error('Dynamic import error, reloading page did not fix it', err)
//     }
//   } else {
//     console.error(err)
//   }
// })

// router.isReady().then(() => {
//   localStorage.removeItem('vuetify:dynamic-reload')
// })

// export default router

import { createMemoryHistory, createWebHistory, createWebHashHistory, createRouter } from 'vue-router'
// Composables
import { useAuth } from '@/composables/auth';
import { useAplicacion } from '@/composables/aplicacion';
// Stores
import { useAuthStore } from "@/stores/auth";
import { useEmpresaStore } from "@/stores/empresa";
// App Pages
import AcercaApp from '@/pages/App/Acerca.vue'
import Ajustes from '@/pages/App/Ajustes.vue'
import Contacto from '@/pages/App/Contacto.vue'
import Home from '@/pages/App/Home.vue'
import Inicio from '@/pages/App/Inicio.vue'
import LeerQR from '@/pages/App/LeerQR.vue'
import Menu from '@/pages/App/Menu.vue'
import Pedido from '@/pages/App/Pedido.vue'
import Principal from '@/pages/App/Principal.vue'
import Reserva from '@/pages/App/Reserva.vue'
import WiFi from '@/pages/App/WiFi.vue'
import Galeria from '@/pages/App/Galeria.vue'
// Admin Pages
import Acerca from '@/pages/Admin/Acerca.vue'
import Administracion from '@/pages/Admin/Administracion.vue'
import Categoria from '@/pages/Admin/Categoria.vue'
import Empresa from '@/pages/Admin/Empresa.vue'
import ForgotPass from '@/pages/Admin/ForgotPass.vue'
import GaleriaAbm from '@/pages/Admin/GaleriaAbm.vue'
import Item from '@/pages/Admin/Item.vue'
import Land from '@/pages/Admin/Land.vue'
import Login from '@/pages/Admin/Login.vue'
import MenuAbm from '@/pages/Admin/MenuAbm.vue'
import NewPass from '@/pages/Admin/NewPass.vue'
import PageNotFound from '@/pages/Admin/PageNotFound.vue'
import SignUp from '@/pages/Admin/SignUp.vue'

// Composables
const { nombreApp } = useAplicacion();
const { getSession } = useAuth();
const rootMenu = `/${nombreApp.value}/:empresa`;
const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: PageNotFound,
  },
  // Site
  {
    path: '/',
    component: Land,
  },
  {
    path: '/Login',
    component: Login,
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/forgotPass',
    name: 'ForgotPass',
    component: ForgotPass,
  },
  {
    path: '/newPass',
    name: 'NewPass',
    component: NewPass,
  },
  {
    path: '/administracion',
    name: 'Administracion',
    component: Administracion,
    meta: { requiresAuth: true },
    children: [
    ]
  },
  {
    path: '/categoria',
    name: 'Categoria',
    component: Categoria,
  },
  {
    path: '/item',
    name: 'Item',
    component: Item,
  },
  {
    path: '/empresa',
    name: 'Empresa',
    component: Empresa,
  },
  {
    path: '/menuabm',
    name: 'MenuAbm',
    component: MenuAbm,
  },
  {
    path: '/galeriaabm',
    component: GaleriaAbm,
  },
  {
    path: '/acerca',
    component: Acerca,
  },
  // App
  {
    path: rootMenu,
    component: Home,
    children: [
      {
        path: `${rootMenu}/Inicio`,
        component: Inicio,
      },
      {
        path: `${rootMenu}/WiFi`,
        component: WiFi,
      },
      {
        path: `${rootMenu}/Contacto`,
        component: Contacto,
      },
      {
        path: `${rootMenu}/Galeria`,
        component: Galeria,
      },
      {
        path: `${rootMenu}/Ajustes`,
        component: Ajustes,
      },
      {
        path: `${rootMenu}/Acerca`,
        component: AcercaApp,
      },
      {
        path: `${rootMenu}/Reserva`,
        component: Reserva,
      },
      {
        path: `${rootMenu}/Principal`,
        component: Principal,
        redirect: `${rootMenu}/Principal/Menu`,
        children: [
          {
            path: `${rootMenu}/Principal/Menu`,
            component: Menu,
          },
          {
            path: `${rootMenu}/Principal/Pedido`,
            component: Pedido,
          },
          {
            path: `${rootMenu}/Principal/LeerQR`,
            component: LeerQR,
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: process.env.NODE_ENV === 'production' ? createWebHashHistory() : createWebHistory(),
  routes,
})

router.onError((error) => {
  console.log(`Router error: ${error.message}`);
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  const empresaStore = useEmpresaStore();

  await getSession().then((session) => {
    authStore.setSession(session.value);
  });


  if (to.meta.requiresAuth && !authStore.session) {
    next("/LogIn");
  } else {
    next();
  }
});
export default router