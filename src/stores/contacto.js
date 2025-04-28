import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useContactoStore = defineStore('contacto', () => {
    // Estados
    const contactos = ref([])

    // Getters

    // Actions

    return {
        contactos,
    }
})