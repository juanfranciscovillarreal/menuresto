import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabase'

export function useCategoria() {
  const isEditing = ref(false);
  const categorias = ref([]);
  const listas = ref([]);

  async function updateCategoria(record) {
    const { error } = await supabase
      .from('Categoria')
      .update(record.value)
      .eq('id', record.value.id);

    if (error) throw error;

    return true;
  }

  async function insertCategoria(data) {
    /*
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw 'Debe iniciar sesión';
*/
    const { error } = await supabase.from('Categoria').insert(data);

    if (error) throw error;
  }

  async function removeCategoria(id) {
    const response = await supabase.from('Categoria').delete().eq('id', id);

    if (response.error) throw response.error;
  }

  async function getCategorias(id) {
    let { data, error, status } = await supabase
    .from('Categoria')
    .select('id, nombre')
    .eq('user_id', id)
    .order('nombre', { ascending: true });

    if (error) throw error;
    return data;
  }

  return { getCategorias, updateCategoria, insertCategoria, removeCategoria };
}
