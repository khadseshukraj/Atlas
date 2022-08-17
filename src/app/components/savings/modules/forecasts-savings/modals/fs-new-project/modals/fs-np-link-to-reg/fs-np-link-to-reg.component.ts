import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fs-np-link-to-reg',
  templateUrl: './fs-np-link-to-reg.component.html',
  styleUrls: ['./fs-np-link-to-reg.component.scss']
})
export class FsNpLinkToRegComponent {

  form: FormGroup;
  showResults = false;
  public completion: (allocationMode: string) => void;

  constructor(public bsModalRef: BsModalRef) {
    this.form = new FormGroup({
      projCheckbox: new FormControl('', Validators.required),
    });
  }

  done() {
    this.bsModalRef.hide();
    setTimeout(() => this.completion(this.form.controls['projCheckbox'].value), 500); 
  }
}
