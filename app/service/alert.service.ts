import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertCtrl: AlertController) {}

  //Alert with any action like for delete or logout
  presentAlertWithBtns(msg: string) {
    return new Promise((resolve, reject) => {
      const alert = this.alertCtrl.create({
        message: msg,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });

      alert.then((alertElement) => {
        alertElement.present().then(() => {
          alertElement.onDidDismiss().then((result) => {
            const { role } = result;
            resolve(`Dismissed with role: ${role}`);
          });
        });
      });
    });
  }

  //Alert without any action
  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAlert2(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return false;
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            return true;
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    const roleMessage = `Dismissed with role: ${role}`;
  }
}
