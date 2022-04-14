import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})

export class UserService {
  private apiUser = '/api/organization/user';
  private apiChangepassword = '/api/organization/user/changepassword';
  private apiUserList = '/api/organization/user/userlist';

  constructor(private api: ApiService, private http: HttpClient) {}

  public getAll() {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiUserList).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  getDataPage(offset, limit) {
    return new Promise((resolve, reject) => {
      const r = {offset: offset, limit: limit};
      this.api.get(environment.apiUrl + this.apiUserList, r).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getById(id: number) {
    return new Promise((resolve, reject) => {
      this.api.get(`${environment.apiUrl + this.apiUser}/${id}`).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public changepassword(data) {
    return new Promise((resolve, reject) => {
      this.api.put(this.apiChangepassword, null, data).subscribe((res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
