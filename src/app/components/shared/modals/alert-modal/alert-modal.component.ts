import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {

  message: string;
  alertType: string;

  completion: () => void;

  constructor(private bsModalRef: BsModalRef) { }

  close() {
    this.bsModalRef.hide();
    setTimeout(() => this.completion(), 500); // Waits for the modal animation to finish and then calls the completion handler
  }
}
