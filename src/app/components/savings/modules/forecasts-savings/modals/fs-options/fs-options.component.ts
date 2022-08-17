import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-fs-options',
  templateUrl: './fs-options.component.html',
  styleUrls: ['./fs-options.component.scss']
})
export class FsOptionsComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
