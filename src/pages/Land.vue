<template>

    <v-card>
        <v-layout>
            <v-app-bar color="grey">
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <!-- Título -->
                <v-app-bar-title></v-app-bar-title>
                <!-- Espacio -->
                <v-spacer></v-spacer>

                <!-- Ususario -->
                <v-btn icon>
                    <v-icon @click="router.push('/Login')">mdi-account-circle</v-icon>
                </v-btn>
            </v-app-bar>

            <v-navigation-drawer v-model="drawer" temporary>
                <v-list :items="items"></v-list>
            </v-navigation-drawer>

            <v-main>
                <v-card class="mx-auto pa-6 ma-6 text-center" elevation="0" rounded="0" max-width="800" min-width="360">
                    <v-card-item>
                        <v-card-title>
                            <h1>Intelicarta</h1>
                        </v-card-title>

                        <v-card-subtitle>
                            Card subtitle secondary text
                        </v-card-subtitle>
                    </v-card-item>

                    <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua.
                    </v-card-text>

                    <v-card-actions class="d-flex ga-4 justify-center">
                        <v-btn class="text-none ms-4 text-white" color="blue-darken-4" rounded="15" variant="flat">
                            Comenzar
                        </v-btn>

                        <v-btn class="text-none" color="blue-darken-4" rounded="15" variant="outlined">
                            Aprender mas...
                        </v-btn>
                    </v-card-actions>
                </v-card>

                <v-card class="mx-auto pa-6 ma-6 text-center" elevation="0" rounded="0" max-width="800" min-width="360">
                    <v-card-item>
                        <v-card-title>
                            <h3>Todo lo que necesita</h3>
                            <h3>tu negocio</h3>
                        </v-card-title>
                        <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore
                            et dolore magna aliqua.
                        </v-card-text>
                    </v-card-item>
                </v-card>

                <v-card class="mx-auto pa-6 ma-6" elevation="0" rounded="0" max-width="800" min-width="360">
                    <v-row justify="center" dense>
                        <v-col cols="12" md="6">
                            <v-card class="mx-auto" title="Gratis" elevation="0">
                                <template v-slot:prepend>
                                    <v-icon color="primary" icon="mdi-cash-multiple"></v-icon>
                                </template>
                                <v-card-text>
                                    Cree su menú completamente gratis. Si necesita alguna funcionalidad extra, consulte
                                    nuestros planes de pago
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn class="text-none" color="blue-darken-4" rounded="15" variant="outlined">
                                        Aprender mas...
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-card class="mx-auto" title="Actualizaciones" elevation="0">
                                <template v-slot:prepend>
                                    <v-icon color="primary" icon="mdi-update"></v-icon>
                                </template>
                                <v-card-text>
                                    Actualizaciones gratis sin ningún costo extra.
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn class="text-none" color="blue-darken-4" rounded="15" variant="outlined">
                                        Aprender mas...
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-card class="mx-auto" title="Tecnología" elevation="0">
                                <template v-slot:prepend>
                                    <v-icon color="primary" icon="mdi-xml"></v-icon>
                                </template>
                                <v-card-text>
                                    Utilizamos las últimas tecnologías del mercado
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn class="text-none" color="blue-darken-4" rounded="15" variant="outlined">
                                        Aprender mas...
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-card class="mx-auto" title="Servicio" elevation="0">
                                <template v-slot:prepend>
                                    <v-icon color="primary" icon="mdi-cloud-outline"></v-icon>
                                </template>
                                <v-card-text>
                                    Servicio en la nube
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn class="text-none" color="blue-darken-4" rounded="15" variant="outlined">
                                        Aprender mas...
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>

                <!-- Precios -->
                <v-container class="pa-md-12 pa-sm-6">
                    <v-responsive class="text-center mx-auto mb-6 mb-md-12" style="max-width: 700px;">
                        <v-responsive>
                            <p class="font-weight-medium text-primary">Pricing</p>
                            <h1 data-v-0945acbe="" class="text-md-h4 font-weight-bold mb-4 text-sm-h5">
                                Pricing plans for
                                teams of all
                                sizes
                            </h1>
                            <p class="text-subtitle-1 text-medium-emphasis">
                                Distinction and no one freed
                                him, and
                                not by some labor. Often and as if it were just a way of wanting to not take pleasure in
                                it.
                                I will explain it as snacks.
                            </p>
                        </v-responsive>
                    </v-responsive>

                    <v-row class="align-end" rounded="xl">
                        <v-col cols="12" md="6" lg="4">
                            <div data-v-0945acbe=""
                                class="v-card v-theme--light v-card--border v-card--density-default rounded-xl v-card--variant-flat pa-6 pa-md-8 d-flex flex-column mx-auto"
                                style="height: 460px; max-width: 450px; width: 100%;"><!---->
                                <div class="v-card__loader">
                                    <div class="v-progress-linear v-theme--light v-locale--is-ltr"
                                        style="top: 0px; height: 0px; --v-progress-linear-height: 2px;"
                                        role="progressbar" aria-hidden="true" aria-valuemin="0" aria-valuemax="100">
                                        <!---->
                                        <div class="v-progress-linear__background"></div>
                                        <div class="v-progress-linear__buffer" style="width: 0%;"></div>
                                        <div class="v-progress-linear__indeterminate">
                                            <div class="v-progress-linear__indeterminate long"></div>
                                            <div class="v-progress-linear__indeterminate short"></div>
                                        </div><!---->
                                    </div>
                                </div><!----><!---->
                                <div data-v-0945acbe="" class="d-flex justify-space-between align-center"><span
                                        data-v-0945acbe=""
                                        class="v-chip v-theme--light v-chip--density-default rounded-sm v-chip--size-default v-chip--variant-tonal mb-4"
                                        draggable="false"><!----><span class="v-chip__underlay"></span><!----><!---->
                                        <div class="v-chip__content" data-no-activator="">Freelancer</div><!----><!---->
                                    </span><!----></div>
                                <p data-v-0945acbe="" class="text-subtitle-2 pb-3">The essentials to provide your best
                                    work
                                    for clients.
                                </p>
                                <div data-v-0945acbe="" class="text-h4 mb-3 font-weight-bold"> $24 <small
                                        data-v-0945acbe="" class="text-body-2">/month</small></div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> 5 products</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> Up to 1,000 subscribers</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> Basic analytics</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> 48-hour support response time</div><!---->
                                </div><button data-v-0945acbe="" type="button"
                                    class="v-btn v-theme--light text-default v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined mb-5 mx-auto position-absolute bottom-0 left-0 right-0 text-none"
                                    style="max-height: 36px; max-width: 260px; width: 100%;"><span
                                        class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span
                                        class="v-btn__content" data-no-activator="">Buy
                                        plan</span><!----><!----></button><!----><!----><span
                                    class="v-card__underlay"></span>
                            </div>
                        </v-col>
                        <div data-v-0945acbe="" class="v-col-lg-4 v-col-12">
                            <div data-v-0945acbe=""
                                class="v-card v-theme--light v-card--border v-card--density-default rounded-xl v-card--variant-flat pa-6 pa-md-8 d-flex flex-column mx-auto"
                                style="height: 500px; max-width: 450px; width: 100%;"><!---->
                                <div class="v-card__loader">
                                    <div class="v-progress-linear v-theme--light v-locale--is-ltr"
                                        style="top: 0px; height: 0px; --v-progress-linear-height: 2px;"
                                        role="progressbar" aria-hidden="true" aria-valuemin="0" aria-valuemax="100">
                                        <!---->
                                        <div class="v-progress-linear__background"></div>
                                        <div class="v-progress-linear__buffer" style="width: 0%;"></div>
                                        <div class="v-progress-linear__indeterminate">
                                            <div class="v-progress-linear__indeterminate long"></div>
                                            <div class="v-progress-linear__indeterminate short"></div>
                                        </div><!---->
                                    </div>
                                </div><!----><!---->
                                <div data-v-0945acbe="" class="d-flex justify-space-between align-center"><span
                                        data-v-0945acbe=""
                                        class="v-chip v-theme--light bg-primary v-chip--density-default rounded-sm v-chip--size-default v-chip--variant-flat mb-4"
                                        draggable="false"><!----><span class="v-chip__underlay"></span><!----><!---->
                                        <div class="v-chip__content" data-no-activator="">Startup</div><!----><!---->
                                    </span><span data-v-0945acbe=""
                                        class="v-chip v-theme--light text-primary v-chip--density-default v-chip--size-small v-chip--variant-tonal mb-4"
                                        draggable="false"><!----><span class="v-chip__underlay"></span><!----><!---->
                                        <div class="v-chip__content" data-no-activator="">most popular</div>
                                        <!----><!---->
                                    </span></div>
                                <p data-v-0945acbe="" class="text-subtitle-2 pb-3">A plan that scales with your rapidly
                                    growing
                                    business.</p>
                                <div data-v-0945acbe="" class="text-h4 mb-3 font-weight-bold"> $32 <small
                                        data-v-0945acbe="" class="text-body-2">/month</small></div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> 25 products</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> Up to 10,000 subscribers</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> Advanced analytics</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> 24-hour support response time</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> Marketing automations</div><!---->
                                </div><button data-v-0945acbe="" type="button"
                                    class="v-btn v-theme--light bg-primary v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-flat mb-5 mx-auto position-absolute bottom-0 left-0 right-0 text-none"
                                    style="max-height: 36px; max-width: 260px; width: 100%;"><span
                                        class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span
                                        class="v-btn__content" data-no-activator="">Buy
                                        plan</span><!----><!----></button><!----><!----><span
                                    class="v-card__underlay"></span>
                            </div>
                        </div>
                        <div data-v-0945acbe="" class="v-col-lg-4 v-col-12">
                            <div data-v-0945acbe=""
                                class="v-card v-theme--light v-card--border v-card--density-default rounded-xl v-card--variant-flat pa-6 pa-md-8 d-flex flex-column mx-auto"
                                style="height: 460px; max-width: 450px; width: 100%;"><!---->
                                <div class="v-card__loader">
                                    <div class="v-progress-linear v-theme--light v-locale--is-ltr"
                                        style="top: 0px; height: 0px; --v-progress-linear-height: 2px;"
                                        role="progressbar" aria-hidden="true" aria-valuemin="0" aria-valuemax="100">
                                        <!---->
                                        <div class="v-progress-linear__background"></div>
                                        <div class="v-progress-linear__buffer" style="width: 0%;"></div>
                                        <div class="v-progress-linear__indeterminate">
                                            <div class="v-progress-linear__indeterminate long"></div>
                                            <div class="v-progress-linear__indeterminate short"></div>
                                        </div><!---->
                                    </div>
                                </div><!----><!---->
                                <div data-v-0945acbe="" class="d-flex justify-space-between align-center"><span
                                        data-v-0945acbe=""
                                        class="v-chip v-theme--light v-chip--density-default rounded-sm v-chip--size-default v-chip--variant-tonal mb-4"
                                        draggable="false"><!----><span class="v-chip__underlay"></span><!----><!---->
                                        <div class="v-chip__content" data-no-activator="">Enterprise</div><!----><!---->
                                    </span><!----></div>
                                <p data-v-0945acbe="" class="text-subtitle-2 pb-3">Dedicated support and infrastructure
                                    of
                                    your company.
                                </p>
                                <div data-v-0945acbe="" class="text-h4 mb-3 font-weight-bold"> $48 <small
                                        data-v-0945acbe="" class="text-body-2">/month</small></div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> Unlimited products</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> Unlimited subscribers</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> Advanced analytics</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> 1-hour, dedicated support response time</div><!---->
                                </div>
                                <div data-v-0945acbe=""
                                    class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0 text-body-2">
                                    <!----><span class="v-list-item__underlay"></span><!---->
                                    <div class="v-list-item__content" data-no-activator=""><!----><!----><i
                                            data-v-0945acbe=""
                                            class="mdi-check mdi v-icon notranslate v-theme--light v-icon--size-default text-primary mr-1"
                                            aria-hidden="true"></i> Marketing automations</div><!---->
                                </div><button data-v-0945acbe="" type="button"
                                    class="v-btn v-theme--light text-default v-btn--density-default rounded-lg v-btn--size-default v-btn--variant-outlined mb-5 mx-auto position-absolute bottom-0 left-0 right-0 text-none"
                                    style="max-height: 36px; max-width: 260px; width: 100%;"><span
                                        class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span
                                        class="v-btn__content" data-no-activator="">Buy
                                        plan</span><!----><!----></button><!----><!----><span
                                    class="v-card__underlay"></span>
                            </div>
                        </div>
                    </v-row>
                </v-container>

                <!-- Preguntas frecuentes -->
                <div data-v-0945acbe="" class="v-container v-container--fluid v-locale--is-ltr pa-6 pa-md-12">
                    <div data-v-0945acbe="" class="v-responsive mx-auto text-center" style="max-width: 700px;">
                        <div class="v-responsive__sizer"></div><!---->
                        <div class="v-responsive__content">
                            <p data-v-0945acbe="" class="text-h5 font-weight-bold text-sm-h4"> Frequently Asked
                                Questions
                            </p>
                            <p data-v-0945acbe="" class="mt-4 mb-6 text-body-1 text-medium-emphasis"> If you can't find
                                the
                                answer
                                you're looking for, our customer support team is here to assist you. Feel free to reach
                                out
                                for prompt
                                and helpful assistance. </p>
                        </div>
                    </div>
                    <div data-v-0945acbe="" class="v-row justify-center">
                        <div data-v-0945acbe="" class="v-col-lg-6 v-col-12">
                            <div data-v-0945acbe=""
                                class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text mb-4 px-0">
                                <!----><span class="v-list-item__underlay"></span><!---->
                                <div class="v-list-item__content" data-no-activator="">
                                    <div class="v-list-item-title">
                                        <p data-v-0945acbe="">1. What is your warranty policy?</p>
                                    </div>
                                    <div class="v-list-item-subtitle">
                                        <p data-v-0945acbe="" class="mt-2 text-body-1">We offer a one-year warranty on
                                            all
                                            our products.
                                            If you experience any issues with your purchase within this period, please
                                            contact our
                                            support team for assistance. We'll repair or replace the item as needed.
                                            Detailed warranty
                                            information is available on our Warranty page.</p>
                                    </div><!---->
                                </div><!---->
                            </div>
                        </div>
                        <div data-v-0945acbe="" class="v-col-lg-6 v-col-12">
                            <div data-v-0945acbe=""
                                class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text mb-4 px-0">
                                <!----><span class="v-list-item__underlay"></span><!---->
                                <div class="v-list-item__content" data-no-activator="">
                                    <div class="v-list-item-title">
                                        <p data-v-0945acbe="">2. How can I track my shipment?</p>
                                    </div>
                                    <div class="v-list-item-subtitle">
                                        <p data-v-0945acbe="" class="mt-2 text-body-1">After your order has been
                                            shipped,
                                            you will
                                            receive a confirmation email with a tracking number. Use this number on our
                                            website or the
                                            carrier’s site to monitor your shipment. For any issues, our support team is
                                            here to help.
                                        </p>
                                    </div><!---->
                                </div><!---->
                            </div>
                        </div>
                        <div data-v-0945acbe="" class="v-col-lg-6 v-col-12">
                            <div data-v-0945acbe=""
                                class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text mb-4 px-0">
                                <!----><span class="v-list-item__underlay"></span><!---->
                                <div class="v-list-item__content" data-no-activator="">
                                    <div class="v-list-item-title">
                                        <p data-v-0945acbe="">3. Do you offer gift wrapping?</p>
                                    </div>
                                    <div class="v-list-item-subtitle">
                                        <p data-v-0945acbe="" class="mt-2 text-body-1">Yes, we provide gift wrapping
                                            services for an
                                            additional fee. You can select the gift wrapping option during checkout and
                                            include a
                                            personalized message. Your gift will be beautifully wrapped and delivered
                                            directly to the
                                            recipient's address.</p>
                                    </div><!---->
                                </div><!---->
                            </div>
                        </div>
                        <div data-v-0945acbe="" class="v-col-lg-6 v-col-12">
                            <div data-v-0945acbe=""
                                class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text mb-4 px-0">
                                <!----><span class="v-list-item__underlay"></span><!---->
                                <div class="v-list-item__content" data-no-activator="">
                                    <div class="v-list-item-title">
                                        <p data-v-0945acbe="">4. Can I modify my order after placing it?</p>
                                    </div>
                                    <div class="v-list-item-subtitle">
                                        <p data-v-0945acbe="" class="mt-2 text-body-1">We understand that sometimes
                                            changes
                                            are
                                            necessary. You can modify your order within 24 hours of placing it by
                                            contacting
                                            our support
                                            team. After this period, modifications may not be possible due to processing
                                            and
                                            shipping
                                            constraints.</p>
                                    </div><!---->
                                </div><!---->
                            </div>
                        </div>
                        <div data-v-0945acbe="" class="v-col-lg-6 v-col-12">
                            <div data-v-0945acbe=""
                                class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text mb-4 px-0">
                                <!----><span class="v-list-item__underlay"></span><!---->
                                <div class="v-list-item__content" data-no-activator="">
                                    <div class="v-list-item-title">
                                        <p data-v-0945acbe="">5. What are your business hours?</p>
                                    </div>
                                    <div class="v-list-item-subtitle">
                                        <p data-v-0945acbe="" class="mt-2 text-body-1">Our business hours are Monday to
                                            Friday, 9 AM to
                                            5 PM EST. During these hours, our customer service team is available to
                                            assist
                                            with any
                                            inquiries. Outside of these hours, you can email us, and we will respond as
                                            soon
                                            as possible
                                            on the next business day.</p>
                                    </div><!---->
                                </div><!---->
                            </div>
                        </div>
                        <div data-v-0945acbe="" class="v-col-lg-6 v-col-12">
                            <div data-v-0945acbe=""
                                class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text mb-4 px-0">
                                <!----><span class="v-list-item__underlay"></span><!---->
                                <div class="v-list-item__content" data-no-activator="">
                                    <div class="v-list-item-title">
                                        <p data-v-0945acbe="">6. How do I leave a review?</p>
                                    </div>
                                    <div class="v-list-item-subtitle">
                                        <p data-v-0945acbe="" class="mt-2 text-body-1">We value your feedback and
                                            encourage
                                            you to leave
                                            a review on our website. After receiving your order, you will receive an
                                            email
                                            invitation to
                                            review your purchase. You can also leave a review directly on the product
                                            page
                                            on our
                                            website.</p>
                                    </div><!---->
                                </div><!---->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contacto -->
                <div data-v-d9cedaef="" class="v-container v-container--fluid v-locale--is-ltr pa-2">
                    <div data-v-d9cedaef="" class="v-responsive mx-auto my-16 px-4" style="max-width: 1000px;"
                        modelvalue="false">
                        <div class="v-responsive__sizer"></div><!---->
                        <div class="v-responsive__content">
                            <p data-v-d9cedaef="" class="mt-2 text-h5 font-weight-bold text-sm-h4"> Let’s talk about
                                your
                                project </p>
                            <p data-v-d9cedaef="" class="mt-4 mb-10 text-body-1 text-medium-emphasis"> We help companies
                                and
                                individuals
                                build out their brand guidelines. </p>
                            <div data-v-d9cedaef="" class="v-row">
                                <div data-v-d9cedaef="" class="v-col-md-7 v-col-12">
                                    <div data-v-d9cedaef="" class="v-row">
                                        <div data-v-d9cedaef="" class="v-col-sm-6 v-col-12">
                                            <div data-v-d9cedaef=""
                                                class="v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--light v-locale--is-ltr v-text-field">
                                                <!---->
                                                <div class="v-input__control">
                                                    <div
                                                        class="v-field v-field--center-affix v-field--variant-outlined v-theme--light v-locale--is-ltr">
                                                        <div class="v-field__overlay"></div>
                                                        <div class="v-field__loader">
                                                            <div class="v-progress-linear v-theme--light v-locale--is-ltr"
                                                                style="top: 0px; height: 0px; --v-progress-linear-height: 2px;"
                                                                role="progressbar" aria-hidden="true" aria-valuemin="0"
                                                                aria-valuemax="100"><!---->
                                                                <div class="v-progress-linear__background bg-primary">
                                                                </div>
                                                                <div class="v-progress-linear__buffer bg-primary"
                                                                    style="width: 0%;">
                                                                </div>
                                                                <div class="v-progress-linear__indeterminate">
                                                                    <div
                                                                        class="v-progress-linear__indeterminate long bg-primary">
                                                                    </div>
                                                                    <div
                                                                        class="v-progress-linear__indeterminate short bg-primary">
                                                                    </div>
                                                                </div><!---->
                                                            </div>
                                                        </div><!---->
                                                        <div class="v-field__field" data-no-activator=""><!----><label
                                                                class="v-label v-field-label"
                                                                for="input-267"><!---->First
                                                                Name</label><!----><input placeholder="John" size="1"
                                                                type="text" id="input-267"
                                                                aria-describedby="input-267-messages" required=""
                                                                class="v-field__input"><!----></div><!----><!---->
                                                        <div class="v-field__outline">
                                                            <div class="v-field__outline__start"></div>
                                                            <div class="v-field__outline__notch"><label
                                                                    class="v-label v-field-label v-field-label--floating"
                                                                    aria-hidden="true" for="input-267"><!---->First
                                                                    Name</label></div>
                                                            <div class="v-field__outline__end"></div><!---->
                                                        </div>
                                                    </div>
                                                </div><!---->
                                                <div id="input-267-messages" class="v-input__details" role="alert"
                                                    aria-live="polite">
                                                    <div class="v-messages"></div><!---->
                                                </div>
                                            </div>
                                        </div>
                                        <div data-v-d9cedaef="" class="v-col-sm-6 v-col-12">
                                            <div data-v-d9cedaef=""
                                                class="v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--light v-locale--is-ltr v-text-field">
                                                <!---->
                                                <div class="v-input__control">
                                                    <div
                                                        class="v-field v-field--center-affix v-field--variant-outlined v-theme--light v-locale--is-ltr">
                                                        <div class="v-field__overlay"></div>
                                                        <div class="v-field__loader">
                                                            <div class="v-progress-linear v-theme--light v-locale--is-ltr"
                                                                style="top: 0px; height: 0px; --v-progress-linear-height: 2px;"
                                                                role="progressbar" aria-hidden="true" aria-valuemin="0"
                                                                aria-valuemax="100"><!---->
                                                                <div class="v-progress-linear__background bg-primary">
                                                                </div>
                                                                <div class="v-progress-linear__buffer bg-primary"
                                                                    style="width: 0%;">
                                                                </div>
                                                                <div class="v-progress-linear__indeterminate">
                                                                    <div
                                                                        class="v-progress-linear__indeterminate long bg-primary">
                                                                    </div>
                                                                    <div
                                                                        class="v-progress-linear__indeterminate short bg-primary">
                                                                    </div>
                                                                </div><!---->
                                                            </div>
                                                        </div><!---->
                                                        <div class="v-field__field" data-no-activator=""><!----><label
                                                                class="v-label v-field-label"
                                                                for="input-269"><!---->Last
                                                                Name</label><!----><input placeholder="Doe" size="1"
                                                                type="text" id="input-269"
                                                                aria-describedby="input-269-messages" required=""
                                                                class="v-field__input"><!----></div><!----><!---->
                                                        <div class="v-field__outline">
                                                            <div class="v-field__outline__start"></div>
                                                            <div class="v-field__outline__notch"><label
                                                                    class="v-label v-field-label v-field-label--floating"
                                                                    aria-hidden="true" for="input-269"><!---->Last
                                                                    Name</label></div>
                                                            <div class="v-field__outline__end"></div><!---->
                                                        </div>
                                                    </div>
                                                </div><!---->
                                                <div id="input-269-messages" class="v-input__details" role="alert"
                                                    aria-live="polite">
                                                    <div class="v-messages"></div><!---->
                                                </div>
                                            </div>
                                        </div>
                                        <div data-v-d9cedaef="" class="v-col-sm-6 v-col-12">
                                            <div data-v-d9cedaef=""
                                                class="v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--light v-locale--is-ltr v-text-field">
                                                <!---->
                                                <div class="v-input__control">
                                                    <div
                                                        class="v-field v-field--center-affix v-field--variant-outlined v-theme--light v-locale--is-ltr">
                                                        <div class="v-field__overlay"></div>
                                                        <div class="v-field__loader">
                                                            <div class="v-progress-linear v-theme--light v-locale--is-ltr"
                                                                style="top: 0px; height: 0px; --v-progress-linear-height: 2px;"
                                                                role="progressbar" aria-hidden="true" aria-valuemin="0"
                                                                aria-valuemax="100"><!---->
                                                                <div class="v-progress-linear__background bg-primary">
                                                                </div>
                                                                <div class="v-progress-linear__buffer bg-primary"
                                                                    style="width: 0%;">
                                                                </div>
                                                                <div class="v-progress-linear__indeterminate">
                                                                    <div
                                                                        class="v-progress-linear__indeterminate long bg-primary">
                                                                    </div>
                                                                    <div
                                                                        class="v-progress-linear__indeterminate short bg-primary">
                                                                    </div>
                                                                </div><!---->
                                                            </div>
                                                        </div><!---->
                                                        <div class="v-field__field" data-no-activator=""><!----><label
                                                                class="v-label v-field-label"
                                                                for="input-271"><!---->Budget</label><!----><input
                                                                placeholder="Doe" size="1" type="text" id="input-271"
                                                                aria-describedby="input-271-messages" required=""
                                                                class="v-field__input"><!----></div><!----><!---->
                                                        <div class="v-field__outline">
                                                            <div class="v-field__outline__start"></div>
                                                            <div class="v-field__outline__notch"><label
                                                                    class="v-label v-field-label v-field-label--floating"
                                                                    aria-hidden="true"
                                                                    for="input-271"><!---->Budget</label>
                                                            </div>
                                                            <div class="v-field__outline__end"></div><!---->
                                                        </div>
                                                    </div>
                                                </div><!---->
                                                <div id="input-271-messages" class="v-input__details" role="alert"
                                                    aria-live="polite">
                                                    <div class="v-messages"></div><!---->
                                                </div>
                                            </div>
                                        </div>
                                        <div data-v-d9cedaef="" class="v-col-sm-6 v-col-12">
                                            <div data-v-d9cedaef=""
                                                class="v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--light v-locale--is-ltr v-text-field">
                                                <!---->
                                                <div class="v-input__control">
                                                    <div
                                                        class="v-field v-field--center-affix v-field--variant-outlined v-theme--light v-locale--is-ltr">
                                                        <div class="v-field__overlay"></div>
                                                        <div class="v-field__loader">
                                                            <div class="v-progress-linear v-theme--light v-locale--is-ltr"
                                                                style="top: 0px; height: 0px; --v-progress-linear-height: 2px;"
                                                                role="progressbar" aria-hidden="true" aria-valuemin="0"
                                                                aria-valuemax="100"><!---->
                                                                <div class="v-progress-linear__background bg-primary">
                                                                </div>
                                                                <div class="v-progress-linear__buffer bg-primary"
                                                                    style="width: 0%;">
                                                                </div>
                                                                <div class="v-progress-linear__indeterminate">
                                                                    <div
                                                                        class="v-progress-linear__indeterminate long bg-primary">
                                                                    </div>
                                                                    <div
                                                                        class="v-progress-linear__indeterminate short bg-primary">
                                                                    </div>
                                                                </div><!---->
                                                            </div>
                                                        </div><!---->
                                                        <div class="v-field__field" data-no-activator=""><!----><label
                                                                class="v-label v-field-label"
                                                                for="input-273"><!---->Website</label><!----><input
                                                                size="1" type="text" id="input-273"
                                                                aria-describedby="input-273-messages" required=""
                                                                class="v-field__input"><!----></div><!----><!---->
                                                        <div class="v-field__outline">
                                                            <div class="v-field__outline__start"></div>
                                                            <div class="v-field__outline__notch"><label
                                                                    class="v-label v-field-label v-field-label--floating"
                                                                    aria-hidden="true"
                                                                    for="input-273"><!---->Website</label>
                                                            </div>
                                                            <div class="v-field__outline__end"></div><!---->
                                                        </div>
                                                    </div>
                                                </div><!---->
                                                <div id="input-273-messages" class="v-input__details" role="alert"
                                                    aria-live="polite">
                                                    <div class="v-messages"></div><!---->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-v-d9cedaef=""
                                        class="v-input v-input--horizontal v-input--density-compact v-theme--light v-locale--is-ltr v-textarea v-text-field mt-5">
                                        <!---->
                                        <div class="v-input__control">
                                            <div
                                                class="v-field v-field--variant-outlined v-theme--light v-locale--is-ltr">
                                                <div class="v-field__overlay"></div>
                                                <div class="v-field__loader">
                                                    <div class="v-progress-linear v-theme--light v-locale--is-ltr"
                                                        style="top: 0px; height: 0px; --v-progress-linear-height: 2px;"
                                                        role="progressbar" aria-hidden="true" aria-valuemin="0"
                                                        aria-valuemax="100">
                                                        <!---->
                                                        <div class="v-progress-linear__background bg-primary"></div>
                                                        <div class="v-progress-linear__buffer bg-primary"
                                                            style="width: 0%;">
                                                        </div>
                                                        <div class="v-progress-linear__indeterminate">
                                                            <div
                                                                class="v-progress-linear__indeterminate long bg-primary">
                                                            </div>
                                                            <div
                                                                class="v-progress-linear__indeterminate short bg-primary">
                                                            </div>
                                                        </div><!---->
                                                    </div>
                                                </div><!---->
                                                <div class="v-field__field" data-no-activator=""><!----><label
                                                        class="v-label v-field-label"
                                                        for="input-275"><!---->Message</label><!----><textarea
                                                        class="v-field__input" rows="5" id="input-275"
                                                        aria-describedby="input-275-messages"></textarea><!----><!---->
                                                </div>
                                                <!----><!---->
                                                <div class="v-field__outline">
                                                    <div class="v-field__outline__start"></div>
                                                    <div class="v-field__outline__notch"><label
                                                            class="v-label v-field-label v-field-label--floating"
                                                            aria-hidden="true" for="input-275"><!---->Message</label>
                                                    </div>
                                                    <div class="v-field__outline__end"></div><!---->
                                                </div>
                                            </div>
                                        </div><!---->
                                        <div id="input-275-messages" class="v-input__details" role="alert"
                                            aria-live="polite">
                                            <div class="v-messages"></div><!---->
                                        </div>
                                    </div><button data-v-d9cedaef="" type="button"
                                        class="v-btn v-theme--light bg-primary v-btn--density-default v-btn--size-default v-btn--variant-flat text-none"
                                        style="height: 50px; width: 100%;"><span class="v-btn__overlay"></span><span
                                            class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                            data-no-activator="">Let's talk</span><!----><!----></button>
                                    <p data-v-d9cedaef="" class="mt-4 text-medium-emphasis">By submitting this form, I
                                        agree
                                        to the
                                        privacy policy.</p>
                                </div>
                                <div data-v-d9cedaef="" class="v-col-md-5 v-col-12 py-10 px-3 px-md-8">
                                    <div data-v-d9cedaef="" class="v-responsive v-img" style="width: 100px;">
                                        <div class="v-responsive__sizer" style="padding-bottom: 35.975%;"></div><img
                                            class="v-img__img v-img__img--contain"
                                            src="https://vuetifyjs.b-cdn.net/docs/images/one/logos/vplay-logo-light.png"
                                            style=""><!----><!----><!----><!----><!---->
                                    </div>
                                    <p data-v-d9cedaef=""
                                        class="text-sm-subtitle-1 text-subtitle-2 text-medium-emphasis mt-4 mb-6">
                                        “Amet amet eget scelerisque tellus sit neque faucibus non eleifend. Integer eu
                                        praesent at a.
                                        Ornare arcu gravida natoque erat et cursus tortor consequat at. Vulputate
                                        gravida
                                        sociis enim
                                        nullam ultricies habitant malesuada lorem ac. Tincidunt urna dui pellentesque
                                        sagittis.”</p>
                                    <div data-v-d9cedaef=""
                                        class="v-list-item v-theme--light v-list-item--density-default rounded-0 v-list-item--variant-text px-0">
                                        <!----><span class="v-list-item__underlay"></span>
                                        <div class="v-list-item__prepend">
                                            <div
                                                class="v-avatar v-theme--light v-avatar--density-default v-avatar--size-default v-avatar--variant-flat">
                                                <div class="v-responsive v-img" aria-label="">
                                                    <div class="v-responsive__sizer" style="padding-bottom: 100%;">
                                                    </div>
                                                    <img class="v-img__img v-img__img--cover"
                                                        src="https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/5.jpg"
                                                        alt="" style=""><!----><!----><!----><!----><!---->
                                                </div><!----><span class="v-avatar__underlay"></span>
                                            </div><!---->
                                            <div class="v-list-item__spacer"></div>
                                        </div>
                                        <div class="v-list-item__content" data-no-activator="">
                                            <div class="v-list-item-title">Judith Black</div>
                                            <div class="v-list-item-subtitle">CEO of Fendi</div><!---->
                                        </div><!---->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <footer data-v-0945acbe="" class="v-footer v-theme--light pt-16 pb-0 px-0 d-flex flex-column"
                    style="height: auto;">
                    <div data-v-0945acbe="" class="v-row px-4 w-100">
                        <div data-v-0945acbe="" class="v-col-md-12 v-col-lg-4 v-col-12">
                            <div data-v-0945acbe="" class="v-responsive v-img mt-1 mb-6" style="max-width: 120px;">
                                <div class="v-responsive__sizer" style="padding-bottom: 23.6511%;"></div><img
                                    class="v-img__img v-img__img--contain"
                                    src="https://vuetifyjs.b-cdn.net/docs/images/one/logos/vuetify-logo-light.png"
                                    style=""><!----><!----><!----><!----><!---->
                            </div>
                            <p data-v-0945acbe="">Making the world a better place through constructing elegant
                                hierarchies.
                            </p>
                        </div>
                        <div data-v-0945acbe="" class="v-col-md-3 v-col-lg-2 v-col-6">
                            <p data-v-0945acbe="" class="text-body-1 font-weight-bold px-4 mb-3">Solutions</p>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Marketing</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Analytics</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Commerce</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Insights</span><!----><!----></a></div>
                        </div>
                        <div data-v-0945acbe="" class="v-col-md-3 v-col-lg-2 v-col-6">
                            <p data-v-0945acbe="" class="text-body-1 font-weight-bold px-4 mb-3">Support</p>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Pricing</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Documentation</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Guides</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">API Status</span><!----><!----></a></div>
                        </div>
                        <div data-v-0945acbe="" class="v-col-md-3 v-col-lg-2 v-col-6">
                            <p data-v-0945acbe="" class="text-body-1 font-weight-bold px-4 mb-3">Company</p>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">About</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Blog</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Jobs</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Press</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Partners</span><!----><!----></a></div>
                        </div>
                        <div data-v-0945acbe="" class="v-col-md-3 v-col-lg-2 v-col-6">
                            <p data-v-0945acbe="" class="text-body-1 font-weight-bold px-4 mb-3">Legal</p>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Claim</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Privacy</span><!----><!----></a></div>
                            <div data-v-0945acbe=""><a data-v-0945acbe=""
                                    class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text text-body-2"
                                    href="#"><span class="v-btn__overlay"></span><span
                                        class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                        data-no-activator="">Terms</span><!----><!----></a></div>
                        </div>
                    </div>
                    <div data-v-0945acbe=""
                        class="d-flex flex-sm-row justify-space-between mt-8 pa-4 border-t w-100 flex-wrap">
                        <div data-v-0945acbe="">
                            <p data-v-0945acbe="" class="font-weight-bold mb-1"> Subscribe to our newsletter </p>
                            <p data-v-0945acbe="" class="text-caption mb-2">The latest news, articles, and resources,
                                sent
                                to your inbox
                                weekly.</p>
                        </div>
                        <div data-v-0945acbe=""
                            class="v-input v-input--horizontal v-input--center-affix v-input--density-compact v-theme--light v-locale--is-ltr v-text-field"
                            style="max-width: 360px;"><!---->
                            <div class="v-input__control">
                                <div
                                    class="v-field v-field--appended v-field--center-affix v-field--variant-solo-filled v-theme--light v-locale--is-ltr">
                                    <div class="v-field__overlay"></div>
                                    <div class="v-field__loader">
                                        <div class="v-progress-linear v-theme--light v-locale--is-ltr"
                                            style="top: 0px; height: 0px; --v-progress-linear-height: 2px;"
                                            role="progressbar" aria-hidden="true" aria-valuemin="0" aria-valuemax="100">
                                            <!---->
                                            <div class="v-progress-linear__background"></div>
                                            <div class="v-progress-linear__buffer" style="width: 0%;"></div>
                                            <div class="v-progress-linear__indeterminate">
                                                <div class="v-progress-linear__indeterminate long"></div>
                                                <div class="v-progress-linear__indeterminate short"></div>
                                            </div><!---->
                                        </div>
                                    </div><!---->
                                    <div class="v-field__field" data-no-activator=""><label
                                            class="v-label v-field-label v-field-label--floating" aria-hidden="true"
                                            for="input-369"><!---->Enter your email</label><label
                                            class="v-label v-field-label" for="input-369"><!---->Enter your
                                            email</label><!----><input size="1" type="email" id="input-369"
                                            aria-describedby="input-369-messages" class="v-field__input"><!----></div>
                                    <!---->
                                    <div class="v-field__append-inner"><button data-v-0945acbe="" type="button"
                                            class="v-btn v-theme--light bg-primary v-btn--density-default rounded-md v-btn--size-small v-btn--variant-flat text-none"><span
                                                class="v-btn__overlay"></span><span
                                                class="v-btn__underlay"></span><!----><span class="v-btn__content"
                                                data-no-activator="">Subscribe</span><!----><!----></button><!---->
                                    </div>
                                    <div class="v-field__outline"><!----><!----></div>
                                </div>
                            </div><!----><!---->
                        </div>
                    </div>
                    <div data-v-0945acbe=""
                        class="v-sheet v-theme--light bg-surface-light d-flex d-flex flex-column flex-sm-row justify-space-between align-center px-4 py-1"
                        style="width: 100%;" variant="flat">
                        <p data-v-0945acbe="" class="text-caption py-4"> © 2016-2025 Vuetify. All rights reserved. </p>
                        <div data-v-0945acbe=""><button data-v-0945acbe="" type="button"
                                class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--size-small v-btn--variant-text"><span
                                    class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span
                                    class="v-btn__content" data-no-activator=""><i
                                        class="mdi-facebook mdi v-icon notranslate v-theme--light v-icon--size-default"
                                        aria-hidden="true"></i></span><!----><!----></button><button data-v-0945acbe=""
                                type="button"
                                class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--size-small v-btn--variant-text"><span
                                    class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span
                                    class="v-btn__content" data-no-activator=""><i
                                        class="mdi-twitter mdi v-icon notranslate v-theme--light v-icon--size-default"
                                        aria-hidden="true"></i></span><!----><!----></button><button data-v-0945acbe=""
                                type="button"
                                class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--size-small v-btn--variant-text"><span
                                    class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span
                                    class="v-btn__content" data-no-activator=""><i
                                        class="mdi-linkedin mdi v-icon notranslate v-theme--light v-icon--size-default"
                                        aria-hidden="true"></i></span><!----><!----></button><button data-v-0945acbe=""
                                type="button"
                                class="v-btn v-btn--icon v-theme--light v-btn--density-default v-btn--size-small v-btn--variant-text"><span
                                    class="v-btn__overlay"></span><span class="v-btn__underlay"></span><!----><span
                                    class="v-btn__content" data-no-activator=""><i
                                        class="mdi-instagram mdi v-icon notranslate v-theme--light v-icon--size-default"
                                        aria-hidden="true"></i></span><!----><!----></button></div>
                    </div>
                </footer>

                <!-- <router-view />
            <v-container>
                <v-row>
                    <v-col v-for="empresa in empresas" :key="n" cols="4">
                        <v-card height="100" class="mx-auto" color="surface-variant"
                            image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg" max-width="150"
                            :subtitle="empresa.nombre" :title="empresa.nombre" @click="goHome(empresa.nombre)">
                        </v-card>
                    </v-col>
                </v-row>
            </v-container> -->
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useErrorHandler } from '@/composables/errorHandler'

const router = useRouter()
const route = useRoute()
const drawer = ref(false)

const items = ref([
    {
        title: 'Foo',
        value: 'foo',
    },
    {
        title: 'Bar',
        value: 'bar',
    },
    {
        title: 'Fizz',
        value: 'fizz',
    },
    {
        title: 'Buzz',
        value: 'buzz',
    },
])

onMounted(() => {
})

watch(drawer, (newValue, oldValue) => {
    drawer.value = newValue
})

</script>