// Database
import { supabase } from "../../../services/db";

export async function deleteWorkDayPDF({ id, storagePath }){

  const { error: storageError } = await supabase
    .storage
    .from('work-day-pdfs')
    .remove([storagePath]);

    if(storageError){
      throw storageError;
    }

    const { error: databaseError } = await supabase
      .from('pdf_documents')
      .delete()
      .eq('id', id);

    if(databaseError){
      throw databaseError;
    }

  return true;
}