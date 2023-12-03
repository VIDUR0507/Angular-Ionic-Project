import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor() {}

  async saveIntoStorage(key: any, value: string) {
    const item = await Preferences.set({
      key: key,
      value: JSON.stringify(value),
    });
  }

  async getfromStorage(key: any) {
    const item: any = await Preferences.get({ key });
    return JSON.parse(item.value);
  }

  async removefromStorage(key: any) {
    const item = await Preferences.remove({ key });
  }

  async clearStorage() {
    const item = await Preferences.clear();
  }
}
