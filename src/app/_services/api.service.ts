import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {APIResponse} from '../_models/response.model';

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  call<T>(method, url, queries?, body?, noauth = false) {
    const _parent = this;
    const response = new Subject<APIResponse<T>>();
    if (url.indexOf('/') !== 0) {
      url = '/' + url;
    }

    if (method === 'get') {
      _parent.http.get(url, {params: queries}).subscribe((items: APIResponse) => {
        response.next(items);
      }, error => {
        this.handleError(error);
      });
    }

    if (method === 'post') {
      _parent.http.post(url, body, {params: queries}).subscribe((items: APIResponse) => {
        response.next(items);
      }, error => {
        this.handleError(error);
      });
    }

    if (method === 'put') {
      _parent.http.put(url, body, {params: queries}).subscribe((items: APIResponse) => {
        response.next(items);
      }, error => {
        this.handleError(error);
      });
    }

    if (method === 'delete') {
      _parent.http.delete(url, {params: queries}).subscribe((items: APIResponse) => {
        response.next(items);
      }, error => {
        this.handleError(error);
      });
    }
    return response.asObservable();
  }

  get<T>(url, queries?) {
    return this.call<T>('get', url, queries);
  }

  post<T>(url, queries?, body?) {
    return this.call<T>('post', url, queries, body);
  }

  put<T>(url, queries?, body?) {
    return this.call<T>('put', url, queries, body);
  }

  delete<T>(url, queries?) {
    return this.call<T>('delete', url, queries);
  }

  handleError(error: any) {
    if (error.status !== 200) {
      let errMessage = 'UNEXPECTED_ERROR';

      if (error.status === 504) {
        errMessage = 'CORRUPTED_CONNECTION';
      } else if (error.status === 403) {
        errMessage = 'YOU_DONT_HAVE_PERMISSION';
      } else if (error.status === 404) {
        errMessage = 'NOT_FOUND';
      } else if (error.error.errorMessage && error.error.errorCode > 0) {
        errMessage = error.error.errorMessage;
      } else {
        if (typeof error.error === 'string') {
          error.error = {};
          error.error.data = null;
          error.error.statusCode = error.status;
        }
      }
      // this.notiService.error(errMessage);
    } else {
      // this.notiService.error(error.error.message);
    }
  }
}
