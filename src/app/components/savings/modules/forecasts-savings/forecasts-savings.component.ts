import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { FsNewProjectComponent } from './modals/fs-new-project/fs-new-project.component';
import { FsEditProjectComponent } from './modals/fs-edit-project/fs-edit-project.component';
import { FsOptionsComponent } from './modals/fs-options/fs-options.component';
import { FsFiltersComponent } from './modals/fs-filters/fs-filters.component';

@Component({
  selector: 'app-forecasts-savings',
  templateUrl: './forecasts-savings.component.html',
  styleUrls: ['./forecasts-savings.component.scss']
})
export class ForecastsSavingsComponent {

  projectStruct = {
    number: 'REG00000836428',
    name: 'Test Screens Alejandro Perez',
    subRegions: 'EUROPE FOCUS, GRT CHINA',
    spendPoolLow: 'ALKALIS',
    classification: 'Commercial Savings',
    startDate: 'Jul 2019',
    value: '-2.0',
    tpa: '-2.0',
    probability: '80',
    hasAdjustment: false
  };

  projects = [];
  projectsPerPage = [];
  totalItems = 0;
  itemsPerPage = 20;

  constructor(public modalService: BsModalService, public alertService: AlertService) { 

    let total = Math.floor(Math.random() * (30 - 15 + 1) + 15);

    for (let index = 0; index < total; index++) {
      this.projectStruct.hasAdjustment = Math.random() >= 0.5;
      this.projects.push({...this.projectStruct});
    }

    this.totalItems = this.projects.length;
    this.projectsPerPage = this.projects.slice(0, this.itemsPerPage);
    
  }

  handleFileInput(target: HTMLInputElement) {
    let files = target.files as FileList;

    // only one of these alerts are valid, not both at once
    this.alertService.showSuccessAlert('Great!!...The file was perfect, we just loaded it', () => {
      this.alertService.showErrorConfirmationAlert('Sorry... but the file has some problems and we cannot load it like this. Would you like to see why?', 
      'Yes', 'No', (confirmed) => {
        // cleans the input so the same files can be selected again
        target.value = '';
      })
    });
  }

  openNewProjectModal() {
    this.modalService.show(FsNewProjectComponent, { keyboard: false, class: 'modal-full' })
  }

  openEditProjectModal(project: any) {
    this.modalService.show(FsEditProjectComponent, { keyboard: false, class: 'modal-full', initialState: {projectHasAdjustment: project.hasAdjustment} })
  }

  openOptionsModal() {
    this.modalService.show(FsOptionsComponent, { keyboard: false, backdrop: 'static', class: 'modal-dialog-centered'});
  }

  openFiltersModal() {
    this.modalService.show(FsFiltersComponent, { keyboard: false, backdrop: 'static', class: 'modal-lg modal-dialog-centered'});
  }

  openDeleteModal() {
    this.alertService.showDeleteConfirmationAlert('Are yor sure?...', 
    'Yes', 'No', (confirmed) => {

    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * this.itemsPerPage;
    const endItem = event.page * this.itemsPerPage;
    this.projectsPerPage = this.projects.slice(startItem, endItem);
  }
}
