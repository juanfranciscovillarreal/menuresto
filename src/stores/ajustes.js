import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useAjustesStore = defineStore('ajustes', () => {
    // Estados
    const modo = ref('light')

    // Getters

    // Actions

    return {
        modo,
    }
})