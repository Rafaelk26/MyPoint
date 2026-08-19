import { File } from 'expo-file-system';

// Database
import { supabase } from '../../../services/db';

export async function uploadPDF(uri, fileName, employeeId, workDayId){
  try{
    const file = new File(uri);
    const arrayBuffer = await file.arrayBuffer();
    const fileSize = file.size;
    const filePath = `${employeeId}/${fileName}`;


    const { data: storageData, error: storageError } = await supabase.storage
    .from('work-day-pdfs')
    .upload(filePath, arrayBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

    if (storageError) {
      throw storageError;
    }

    const { data: documentData, error: documentError } = await supabase
    .from('pdf_documents')
    .insert({
      employee_id: employeeId,
      work_day_id: workDayId,
      file_name: fileName,
      storage_path: filePath,
      file_size: fileSize,
    })
    .select()
    .single();

    if(documentError){
      await supabase.storage
        .from('work-day-pdfs')
        .remove([filePath]);

      throw documentError;
    }

    return { storage: storageData, document: documentData };

  } catch(error){
    console.log('Erro ao fazer upload do PDF:', error);
    throw error;
  }
}