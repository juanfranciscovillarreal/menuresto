<template>
    <Categorias @some-event="filtrarMenu"></Categorias>

    <v-card variant="flat">
        <v-list class="pa-4">
            <v-list-item v-for="(item, index) in menuStore.menuFiltrado" style="padding: 0px; min-height: auto;">

                <!-- Categoría -->
                <v-list-subheader v-if="item.esCategoria" color="black" class="text-h6 font-weight-bold"
                    style="background-color:lightgrey;">
                    {{ item.title }}
                </v-list-subheader>

                <!-- Título -->
                <v-list-item-title v-if="!item.esCategoria" class="text-precio-2 pl-2">
                    {{ item.title }}
                </v-list-item-title>

                <!-- SubTítulo -->
                <!-- <v-list-item-subtitle v-if="!item.esCategoria" class="pl-2">
                    {{ item.precio }}
                </v-list-item-subtitle> -->

                <!-- Foto -->
                <!-- <template v-slot:prepend v-if="!item.esCategoria">
                    <v-avatar rounded="0" size="64">
                        <v-img
                            :src="item.photo">
                        </v-img>
                    </v-avatar>
                </template> -->

                <template v-slot:append v-if="!item.esCategoria">
                    <v-list-item-subtitle class="mr-2">
                        <!-- {{ $filters.toPesos(item.precio) }} -->
                        {{ item.precio }}
                    </v-list-item-subtitle>

                    <!-- Favorito -->
                    <v-list-item-action start>
                        <v-checkbox-btn v-model="item.favorito"
                            @change="favoritoChange(item)">
                        </v-checkbox-btn>
                        <!-- <v-checkbox v-model="item.favorito"></v-checkbox> -->
                    </v-list-item-action>

                    <!-- <v-btn size="x-small" variant="plain" :color="item.favorito ? 'red' : 'black'"
                        :icon="item.favorito ? 'mdi-heart' : 'mdi-heart-outline'"
                        @click="item.favorito = !item.favorito"></v-btn> -->

                    <!-- Cantidad -->
                    <!-- <v-badge color="transparent" :content="item.cantidad" inline>
                        <v-btn icon="mdi-minus" size="x-small" variant="text" @click="restarItem(item)"></v-btn>
                    </v-badge>
                    <v-btn icon="mdi-plus" size="x-small" variant="text" @click="sumarItem(item)"></v-btn> -->

                    <!-- Foto -->
                    <!-- <v-avatar rounded="0" size="64">
                        <v-img :src="item.photo">
                        </v-img>
                    </v-avatar> -->

                    <!-- <v-img :src="item.photo" class="text-right pa-2"
                            height="50" cover @click="toggle">
                            <v-btn :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
                        </v-img> -->

                    <v-btn @click="verDetalle(item)" icon="mdi-dots-horizontal" size="x-small" variant="text"></v-btn>
                    <!-- <v-btn icon="mdi-pencil" size="x-small" variant="tonal"></v-btn> -->
                </template>

            </v-list-item>
        </v-list>
    </v-card>

    <!-- Detalle -->
    <v-bottom-sheet v-model="dialog">
        <v-card>
            <v-toolbar>
                <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
            </v-toolbar>

            <v-card variant="flat">
                <v-img height="250" :src="dialogPhoto" cover></v-img>

                <v-card-item>
                    <v-card-title>{{ dialogTitle }}</v-card-title>

                    <v-card-subtitle>
                        <span class="me-1">{{ dialogSubTitle }}</span>

                        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                    </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                    <div>{{ dialogDescription }}
                    </div>
                </v-card-text>
            </v-card>
        </v-card>
    </v-bottom-sheet>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from "../stores/menu";
import { useCategoriasStore } from "../stores/categorias";

const categoriasStore = useCategoriasStore()
const menuStore = useMenuStore()
const router = useRouter()
const dialog = ref(false)
const dialogTitle = ref('')
const dialogSubTitle = ref('')
const dialogDescription = ref('')
const dialogPhoto = ref('')
const categoriaSeleccionada = ref(0)
const pesos = ref()

onMounted(() => {
    menuStore.menuFiltrado = menuStore.menuCompleto;
    categoriaSeleccionada.value = categoriasStore.seleccionada;
})

function verDetalle(item) {
    dialog.value = true;
    dialogTitle.value = item.title;
    dialogSubTitle.value = item.precio;
    dialogDescription.value = item.description;
    dialogPhoto.value = item.photo != '' ? item.photo : "data:image/png;base64,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";
}

function sumarItem(item) {
    if (item.cantidad > 8) {
        return;
    }
    item.cantidad++;
    item.favorito = true;
}

function restarItem(item) {
    if (item.cantidad < 1) {
        return;
    }
    item.cantidad--;
}

function filtrarMenu(toggle, id) {
    // console.log(`Categoría: ${categoriasStore.seleccionada}`);
    if (toggle) {
        toggle();
    }

    menuStore.menuFiltrado = menuStore.menuCompleto;
    if (id != 0) {
        menuStore.menuFiltrado = menuStore.menuCompleto.filter((item) => {
            return item.id_categoria == id;
        })
    }
    categoriasStore.seleccionada = id;
}

function favoritoChange(item){
    item.cantidad = item.favorito ? 1 : 0;
    item.subtotal = item.favorito ? item.precio : 0;
}

watch(() => categoriaSeleccionada.value, (newValue, oldQuestion) => {
    filtrarMenu(null, newValue);
})

</script>