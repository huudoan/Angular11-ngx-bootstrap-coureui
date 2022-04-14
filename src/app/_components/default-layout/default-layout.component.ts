import {Component} from '@angular/core';
import {AccountService} from '../../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = [];

  constructor(private accountService: AccountService) {
    this.getMenuItem();
  }

  getMenuItem() {
    const listMenu = localStorage.getItem('menu_setting');
    if (listMenu === null) {
      const user: any = this.accountService.userValue;
      this.accountService.getMenuById().then((res: any) => {
          if (res.statusCode === 200) {
            this.navItems = res;
          }
        });
    } else {
      this.navItems = JSON.parse(listMenu);
    }
  }

  logout() {
    this.accountService.logout();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
