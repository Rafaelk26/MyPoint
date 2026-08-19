// Database
import { supabase } from "../../../services/db";

export async function uploadWorkDayPDF({ employeedId, workDayId, fileUri, fileName }) {
    const response = await fetch(fileUri);
    
    if(!response.ok){
        throw new Error('Não foi possível ler o PDF');
    }

    const blob = await response.blob();

    const storagePath = `${employeedId}/${workDayId}.pdf`;

    const { error: uploadError } = await supabase
    .storage
    .from('work-day-pdfs')
    .upload(storagePath, blob, {
        contentType: 'application/pdf',
        upsert: true,
    });

    if(uploadError){
        throw uploadError;
    }

    const { data, error } = await supabase
    .from('pdf_documents')
    .upsert({
        employeed_id: employeedId,
        work_day_id: workDayId,
        file_name: fileName,
        storagePath: blob.size,
        file_size: blob.size,
    }, {
        onConflict: 'work_day_id',
    })
    .select()
    .single();

    if(error){
        await supabase
        .storage
        .from('work-days-pdf')
        .remove([storagePath]);

        throw error;
    }

    return data;
}