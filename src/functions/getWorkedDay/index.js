// Database
import { supabase } from '../../services/db';

export async function getWorkedDay(employeeId){
    try{
        const { data: workedDay, error: errorWorkedDay } = await supabase
        .from('work_days')
        .select(`
            id,
            date,
            worked_hours,
            extra_hours,
            balance,
            status,
            time_points (
                id,
                type,
                time,
                created_at
            )
        `)
        .eq('employee_id', employeeId)
        .eq('status', 'completed')
        .order('date', { ascending: false });

        if(errorWorkedDay){
            throw errorWorkedDay;
            console.log('Não foi possível receber os dados da tabela "work_days"');
        }

        return workedDay;
    }
    catch(err){
        console.log('Não foi possível resgatar os dados do banco', err);
        return;
    }
}