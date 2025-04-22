export function useFiltros() {

    function toPesos(value) {
        return Intl.NumberFormat('es-AR', { currency: 'ars', style: 'currency' }).format(value);
    }

    return { toPesos };
}