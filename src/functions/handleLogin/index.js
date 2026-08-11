// Database
import { supabase } from '../../services/db';

export async function handleLogin(email, password){
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if(error){
        console.log(error.message);
        return;
    }
    
    return data;
}