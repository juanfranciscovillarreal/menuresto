import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  // Estados
  const count = ref(0)
  const total = ref(0)

  const menuFiltrado = ref([])
  const menuCompleto = ref([
    { id: 1, esCategoria: true, id_categoria: 1, title: 'Entradas', precio: '', subtotal: 0, cantidad: 0, favorito: false, photo: '' },
    { id: 2, esCategoria: false, id_categoria: 1, title: 'Papas Fritas', precio: '10000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg' },
    { id: 3, esCategoria: false, id_categoria: 1, title: 'Rabas', precio: '8000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.clarin.com/img/1969/12/31/HJxb_FuAQe_1256x620__1.jpg' },
    { id: 4, esCategoria: true, id_categoria: 3, title: 'Tablas', precio: '', subtotal: 0, cantidad: 0, favorito: false, photo: '' },
    { id: 5, esCategoria: false, id_categoria: 3, title: 'Para 2 peronas', precio: '10000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg' },
    { id: 6, esCategoria: false, id_categoria: 3, title: 'Para 4 personas', precio: '8000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.clarin.com/img/1969/12/31/HJxb_FuAQe_1256x620__1.jpg' },
    { id: 7, esCategoria: false, id_categoria: 1, title: 'Entradas', precio: '', subtotal: 0, cantidad: 0, favorito: false, photo: '' },
    { id: 8, esCategoria: false, id_categoria: 1, title: 'Papas Fritas', precio: '10000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg' },
    { id: 9, esCategoria: false, id_categoria: 1, title: 'Rabas', precio: '8000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.clarin.com/img/1969/12/31/HJxb_FuAQe_1256x620__1.jpg' },
    { id: 10, esCategoria: false, id_categoria: 1, title: 'Entradas', precio: '', subtotal: 0, cantidad: 0, favorito: false, photo: '' },
    { id: 11, esCategoria: false, id_categoria: 1, title: 'Papas Fritas', precio: '10000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg' },
    { id: 12, esCategoria: false, id_categoria: 1, title: 'Rabas', precio: '8000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.clarin.com/img/1969/12/31/HJxb_FuAQe_1256x620__1.jpg' },
    { id: 13, esCategoria: false, id_categoria: 1, title: 'Entradas', precio: '', subtotal: 0, cantidad: 0, favorito: false, photo: '' },
    { id: 14, esCategoria: false, id_categoria: 1, title: 'Papas Fritas', precio: '10000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg' },
    { id: 15, esCategoria: false, id_categoria: 1, title: 'Rabas', precio: '8000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.clarin.com/img/1969/12/31/HJxb_FuAQe_1256x620__1.jpg' },
    { id: 16, esCategoria: false, id_categoria: 1, title: 'Entradas', precio: '', subtotal: 0, cantidad: 0, favorito: false, photo: '' },
    { id: 17, esCategoria: false, id_categoria: 1, title: 'Papas Fritas', precio: '10000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg' },
    { id: 18, esCategoria: false, id_categoria: 1, title: 'Rabas', precio: '8000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.clarin.com/img/1969/12/31/HJxb_FuAQe_1256x620__1.jpg' },
    { id: 19, esCategoria: false, id_categoria: 1, title: 'Entradas', precio: '', subtotal: 0, cantidad: 0, favorito: false, photo: '' },
    { id: 20, esCategoria: false, id_categoria: 1, title: 'Papas Fritas', precio: '10000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg' },
    { id: 21, esCategoria: false, id_categoria: 1, title: 'Rabas', precio: '8000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.clarin.com/img/1969/12/31/HJxb_FuAQe_1256x620__1.jpg' },
    { id: 22, esCategoria: false, id_categoria: 1, title: 'Entradas', precio: '', subtotal: 0, cantidad: 0, favorito: false, photo: '' },
    { id: 23, esCategoria: false, id_categoria: 1, title: 'Papas Fritas', precio: '10000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg' },
    { id: 24, esCategoria: false, id_categoria: 1, title: 'Rabas', precio: '8000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.clarin.com/img/1969/12/31/HJxb_FuAQe_1256x620__1.jpg' },
    { id: 25, esCategoria: false, id_categoria: 1, title: 'Entradas', precio: '', subtotal: 0, cantidad: 0, favorito: false, photo: '' },
    { id: 26, esCategoria: false, id_categoria: 1, title: 'Papas Fritas', precio: '10000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg' },
    { id: 27, esCategoria: false, id_categoria: 1, title: 'Rabas', precio: '8000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://www.clarin.com/img/1969/12/31/HJxb_FuAQe_1256x620__1.jpg' },
    { id: 28, esCategoria: true, id_categoria: 2, title: 'pastas', precio: '', subtotal: 0, cantidad: 0, favorito: false, photo: '' },
    { id: 29, esCategoria: false, id_categoria: 2, title: 'Ravioles', precio: '20000.50', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://images.getrecipekit.com/20220119164123-ravioles-de-verdura-con-salsa-rosa.png' },
    { id: 30, esCategoria: false, id_categoria: 2, title: 'Ñoquis', precio: '18000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://cocinalocal.cl/wp-content/uploads/2022/11/Noquis-de-papa-italianos.jpeg' },
    { id: 31, esCategoria: false, id_categoria: 2, title: 'Cookies', precio: '6000.00', subtotal: 0, cantidad: 0, favorito: false, photo: 'https://i.ytimg.com/vi/g9mKC-lx70A/maxresdefault.jpg' },
  ])
  const pedido = ref([])

  // Getters
  const duplicar = computed(() => count.value * 2)

  // Actions
  function incrementar() {
    count.value++
  }

  return {
    count,
    total,
    menuFiltrado,
    menuCompleto,
    pedido,
    duplicar,
    incrementar
  }
})

// export const useCounterStore = defineStore('counter', {
//   state: () => ({ count: 0, name: 'Eduardo' }),
//   getters: {
//     doubleCount: (state) => state.count * 2,
//   },
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
// })