import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {AccountService} from '@app/_services';

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  users = null;
  dataUser: any = [];
  isCollapsed: boolean = false;
  totalItems: any = 0;
  currentPage = 1;
  itemsPerPage = 15;

  constructor(private accountService: AccountService, private userService: UserService) {
  }

  ngOnInit() {
    this.accountService.getAll().then(data => {
      this.dataUser = data;
      this.totalItems = this.dataUser.length;
      this.users = this.dataUser.slice(0, this.itemsPerPage);
    });
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  pageChanged(event) {
    const startItem = (event.page - 1) * this.itemsPerPage;
    const endItem = event.page * this.itemsPerPage;
    this.users = this.dataUser.slice(startItem, endItem);
  }

  pageChangeServer(event) {
    const startItem = (event.page - 1) * this.itemsPerPage;
    this.userService.getDataPage(startItem, this.itemsPerPage).then(data => {
      this.users = data;
    });
  }

  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id).then(data => {
      this.users = this.users.filter(x => x.id !== id)
    });
  }
}
