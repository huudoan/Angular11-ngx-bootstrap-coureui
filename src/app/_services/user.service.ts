import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class UserService {
  private apiGetAll = '/api/customer_support/ads/all';
  private apiImportMultipleAdsDetails = '/api/customer_support/ads/ImportMultipleAdsDetails';
  private apiDeleteAdsPlans = '/api/customer_support/Ads/DeleteAdsPlans';
  private apiAdsPlanById = '/api/customer_support/ads/AdsPlanById';
  private apiUpdateAdsPlan = '/api/customer_support/Ads/UpdateAdsPlan';
  private apiInsertAdsPlan = '/api/customer_support/Ads/InsertAdsPlan';

  constructor(private api: ApiService, private http: HttpClient) {}

  public getAll(type: string, accountId: string) {
    return new Promise((resolve, reject) => {
      let qParams = {type: type, accountId: accountId};
      this.api.get(this.apiGetAll, qParams).subscribe((res: any) => {
        if (res.statusCode === 200 && res.data !== null) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public importMultipleAdsDetails(data) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apiImportMultipleAdsDetails, null, data).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public deletePlans(planId: number) {
    return new Promise((resolve, reject) => {
      this.api.delete(this.apiDeleteAdsPlans, {id: planId}).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public getPlanById(planId: number) {
    return new Promise((resolve, reject) => {
      this.api.get(this.apiAdsPlanById, {id: planId}).subscribe((res: any) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public updateAdsPlan(planId: number, data) {
    return new Promise((resolve, reject) => {
      this.api.put(this.apiUpdateAdsPlan, {id: planId}, data).subscribe((res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }

  public insertAdsPlan(data) {
    return new Promise((resolve, reject) => {
      this.api.post(this.apiInsertAdsPlan, null, data).subscribe((res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(res.statusCode);
        }
      });
    });
  }
}
