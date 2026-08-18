import { Asset } from 'expo-asset';

export async function getLogoBase64() {

  const asset = Asset.fromModule(
    require('../../../assets/MyPointLogo.png')
  );

  await asset.downloadAsync();

  const uri = asset.localUri || asset.uri;

  const response = await fetch(uri);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
}