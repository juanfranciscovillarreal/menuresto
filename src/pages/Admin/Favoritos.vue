<template>
    <v-card variant="flat" class="mx-auto">
        <v-list>
            <v-list-item v-for="(item, index) in menu" style="padding: 0px; min-height: auto;">

                <!-- Categoría -->
                <v-list-subheader v-if="item.subtitle == ''" color="black" class="text-h6 font-weight-bold"
                    style="background-color:lightgrey;">
                    {{ item.title }}
                </v-list-subheader>

                <!-- Título -->
                <v-list-item-title v-if="item.subtitle != ''" class="text-subtitle-2 pl-2">
                    {{ item.title }}
                </v-list-item-title>

                <!-- SubTítulo -->
                <v-list-item-subtitle v-if="item.subtitle != ''" class="pl-2">
                    {{ item.subtitle }}
                </v-list-item-subtitle>

                <!-- Foto -->
                <template v-slot:prepend v-if="item.subtitle != ''">
                    <v-avatar rounded="0" size="64">
                        <v-img
                            src="https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg"></v-img>
                    </v-avatar>
                </template>

                <template v-slot:append v-if="item.subtitle != ''">
                    <!-- Favorito -->
                    <v-btn size="x-small" :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"
                        @click="isSelected = !isSelected"></v-btn>

                    <!-- Cantidad -->
                    <!-- <v-badge color="transparent" :content="item.cantidad" inline>
                        <v-btn icon="mdi-minus" size="x-small" variant="text"></v-btn>
                    </v-badge>
                    <v-btn icon="mdi-plus" size="x-small" variant="text"></v-btn> -->

                    <!-- Foto -->
                    <!-- <v-avatar rounded="0" size="64">
                        <v-img :src="item.photo">
                        </v-img>
                    </v-avatar> -->

                    <!-- <v-img :src="item.photo" class="text-right pa-2"
                            height="50" cover @click="toggle">
                            <v-btn :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
                        </v-img> -->

                    <v-btn @click="verDetalle(item)" icon="mdi-chevron-right" size="x-small" variant="text"></v-btn>
                    <!-- <v-btn icon="mdi-pencil" size="x-small" variant="tonal"></v-btn> -->
                </template>

            </v-list-item>
        </v-list>
    </v-card>
    
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const menu = ref([
    { id: 2, title: 'Papas Fritas', subtitle: '$10.000,00', cantidad: 0, photo: 'https://www.cocinaygastronomia.com/wp-content/uploads/2012/03/photodune-1669472-french-fries-xs.jpg' },
    { id: 5, title: 'Ravioles', subtitle: '$20.000,00', cantidad: 0, photo: 'https://images.getrecipekit.com/20220119164123-ravioles-de-verdura-con-salsa-rosa.png' },
])

const isSelected = ref(false)

function verDetalle(item) {
    router.push("/MenuDetalle/" + item.id);
}
</script>