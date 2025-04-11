import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', () => {
    // Estados
    const items = ref([])

    // Getters

    // Actions

    return {
        items,
    }
})