import { defineStore } from 'pinia'

export const useAjustesStore = defineStore('ajustes', () => {
    // Estados
    const modo = ref('light')

    // Getters

    // Actions

    return {
        modo,
    }
})