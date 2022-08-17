import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { ISpendPoolHigh, ISpendPoolMedium, ISpendPoolLow, ISubRegion, IBusinessUnit, ICategory } from 'src/app/models/icommon';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert.service';
import { DataService } from 'src/app/services/data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fs-akm-add-allocation-key',
  templateUrl: './fs-akm-add-allocation-key.component.html',
  styleUrls: ['./fs-akm-add-allocation-key.component.scss']
})
export class FsAkmAddAllocationKeyComponent implements OnInit {

  spendPoolsHigh: ISpendPoolHigh[] = [];
  spendPoolsMedium: ISpendPoolMedium[] = [];
  spendPoolsLow: ISpendPoolLow[] = [];

  subRegions: ISubRegion[] = [];
  businessUnits: IBusinessUnit[];
  categories: ICategory[];

  linesLoaded = false;
  form: FormGroup;

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService, 
    private alertService: AlertService, private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.loadInitialData();
  }
  
  // convenience getters for easy access to form steps
  get f1() { return (<FormGroup>this.form.controls['allocationDetails']); }
  get lines() { return (<FormArray>this.form.controls['lines']); }

  // convenience func for easy access to a form step controls
  c(f: FormGroup) { return f.controls };
  l(a: FormArray, i: number) { return (<FormGroup>a.controls[i]).controls};
  // Initial Data Load
  private loadInitialData() {
    this.setupForm();
    
    forkJoin(
      this.dataService.getSubRegions(),
      this.dataService.getSpendPoolsHigh()
    )
    .subscribe(res => {
      this.subRegions = res[0];
      this.spendPoolsHigh = res[1];
    });
  }

  private setupForm() {
    // Project Registration Step
    this.form = this.fb.group({
      allocationDetails: this.fb.group({
        fiscalYear: ['', Validators.required],
        spendPoolHigh: ['', Validators.required],
        spendPoolMedium: ['', Validators.required],
        spendPoolLow: ['', Validators.required],
        subRegion: ['', Validators.required],
        businessUnit: ['', Validators.required],
        category: ['', Validators.required],
      }),
      lines: this.fb.array([], Validators.required)
    });

    this.f1.controls['subRegion'].valueChanges.subscribe(this.subRegionDidChanged);
    this.f1.controls['businessUnit'].valueChanges.subscribe(this.businessUnitDidChanged);
    this.f1.controls['spendPoolHigh'].valueChanges.subscribe(this.spendPoolHighDidChanged);
    this.f1.controls['spendPoolMedium'].valueChanges.subscribe(this.spendPoolMediumDidChanged); 
  }

  private subRegionDidChanged = (id: string) => {
    this.businessUnits = [];
    this.dataService.getBUs().subscribe(bus => this.businessUnits = bus);
  }

  private businessUnitDidChanged = (id: string) => {
    this.categories = [];
    //Generates the Category allocation fields
    this.dataService.getCategories(id).subscribe(categories => this.categories = categories);
  }

  private spendPoolHighDidChanged = (id: string) => {
    this.spendPoolsLow = [];
    this.dataService.getSpendPoolsMedium(id).subscribe(res => this.spendPoolsMedium = res);
  }

  private spendPoolMediumDidChanged = (id: string) => {
    this.dataService.getSpendPoolsLow(id).subscribe(res => this.spendPoolsLow = res);
  }

  addLine() {
    let index = this.lines.controls.length;
    this.lines.setControl(index, this.fb.group({
      plan: ['', Validators.required],
      tdcVal: ['', Validators.required],
      ccpc: [{value: '', disabled: true}],
      currency: [{value: '', disabled: true}],
      profitCenter: [{value: '', disabled: true}],
      impactSpend: ['', [Validators.required, Validators.min(0)]]
    }))
  }

  calculationAllocationPercent(val: string): number {
    let numberVal = parseFloat(val);
    let total = 0;

    for (const line of this.lines.controls) {
      total += parseFloat((<FormGroup>line).controls['impactSpend'].value);
    }

    let result = numberVal/total * 100.0

    return isNaN(result) ? 0 : result;
  }

  removeLine(index: number) {
    this.lines.removeAt(index);
  }

  finishAdd() {
    this.alertService.showSuccessAlert('Noted!!...We just saved this', () => {
      this.bsModalRef.hide()
    });
  }

  cancel() {
    this.alertService.showConfirmationAlert('Sure?... We won\'t save this if you are', null, null, (confirmed: boolean) => {
      if (confirmed) {
        this.bsModalRef.hide();
      }
    })
  }
  
}
