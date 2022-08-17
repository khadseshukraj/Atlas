import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-fs-filters',
  templateUrl: './fs-filters.component.html',
  styleUrls: ['./fs-filters.component.scss']
})
export class FsFiltersComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',
    minMode: 'month',
    dateInputFormat: 'MMM YYYY'
  };

  buyers = [
    {id: "1", name: "Alejandro Pérez"},
    {id: "2", name: "Gery Ramírez"}
  ]
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
