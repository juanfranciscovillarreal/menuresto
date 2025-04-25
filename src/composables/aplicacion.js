import { ref } from 'vue';

export function useAplicacion() {
    const nombreApp = ref('Intelicarta')
    return { nombreApp };
}