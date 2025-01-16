<template>
    <v-card class="mx-auto">
        <!-- <v-list :items="items" lines="three" item-props>
            <template v-slot:subtitle="{ subtitle }">
                <div v-html="subtitle"></div>
            </template>

<template v-slot:append>
                <v-avatar class="ma-3" rounded="0" size="64">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                </v-avatar>

            </template>

</v-list> -->

        <v-card>
            <v-card-item>
                <v-card-title class="text-subtitle-2">Papas fritas</v-card-title>

                <v-card-subtitle>$4.500,00</v-card-subtitle>

                <template v-slot:append>
                <!-- <v-avatar class="ma-3" rounded="0" size="64">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                </v-avatar> -->
                <v-card-actions>
                    <v-btn icon>
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-card-actions>
            </template>
            </v-card-item>

            <!-- <v-card-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
                voluptatibus!
            </v-card-text> -->


        </v-card>

        <v-card class="mx-auto text-button" title="Papas fritas" subtitle="$4.500,00">

            <template v-slot:append>
                <!-- <v-avatar class="ma-3" rounded="0" size="64">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                </v-avatar> -->
                <v-card-actions>
                    <v-btn icon>
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>



                    <v-btn icon>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-card-actions>
            </template>
        </v-card>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        items: [
            { type: 'subheader', title: 'Today' },
            {
                // prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                title: 'Pasa fritas',
                subtitle: '$10.000,00',
            },
            { type: 'divider', inset: true },
            {
                prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                title: 'Summer BBQ',
                subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
            },
            { type: 'divider', inset: true },
            {
                prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                title: 'Oui oui',
                subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
            },
            { type: 'divider', inset: true },
            {
                prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                title: 'Birthday gift',
                subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
            },
            { type: 'divider', inset: true },
            {
                prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                title: 'Recipe to try',
                subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            },
        ],
    }),
}
</script>