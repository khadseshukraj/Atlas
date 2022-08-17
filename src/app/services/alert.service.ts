import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../components/shared/modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from '../components/shared/modals/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private modalService: BsModalService) { }

  showInfoAlert(message: string, callback?: () => void) {
    this.showAlert(message, 'info', callback)
  }

  showSuccessAlert(message: string, callback?: () => void) {
    this.showAlert(message, 'success', callback)
  }

  showWarningAlert(message: string, callback?: () => void) {
    this.showAlert(message, 'warning', callback)
  }

  showErrorAlert(message: string, callback?: () => void) {
    this.showAlert(message, 'error', callback)
  }

  showConfirmationAlert(message: string, okTitle?: string, cancelTitle?: string, callback?: (confirmed: boolean) => void) {
    this.showConfirmation(message, 'default', okTitle, cancelTitle, callback);
  }

  showDeleteConfirmationAlert(message: string, okTitle?: string, cancelTitle?: string, callback?: (confirmed: boolean) => void) {
    this.showConfirmation(message, 'delete', okTitle, cancelTitle, callback);
  }

  showErrorConfirmationAlert(message: string, okTitle?: string, cancelTitle?: string, callback?: (confirmed: boolean) => void) {
    this.showConfirmation(message, 'error', okTitle, cancelTitle, callback);
  }

  private showConfirmation(message: string, confirmationType: string, okTitle?: string, cancelTitle?: string, callback?: (confirmed: boolean) => void) {
    const initialState = {
      message: message,
      confirmationType: confirmationType,
      okTitle: okTitle || 'OK',
      cancelTitle: cancelTitle || 'Cancel',
      completion: callback
    };

    this.modalService.show(ConfirmationModalComponent, { backdrop: 'static', class: 'modal-dialog-centered', initialState})
  }

  private showAlert(message: string, alertType: string, callback?: () => void) {
    const initialState = {
      message: message,
      alertType: alertType,
      completion: callback
    };

    this.modalService.show(AlertModalComponent, { backdrop: 'static', class: 'modal-dialog-centered', initialState})
  }
}
