// Database
import { supabase } from '../../../src/services/db';

export async function findPointsToday(workDayId) {
  
    if (!workDayId) {
    throw new Error('workDayId não informado.');
  }

  const { data, error } = await supabase
    .from('time_points')
    .select('*')
    .eq('work_day_id', workDayId)
    .order('time', { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}