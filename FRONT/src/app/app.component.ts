
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONT';

  activeList: string = '';
  hideTimer: any;
  

  showList(listId: string) {
    this.activeList = listId;
    this.cancelHide();
  }
  
  hideList() {

    this.hideTimer = setTimeout(() => {
      this.activeList = '';
    }, 300);
  }
  
  cancelHide() {

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
  }
}
