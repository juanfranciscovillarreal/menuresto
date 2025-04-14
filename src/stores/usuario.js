import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUsuarioStore = defineStore('usuario', () => {
    // Estados
    const email = ref('')

    // Getters

    // Actions

    return {
        email,
    }
})