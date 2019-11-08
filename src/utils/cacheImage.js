import { Platform } from 'react-native';
import shorthash from 'shorthash';
import RNFS from 'react-native-fs';

export default async uri => {
  const name = shorthash.unique(uri);
  const fileType = uri.split('.').pop();
  const extension = Platform.OS === 'android' ? 'file://' : '';
  const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.${fileType}`;

  const exists = await RNFS.exists(path);
  if (exists) return path;

  await RNFS.downloadFile({ fromUrl: uri, toFile: path }).promise;
  return path;
};
