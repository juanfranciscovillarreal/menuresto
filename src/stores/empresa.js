import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useEmpresaStore = defineStore('empresa', () => {
    // Estados
    const empresa = ref({
        id:'',
        nombre:'',
        descripcion:'',
        direccion:'',
        telefono:'',
        celular:'',
        web:'',
        logo:'',
        email:'',        
    })

    // Getters

    // Actions

    return {
        empresa,
    }
})