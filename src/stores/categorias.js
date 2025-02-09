import { defineStore } from 'pinia'

export const useCategoriasStore = defineStore('categorias', () => {
    // Estados
    const categorias = ref([
        ["0", "Todos", "mdi-account-school"],
        ["1", "Entradas", "mdi-account-school"],
        ["2", "Pastas", "mdi-chair-school"],
        ["3", "Tablas", "mdi-numeric-10-box-outline"],
        ["4", "Platos principales", "mdi-account-box"],
        ["5", "Pizzas", "mdi-human-male-board"],
        ["6", "Sandwiches", "mdi-calendar"],
        ["7", "Ensaladas", "mdi-account-plus"],
        ["8", "Niños", "mdi-account-minus"],
        ["9", "Postres", "mdi-email"],
        ["10", "Café", "mdi-account-alert"],
        ["11", "Bebidas", "mdi-trending-up"],
        ["12", "Cervezas", "mdi-trending-up"],
        ["13", "Vinos", "mdi-trending-up"],
    ],)

    const seleccionada = ref(0)

    // Getters

    // Actions

    return {
        categorias,
        seleccionada
    }
})