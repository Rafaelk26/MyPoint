import Toast from 'react-native-toast-message';
import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Database
import { supabase } from '../../src/services/db';

// Functions
import { findUser } from '../functions/findUser';
import { getTodayWorkDay } from '../functions/getTodayWorkDay';

export const UserContext = createContext();

export function UserProvider({ children }){
    // State global user
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    async function getUser(user){
        // Get user
        const data = await findUser(user.id);
        
        // Modified user with point array added on context
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
        Toast.show({
            type: 'info',
            text1: 'Carregando...',
        });
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
            Toast.show({
                type: 'success',
                text1: 'Seja bem-vindo(a).',
            });
            return data;
        }
        catch(err){
            // Failed
            console.log(`Erro ao se conectar com o banco: ${err.message}`);
            throw err;
            Toast.show({
                type: 'error',
                text1: 'Erro ao se logar.',
            });
        }
        finally{
            setAuthLoading(false);
        }
    }

    async function signOut(){
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

    async function registerPoint({ employeeId, workDayId, type, time}){
        const { data, error } = await supabase
            .from('time_points')
            .insert({
                work_day_id: workDayId,
                type,
                time,
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        if (type === 'exit') {
            const {
                data: completedDay,
                error: completeError
            } = await supabase.rpc('complete_work_day', {
                p_work_day_id: workDayId,
            });

            if (completeError) {
             throw completeError;
            }

            return {
                point: data,
                workDay: completedDay,
            };
        }

        return {
            point: data,
            workDay: null,
        };
    }

    function buildPoints(points = []){
        const defaultPoints = [
            {
                id: 1,
                name: 'Entrada',
                type: 'entry',
                hour: '--:--',
                done: false,
            },
            {
                id: 2,
                name: 'Almoço (Ida)',
                type: 'lunch_start',
                hour: '--:--',
                done: false,
            },
            {
                id: 3,
                name: 'Almoço (Volta)',
                type: 'lunch_end',
                hour: '--:--',
                done: false,
            },
            {
                id: 4,
                name: 'Saída',
                type: 'exit',
                hour: '--:--',
                done: false,
            },
        ];

        return defaultPoints.map(point => {
            const registeredPoint = points.find(
                item => item.type === point.type
            );

            if (!registeredPoint) {
                return point;
            }

            const formatedHours = registeredPoint.time
                ? registeredPoint.time.slice(0, 5)
                : '--:--';

            return {
                ...point,
                hour: registeredPoint.time,
                done: true,
                databaseId: registeredPoint.id,
            };
        });
    }

    function updateUserPoints(points) {
        setUser(prev => ({
            ...prev,
            point: points,
        }));
    }

    return(
        <UserContext.Provider 
        value={{ 
            user, 
            loading, 
            authLoading, 
            getUser, 
            signIn, 
            signOut, 
            registerPoint, 
            updateUserPoints, 
            LoadingStorage 
        }}>
            { children }
        </UserContext.Provider>
    )
}