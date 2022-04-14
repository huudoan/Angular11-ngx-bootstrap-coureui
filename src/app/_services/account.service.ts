import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';

import {environment} from '@environments/environment';
import {User} from '@app/_models';

@Injectable({providedIn: 'root'})
export class AccountService {
  public user: User;
  private apiUser = '/api/organization/user';
  private apiLogin = '/api/organization/user/login';
  private apiUserList = '/api/organization/user/userlist';
  private apiMenu = '/api/organization/orgmenu/listmodulemenusbyuser';

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: ApiService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public get userValue(): User {
    return this.user;
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      let params = {userName: username, password: password};
      this.http.post(`${environment.apiUrl + this.apiLogin}`, params).subscribe((res: any) => {
        if (res.statusCode === 200) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.user = res.data.user;
          resolve(res.data.user);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('menu_setting');
    this.user = null;
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl + this.apiUser}`, user).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data.user);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl + this.apiUserList}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  getById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl + this.apiUser}/${id}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  getMenuById(uid = 'e0d4d713-d135-46a4-a165-7e7dd15915d6', guid = 'da7a0a79-4ca0-473d-8e83-612a379616ed') {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiMenu, {userguid: uid, moduleGuid: guid}).subscribe((res: any) => {
        if (res.statusCode === 200) {
          let menus = this.createMenu(res.data);
          localStorage.setItem('menu_setting', JSON.stringify(menus));
          resolve(menus);
        } else {
          reject(false);
        }
      });
    });
  }

  createMenu(dataMenu) {
    const menus = [];
    for (const dm of dataMenu) {
      const dataM: any = [];
      if (dm.menus.length > 0) {
        for (const m of dm.menus) {
          dataM.push({
            name: m.menuDisplayName,
            url: m.sysMenuLink,
            icon: m.iconUrl,
          });
        }
      }

      menus.push({
        name: dm.menuDisplayName,
        url: dm.sysMenuLink,
        icon: dm.iconUrl,
        children: dataM
      });
    }

    return menus;
  }

  update(id, params) {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.apiUrl + this.apiUser}/${id}`, params).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          resolve(res.data.user);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  delete(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.apiUrl + this.apiUser}/${id}`).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          if (id == this.user.id) {
            this.logout();
          }
          resolve(res.statusCode);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
