import { defineStore } from 'pinia'
import { ref } from 'vue';
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore("auth", () => {
    const session = ref(null);
    const isLoading = ref(true);

    function initializeAuthListener() {
        const authListener = supabase.auth.onAuthStateChange(
            async (_, newSession) => {
                session.value = newSession;
                isLoading.value = false;
            }
        );

        return () => {
            authListener.data.subscription.unsubscribe();
        };
    }

    function setSession(newSession) {
        session.value = newSession;
    }

    return {
        session,
        isLoading,
        initializeAuthListener,
        setSession,
    };
});