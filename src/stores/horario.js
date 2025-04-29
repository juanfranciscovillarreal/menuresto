import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useHorarioStore = defineStore('horario', () => {
    // Estados
    const horarios = ref([])

    // Getters

    // Actions

    return {
        horarios,
    }
})