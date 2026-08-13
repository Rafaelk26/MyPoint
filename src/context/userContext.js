import { createContext, useState } from 'react';

// Database
import { supabase } from '../../src/services/db';

// Functions
import { findUser } from '../functions/findUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export function UserProvider({ children }){
    // State global user
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    async function getUser(user){
        const data = await findUser(user.id);
        
        setUser({ ...data, point: [
            { name: 'Entrada', hour: '--:--', done: false },
            { name: 'Almoço (Ida)', hour: '--:--', done: false },
            { name: 'Almoço (Volta)', hour: '--:--', done: false },
            { name: 'Saída', hour: '--:--', done: false },
        ]});

        return data;
    }

    async function LoadingStorage(userId){
        setLoading(true);
        try{
            const storageUser = await AsyncStorage.getItem('@myPointToken');

            if(!storageUser){
                setUser(null);
                console.log("Não foi possível resgatar o token da aplicação.");
                return;
            }

            const response = await findUser(userId);
            setUser({
                ...response,
                point: [
                    { name: 'Entrada', hour: '--:--', done: false },
                    { name: 'Almoço (Ida)', hour: '--:--', done: false },
                    { name: 'Almoço (Volta)', hour: '--:--', done: false },
                    { name: 'Saída', hour: '--:--', done: false },
                ],
            });
            setLoading(false);
        } 
        catch(err){
            setUser(null);
            console.log("Erro ao carregar usuário.", err);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }

    async function signIn(email, password){
        // Start loading auth...
        setAuthLoading(true);

        try{
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            // Error
            if(error){
                console.log(`Erro ao logar usuário: ${error.message}`);
                setAuthLoading(false);
                return;
            }
            
            // Success
            await AsyncStorage.setItem('@myPointToken', data.session.access_token);
            await supabase.from('employees')
            .update({ status: 'active' })
            .eq('auth_user_id', data.user.id);

            setAuthLoading(false);
            return data;
        }
        catch(err){
            // Failed
            console.log(`Erro ao se conectar com o banco: ${err.message}`);
            throw err;
        }
        finally{
            setAuthLoading(false);
        }
    }

    async function signOut() {
        setAuthLoading(true);
        try{
            const { error: updateError } = await supabase.from('employees')
            .update({ status: 'inactive' })
            .eq('id', user.id);

            if(updateError){
                throw updateError;
            }


            const { error: signOutError } = await supabase.auth.signOut();

            if(signOutError){
                throw signOutError;
            }

            setUser(null);
            setAuthLoading(false);
        }
        catch(err){
            console.log('Erro ao sair:', error.message);
        }
        finally{
            setAuthLoading(false);
        }
    }

    return(
        <UserContext.Provider value={{ user, getUser, signIn, signOut, loading, authLoading, LoadingStorage }}>
            { children }
        </UserContext.Provider>
    )
}

// user {
//  id,
//  name,
//  email,
//  point: [
//  {id: 1, name: 'Entrada', hour: '--:--', done: false},
//  {id: 2, name: 'Almoço (Ida)', hour: '--:--', done: false},
//  {id: 3, name: 'Almoço (Volta)', hour: '--:--', done: false},
//  {id: 4, name: 'Saída', hour: '--:--', done: false},
// ],
//  token,
// }