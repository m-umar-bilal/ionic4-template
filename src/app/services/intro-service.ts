import { IService } from './IService';
import { Toast } from '@ionic-native/toast';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Network } from '@ionic-native/network';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { AppSettings } from './app-settings'

@Injectable({ providedIn: 'root' })
export class IntroService {

    constructor(public af: AngularFireDatabase,private spinnerDialog: SpinnerDialog) {}

    getData = (): any => {
        return {
          'btnPrev': 'Previous',
          'btnNext': 'Next',
          'btnFinish': 'Finish',
          'items': [
              {   logo: 'assets/images/logo/2.png',
                  title: 'Welcome to our new iOS style theme',
                  description: 'Finished layouts and components for Ionic 3. Ready to use!'

              },
              {
                  logo: 'assets/images/logo/2.png',
                  title: 'For Developers',
                  description: 'Save hours of developing. Tons of funcional components.'
              },
              {
                  logo: 'assets/images/logo/2.png',
                  title: 'For Designers',
                  description: 'Endless possibilities. Combine layouts as you wish.'
              }
          ]
      };
    }

    load(): Observable<any> {
        this.spinnerDialog.show(null, "Loading");
        if (AppSettings.IS_FIREBASE_ENABLED) {
            return new Observable(observer => {
                this.af
                    .object('intro')
                    .valueChanges()
                    .subscribe(snapshot => {
                        this.spinnerDialog.hide();
                        observer.next(snapshot);
                        observer.complete();
                    }, err => {
                        this.spinnerDialog.hide();
                        observer.error([]);
                        observer.complete();
                    });
            });
        } else {
            return new Observable(observer => {
                this.spinnerDialog.hide();
                observer.next(this.getData());
                observer.complete();
            });
        }
    };
}
