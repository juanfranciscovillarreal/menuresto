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

import { createMemoryHistory, createRouter } from 'vue-router'

import Inicio from '../pages/Inicio.vue'
import Menu from '../pages/Menu.vue'
import MenuDetalle from '../pages/MenuDetalle.vue'
import Favoritos from '../pages/Favoritos.vue'
import Orden from '../pages/Orden.vue'
import Principal from '../pages/Principal.vue'
import Contacto from '../pages/Contacto.vue'
import WiFi from '../pages/WiFi.vue'
import Casa from '../pages/Casa.vue'
import Ajustes from '../pages/Ajustes.vue'
import Acerca from '../pages/Acerca.vue'
import Pedido from '../pages/Pedido.vue'

const routes = [
  {
    path: '/',
    component: Casa,
    children: [
      {
        path: '/Inicio',
        component: Inicio,
      },
      {
        path: '/WiFi',
        component: WiFi,
      },
      {
        path: '/Contacto',
        component: Contacto,
      },
      {
        path: '/Ajustes',
        component: Ajustes,
      },
      {
        path: '/Acerca',
        component: Acerca,
      },
      {
        path: '/Principal',
        component: Principal,
        children: [
          {
            path: '/Menu',
            component: Menu,
            children: [
              {
                path: 'MenuDetalle/:id',
                component: MenuDetalle,
              },
            ]
          },
          {
            path: '/Favoritos',
            component: Favoritos,
          },
          {
            path: '/Orden',
            component: Orden,
          },
          {
            path: '/Pedido',
            component: Pedido,
          },
        ],
      },
    ],
  },
  // {
  //   path: '/MenuDetalle/:id',
  //   component: MenuDetalle,
  // },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // console.log(`BeforeEach: ${JSON.stringify(to)}`);
  if (to.path == '/Inicio') {
    // console.log('Inicio');
  }
  next();

  //   try {
  //     next();
  //     if (to.name == null) { // La ruta no existe
  //       return { name: 'Inicio' }
  //       //   if(from.name == 'Inicio'){ // NavigationDuplicated
  //       //     return false;
  //       //   }
  //       //   else{
  //       //     router.push('/');
  //       //     console.log(`La ruta ${to.path} no existe!`)
  //       //   }
  //     }
  //     else {
  //       next();
  //     }
  //   } catch (error) {
  //     console.log(`Error en router: ${error}`)
  //   }
})

export default router