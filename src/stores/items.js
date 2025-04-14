import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useItemsStore = defineStore('items', () => {
    // Estados
    const items = ref([])

    // Getters

    // Actions

    return {
        items,
    }
})