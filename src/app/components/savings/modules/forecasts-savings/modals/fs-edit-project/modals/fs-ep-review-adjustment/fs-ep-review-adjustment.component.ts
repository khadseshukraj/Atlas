import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-fs-ep-review-adjustment',
  templateUrl: './fs-ep-review-adjustment.component.html',
  styleUrls: ['./fs-ep-review-adjustment.component.scss']
})
export class FsEpReviewAdjustmentComponent {

  form: FormGroup;
  constructor(public bsModalRef: BsModalRef, private alertService: AlertService) {
    this.form = new FormGroup({
      adjCheckbox: new FormControl(false)
    });

    this.form.setValidators(this.requireAtLeas1CheckBoxValidator());
  }

  private requireAtLeas1CheckBoxValidator(): ValidatorFn {
    return (_: AbstractControl): {[key: string]: any} | null => {
      const valid = Object.keys(this.form.controls).some(key => this.form.controls[key].value === true)

      return valid ? null : {'atLeastOneChecked' : true};
    };
  }

  approveAdjustment() {
    this.alertService.showSuccessAlert('Approved...One less thing to do today', () => this.bsModalRef.hide());
  }

  rejectAdjustment() {
    this.alertService.showSuccessAlert('Ooops...Seems you didn\'t like this, we are sending it back', () => this.bsModalRef.hide());
  }
}
