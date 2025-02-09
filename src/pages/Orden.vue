
<template>
    <v-data-table hide-default-footer :fixed-header="true" :headers="headers" :items="orden"
        no-data-text="Realice la selección en el menú para generar la Orden"
        :sort-by="[{ key: 'descripcion', order: 'asc' }]" density="compact">

        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title class="text-6">Orden</v-toolbar-title>
            </v-toolbar>
        </template>

        <!-- Desscripción -->
        <template v-slot:item.descripcion="{ value }">
            <span style="font-size: 10pt;">{{ value }}</span>
        </template>

        <!-- Cantidad -->
        <template v-slot:item.cantidad="{ item }">
            <div>
                <v-badge color="transparent" :content="item.cantidad" inline>
                    <v-btn icon="mdi-minus" size="x-small" variant="text" @click="restarItem(item)"></v-btn>
                </v-badge>
                <v-btn icon="mdi-plus" size="x-small" variant="text" @click="sumarItem(item)"></v-btn>
            </div>
        </template>

        <!-- <template v-slot:item.cantidad="{ item }">
            <Cantidad></Cantidad>
        </template> -->

        <!-- Subtotal -->
        <template v-slot:item.subtotal="{ value }">
            <span style="font-size: 10pt;">{{ value }}</span>
        </template>

        <!-- Borar -->
        <template v-slot:item.actions="{ item }">
            <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>

        <!-- Total -->
        <template v-slot:body.append>
            <tr class="sticky-table-footer text-subtitle-1">
                <td v-text="'Total'"></td>
                <td></td>
                <td v-text="total" style="text-align: end;"></td>
                <td></td>
            </tr>
        </template>

    </v-data-table>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from "../stores/menu";
import Cantidad from '@/components/Cantidad.vue';

const router = useRouter()
const menuStore = useMenuStore()
const orden = ref([])
const itemIndex = ref(-1)
const headers = ref([
    {
        title: 'Descripción',
        align: 'start',
        sortable: false,
        key: 'title',
        class: "text-h6"
    },
    { title: 'Cantidad', align: 'center', key: 'cantidad', sortable: false, },
    // { title: 'Precio', align: 'end', key: 'precio', sortable: false },
    { title: 'Importe', align: 'end', key: 'subtotal', sortable: false },
    { title: '', key: 'actions', sortable: false },
])

const total = ref(0)

onMounted(() => {
    orden.value = menuStore.menuCompleto.filter((item) => {
        return item.favorito == true;
    })
    totalizar();
})

function sumarItem(item) {
    if (item.cantidad > 9) {
        return;
    }
    item.cantidad++;
    item.favorito = true;
    item.subtotal = (parseInt(item.cantidad) * parseFloat(item.precio)).toFixed(2);
    totalizar();
}

function restarItem(item) {
    if (item.cantidad < 2) {
        return;
    }
    item.cantidad--;
    item.subtotal = (parseInt(item.cantidad) * parseFloat(item.precio)).toFixed(2);
    totalizar();
}

function totalizar() {
    total.value = orden.value.reduce(function (prev, cur) {
        return parseFloat(prev) + parseFloat(cur.subtotal);
    }, 0).toFixed(2);
}

function deleteItem(item) {
    item.favorito = false;
    item.subtotal = 0;
    totalizar();
    itemIndex.value = orden.value.indexOf(item);
    orden.value.splice(itemIndex.value, 1);
}

</script>

<style lang="css" scoped>
.sticky-table-footer td {
    font-weight: bold;
    position: sticky;
    bottom: 0;
    background-color: #f8f8f8;
    border-top: thin solid rgba(0, 0, 0, .12);
}

.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th {
    background: #ee9292;
    box-shadow: inset 0 -1px 0 rgba(var(--v-border-color), var(--v-border-opacity));
    z-index: 1;
}
</style>