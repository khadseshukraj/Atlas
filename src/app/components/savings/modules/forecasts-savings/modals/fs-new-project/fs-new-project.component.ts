import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WizardComponent } from 'angular-archwizard';
import { FsNpCategoryAllocationComponent } from './modals/fs-np-category-allocation/fs-np-category-allocation.component';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DataService } from 'src/app/services/data.service';
import { ISubRegion, ISpendPoolLow, ISpendPoolHigh, IProcurementHandling, IProbability, IGCAS, IProjectClassification, ISpendPoolMedium, IBusinessUnit, ICategory } from 'src/app/models/icommon';
import { forkJoin } from 'rxjs';
import { FsNpLinkToRegComponent } from './modals/fs-np-link-to-reg/fs-np-link-to-reg.component';
import { ValidationPatterns } from 'src/app/models/validation';

@Component({
  selector: 'app-fs-new-project',
  templateUrl: './fs-new-project.component.html',
  styleUrls: ['./fs-new-project.component.scss']
})
export class FsNewProjectComponent {

  patterns = ValidationPatterns;

  @ViewChild(WizardComponent)
  wizard?: WizardComponent;

  datePickerConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',
    minMode: 'month',
    dateInputFormat: 'MMM YYYY'
  };

  spendPoolsHigh: ISpendPoolHigh[] = [];
  spendPoolsMedium: ISpendPoolMedium[] = [];
  spendPoolsLow: ISpendPoolLow[] = [];

  subRegions: ISubRegion[] = [];

  projectClassifications: IProjectClassification[] = [];
  probabilities: IProbability[] = [];
  gcas: IGCAS[] = [];
  procurementHandlings: IProcurementHandling[] = [];

  businessUnits: {
    [subRegionID: string]: IBusinessUnit[]
  } = {};

  categories: {
    [subRegionID: string]: {
      [buID: string]: ICategory[]
    }
  } = {};
  
  linkedProjectID?: string;

  form: FormGroup;

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService, 
    private alertService: AlertService, private fb: FormBuilder, private dataService: DataService) { 

    this.loadInitialData();
  }

  public get hasPreviousStep() : boolean {
    if(!this.wizard) { return false; }

    return this.wizard.hasPreviousStep();
  }

  public get isLastStep() : boolean {
    if(!this.wizard) { return false; }
    
    return this.wizard.isLastStep();
  }

  public get canContinue() : boolean {
    if(!this.wizard) { return false; }

    const currentStep = this.wizard.currentStepIndex;

    if (currentStep === 0) {
      return this.f1.valid;
    } else if (currentStep == 1) {
      return this.f2.valid && this.areBUAllocationsValid;
    } else if (currentStep == 2) {
      return this.f3.valid && this.areCategoryAllocationsValid;
    }
    
    return false;
  }

  // Checks if the sum of all bu allocations of all regions are 100
  private get areBUAllocationsValid(): boolean {
    return (<string[]>this.f1.controls["subRegions"].value)
      .map(r => this.sumOfBUAllocationsValid(r))
      .reduce((previous, current) => previous && current);
  }

  // Checks if the sum of all category allocations of all BUs are 100
  private get areCategoryAllocationsValid(): boolean {
    let subRegions = (<string[]>this.f1.controls["subRegions"].value);

    for (const reg of subRegions) {
      let buIDS = this.businessUnits[reg];
      for (const b of buIDS) {
        const buAllocation = this.f2.controls[`subReg_${reg}_bu_${b.ID}`].value;
        if(buAllocation && buAllocation != '0') {
          if (!this.sumOfCategoryAllocationsValid(reg, b.ID)) {
            return false
          }
        }
      }
    }

    return true;
  }

  // convenience getters for easy access to form steps
  get f1() { return (<FormGroup>this.form.controls['projectRegister']); }
  get f2() { return (<FormGroup>this.form.controls['buAllocation']); }
  get f3() { return (<FormGroup>this.form.controls['categoryAllocation']); }

  // convenience func for easy access to a form step controls
  c(f: FormGroup) { return f.controls };

  // Initial Data Load
  private loadInitialData() {
    this.setupForm();

    forkJoin(
      this.dataService.getSubRegions(),
      this.dataService.getSpendPoolsHigh(),
      this.dataService.getProjectClassifications(),
      this.dataService.getProbabilities(),
      this.dataService.getGCAS(),
      this.dataService.getProcurementHandlings()
    )
    .subscribe(res => {
      this.subRegions = res[0];
      this.spendPoolsHigh = res[1];
      this.projectClassifications = res[2];
      this.probabilities = res[3];
      this.gcas = res[4];
      this.procurementHandlings = res[5];

      this.f1.controls['spendPoolHigh'].setValue(this.spendPoolsHigh[1].ID);
    });
  }

  private setupForm() {
    // Project Registration Step
    this.form = this.fb.group({
      projectRegister: this.fb.group({
        projectName: ['', [Validators.required, Validators.maxLength(60)]],
        flexField: ['', Validators.maxLength(50)],
        projectType: ['REG', Validators.required],
        aditionalNotes: ['', Validators.maxLength(180)],
        purchasingGroup: ['TS3', Validators.required],
        fiscalYear: [{value: '2019_2020', disabled: true}, Validators.required],
        forecastCycle: [{value: 'OCT_FIN_FCST', disabled: true}, Validators.required],
        subRegions: [[], Validators.required],
        spendPoolHigh: [{value: '', disabled: true}, Validators.required],
        spendPoolMedium: ['', Validators.required],
        spendPoolLow: ['', Validators.required],
        projectClassification: ['', Validators.required],
        probability: ['', Validators.required],
        gcasChange: ['', Validators.required],
        procurementHandling: ['', Validators.required],
        savingsClassification: ['', Validators.required],
        ppv: [{value: 'ppv', disabled: true}, Validators.required],
        nss: [{value: 'nss', disabled: true}, Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        projectValue: ['', [Validators.required, Validators.pattern(ValidationPatterns.threeNumberThreeDecimalWithNegative), this.isZero()]],
        helpHurt: ['', Validators.required],
        techResourceRequired: [true]
      }),
      buAllocation: this.fb.group({}),
      categoryAllocation: this.fb.group({})
    });

    this.f1.controls['projectValue'].valueChanges.subscribe(this.projectValueDidChanged)
    this.f1.controls['projectClassification'].valueChanges.subscribe(this.projectClassificationDidChanged);
    this.f1.controls['subRegions'].valueChanges.subscribe(this.subRegionsDidChanged);
    this.f1.controls['spendPoolHigh'].valueChanges.subscribe(this.spendPoolHighDidChanged);
    this.f1.controls['spendPoolMedium'].valueChanges.subscribe(this.spendPoolMediumDidChanged);
    this.f1.controls['helpHurt'].valueChanges.subscribe(this.helpHurtChanged);
  }


  // Navigation
  goToNextStep() {
    const currentStep = this.wizard.currentStepIndex;

    if (currentStep === 0) {
      this.wizard.goToNextStep();
    } else if (currentStep == 1) {
      this.openCategoryAllocationModal();
    } else if (currentStep == 2) {
      this.alertService.showSuccessAlert('You made it!! You created project REG123456789', () => {
        this.bsModalRef.hide()
      });
    }
  }

  goToPreviousStep() {
    this.wizard.goToPreviousStep();
  }
  

  //Events
  private projectValueDidChanged = (val: string) => {
    let nVal = parseFloat(val);
    if (nVal < 0) {
      this.f1.controls['helpHurt'].setValue('Help');
    } else if (nVal >= 0) {
      this.f1.controls['helpHurt'].setValue('Hurt');
    }
  }

  private helpHurtChanged = (val: string) => {
    let projectValue = parseFloat(this.f1.controls['projectValue'].value);

    if (val === 'Help' && projectValue > 0) {
      this.f1.controls['projectValue'].setValue(`-${projectValue}`);
    } else if (val === 'Hurt' && projectValue < 0) {
      this.f1.controls['projectValue'].setValue(`${-projectValue}`);
    }
  }

  private projectClassificationDidChanged = (projClass: string) => {
    if (projClass === '4') {
      this.f1.setControl('commodityClassification', new FormControl('', Validators.required))
    } else {
      this.f1.removeControl('commodityClassification');
    }
  }

  private subRegionsDidChanged = (values: string[]) => {
    this.subRegions.forEach(reg => {
      const key = `subReg_${reg.ID}`;

      if(this.f1.get(key)) {
        delete this.businessUnits[reg.ID];
        delete this.categories[reg.ID];
        this.f1.removeControl(key);
      }
    });

    //Generates the sub region allocation fields
    values.forEach(reg => {
      this.f1.setControl(`subReg_${reg}`, new FormControl('', [Validators.required, 
          Validators.pattern(ValidationPatterns.percentage), 
          Validators.min(0), Validators.max(100), this.isZero()]));

      this.dataService.getBUs().subscribe(bus => {
        //Generates the BU allocation fields
        this.businessUnits[reg] = bus;
        this.categories[reg] = {};

        bus.forEach(b => {
          this.f2.setControl(`subReg_${reg}_bu_${b.ID}`, new FormControl('', 
          [Validators.pattern(ValidationPatterns.percentage), 
            Validators.min(0), Validators.max(100)]))

          //Generates the Category allocation fields
          this.dataService.getCategories(b.ID).subscribe(categories => {
            this.categories[reg][b.ID] = categories;
            
            categories.forEach(c => {
              this.f3.setControl(`subReg_${reg}_bu_${b.ID}_cat_${c.ID}`, new FormControl('', 
              [Validators.pattern(ValidationPatterns.percentage), 
                Validators.min(0), Validators.max(100)]))
            });
          });
        })
      });
    });

    if (values.length === 1) {
      this.f1.controls[`subReg_${values[0]}`].setValue('100');
    }
  }

  private spendPoolHighDidChanged = (id: string) => {
    this.spendPoolsLow = [];
    this.dataService.getSpendPoolsMedium(id).subscribe(res => this.spendPoolsMedium = res);
  }

  private spendPoolMediumDidChanged = (id: string) => {
    this.dataService.getSpendPoolsLow(id).subscribe(res => this.spendPoolsLow = res);
  }

  //Validator functions
  private isZero(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let val = parseFloat(control.value)

      return val === 0 ? {'isZero' : true} : null;
    };
  }

  // Utilities
  sumOfSubRegionAllocationInvalid(): boolean {
    let total = 0;

    for (const key in this.f1.controls) {
      if (key.startsWith('subReg_')) {
        const subRegAlloc = this.f1.controls[key];
        total += parseFloat(subRegAlloc.value)
      }
    }
    
    return isNaN(total) ? false : total !== 100;
  }

  sumOfBUAllocationsValid(subRegID: string): boolean {
    let total = 0;

    for (const key in this.f2.controls) {
      if (key.startsWith(`subReg_${subRegID}_bu_`)) {
        const buAlloc = this.f2.controls[key];
        let v = parseFloat(buAlloc.value)

        total += isNaN(v) ? 0 : v;
      }
    }
    
    return total === 100;
  }

  sumOfCategoryAllocationsValid(subRegID: string, buID: string): boolean {
    let total = 0;

    for (const key in this.f3.controls) {
      if (key.startsWith(`subReg_${subRegID}_bu_${buID}_cat_`)) {
        const catAlloc = this.f3.controls[key];
        let v = parseFloat(catAlloc.value)

        total += isNaN(v) ? 0 : v;
      }
    }
    
    return total === 100;
  }

  getSubRegionNameForId(id: string): string {
    return this.subRegions.find(r => r.ID === id).Name;
  }

  getValueInDollarMillionForSubRegion(subRegID: string): number {
    let subRegAlloc = parseFloat(this.f1.controls[`subReg_${subRegID}`].value);
    let projectValue = parseFloat(this.f1.controls['projectValue'].value);

    let val = subRegAlloc/100.0 *  projectValue;

    return isNaN(val) ? 0 : val;
  }

  getValueInDollarMillionForBU(subRegID: string, buID: string): number {
    let subRegAlloc = parseFloat(this.f1.controls[`subReg_${subRegID}`].value);
    let buAlloc = parseFloat(this.f2.controls[`subReg_${subRegID}_bu_${buID}`].value);
    let projectValue = parseFloat(this.f1.controls['projectValue'].value);

    let val = subRegAlloc/100.0 * buAlloc/100.0  * projectValue;

    return isNaN(val) ? 0 : val;
  }

  getValueInDollarMillionForCategory(subRegID: string, buID: string, categoryID: string): number {
    let subRegAlloc = parseFloat(this.f1.controls[`subReg_${subRegID}`].value);
    let buAlloc = parseFloat(this.f2.controls[`subReg_${subRegID}_bu_${buID}`].value);
    let catAlloc = parseFloat(this.f3.controls[`subReg_${subRegID}_bu_${buID}_cat_${categoryID}`].value);
    let projectValue = parseFloat(this.f1.controls['projectValue'].value);

    let val = subRegAlloc/100.0 * buAlloc/100.0 * catAlloc/100.0 * projectValue;

    return isNaN(val) ? 0 : val;
  }

  // Modals

  openCategoryAllocationModal() {
    const ref = this.modalService.show(FsNpCategoryAllocationComponent, { keyboard: false, backdrop: 'static', class: 'modal-dialog-centered'});
    ref.content.completion = (allocationMode: string) => {
      if (allocationMode == 'automatic') {
        this.alertService.showSuccessAlert('You made it!! You created project REG123456789', () => {
          this.bsModalRef.hide()
        });
      } else {
        this.wizard.goToNextStep();
      }
    }
  }

  openLinkToRegularProjectModal() {
    const ref = this.modalService.show(FsNpLinkToRegComponent, { keyboard: false, backdrop: 'static', class: 'modal-lg modal-dialog-centered'});

    ref.content.completion = (projectID: string) => {
      this.linkedProjectID = projectID;

      if(!this.f1.get('adjustmentDescription')) {
        this.f1.setControl('adjustmentDescription', new FormControl('', [Validators.required, Validators.maxLength(180)]));
      }

      for (const key in this.f1.controls) {
        if (key !== 'projectValue' && key != 'adjustmentDescription') {
          this.f1.controls[key].disable();
        }
      }
    }
  }
}
