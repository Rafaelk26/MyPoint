// Database
import { supabase } from '../../services/db';

export async function findUser(authUserId) {
  const { data, error } = await supabase
    .from('employees')
    .select(`
      id,
      name,
      email,
      cpf,
      phone,
      position
    `)
    .eq('auth_user_id', authUserId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}