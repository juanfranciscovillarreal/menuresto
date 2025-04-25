import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const session = ref();

  async function signIn(email, password) {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error

    return data;
  }

  async function signOut() {

    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  }

  async function getSession() {
    const { data, error } = await supabase.auth.getSession()
    session.value = data.session;

    if (error) throw error;

    return session;
  }

  return { signIn, signOut, getSession };
}
