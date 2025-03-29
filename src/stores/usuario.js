import { defineStore } from 'pinia'

export const useUsuarioStore = defineStore('usuario', () => {
    // Estados
    const email = ref('')

    // Getters

    // Actions

    return {
        email,
    }
})