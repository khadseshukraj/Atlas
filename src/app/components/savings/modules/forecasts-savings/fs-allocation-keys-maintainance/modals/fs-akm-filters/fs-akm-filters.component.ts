import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-fs-akm-filters',
  templateUrl: './fs-akm-filters.component.html',
  styleUrls: ['./fs-akm-filters.component.scss']
})
export class FsAkmFiltersComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
