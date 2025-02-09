<template>
    <v-bottom-navigation v-model="value" grow height="65">
        <v-btn @click="router.push('/Menu')">
            <v-icon>mdi-library</v-icon>
            Menu
        </v-btn>

        <!-- <v-btn @click="router.push('Favoritos')">
            <v-badge color="success" content="2">
                <v-icon>mdi-heart</v-icon>
            </v-badge>
            Favoritos
        </v-btn> -->

        <v-btn @click="router.push('/Pedido')">
            <v-badge color="success" dot>
                <v-icon>mdi-receipt-text-outline</v-icon>
            </v-badge>
            Orden
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const value = ref(0)

onMounted(() => {
    if (route.path.includes('MenuDetalle')) {
        // console.log(route.path)
    }
})

</script>