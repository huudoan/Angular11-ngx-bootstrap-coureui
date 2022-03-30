import {Component} from '@angular/core';
import { navItems } from '../_nav';
import {AccountService} from '../../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private accountService: AccountService) {

  }

  logout() {
    this.accountService.logout();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
