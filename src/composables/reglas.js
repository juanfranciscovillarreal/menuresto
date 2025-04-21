import { ref } from 'vue';

export function useReglas() {

    const rules = ref({
        required: (value) => !!value || 'Obligatorio',
        counter: (value) => value.length <= 20 || 'Máximo 20 caracteres',
        min8: (v) => v.length >= 8 || 'Min 8 caracteres',
        mayor0: (v) => v.length > 0 || 'Sólo números positivos',
        max20: (value) => value.length <= 20 || 'Max 20 caracteres',
        max50: (value) =>
            (value == undefined || value.length <= 50) || 'Max 50 caracteres',
        decimal: (value) => {
            const pattern = /^((?!0)\d{1,5}|0|\.\d{1,2})($|\.$|\.\d{1,2}$)/;
            return pattern.test(value) || 'Importe inválido.';
        },
        email: (value) => {
            const pattern =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || 'Correo inválido.';
        },
    });

    return { rules };
}