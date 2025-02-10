<template>
    <v-bottom-navigation v-model="value" grow height="65">
        <v-btn @click="router.push('/Menu')">
            <v-icon>mdi-library</v-icon>
            Menu
        </v-btn>

        <v-btn @click="router.push('/Pedido')">
            <v-badge v-if="menuStore.total > 0" color="success" dot>
                <v-icon>mdi-receipt-text-outline</v-icon>
            </v-badge>
            <v-icon v-else="menuStore.total = 0">mdi-receipt-text-outline</v-icon>
            Pedido
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useMenuStore } from "../stores/menu";

const router = useRouter()
const route = useRoute()
const value = ref(0)
const menuStore = useMenuStore()

onMounted(() => {
    if (route.path.includes('MenuDetalle')) {
        // console.log(route.path)
    }
})

</script>