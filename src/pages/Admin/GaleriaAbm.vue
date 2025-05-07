<template>
    <!-- Fotos -->
    <Galeria :esAbm="true"></Galeria>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

// Components
import Galeria from '@/components/Galeria.vue';

const router = useRouter()
const route = useRoute()
</script>