import { LocalStorageEngine } from './engines/LocalStorageEngine';
import { FirebaseStorageEngine } from './engines/FirebaseStorageEngine';
import { StorageEngine } from './engines/StorageEngine';

export async function initalizeStorageEngine() {
  let storageEngine: StorageEngine;
  let fallback = false;

  if (import.meta.env.VITE_STORAGE_ENGINE === 'firebase') {
    const firebaseStorageEngine = new FirebaseStorageEngine();
    await firebaseStorageEngine.connect();

    if (firebaseStorageEngine.isConnected()) {
      storageEngine = firebaseStorageEngine;
    } else {
      fallback = true;
    }
  }

  if (import.meta.env.VITE_STORAGE_ENGINE === 'localStorage' || fallback) {
    const localStorageEngine = new LocalStorageEngine();
    await localStorageEngine.connect();

    storageEngine = localStorageEngine;
  }

  return storageEngine!;
}
