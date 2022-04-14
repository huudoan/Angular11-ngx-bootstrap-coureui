import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {IconSetService} from '@coreui/icons-angular';
import {freeSet} from '@coreui/icons';
import {ApiService} from './_services/api.service';
import {AccountService} from './_services';
import {User} from './_models';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})

export class AppComponent implements OnInit {
  user: User;

  constructor(
    private accountService: AccountService,
    public iconSet: IconSetService,
    private router: Router,
    private apiService : ApiService
  ) {
    this.user = this.accountService.userValue;
    iconSet.icons = {...freeSet};
  }

  logout() {
    this.accountService.logout();
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
