<template>
    <v-layout style="height: 100%;">
        <v-app-bar color="primary" prominent>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Mi menú</v-toolbar-title>

            <v-spacer></v-spacer>

            <template v-if="$vuetify.display.mdAndUp">
                <v-btn icon="mdi-magnify" variant="text"></v-btn>

                <v-btn icon="mdi-filter" variant="text"></v-btn>
            </template>

            <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" temporary>

            <v-card max-width="400" rounded="0">
                <v-img class="align-end text-white" height="200"
                    src="data:image/png;base64,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"
                    cover>
                    <!-- <v-card-title>Chapaleo</v-card-title>

                    <v-card-text>
                        <div>Resto & Bar</div>
                    </v-card-text> -->
                </v-img>

            </v-card>

            <v-divider></v-divider>

            <!-- Links -->
            <v-list :lines="false" density="compact" nav>
                <v-list-item v-for="[text, icon, link] in links" :key="icon" :to="link" link>
                    <template v-slot:prepend>
                        <v-icon :icon="icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="text"></v-list-item-title>
                </v-list-item>
            </v-list>
            <!-- Fin Links -->

        </v-navigation-drawer>

        <v-main>
            <Categorias></Categorias>
            <router-view />
        </v-main>
    </v-layout>

    <!-- <v-layout>
      <v-navigation-drawer absolute permanent>
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
            subtitle="john@google.com"
            title="John Leider"
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-menu-down"
                size="small"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          :lines="false"
          density="compact"
          nav
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            color="primary"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 354px;"></v-main>
    </v-layout> -->
</template>

<script>
import Categorias from './Categorias.vue';

export default {
    data: () => ({
        drawer: false,
        group: null,

        links: [
            ["Hello", "mdi-account-school", "/HelloWorld"],
            ["Menu", "mdi-numeric-10-box-outline", "/Menu"],
            // ["Contactos", "mdi-account-box", "/contactos"],
            // ["Cursos", "mdi-chair-school", "/cursos"],
            // ["Docentes", "mdi-human-male-board", "/docentes"],
            // ["Eventos", "mdi-calendar", "/eventos"],
            // ["Asistencias", "mdi-account-plus", "/asistencias"],
            // ["Inasistencias", "mdi-account-minus", "/inasistencias"],
            // ["Notificaciones", "mdi-email", "/notificaciones"],
            // ["Sanciones", "mdi-account-alert", "/sanciones"],
            // ["Trayectorias", "mdi-trending-up", "/trayectorias"],
        ],
    }),

    watch: {
        group() {
            this.drawer = false
        },
    },
}
</script>