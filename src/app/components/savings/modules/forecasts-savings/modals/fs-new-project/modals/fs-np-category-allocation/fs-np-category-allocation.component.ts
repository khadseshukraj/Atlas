import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-fs-np-category-allocation',
  templateUrl: './fs-np-category-allocation.component.html',
  styleUrls: ['./fs-np-category-allocation.component.scss']
})
export class FsNpCategoryAllocationComponent {

  public allocationMode = 'automatic';
  public completion: (allocationMode: string) => void;

  constructor(private bsModalRef: BsModalRef) {}

  done(completion: boolean) {
    this.bsModalRef.hide();

    if (completion) {
      setTimeout(() => this.completion(this.allocationMode), 500); // Waits for the modal animation to finish and then calls the completion handler
    }
  }
}
