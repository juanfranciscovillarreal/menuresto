<template>
    <v-bottom-navigation v-model="value" grow height="65" v-if="route.path != '/LeerQR'">
        <v-btn @click="goTo('Menu')">
            <v-icon>mdi-library</v-icon>
            Menu
        </v-btn>

        <v-btn @click="goTo('Pedido')">
            <v-badge v-if="menuStore.total > 0" color="success" dot>
                <v-icon>mdi-receipt-text-outline</v-icon>
            </v-badge>
            <v-icon v-else="menuStore.total = 0">mdi-receipt-text-outline</v-icon>
            Pedido
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
// Composables
import { useAplicacion } from '@/composables/aplicacion';
// Stores
import { useEmpresaStore } from "@/stores/empresa";
import { useMenuStore } from "@/stores/menu";

const router = useRouter()
const route = useRoute()
const value = ref(0)
// Composables
const { nombreApp } = useAplicacion();
// Stores
const empresaStore = useEmpresaStore()
const menuStore = useMenuStore()

onMounted(() => {

})

function goTo(opcion) {
    let empresa = empresaStore.empresa.nombre;
    let root = `/${nombreApp.value}/${empresa}/Principal`;
    router.push(`${root}/${opcion}`);
}
</script>
