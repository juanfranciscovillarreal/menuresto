import { defineStore } from 'pinia'

export const useEmpresaStore = defineStore('empresa', () => {
    // Estados
    const empresa = ref({
        id:'',
        nombre:'',
        descripcion:'',
        direccion:'',
        telefono:'',
        celular:'',
        web:'',
        logo:'',
        email:'',        
    })

    const defaultFoto = ref('iVBORw0KGgoAAAANSUhEUgAAAGEAAABTCAYAAACPtGkFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIxSURBVHhe7Zktj8JQEEX7w3HIykosEovFYrFYNBbNBsQmffM+ptN5ZcQ5yTWw6d3Mye4NYXjDzxnSF2B7mhKmaXoPw0CMud/v6UkFSOgcJAQIEgIECQGChABBQoAgIUCQECBICBAXCdAfJAQACQFAQgCQEICmhN1uJxaf6HO5XNKTCqoSns+neChZluPxmJ5VUJVwu93EQ8myjOOYnlVQlXA+n8VDyfK0qP4En5Z90vrUXJXAKPukNc5FCYyyX1rjXJTAKPulNc5FCYyyb2oU32WUfVMb56IERtk3tXHOSni9XuIhZF1Op1N65n+yEj5/OulDyLp8/r2XyEpglPukRPadw+EgHkDW5/F4pKf+kpWw3+/FA8j6XK/X9NRfhARGuV9K4ywkMMr9UhpnIYFR7psc4lVGuW9y4ywkMMp9kxvnmQRGuX9y4zyTwCj3T26cZxIY5W2SMnuFUd4m6TjPJPAdwjZJv1tAwg+ChABBQoAgIUCQECBICBAkBAgSAgQJAVKVkEMrJn3wVvzq9/PsRYIRz14kGPHsRYIRz14kGPHsRYIRz14kGPHsRYIRz14kGPHsRYIRz14kGPHsRYIRz14kGPHsRYIRz14kGPHsRYIRz14kGPHsRYIRz14kGPHsRYIRz143CdGjOcYStHfR9CLBiPYuml4kGNHeRdOLBCPau2h6kWBEexdNLxKMaO+i6UWCEe1dNL1IMKK9i6YXCUa0d9H0IsGI9i6a3qYE6M8fSiE/UZFVPLUAAAAASUVORK5CYII=')

    // Getters

    // Actions

    return {
        empresa,
        defaultFoto,
    }
})