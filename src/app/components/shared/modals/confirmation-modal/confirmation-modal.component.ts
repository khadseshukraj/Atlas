import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  message: string;
  cancelTitle = "Cancel";
  okTitle = "OK";
  confirmationType = 'default';

  completion: (confirmed: boolean) => void;

  constructor(private bsModalRef: BsModalRef) { }

  close(confirmed: boolean) {
    this.bsModalRef.hide();
    setTimeout(() => this.completion(confirmed), 500); // Waits for the modal animation to finish and then calls the completion handler
  }
}
