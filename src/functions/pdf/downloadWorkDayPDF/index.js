import * as Sharing from 'expo-sharing';
import { File, Paths } from 'expo-file-system';
import { supabase } from '../../../services/db';

export async function downloadWorkDayPDF(storagePath, fileName){
  try{

    const { data, error } = await supabase.storage
      .from('work-day-pdfs')
      .createSignedUrl(storagePath, 60);

    if(error){
      throw error;
    }

    if(!data?.signedUrl){
      throw new Error('URL do PDF não foi gerada.');
    }

    const destination = new File(Paths.cache, fileName);

    if(destination.exists){
      destination.delete();
    }

    const downloadedFile = await File.downloadFileAsync(data.signedUrl, destination);


    if(!downloadedFile.uri.startsWith('file://')){
      throw new Error('O PDF não foi salvo como arquivo local.');
    }

    const sharingAvailable = await Sharing.isAvailableAsync();

    if(!sharingAvailable){
      throw new Error('Compartilhamento não está disponível neste dispositivo.');
    }

    await Sharing.shareAsync(
      downloadedFile.uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Compartilhar PDF',
        UTI: 'com.adobe.pdf',
      }
    );

    return downloadedFile.uri;

  } 
  catch(error){
    console.log('Erro ao baixar PDF:', error);
    throw error;
  }
}