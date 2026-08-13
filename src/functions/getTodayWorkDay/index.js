// Database
import { supabase } from "../../services/db";

export async function getTodayWorkDay(employeeId) {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('work_days')
    .select('*')
    .eq('employee_id', employeeId)
    .eq('date', today)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }

  const { data: newWorkDay, error: createError } = await supabase
    .from('work_days')
    .insert({
      employee_id: employeeId,
      date: today,
      worked_hours: '00:00',
      extra_hours: '00:00',
      balance: '00:00',
      status: 'open',
    })
    .select()
    .single();

  if (createError) {
    throw createError;
  }

  return newWorkDay;
}