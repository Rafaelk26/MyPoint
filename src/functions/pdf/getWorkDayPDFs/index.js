// Database
import { supabase } from "../../../services/db";

export async function getWorkDayPDFs(employeeId) {

  const { data, error } = await supabase
    .from('pdf_documents')
    .select(`
      id,
      work_day_id,
      file_name,
      storage_path,
      file_size,
      created_at
    `)
    .eq('employee_id', employeeId)
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}