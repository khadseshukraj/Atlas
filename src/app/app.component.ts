import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import $ from 'jquery';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public activeView: string;
  public currentRole = "D_BUYER";

  public roles = [
    {id: "D_BUYER", name: "D. Buyer"},
    {id: "I_BUYER", name: "I. Buyer"},
    {id: "F&A", name: "F&A"}
  ]

  constructor(private router: Router, private permissionsService: NgxPermissionsService) {
    this.router.events.subscribe( (event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.activeView = this.router.url.split('/')[1];
      }
    });
  }

  ngOnInit(): void {
    let storedRole = localStorage.getItem('seven-sys-ngx-role') || 'D_BUYER';
    this.setRole(storedRole);
  }

  setRole(role: string) {
    this.permissionsService.flushPermissions();
    this.permissionsService.loadPermissions([role]);
    this.currentRole = role;
    localStorage.setItem('seven-sys-ngx-role', role);
  }

  getCurrentRoleName(): string {
    return this.roles.find((r) => r.id === this.currentRole).name;
  }

  toggleSidebar() {
    let value = $('#sidebar').css('left');

    if (value === '0px') {
      $('.toggler').addClass('collapsed');
      $('#sidebar').animate({
        left: "-250px"
      }, 300)
    } else {
      $('.toggler').removeClass('collapsed');
      $('#sidebar').animate({
        left: "0px"
      }, 300)
    }
  }
}
