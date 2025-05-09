<template>
    <ToolBar titulo="Sugerencias" ruta="/Administracion"></ToolBar>
    <!-- Fotos -->
    <!-- <Galeria :esAbm="true"></Galeria> -->
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
// Components
import ToolBar from '@/components/ToolBar.vue';
// import Galeria from '@/components/Galeria.vue';

const router = useRouter()
const route = useRoute()
</script>