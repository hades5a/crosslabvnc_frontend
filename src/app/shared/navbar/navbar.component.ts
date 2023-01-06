import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  ngOnInit(): void {
    this.items = [
      {
          label: 'Connect',
      },
      {
          label: 'Admin',
      }
  ];
  }
}
