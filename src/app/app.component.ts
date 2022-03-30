import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {IconSetService} from '@coreui/icons-angular';
import {freeSet} from '@coreui/icons';

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
    private router: Router,
    public iconSet: IconSetService,
  ) {
    this.accountService.user.subscribe(x => this.user = x);
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
