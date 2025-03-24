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

import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import Inicio from '../pages/Inicio.vue'
import Principal from '../pages/Principal.vue'
import Contacto from '../pages/Contacto.vue'
import WiFi from '../pages/WiFi.vue'
import Home from '../pages/Home.vue'
import Ajustes from '../pages/Ajustes.vue'
import Acerca from '../pages/Acerca.vue'
import Pedido from '../pages/Pedido.vue'
import LeerQR from '../pages/LeerQR.vue'
import Menu from '../pages/Menu.vue'
import Reserva from '../pages/Reserva.vue'
import Land from '../pages/Land.vue'
import PageNotFound from '../pages/PageNotFound.vue'
import Login from '../pages/Login.vue'
import SignUp from '../pages/SignUp.vue'
import ForgotPass from '../pages/ForgotPass.vue'
import Administracion from '../pages/Administracion.vue'
import Categoria from '../pages/Categoria.vue'
import Item from '@/pages/Item.vue'
import NewPass from '@/pages/NewPass.vue'
import Empresa from '@/pages/Empresa.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: PageNotFound,
  },
  {
    path: '/',
    component: Land,
    children: [  
    ]
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
    path: '/Menu/:empresa',
    component: Home,
   // redirect: '/:empresa/Inicio',
    children: [
      {
        path: '/:empresa/Inicio',
        component: Inicio,
      },
      {
        path: '/:empresa/WiFi',
        component: WiFi,
      },
      {
        path: '/:empresa/Contacto',
        component: Contacto,
      },
      {
        path: '/:empresa/Ajustes',
        component: Ajustes,
      },
      {
        path: '/:empresa/Acerca',
        component: Acerca,
      },
      {
        path: '/:empresa/Reserva',
        component: Reserva,
      },
      {
        path: '/:empresa/Principal',
        component: Principal,
        children: [
          {
            path: '/:empresa/Menu',
            component: Menu,
          },
          {
            path: '/:empresa/Pedido',
            component: Pedido,
          },
          {
            path: '/:empresa/LeerQR',
            component: LeerQR,
          },
        ],
      },
    ],
  }
]

const router = createRouter({
  // history: createMemoryHistory(),
  history: createWebHistory(),
  routes,
})

router.onError((error) => {
  console.log(`Router error: ${error.message}`);
})

router.beforeEach((to, from) => {
  // explicitly return false to cancel the navigation
  // return false
})


export default router