import { Component } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService } from 'src/app/services/alert.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FsAkmFiltersComponent } from './modals/fs-akm-filters/fs-akm-filters.component';
import { FsAkmAddAllocationKeyComponent } from './modals/fs-akm-add-allocation-key/fs-akm-add-allocation-key.component';
import { FsAkmModifyAllocationKeyComponent } from './modals/fs-akm-modify-allocation-key/fs-akm-modify-allocation-key.component';

@Component({
  selector: 'app-fs-allocation-keys-maintainance',
  templateUrl: './fs-allocation-keys-maintainance.component.html',
  styleUrls: ['./fs-allocation-keys-maintainance.component.scss']
})
export class FsAllocationKeysMaintainanceComponent {

  keyStruct = {
    subRegion: 'ASIA PACIFIC ENTERPRISE',
    businessUnit: 'BABY CARE',
    spendPoolHigh: 'CHEMICALS',
    spendPoolMedium: 'F&F GROUP',
    spendPoolLow: 'PERFUMES',
    category: 'DIAPER',
    impactSpend: '2.234.900',
    allocationPercent: '100'
  };

  keys = [];
  keysPerPage = [];
  totalItems = 0;
  itemsPerPage = 10;

  constructor(private alertService: AlertService, private modalService: BsModalService) {
    let total = Math.floor(Math.random() * (50 - 25 + 1) + 25);

    for (let index = 0; index < total; index++) {
      this.keys.push({...this.keyStruct});
    }

    this.totalItems = this.keys.length;
    this.keysPerPage = this.keys.slice(0, this.itemsPerPage);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * this.itemsPerPage;
    const endItem = event.page * this.itemsPerPage;
    this.keysPerPage = this.keys.slice(startItem, endItem);
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

  openAddAllocationKeyModal() {
    this.modalService.show(FsAkmAddAllocationKeyComponent, { keyboard: false, class: 'modal-full' })
  }

  openModifyAllocationKeyModal() {
    this.modalService.show(FsAkmModifyAllocationKeyComponent, { keyboard: false, class: 'modal-full' })
  }

  openFiltersModal() {
    this.modalService.show(FsAkmFiltersComponent, { keyboard: false, backdrop: 'static', class: 'modal-lg modal-dialog-centered'});
  }

  openDeleteModal() {
    this.alertService.showDeleteConfirmationAlert('Sure?... Remember all the matching allocations will be deleted as well', 
    'Yes', 'No', (confirmed) => {

    });
  }

}
