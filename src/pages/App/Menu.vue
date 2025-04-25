<template>
    <!-- Categorias -->
    <Categorias @some-event="filtrarPorCategoria"></Categorias>

    <!-- Menú -->
    <v-expansion-panels v-model="menuStore.expandir" multiple color="blue-grey-lighten-3" elevation="0" flat rounded="0"
        :static="true" :tile="true">
        <v-expansion-panel v-for="(categoria, index) in menuStore.menuFiltrado" :key="index" :title="categoria.nombre">
            <v-expansion-panel-text>
                <v-list>
                    <v-list-item v-for="item in categoria.Item" style="padding: 0px; min-height: auto;">

                        <!-- Título -->
                        <v-list-item-title v-if="!item.esCategoria" class="text-precio-2 pl-2"
                            @click="verDetalle(item)">
                            {{ item.nombre }}
                        </v-list-item-title>

                        <template v-slot:append v-if="!item.esCategoria">
                            <v-list-item-subtitle class="mr-2">
                                {{ toPesos(item.precio) }}
                            </v-list-item-subtitle>

                            <!-- Favorito -->
                            <v-list-item-action start>
                                <v-checkbox-btn v-model="item.favorito" @change="favoritoChange(item)">
                                </v-checkbox-btn>
                            </v-list-item-action>

                            <!-- Ver detalle -->
                            <!-- <v-btn @click="verDetalle(item)" icon="mdi-dots-horizontal" size="x-small"
                                variant="text">
                            </v-btn> -->
                        </template>

                    </v-list-item>
                </v-list>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>

    <!-- Detalle -->
    <v-bottom-sheet v-model="dialog">
        <v-card elevation="0" rounded="0">
            <v-toolbar>
                <v-toolbar-title>{{ dialogTitulo }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
            </v-toolbar>

            <v-card variant="flat">
                <v-img height="250" :src="dialogFoto" cover></v-img>

                <v-card-item>
                    <v-card-title>
                        <v-row no-gutters>
                            <!-- Nombre -->
                            <v-col cols="6">
                                <v-card-title>{{ dialogTitulo }}</v-card-title>
                            </v-col>

                            <!-- Precio -->
                            <v-col class="text-right" cols="6">
                                <v-card-subtitle>
                                    <span class="me-1">{{ toPesos(dialogSubtitulo) }}</span>
                                </v-card-subtitle>
                            </v-col>
                        </v-row>
                    </v-card-title>
                </v-card-item>

                <!-- Descripcion -->
                <v-card-text>
                    {{ dialogDescripcion }}
                </v-card-text>
            </v-card>
        </v-card>
    </v-bottom-sheet>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
// Components
import Categorias from '@/components/Categorias.vue';
// Composables
import { useFiltros } from '@/composables/filtros'
// Stores
import { useMenuStore } from "@/stores/menu";
import { useCategoriasStore } from "@/stores/categorias";

const tabs = ref(null)
const categoriaSeleccionada = ref(0)
const dialog = ref(false)
const dialogTitulo = ref('')
const dialogSubtitulo = ref('')
const dialogDescripcion = ref('')
const dialogFoto = ref('')
// Composables
const { toPesos } = useFiltros();
// Stores
const categoriasStore = useCategoriasStore()
const menuStore = useMenuStore()

onMounted(() => {
    menuStore.menuFiltrado = menuStore.menuCompleto;
    menuStore.expandirMenu();
    categoriaSeleccionada.value = categoriasStore.seleccionada;
})

function filtrarPorCategoria(toggle, categoria) {
    // console.log(`Categoría: ${categoriasStore.seleccionada}`);
    if (toggle) {
        toggle();
    }

    menuStore.menuFiltrado = menuStore.menuCompleto;
    if (categoria.id != 0) {
        menuStore.menuFiltrado = menuStore.menuCompleto.filter((item) => {
            return item.id == categoria.id;
        })
    }
    categoriasStore.seleccionada = categoria;
}

function favoritoChange(item) {
    item.cantidad = item.favorito ? 1 : 0;
    item.subtotal = item.favorito ? item.precio : 0;

    if (item.favorito) {
        menuStore.pedido.push(item);
    } else {
        let itemIndex = menuStore.pedido.indexOf(item);
        menuStore.pedido.splice(itemIndex, 1);
    }
    menuStore.totalizar();
}

function verDetalle(item) {
    dialog.value = true;
    dialogTitulo.value = item.nombre;
    dialogSubtitulo.value = item.precio;
    dialogDescripcion.value = item.descripcion;
    dialogFoto.value = item.foto != null ? item.foto : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX079c3Nzb38tr69dwyMjIzMzMpKistLS4vLy8mJykxMjH69NwrLC0oKCosLS3w69QiIybX07+mo5V9e3Lq5c/JxbPj3slcW1bPy7gdHiK/vKtDQ0FmZV+Yloo+Pj1iYFtzcWquq5yPjYJTUk6DgXedm47Cvq1OTUpsa2S1sqKSkIUZGh6Jh31/fnURExr17yIIAAAIlUlEQVR4nO2Za5eiuhKGyYVLDAooAgqKd6XH2f//552qCtj2vq59Fh7n9Krnw3QPJCGVVL1VSXsewzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAPpJTvnsILkVYmRZblnn33TF6EyueNiAOjy3nyHTdSJoc00CIU7dYYkaGJCvDyMb8hYcRkzBH/BaqqAyGEOeUquYdaJ56X7zeLcnsez2Vl0W12R7F/i4OoKtZgYLpX0pOq9oONUrdVHOn0Mt58ZAsj+qvsHRbKQvhgYDBX+D91inQpE3wiViP6VE4f2b7HS28RfDtq3OqqVvtXL0vhkV+PuIVVDCPq9h1bqDqMQRE4/5GZEZPWdgaNXqjxvjLHr8zubwnDGt0n/OlERe4iYc7qPvv021FQC3QU070h28q1oZDrJSC/BmGZyBalJ65G9NKr//QVfPC7sV9XT+GmQchd++2S+aWCf7b4TOSUw758GR8oeoz50nN5s8fK52YW2n02y1e4jtvEvbYqL4r8c2Sl8iwr7Hgu8zzjQUgf7gNrKSsUGl0qb31qF+vPD0tved41i+5Slm1bUlD9PLZNuzvvynJ3zoZlktn8dDvtqwO0KhswS17QU3Sj3Chd6cexX3auvU32R21MVJ9fYqFzUvMlT6k9ykJ0vxyDaBKZ+/DcXspgFsUm0Ij5UCBMqdYTHaUrE0VxcKBRVHYL43BmTAzVg56hfqozSmn4gSbJvJlOIAbCWUqBrpZHrKcC7a+WL/BUe5g9u0//8BTRw1VKP83GrbU6G5iZuS0oWQqzlp51QhzfujkG2moPLdXFD+Ftuaip9+yAzygWgjVakBxDjIEua6K0kKDlBoI+2uzbNIV1Ht/GBiYtJs2XEJBHtEHX526H9vuRq1TnGEvhXqnMmYXTO+Fsw7tyD/0rTHGZ+rQqSpV+vxBeQoLtQw/P7nA746VSyym8sx02DyuI231lpZwnfzHR/5akxsmGh2cLITZpCwuQC5pkgFsjqQrAXzFn4nuYrnTvybu2zoYcjaHkY8ks3CdZUAVxTDD94q8xfFBWU9Mp0oHpGT5gu7rMD9eRLZTZRPwh88klycIN4+eOexSjm8oSnQkfyu4hG/kWjYiwFlM1xbM6BFSdyWf9lJ8VhCRl0/BeroNVpRazoc165Uf1j/XIGVMu0WXEtHt2f0uyEG8sVan9ArhJTjFF2gOaPYODh+uuS+qGe5hmhR6k+Uk/1cesf6r2ZvAZtZvVXrEaFlgdoedsN3YcunkL8+UQ4WSB4keWEwoaiDjcQv9IYthQPQB91Dwm0cW9KahTccYtDPOv+kmdyZlliwOGsFCqiqB4ouaC4hN9WhdjW+jygki/yLTySSHwYwnJHszARVJM3pzgbpFsuFpsSmFKOTQqUFJd3nvSz76CwGFowCsYVFyDq0fF04SKfrWPRbgZPem7gvirhZI8B2fxSP34/SmuPYqqzGKSDW/QEkqmrkGdrQZletJPWaGnTEoMNmwVHZS81OkRZAn3drDr6ocj1olfLfzipa4IiHZqeB2eVJ8WapQUSTkwWkAY0o6IECdosVjXjeuLE+31E7VxqCBs77l6sWlTc4KikPTZOBUAa/3RnfQRh+unkV0RQGLhHI28kNypRKFz+krqQ1oyaWkLMNRm583MFbSfC/XQKxzGubWIf9MLSH59m4B2DvzFHztV4LAX0lLnVj2KDhYhOq47EaDvUN50B0b5kA21iR+5hHJomqEFbqKKFDfGTKe27iX0uGlKROuEym53DtVUUNh5QH4ztoWZpjV9vnKiGwyUBZg21Wd49eAC5kC2OKHJ8VyiBxe33ZQuBbBE0i0tFMkwvczJX0UyrN426S1RGxIeZ2Grg1ccH3OqaZ4Xz8WejznOpf5JM+QC2hCXA+m905LI1WIRlaBoFtUK/cUMzr6vIMohbZCIITYjn/WdfsES5S+ovN3x8DPEpZpTZKK69OkOqk74Pi529PORvdFhZeaOlpjdabdXBVW0VJ05/RR1MgQuJkZp6X1f56vCd1FZKdrd+DC+kw6RICZHLEKt9aob/d+pi4sz3SQyIYXwj3D2rciv/WNu3UO9wxMxGhEurKtTRQFjUVkgBAjKmuzQjafyA4V9jAdDaautoUa6hfXdGCj+XnLMT440Ex3f7puPxTUN6TRF6jLkkkndblNqFZ2yc0TPhN62W9e0Xuf5BqMQHMGJr26Xl2blzlh+eU2n9FtUN+LHkawVXZIvF+mPjjKK0GFZB3hf+woD0f/cYuvZLIzAbeZiUBcXGzjLyHw4mQ9TE3XCEYXup29WqxB/QNEs927KxvyYk9LA+qTNMu17pBv1kfZd0lVdKdk4i2E10o/XGAh+urxO/X6us3BXUPz0t6dqk2pf+PEWTjma5hJtLxCpmBJCMa9dt5kPxMLdSRzJD3VwhrqT7mGDDQxjqJKtYQ3sgn6fBOIDzxeZG1ZMzOZ1F402nx99k5o0rk8VKg3M15zdgsruCFJyzqEayUqTpvGugElemq3e3ovMeWSxuQpxPRTuDibfBWk6LS+Q3bMdnK2aJQb0ugV9uRfWDelr0c5de5XdIvg0dXgh1ubZ8lJBGGHyIoYFtSrJ3R2YVNmyKihRS+XlUrlaDHKkstBmuGiTtoBm1jWTucvs8GuSy/5uTdq8SB5XeFLl1fpSqNftYI+U/3xh+bsm6ufjkPV3zf50pH/b4T2425zV+MXyL0NOmlK/NH7eijs7Tnbf9e/+j7Pj/ftaKN1fk15UiPwKJCQ08Vv+bP0/AU4Tk2i2elmp9X7k+rfr7rT8vgZCRZl51n5bF0V+0TqEYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYf7v+Q+a/IKKGBmnvwAAAABJRU5ErkJggg==";
}

watch(() => categoriaSeleccionada.value, (newValue, oldQuestion) => {
    filtrarPorCategoria(null, newValue);
})

</script>

<style scoped>
.v-expansion-panel-text>>>.v-expansion-panel-text__wrapper {
    padding: 0px 5px 0px 5px;
    flex: 1 1 auto;
    max-width: 100%;
}

.v-expansion-panel--active:not(:first-child),
.v-expansion-panel--active+.v-expansion-panel {
    margin-top: 0px;
}
</style>