import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AccountService} from '@app/_services';

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  users = null;
  isCollapsed: boolean = false;
  totalItems = 200;
  currentPage = 3;

  constructor(private accountService: AccountService) {

  }

  ngOnInit() {
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  pageChanged(event) {
    const page = event.page;
    const itemsPerPage = event.itemsPerPage;
    console.info(page);
    console.info(itemsPerPage);
  }

  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }
}
