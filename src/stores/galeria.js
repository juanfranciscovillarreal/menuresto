import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useGaleriaStore = defineStore('galeria', () => {
    // Estados
    const fotos = ref([])

    // Getters

    // Actions

    return {
        fotos,
    }
})