import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-fs-buyers',
  templateUrl: './fs-buyers.component.html',
  styleUrls: ['./fs-buyers.component.scss']
})
export class FsBuyersComponent implements OnInit {

  activeViewAssignBuyer = '';
  activeViewBackupBuyer = '';

  purchasinGroup;
  purchasingGroups = [];
  purchasingGroupsResults = [];

  searchBuyers = [];

  resultsBuyer = 0;

  public searchForm: FormGroup;
  public searchMainForm: FormGroup;
  public assignForm: FormGroup;

  constructor(private fb: FormBuilder, private alertService: AlertService) { 
    this.searchForm = this.fb.group({
      purchasingGroup: ['', Validators.required],
      buyerTNumber: [''],
      buyerFirstName: ['', Validators.required],
      buyerLastName: ['', Validators.required],
    });

    this.searchMainForm = this.fb.group({
      purchasingGroup: ['', Validators.required],
      buyerTNumber: ['', Validators.required],
    });

    this.assignForm = new FormGroup({
      assignCheckbox: new FormControl(false)
    });
    this.assignForm.setValidators(this.requireAtLeas1CheckBoxValidator());
  }

  private requireAtLeas1CheckBoxValidator(): ValidatorFn {
    return (_: AbstractControl): {[key: string]: any} | null => {
      const valid = Object.keys(this.assignForm.controls).some(key => this.assignForm.controls[key].value === true)

      return valid ? null : {'atLeastOneChecked' : true};
    };
  }
  
   // convenience func for easy access to form fields
  c(form: FormGroup) { return form.controls; }

  ngOnInit(): void {
    this.activeViewAssignBuyer = 'assign-backup-buyer';
    this.activeViewBackupBuyer = 'my-backup-buyers';

    this.purchasingGroups.push({name: 'TST - Alejandro Perez', tNumber: 'BE1177'});
  }

  setActiveViewAssignBuyer(index: number) {
    if(index === 0) {
      this.activeViewAssignBuyer = 'assign-backup-buyer';
    } else if(index === 1) {
      this.activeViewAssignBuyer = 'assign-main-buyer';
    }
  }

  searchBuyer() {
    this.resultsBuyer = 1;
  }

  cancelAssignBuyer() {
    this.resultsBuyer = 0;
  }

  onSearchPurchasinGroup(event) {
    this.purchasingGroupsResults = this.purchasingGroups.filter(group => {
      return group.name.toLocaleLowerCase().startsWith(event.query.toLocaleLowerCase());
   });
  }

  onPurchasingGroupSelected(selected) {
    if (selected) {
        this.purchasinGroup = selected;
        this.searchForm.controls['buyerTNumber'].setValue(this.purchasinGroup.tNumber);
    }
  }

  assignBackupBuyer() {
    this.alertService.showSuccessAlert('Noted!!...We just saved this', () => {
      this.resultsBuyer = 0;
    });
  }
}
