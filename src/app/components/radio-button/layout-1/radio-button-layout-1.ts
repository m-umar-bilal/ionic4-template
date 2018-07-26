import { Component, Input } from '@angular/core';
import { IonicPage } from '@ionic/angular';

@IonicPage()
@Component({
  selector: 'radio-button-layout-1',
  templateUrl: 'radio-button.html'
})
export class RadioButtonLayout1 {
  @Input('data') data: any;
  @Input('events') events: any;

  constructor() { }

  onEvent = (event: string, item: any): void => {
    if (this.events[event]) {
      this.events[event](item);
    }
  }
}
